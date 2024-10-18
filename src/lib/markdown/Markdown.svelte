<script lang="ts">
  import type { Token, MarkedToken } from "marked";
  import type { Widget } from ".";
  import { dev } from "$app/environment";

  interface Props {
    tokens: Token[];
    widgets?: Record<string, Widget>;
  }

  function getWidgetComponent(name: string) {
    const widget = widgets?.[name]?.default;
    if (!widget && dev) throw new Error(`Missing widget ${name}.`);
    return widget;
  }

  let { tokens, widgets }: Props = $props();
</script>

{#snippet renderWidget(name: string, token: Token)}
  {@const Component = getWidgetComponent(name)}
  {#if Component}<Component {token} />{/if}
{/snippet}

{#snippet renderMarkedToken(token: MarkedToken)}
  {#if token.type === "blockquote"}
    foo
  {:else}
    <pre>Unknown token type {token.type}.</pre>
  {/if}
{/snippet}

{#snippet renderToken(token: Token)}
  {@const widget = (token as { widget?: string }).widget}
  {#if widget}
    {@render renderWidget(widget, token)}
  {:else}
    {@render renderMarkedToken(token as MarkedToken)}
  {/if}
{/snippet}

{#snippet renderTokens(tokens: Token[] | undefined)}
  {#if tokens}
    {#each tokens as token}
      {@render renderToken(token)}
    {/each}
  {/if}
{/snippet}

{@render renderTokens(tokens)}
