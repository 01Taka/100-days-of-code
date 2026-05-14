import * as z from "zod";

const ValidationsSchema = z.object({
  array: z
    .object({ min: z.number().optional(), max: z.number().optional() })
    .optional(),
  int: z.boolean().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  positive: z.boolean().optional(),
  negative: z.boolean().optional(),
});

const TypeOrReferenceSchema = z.union([
  z.object({
    type: z.enum([
      "INT",
      "FLOAT",
      "NUMBER",
      "STRING",
      "CHAR",
      "DATE",
      "DATETIME",
      "TIME",
      "BOOLEAN",
      "NULL",
      "UNDEFINED",
    ]),
    isArray: z.boolean().optional(),
    validations: ValidationsSchema.optional(),
  }),
  z.object({
    id: z.string(),
    kinds: z.enum(["ENUM", "PROPERTY"]),
  }),
]);

const PropertySchema = z.object({
  id: z.string().min(1, "IDは必須です"),
  name: z.string().min(1, "名前は必須です"),
  types: z.array(TypeOrReferenceSchema),
  description: z.string(),
  validations: ValidationsSchema.optional(),
  default: z.string().optional(),
  optional: z.boolean().optional(),
});

export const PropertiesFormSchema = z.object({
  properties: z.array(PropertySchema),
});

export type Property = z.infer<typeof PropertySchema>;
export type PropertiesFormValues = z.infer<typeof PropertiesFormSchema>;
