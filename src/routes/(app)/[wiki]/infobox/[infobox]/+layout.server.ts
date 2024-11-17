import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { NOT_FOUND } from "$lib/server/http/status";
import { wikiCrumb } from "$lib/crumb";

export const load: LayoutServerLoad = async ({ params, parent }) => {
  const { wiki } = await parent();
  const { infobox: slug } = params;
  const slug_wikiId = { slug, wikiId: wiki.id };
  const infobox = await db.infobox.findUnique({ where: { slug_wikiId } });
  if (!infobox) {
    error(NOT_FOUND);
  }

  return { infobox, title: infobox.name, crumbs: [wikiCrumb(wiki)] };
};
