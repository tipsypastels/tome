import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { logout } from "$lib/server/ops/user/auth";

export const load: PageServerLoad = async () => {
  redirect(302, "/");
};

export const actions: Actions = {
  default({ cookies }) {
    logout(cookies);
    redirect(302, "/login");
  },
};
