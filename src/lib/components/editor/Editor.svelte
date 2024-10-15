<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { markdown } from "@codemirror/lang-markdown";

  interface Props {
    name: string;
    value: string;
  }

  let { name, value = $bindable() }: Props = $props();
</script>

<input type="hidden" {name} {value} />
<CodeMirror bind:value lang={markdown()} />
