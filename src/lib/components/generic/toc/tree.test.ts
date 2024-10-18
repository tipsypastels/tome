import { test, expect } from "vitest";
import { TocTree, type TocNode } from "./tree";

type NewNode = Omit<TocNode, "children">;

function newNode(depth: number, text: string): NewNode {
  return { depth, text };
}

function withChildren(node: NewNode, children: TocNode[]): TocNode {
  return { ...node, children };
}

function withoutChildren(node: NewNode): TocNode {
  return { ...node, children: [] };
}

test("starts empty", () => {
  const tree = new TocTree();
  expect(tree.roots.length).toBe(0);
});

test("adding a top-level node", () => {
  const tree = new TocTree();
  const node = newNode(1, "foo");

  tree.add(node);
  expect(tree.roots).toEqual([withoutChildren(node)]);
});

test("adding a sub-node", () => {
  const tree = new TocTree();
  const node = newNode(1, "foo");
  const subNode = newNode(2, "bar");

  tree.add(node);
  tree.add(subNode);

  expect(tree.roots).toEqual([withChildren(node, [withoutChildren(subNode)])]);
});

test("skipping depth", () => {
  const tree = new TocTree();
  const node = newNode(1, "foo");
  const subNode = newNode(3, "bar");

  tree.add(node);
  tree.add(subNode);

  expect(tree.roots).toEqual([withChildren(node, [withoutChildren({ ...subNode, depth: 2 })])]);
});
