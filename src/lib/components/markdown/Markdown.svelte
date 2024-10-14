<script lang="ts">
  import * as marked from "marked";

  interface Props {
    code: string;
    inline?: boolean;
  }

  function lex() {
    const method = inline ? "lexInline" : "lex";
    return marked.Lexer[method](code);
  }

  let { code, inline = false }: Props = $props();
  let tokens = $derived(lex());
</script>

{@render tokensRenderer(tokens)}

{#snippet tokensRenderer(tokens: marked.Token[] | undefined)}
  {#if tokens}
    {#each tokens as token}
      {@render tokenRenderer(token)}
    {/each}
  {/if}
{/snippet}

{#snippet tokenRenderer(token: marked.Token)}
  {#if token.type === "space"}
    <!-- space-->
  {:else if token.type === "heading"}
    <svelte:element this={`h${token.depth}`}>
      {@render tokensRenderer(token.tokens)}
    </svelte:element>
  {:else if token.type === "paragraph"}
    <p>
      {@render tokensRenderer(token.tokens)}
    </p>
  {:else if token.type === "strong"}
    <strong>
      {@render tokensRenderer(token.tokens)}
    </strong>
  {:else if token.type === "text"}
    {token.text}
  {:else}
    <pre>unhandled token type {token.type}</pre>
  {/if}
{/snippet}
