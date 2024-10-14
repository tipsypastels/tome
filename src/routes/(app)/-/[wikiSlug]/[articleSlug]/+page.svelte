<script lang="ts">
  import Markdown from "$lib/components/markdown/Markdown.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<h1>
  {data.article.name} in {data.wiki.name}
</h1>

<Markdown code={data.article.text} />
