<script lang="ts">
  import { lex, type Token, type Tokens } from "./marked";

  interface Props {
    text: string;
  }

  let { text }: Props = $props();
  let tokens = $derived(lex(text));
</script>

{#snippet token$(token: Token)}
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
      {@render tokens$(token.tokens)}
    </em>
  {:else if token.type === "escape"}
    <!-- TODO -->
  {:else if token.type === "heading"}
    <svelte:element this={`h${token.depth}`}>
      {@render tokens$(token.tokens)}
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
      {@render tokens$(token.tokens)}
    </p>
  {:else if token.type === "space"}
    {""}
  {:else if token.type === "strong"}
    <strong>
      {@render tokens$(token.tokens)}
    </strong>
  {:else if token.type === "table"}
    <!-- TODO -->
  {:else if token.type === "text"}
    {token.text}
  {:else}
    {@const _: never = token.type}
  {/if}
{/snippet}

{#snippet tokens$(tokens: Tokens | import("marked").Token[] | undefined)}
  {#if tokens}
    {#each tokens as token}
      {@render token$(token as Token)}
    {/each}
  {/if}
{/snippet}

<article class="prose">
  {@render tokens$(tokens)}
</article>
