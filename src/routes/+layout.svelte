<script lang="ts">
  import type { ChildrenProps } from "$lib/props";
  import "../app.css";

  let { children }: ChildrenProps = $props();
</script>

{@render children()}
