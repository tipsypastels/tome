<script lang="ts">
  import { TocTree, type TocNode } from "./tree";

  interface Props {
    tree: TocTree;
    label?: string;
    open?: boolean;
  }

  let { tree, label = "Contents", open = $bindable(true) }: Props = $props();
</script>

{#snippet node(node: TocNode, isEven: boolean)}
  <li>
    {node.text}
    {@render children(node.children, !isEven)}
  </li>
{/snippet}

{#snippet children(nodes: TocNode[], isEven: boolean)}
  <ol class="list-inside pl-4" class:list-disc={isEven} class:list-[circle]={!isEven}>
    {#each nodes as n}
      {@render node(n, isEven)}
    {/each}
  </ol>
{/snippet}

<nav class="w-fit border-2 border-gray-200 p-4">
  <h2>{label}</h2>

  <ol class="list-inside list-decimal">
    {#each tree.roots as n}
      {@render node(n, false)}
    {/each}
  </ol>
</nav>
