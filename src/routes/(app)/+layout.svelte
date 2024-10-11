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

<div class="mx-auto flex h-screen max-h-full w-[1000px] max-w-full flex-col pt-32">
  <main class="grow border-2 border-b-0 border-white bg-zinc-950 p-8 shadow-lg">
    {@render children()}
  </main>
</div>
