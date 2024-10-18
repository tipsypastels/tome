import type { TocTree } from "$lib/components/generic";
import type { MarkedExtension } from "marked";

declare module "marked" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Tokens {
    interface Heading {
      isFirstHeadingSeen?: boolean;
    }
  }
}

export function tocExtension(tree: TocTree): MarkedExtension {
  let seenAnyHeadings = false;
  return {
    walkTokens(token) {
      if (token.type === "heading") {
        if (!seenAnyHeadings) {
          token.isFirstHeadingSeen = true;
          seenAnyHeadings = true;
        }

        const node = { depth: token.depth, text: token.text };
        tree.add(node);
      }
    },
  };
}
