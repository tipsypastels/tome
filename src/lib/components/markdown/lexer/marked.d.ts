declare module "marked" {
  namespace Tokens {
    interface Heading {
      slug: string;
      first: boolean;
    }
  }
}

export {};
