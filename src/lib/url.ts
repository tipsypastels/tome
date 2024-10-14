export type HasSlug = { slug: string };

export function articleUrl(wiki: HasSlug, article: HasSlug) {
  return `${wikiUrl(wiki)}/${article.slug}`;
}

export function articleEditUrl(wiki: HasSlug, article: HasSlug) {
  return `${articleUrl(wiki, article)}/edit`;
}

export function wikiUrl(wiki: HasSlug) {
  return `/${wiki.slug}`;
}
