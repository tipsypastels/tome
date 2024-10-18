export interface TocNode {
  depth: number;
  text: string;
  slug: string;
  children: TocNode[];
}

export class TocTree {
  #roots: TocNode[] = [];
  #memo = new Map<number, TocNode>();

  get roots() {
    return this.#roots;
  }

  add(node_: Omit<TocNode, "children">) {
    const node: TocNode = { ...node_, children: [] };
    const parent = this.#parent(node);

    if (parent) {
      // we may have skipped depth levels
      node.depth = parent.depth + 1;
      parent.children.push(node);
    } else {
      this.#roots.push(node);
    }

    this.#memo.set(node.depth, node);
  }

  #parent(node: TocNode): TocNode | undefined {
    const { depth } = node;

    if (depth === 1) {
      return;
    }

    const parent = this.#memo.get(depth - 1);
    if (parent) {
      return parent;
    }

    return this.#parent({ ...node, depth: depth - 1 });
  }
}
