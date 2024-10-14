import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { wikiCrumb } from "$lib/crumb";
import { NOT_FOUND } from "$lib/server/http/status";

export const load: LayoutServerLoad = async ({ params, parent }) => {
  const { wiki } = await parent();
  const { article: slug } = params;
  const slug_wikiId = { slug, wikiId: wiki.id };
  const article = await db.article.findUnique({ where: { slug_wikiId } });
  if (!article) {
    error(NOT_FOUND);
  }

  return { article, title: article.name, crumbs: [wikiCrumb(wiki)] };
};
