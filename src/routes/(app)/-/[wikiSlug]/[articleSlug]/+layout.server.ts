import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { articleCrumb, wikiCrumb } from "$lib/crumb";

export const load: LayoutServerLoad = async ({ params, parent }) => {
  const { wiki } = await parent();
  const { articleSlug: slug } = params;
  const slug_wikiId = { slug, wikiId: wiki.id };
  const article = await db.article.findUnique({ where: { slug_wikiId } });
  if (!article) {
    error(404);
  }

  return { article, title: article.name, crumbs: [wikiCrumb(wiki), articleCrumb(wiki, article)] };
};
