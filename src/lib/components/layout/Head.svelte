<script lang="ts">
  import { page } from "$app/stores";

  let title = $page.data.title;
  let unscoped = $page.data.headTitleBaseIgnoreCrumb;

  let tomeTitle = $page.data.tome.title;
  let baseTitle = (!unscoped && $page.data.crumbs?.at(-1)?.name) ?? tomeTitle;
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
