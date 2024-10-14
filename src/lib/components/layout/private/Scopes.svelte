<script lang="ts">
  import { page } from "$app/stores";

  let scopes = $page.data.scopes;
</script>

{#if scopes}
  <nav
    class="mx-auto w-[925px] max-w-full rounded-sm rounded-b-none bg-gray-200 px-4 py-2 text-sm text-slate-800"
  >
    <ul>
      {#each scopes as scope}
        <li>
          <a href={scope.url}>
            {scope.name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
