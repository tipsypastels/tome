<script lang="ts">
  import { Title } from "$lib/components/layout";
  import Markdown from "$lib/components/markdown/Markdown.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Title />

<Markdown code={data.article.text} />
