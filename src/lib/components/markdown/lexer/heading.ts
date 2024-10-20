import type { MarkedExtension } from "marked";
import GithubSlugger from "github-slugger";

const CUSTOM_SLUG_REGEX = /(?: +|^)\{#([a-z][\w-]*)\}(?: +|$)/i;

const slugger = new GithubSlugger();

export function headingExtension(scope: string): MarkedExtension {
  return {
    walkTokens(token) {
      if (token.type === "heading") {
        const text: string = token.text;
        const custom = CUSTOM_SLUG_REGEX.exec(text);

        if (custom) {
          // TODO: Remove label from text and child tokens?
          // Easiest way is to walk them all but that's kinda dumb.
          // Make a tokenizer plugin instead?
          token.slug = `${scope}-${custom[1]}`;
        } else {
          token.slug = `${scope}-${slugger.slug(text)}`;
        }
      }
    },
  };
}
