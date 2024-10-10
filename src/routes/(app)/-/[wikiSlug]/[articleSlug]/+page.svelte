<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<h1>
  {data.article.name} in {data.wiki.name}
</h1>
