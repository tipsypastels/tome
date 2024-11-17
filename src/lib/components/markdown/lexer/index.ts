import { TocTree } from "$lib/components/toc";
import { Marked, type MarkedToken } from "marked";
import { tocExtension } from "./toc";
import { headingExtension } from "./heading";

export type Token = MarkedToken;
export type Tokens = Token[];

export interface LexResult {
  tokens: Tokens;
  toc: TocTree;
}

export function lex(scope: string, text: string): LexResult {
  const toc = new TocTree();
  const marked = new Marked().use(headingExtension(scope), tocExtension(toc));
  const tokens = marked.lexer(text) as Tokens;

  if (marked.defaults.walkTokens) {
    marked.walkTokens(tokens, marked.defaults.walkTokens);
  }

  return { tokens, toc };
}
