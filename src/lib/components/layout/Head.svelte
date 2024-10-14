<script lang="ts">
  import { page } from "$app/stores";

  let title = $derived($page.data.title);
  let unscoped = $derived($page.data.headTitleBaseIgnoreCrumb);

  let tomeTitle = $derived($page.data.tome.title);
  let baseTitle = $derived((!unscoped && $page.data.crumbs?.at(-1)?.name) ?? tomeTitle);
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
