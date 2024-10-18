import type { Mode, Rendered, Hydrated, LoadWidget, Renderer } from "$lib/markdown";
import { Marked, type Token } from "marked";

export async function renderMarkdown<O>(mode: Mode<O>, md: string): Promise<Rendered<O>> {
  const marked = new Marked();

  if (mode.widgets) {
    await importAndRegisterWidgets(marked, mode.widgets);
  }

  const input = marked.lexer(md);
  const widgets = new Set<string>();
  const tokens: Token[] = [];
  const errors: string[] = [];

  const getTokens = () => tokens;
  const addError = (e: string) => errors.push(e);
  const addToken = (t: Token) => {
    tokens.push(t);
    const { widget } = t as { widget?: string };
    if (widget) widgets.add(widget);
  };

  const re: Renderer = { input, getTokens, addToken, addError };
  const out = await mode.render(re);

  return {
    widgets,
    errors,
    out,
  };
}

export function finishMarkdownWithoutHydration<O>(md: Rendered<O>): Hydrated<O> {
  if (md.widgets.size !== 0) {
    throw new Error("Cannot skip hydration of markdown with widgets.");
  }

  return { ...md, widgets: {} };
}

async function importAndRegisterWidgets(marked: Marked, widgets: Record<string, LoadWidget>) {
  const promises: Promise<void>[] = [];

  for (const [name, load] of Object.entries(widgets)) {
    const register = async () => {
      const widget = await load();
      widget.register(marked, name);
    };

    promises.push(register());
  }

  await Promise.all(promises);
}
