import type { Snippet } from "svelte";

export interface ChildrenProps<P extends unknown[] = []> {
  children: Snippet<P>;
}
