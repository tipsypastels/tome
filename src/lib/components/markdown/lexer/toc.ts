import type { TocTree } from "$lib/components/generic";
import type { MarkedExtension } from "marked";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

declare module "marked" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Tokens {
    interface Heading {
      slug: string;
      isFirstHeadingSeen?: boolean;
    }
  }
}

export function tocExtension(scope: string, tree: TocTree): MarkedExtension {
  let seenAnyHeadings = false;

  return {
    walkTokens(token) {
      if (token.type === "heading") {
        if (!seenAnyHeadings) {
          token.isFirstHeadingSeen = true;
          seenAnyHeadings = true;
        }

        token.slug = `${scope}-${slugger.slug(token.text)}`;
        tree.add({
          text: token.text,
          slug: token.slug,
          depth: token.depth,
        });
      }
    },
  };
}
