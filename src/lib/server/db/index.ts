import type { InfoboxSchema } from "$lib/components/infobox/schema";
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
    infobox: {
      schema: {
        needs: { schema: true },
        compute: ({ schema }) => schema as InfoboxSchema,
      },
    },
  },
});
