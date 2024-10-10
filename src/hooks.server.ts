import { db } from "$lib/server/db";
import { authenticate } from "$lib/server/ops/user/auth";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const setupHandle: Handle = async ({ event, resolve }) => {
  const setupPath = "/setup";
  const path = event.url.pathname;
  const tome = await db.tome.find();

  if (path === setupPath && tome) {
    return Response.redirect(new URL("/", event.url), 303);
  }
  if (path !== setupPath && !tome) {
    return Response.redirect(new URL(setupPath, event.url), 303);
  }
  if (tome) {
    event.locals.tome = tome;
  }
  return await resolve(event);
};

const authenticateHandle: Handle = async ({ event, resolve }) => {
  const me = await authenticate(event.cookies);
  if (me) {
    event.locals.me = me;
  }
  return await resolve(event);
};

export const handle = sequence(setupHandle, authenticateHandle);
