import { defineField, defineType } from "sanity";

export const companyStat = defineType({
  name: "companyStat",
  title: "Company Stat",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Value", type: "number", validation: (r) => r.required() }),
    defineField({ name: "prefix", title: "Prefix", type: "string" }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});
