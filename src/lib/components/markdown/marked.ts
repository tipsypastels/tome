import { Marked, type MarkedToken } from "marked";

export type Token = MarkedToken;
export type Tokens = Token[];

export function lex(text: string): Tokens {
  return marked.lexer(text) as Tokens;
}

const marked = new Marked();
