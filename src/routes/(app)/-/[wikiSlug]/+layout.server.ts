import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  const { wikiSlug: slug } = params;
  const wiki = await db.wiki.findUnique({ where: { slug } });
  if (!wiki) {
    error(404);
  }

  return { wiki, title: wiki.name };
};
