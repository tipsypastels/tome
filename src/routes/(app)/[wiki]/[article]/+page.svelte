<script lang="ts">
  import { Title } from "$lib/components/layout";
  import { Markdown } from "$lib/components/markdown";
  import { articleEditUrl } from "$lib/url";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Title />

<a href={articleEditUrl(data.wiki, data.article)}>edit</a>

<Markdown scope="article" text={data.article.text} />
