<script lang="ts">
  import { Head, Container } from "$lib/components/layout";
  import type { ChildrenProps } from "$lib/props";

  let { children }: ChildrenProps = $props();
</script>

<Head />

<Container>
  {@render children()}
</Container>
