<script lang="ts">
  import { Head, Container } from "$lib/components/layout";
  import type { ChildrenProps } from "$lib/props";
  import "../../app.css";

  let { children }: ChildrenProps = $props();
</script>

<Head />

<Container>
  {@render children()}
</Container>
