<script lang="ts">
  import type { Snippet } from "svelte";
  import { page } from "$app/stores";
  import Head from "$lib/components/layout/Head.svelte";
  import "../../app.css";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<Head />

{#if $page.data.title}
  <h1>
    {$page.data.title}
  </h1>
{/if}

<main class="text-red-500">
  {@render children()}
</main>
