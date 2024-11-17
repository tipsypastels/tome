<script lang="ts">
  import type { InfoboxData, InfoboxSchema } from ".";
  import Details from "../generic/Details.svelte";

  interface Props {
    name: string;
    kind: string;
    data: InfoboxData;
    schema: InfoboxSchema;
    right?: boolean;
  }

  let { name, kind, data, schema, right = true }: Props = $props();
</script>

<aside class="w-fit min-w-[300px] border-4 border-current" class:float-right={right}>
  <div class="p-4 text-center">
    <div class="text-lg font-bold">
      {name}
    </div>

    <div class="text-sm italic">
      {kind}
    </div>
  </div>

  <div class="p-4">
    {#each schema.sections as section}
      <Details open={!section.hiddenByDefault} label={section.name}>foo</Details>
    {/each}
  </div>
</aside>
