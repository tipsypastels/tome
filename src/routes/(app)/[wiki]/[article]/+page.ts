import { hydrateMarkdown } from "$lib/markdown";
import { ARTICLE_MODE } from "$lib/markdown/modes";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { content: renderedContent } = await parent();
  const content = await hydrateMarkdown(ARTICLE_MODE, renderedContent);
  return { content };
};
