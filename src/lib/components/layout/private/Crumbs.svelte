<script lang="ts">
  import Fa from "svelte-fa";
  import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
  import type { Crumb } from "$lib/crumb";

  let { crumbs }: { crumbs: Crumb[] } = $props();
</script>

<nav
  class="mx-auto w-[925px] max-w-full rounded-sm rounded-b-none bg-gray-200 px-4 py-2 text-sm text-slate-800"
>
  <ul class="text-center">
    {#each crumbs as crumb}
      <li class="inline-block">
        <a class="pr-2 font-bold underline" href={crumb.url}>
          <Fa icon={faAngleRight} class="inline" />
          {crumb.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
