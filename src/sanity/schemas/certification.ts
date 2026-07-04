import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "code", title: "Code", type: "string", description: "e.g. ISO 9001", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", description: "e.g. Quality Management" }),
    defineField({ name: "badge", title: "Badge image", type: "image" }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "code", subtitle: "label", media: "badge" } },
});
