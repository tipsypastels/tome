import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { articleCrumb, wikiCrumb } from "$lib/crumb";
import { fail, redirect } from "@sveltejs/kit";
import { BAD_REQUEST, NOT_FOUND, SEE_OTHER } from "$lib/server/http/status";
import { db } from "$lib/server/db";
import { articleUrl } from "$lib/url";

const Schema = z.object({
  text: z.string(),
});

export const load: PageServerLoad = async ({ parent }) => {
  const { wiki, article } = await parent();
  const data = { text: article.text };
  const form = await superValidate(data, zod(Schema));
  return {
    form,
    title: `Edit ${article.name}`,
    crumbs: [wikiCrumb(wiki), articleCrumb(wiki, article)],
  };
};

export const actions: Actions = {
  async default({ params, request }) {
    const form = await superValidate(request, zod(Schema));
    if (!form.valid) {
      return fail(BAD_REQUEST, { form });
    }
    console.log(form.data);

    // TODO: Make an op, history stuff.
    const wiki = await db.wiki.findUnique({ where: { slug: params.wiki } });
    if (!wiki) {
      return fail(NOT_FOUND, { form });
    }

    const slug_wikiId = { slug: params.article, wikiId: wiki.id };
    const article = await db.article.findUnique({
      where: { slug_wikiId },
    });
    if (!article) {
      return fail(NOT_FOUND, { form });
    }

    await db.article.update({
      where: { slug_wikiId },
      data: { text: form.data.text },
    });

    redirect(SEE_OTHER, articleUrl(wiki, article));
  },
};
