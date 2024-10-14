<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const { form, enhance } = superForm(data.form);
</script>

<form method="post" use:enhance></form>
