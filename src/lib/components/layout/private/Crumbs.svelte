<script lang="ts">
  import { page } from "$app/stores";

  let crumbs = $page.data.crumbs;
</script>

{#if crumbs}
  <nav
    class="mx-auto w-[925px] max-w-full rounded-sm rounded-b-none bg-gray-200 px-4 py-2 text-sm text-slate-800"
  >
    <ul class="text-center">
      {#each crumbs as crumb}
        <li class="inline-block">
          <a class="font-bold underline" href={crumb.url}>
            {crumb.name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
