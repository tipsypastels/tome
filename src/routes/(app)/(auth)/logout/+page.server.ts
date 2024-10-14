import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { logout } from "$lib/server/ops/user/auth";
import { MOVED_TEMPORARILY } from "$lib/http/status";

export const load: PageServerLoad = async () => {
  redirect(MOVED_TEMPORARILY, "/");
};

export const actions: Actions = {
  default({ cookies }) {
    logout(cookies);
    redirect(MOVED_TEMPORARILY, "/login");
  },
};
