import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params, parent }) => {
  const { wiki } = await parent();
  const { articleSlug: slug } = params;
  const slug_wikiId = { slug, wikiId: wiki.id };
  const article = await db.article.findUnique({ where: { slug_wikiId } });
  if (!article) {
    error(404);
  }

  return { article, title: article.name, baseTitle: wiki.name };
};
