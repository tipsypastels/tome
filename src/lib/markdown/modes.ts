import type { Token } from "marked";
import type { Mode } from ".";

interface Simple {
  tokens: Token[];
}

const simpleRender: Mode<Simple>["render"] = async (re) => {
  re.input.forEach((token) => re.addToken(token));
  return { tokens: re.getTokens() };
};

export const ARTICLE_MODE: Mode<Simple> = {
  widgets: {
    dl: () => import("./widgets/DescriptionList.svelte"),
  },
  render: simpleRender,
};
