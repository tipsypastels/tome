<script lang="ts">
  import { page } from "$app/stores";

  let title = $page.data.title;
  let baseTitle = $page.data.baseTitle ?? $page.data.tome.title;
</script>

<svelte:head>
  {#if title}
    <title>
      {title} • {baseTitle}
    </title>
  {:else}
    <title>
      {baseTitle}
    </title>
  {/if}
</svelte:head>
