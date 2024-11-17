<script lang="ts">
  import { TocTree, type TocNode } from "./tree";
  import { Details } from "../generic";

  interface Props {
    tree: TocTree;
    label?: string;
    open?: boolean;
  }

  let { tree, label = "Contents", open = $bindable(true) }: Props = $props();
</script>

<Details bind:open class="w-fit min-w-[250px] border-4 border-current p-4" {label}>
  <ol class="mt-2">
    {#each tree.roots as node, index}
      {@render li(node)}
    {/each}
  </ol>
</Details>

{#snippet li(node: TocNode)}
  <li>
    <a href="#{node.slug}" class="underline">
      {node.text}
    </a>

    {#if node.children.length > 0}
      <ol class="pl-2">
        {#each node.children as child}
          {@render li(child)}
        {/each}
      </ol>
    {/if}
  </li>
{/snippet}
