import type { Article, Wiki } from "@prisma/client";

export function articleUrl(wiki: Wiki, article: Article) {
  return `${wikiUrl(wiki)}/${article.slug}`;
}

export function wikiUrl(wiki: Wiki) {
  return `/-/${wiki.slug}`;
}
