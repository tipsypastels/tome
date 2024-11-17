import type { TocTree } from "$lib/components/toc";
import type { MarkedExtension } from "marked";

export function tocExtension(tree: TocTree): MarkedExtension {
  let seenFirst = false;

  return {
    walkTokens(token) {
      if (token.type === "heading") {
        if (!seenFirst) {
          token.first = true;
          seenFirst = true;
        }

        tree.add({
          text: token.text,
          slug: token.slug,
          depth: token.depth,
        });
      }
    },
  };
}
