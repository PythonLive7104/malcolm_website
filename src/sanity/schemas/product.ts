import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "specs",
      title: "Specification sheet",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Property", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "category" } },
});
