<script lang="ts">
  import type { PageData } from "./$types";
  import SuperDebug, { superForm } from "sveltekit-superforms";

  let { data }: { data: PageData } = $props();
  const { form, enhance } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<h1>Register</h1>

<form method="post" action="?/register" use:enhance>
  <label>
    Username
    <input type="text" name="username" bind:value={$form.username} />
  </label>

  <label>
    Email
    <input type="email" name="email" bind:value={$form.email} />
  </label>

  <label>
    Password
    <input type="password" name="password" bind:value={$form.password} />
  </label>

  <button>Submit</button>
</form>
