import type { Tome, User, Wiki } from "@prisma/client";
import type { Crumb } from "$lib/crumb";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      tome: Tome;
      onlyWiki?: Wiki;
      me?: User;
    }
    interface PageData {
      tome: Tome;
      me?: User;
      title?: string;
      crumbs?: Crumb[];
      headTitleBaseIgnoreCrumb?: boolean;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
