import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient().$extends({
  model: {
    tome: {
      find() {
        return db.tome.findUnique({ where: { id: "UNIT" } });
      },
    },
  },
  result: {
    wiki: {
      url: {
        needs: { slug: true },
        compute: ({ slug }) => `/-/${slug}`,
      },
    },
  },
});
