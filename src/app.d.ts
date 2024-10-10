import type { Tome, User } from "@prisma/client";

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
      baseTitle?: string;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
