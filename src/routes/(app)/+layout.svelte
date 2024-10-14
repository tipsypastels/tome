<script lang="ts">
  import type { ChildrenProps } from "$lib/props";
  import "../../app.css";

  import { Head, Container } from "$lib/components/layout";

  let { children }: ChildrenProps = $props();
</script>

<Head />
<Container {children} />
