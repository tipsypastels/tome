import { z } from "zod";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

const Schema = z.object({});

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(Schema));
  return { form };
};
