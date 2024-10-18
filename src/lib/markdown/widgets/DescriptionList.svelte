<script lang="ts" module>
  import type { Marked } from "marked";

  export function register(marked: Marked, name: string) {
    marked.use({
      extensions: [
        {
          name,
          level: "block",
          start(src) {
            return src.match(/:[^:\n]/)?.index;
          },
          tokenizer(src, tokens) {
            return {
              type: "foo",
              widget: "foo",
              raw: "a",
            };
          },
        },
      ],
    });
  }
</script>

<script lang="ts">
  let { token }: { token: any } = $props();
</script>
