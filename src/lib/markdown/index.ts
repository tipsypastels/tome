import type { Marked, Token } from "marked";
import type { Component } from "svelte";

export { default as Markdown } from "./Markdown.svelte";

export interface Mode<Out> {
  widgets?: Record<string, () => Promise<Widget>>;
  render(re: Renderer): Promise<Out>;
}

export interface Renderer {
  input: Token[];
  getTokens(): Token[];
  addToken(token: Token): void;
  addError(error: string): void;
}

export type LoadWidget = () => Promise<Widget>;

export interface Widget {
  default: Component<{ token: Token }>;
  register(marked: Marked, name: string): void;
}

export interface Rendered<Out> {
  widgets: Set<string>;
  errors?: string[];
  out: Out;
}

export interface Hydrated<Out> {
  widgets: Record<string, Widget>;
  errors?: string[];
  out: Out;
}

export async function hydrateMarkdown<O>(mode: Mode<O>, md: Rendered<O>): Promise<Hydrated<O>> {
  if (md.widgets.size === 0) {
    return { ...md, widgets: {} };
  }

  if (!mode.widgets) {
    throw new Error("Markdown has unregistered widgets.");
  }

  const widgets: Record<string, Widget> = {};
  const promises: Promise<void>[] = [];

  for (const name of md.widgets) {
    const load = async () => {
      const fn = mode.widgets?.[name];
      if (!fn) {
        throw new Error(`Markdown has unknown widget ${name}.`);
      }
      widgets[name] = await fn();
    };

    promises.push(load());
  }

  await Promise.all(promises);
  return { ...md, widgets };
}
