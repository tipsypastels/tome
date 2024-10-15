<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import Title from "$lib/components/layout/Title.svelte";
  import { Editor } from "$lib/components/editor";

  let { data }: { data: PageData } = $props();
  const { form, enhance } = superForm(data.form);
</script>

<Title />

<form method="post" use:enhance>
  <Editor name="text" bind:value={$form.text} />

  <button>Submit</button>
</form>
