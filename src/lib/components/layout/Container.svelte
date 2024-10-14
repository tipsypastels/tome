<script lang="ts">
  import { page } from "$app/stores";
  import type { ChildrenProps } from "$lib/props";
  import Crumbs from "./private/Crumbs.svelte";

  let { children }: ChildrenProps = $props();
  let crumbs = $page.data.crumbs;
</script>

<div class="mx-auto flex h-screen max-h-full w-[1000px] max-w-full flex-col pt-32">
  {#if crumbs && crumbs.length}
    <Crumbs {crumbs} />
  {/if}

  <main
    class="grow rounded-sm border-2 border-b-0 border-gray-200 bg-white p-8 pt-12 text-slate-700 shadow-2xl"
  >
    {@render children()}
  </main>
</div>
