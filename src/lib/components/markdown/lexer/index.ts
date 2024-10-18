import { Marked, type MarkedToken } from "marked";

export type Token = MarkedToken;
export type Tokens = Token[];

export interface LexResult {
  tokens: Tokens;
}

export function lex(text: string): LexResult {
  const marked = new Marked();
  const tokens = marked.lexer(text) as Tokens;

  return { tokens };
}
