<script lang="ts">
  import { Infobox } from "$lib/components/infobox";
  import { Title } from "$lib/components/layout";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Title />
<Infobox name="Tyler Thorne" kind={data.infobox.name} data={{}} schema={data.infobox.schema} />
