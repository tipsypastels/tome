<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import Title from "$lib/components/layout/Title.svelte";

  let { data }: { data: PageData } = $props();
  const { form, enhance } = superForm(data.form);
</script>

<Title />

<form method="post" use:enhance>
  <textarea name="text" bind:value={$form.text}></textarea>

  <button>Submit</button>
</form>
