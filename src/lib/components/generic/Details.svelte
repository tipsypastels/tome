<script lang="ts">
  import type { Snippet } from "svelte";
  import Fa from "svelte-fa";
  import { faCaretUp, faCaretDown } from "@fortawesome/pro-solid-svg-icons";

  interface Props {
    open: boolean;
    class?: string;
    label: string;
    children: Snippet;
  }

  let { open = $bindable(), class: className, label, children }: Props = $props();
  let icon = $derived(open ? faCaretDown : faCaretUp);
</script>

<details bind:open class={className}>
  <summary class="flex cursor-pointer select-none list-none items-center font-bold">
    <div class="grow text-red-600">
      {label}
    </div>

    <div>
      <Fa {icon} />
    </div>
  </summary>

  {@render children()}
</details>
