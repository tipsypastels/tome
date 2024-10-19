<script lang="ts">
  import { TocTree, type TocNode } from "./tree";
  import Fa from "svelte-fa";
  import { faCaretUp, faCaretDown } from "@fortawesome/pro-solid-svg-icons";

  interface Props {
    tree: TocTree;
    label?: string;
    open?: boolean;
  }

  let { tree, label = "Contents", open = $bindable(true) }: Props = $props();
  let icon = $derived(open ? faCaretDown : faCaretUp);
</script>

<details bind:open class="relative w-fit min-w-[250px] border-4 border-current p-4">
  <summary class="flex cursor-pointer select-none list-none items-center font-bold">
    <div class="grow text-red-600">
      {label}
    </div>

    <div>
      <Fa {icon} />
    </div>
  </summary>

  <ol class="mt-2">
    {#each tree.roots as node, index}
      {@render li(node)}
    {/each}
  </ol>
</details>

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
