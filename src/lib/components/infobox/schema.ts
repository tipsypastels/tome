import { z } from "zod";

export const InfoboxSchemaField = z.object({
  key: z.string(),
  name: z.string(),
  required: z.boolean().optional(),
});

export const InfoboxSchemaSection = z.object({
  name: z.string().optional(),
  fields: z.array(InfoboxSchemaField),
  hiddenByDefault: z.boolean().optional(),
});

export const InfoboxSchema = z.object({
  sections: z.array(InfoboxSchemaSection),
});

export type InfoboxSchemaField = z.infer<typeof InfoboxSchemaField>;
export type InfoboxSchemaSection = z.infer<typeof InfoboxSchemaSection>;
export type InfoboxSchema = z.infer<typeof InfoboxSchema>;
