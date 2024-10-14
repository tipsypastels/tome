import { db } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { articleUrl } from "$lib/url";
import { NOT_FOUND, SEE_OTHER } from "$lib/server/http/status";

export const load: LayoutServerLoad = async ({ params, locals }) => {
  const { wiki: slug } = params;
  const wiki = await db.wiki.findUnique({ where: { slug } });
  if (!wiki) {
    if (locals.onlyWiki) {
      const url = articleUrl(locals.onlyWiki, { slug });
      redirect(SEE_OTHER, url);
    }

    error(NOT_FOUND);
  }

  return { wiki, title: wiki.name };
};
