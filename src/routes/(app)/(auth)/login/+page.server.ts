import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { login } from "$lib/server/ops/user/auth";
import { caseErr } from "$lib/server/ops/result";

const Schema = z.object({
  username: z.string(),
  password: z.string(),
});

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.me) {
    redirect(302, "/");
  }

  const form = await superValidate(zod(Schema));
  return { form };
};

export const actions: Actions = {
  async login({ request, cookies }) {
    const form = await superValidate(request, zod(Schema));
    if (!form.valid) {
      return fail(400, { form });
    }

    const result = await login(form.data, cookies);
    if (!result.valid) {
      caseErr(result, {
        "bad-user": () => setError(form, "username", "No such user."),
        "bad-password": () => setError(form, "password", "Incorrect password."),
      });
      return fail(400, { form });
    }

    redirect(302, "/");
  },
};
