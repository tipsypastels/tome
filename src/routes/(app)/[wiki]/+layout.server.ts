import { db } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { articleUrl } from "$lib/url";

export const load: LayoutServerLoad = async ({ params, locals }) => {
  const { wiki: slug } = params;
  const wiki = await db.wiki.findUnique({ where: { slug } });
  if (!wiki) {
    if (locals.onlyWiki) {
      redirect(303, articleUrl(locals.onlyWiki, { slug }));
    }

    error(404);
  }

  return { wiki, title: wiki.name };
};
