<script lang="ts">
  import { Toc } from "../toc";
  import { lex, type Token, type Tokens } from "./lexer";

  interface Props {
    scope: string;
    text: string;
  }

  let { scope, text }: Props = $props();
  let result = $derived(lex(scope, text));
</script>

{#snippet token(token: Token)}
  {#if token.type === "blockquote"}
    blockquote
  {:else if token.type === "br"}
    <br />
  {:else if token.type === "code"}
    <!-- TODO -->
  {:else if token.type === "codespan"}
    <!-- TODO. -->
  {:else if token.type === "def"}
    <!-- TODO -->
  {:else if token.type === "del"}
    <!-- TODO -->
  {:else if token.type === "em"}
    <em>
      {@render tokens(token.tokens)}
    </em>
  {:else if token.type === "escape"}
    <!-- TODO -->
  {:else if token.type === "heading"}
    {#if token.first}
      <div class="not-prose">
        <Toc tree={result.toc} />
      </div>
    {/if}

    <svelte:element this={`h${token.depth}`} id={token.slug}>
      <a class="not-prose" href="#{token.slug}">
        {@render tokens(token.tokens)}
      </a>
    </svelte:element>
  {:else if token.type === "hr"}
    <!-- TODO -->
  {:else if token.type === "html"}
    <!-- TODO -->
  {:else if token.type === "image"}
    <!-- TODO -->
  {:else if token.type === "link"}
    <!-- TODO -->
  {:else if token.type === "list"}
    <!-- TODO -->
  {:else if token.type === "list_item"}
    <!-- TODO -->
  {:else if token.type === "paragraph"}
    <p>
      {@render tokens(token.tokens)}
    </p>
  {:else if token.type === "space"}
    {""}
  {:else if token.type === "strong"}
    <strong>
      {@render tokens(token.tokens)}
    </strong>
  {:else if token.type === "table"}
    <!-- TODO -->
  {:else if token.type === "text"}
    {token.text}
  {:else}
    {@const _: never = token.type}
  {/if}
{/snippet}

{#snippet tokens(tokens: Tokens | import("marked").Token[] | undefined)}
  {#if tokens}
    {#each tokens as t}
      {@render token(t as Token)}
    {/each}
  {/if}
{/snippet}

<article class="prose">
  {@render tokens(result.tokens)}
</article>
