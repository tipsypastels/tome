import type { Tome, User } from "@prisma/client";
import type { Snippet } from "svelte";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      tome: Tome;
      me?: User;
    }
    interface PageData {
      tome: Tome;
      me?: User;
      title?: string;
      controls?: Snippet;
      crumbs?: { name: string; url: string }[];
      headTitleBaseIgnoreCrumb?: boolean;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
