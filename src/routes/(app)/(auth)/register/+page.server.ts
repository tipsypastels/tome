import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { register } from "$lib/server/ops/user/auth";
import { caseErr } from "$lib/server/ops/result";
import { fail, redirect } from "@sveltejs/kit";
import { BAD_REQUEST, MOVED_TEMPORARILY, SEE_OTHER } from "$lib/server/http/status";

const Schema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.me) {
    redirect(MOVED_TEMPORARILY, "/");
  }

  const form = await superValidate(zod(Schema));
  return { form };
};

export const actions: Actions = {
  async register({ request }) {
    const form = await superValidate(request, zod(Schema));
    if (!form.valid) {
      return fail(BAD_REQUEST, { form });
    }

    const result = await register(form.data);
    if (!result.valid) {
      caseErr(result, {
        "taken-username": () => setError(form, "username", "Username is taken."),
        "taken-email": () => setError(form, "email", "Email is taken."),
      });
      return fail(BAD_REQUEST, { form });
    }

    redirect(SEE_OTHER, "/login");
  },
};
