import type { Article, Wiki } from "@prisma/client";
import { articleUrl, wikiUrl } from "./url";

export interface Crumb {
  name: string;
  url: string;
  __brand: "crumb";
}

export function crumb(name: string, url: string): Crumb {
  return { name, url } as Crumb;
}

export function articleCrumb(wiki: Wiki, article: Article) {
  return crumb(article.name, articleUrl(wiki, article));
}

export function wikiCrumb(wiki: Wiki) {
  return crumb(wiki.name, wikiUrl(wiki));
}
