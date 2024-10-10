import { db } from "$lib/server/db";
import type { Cookies } from "@sveltejs/kit";
import type { Result } from "../result";
import bcrypt from "bcrypt";
import { dev } from "$app/environment";

const SESSION_COOKIE = "tome-session";
const SESSION_AGE = 60 * 60 * 24 * 30; // 1 month
const PASSWORD_SALT_ROUNDS = 10;

export async function authenticate(cookies: Cookies) {
  const sessionId = cookies.get(SESSION_COOKIE);
  if (!sessionId) {
    return;
  }

  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  return session?.user;
}

export interface Register {
  username: string;
  email: string;
  password: string;
}

export type RegisterResult = Result<void, "taken-username" | "taken-email">;

export async function register(register: Register): Promise<RegisterResult> {
  const { username, email, password } = register;
  const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

  if (await db.user.findUnique({ where: { username } })) {
    return { valid: false, error: "taken-username" };
  }

  if (await db.user.findUnique({ where: { email } })) {
    return { valid: false, error: "taken-email" };
  }

  await db.user.create({
    data: { username, email, passwordHash },
  });

  return { valid: true };
}

export type Login = Pick<Register, "username" | "password">;
export type LoginResult = Result<void, "bad-user" | "bad-password">;

export async function login(login: Login, cookies: Cookies): Promise<LoginResult> {
  const { username, password } = login;
  const user = await db.user.findUnique({ where: { username } });
  if (!user) {
    return { valid: false, error: "bad-user" };
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return { valid: false, error: "bad-password" };
  }

  const session = await db.session.create({
    data: { userId: user.id },
  });

  cookies.set(SESSION_COOKIE, session.id, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: !dev,
    maxAge: SESSION_AGE,
  });

  return { valid: true };
}

export function logout(cookies: Cookies) {
  cookies.set(SESSION_COOKIE, "", { path: "/", expires: new Date(0) });
}
