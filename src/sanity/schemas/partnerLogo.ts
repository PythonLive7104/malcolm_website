import { defineField, defineType } from "sanity";

export const partnerLogo = defineType({
  name: "partnerLogo",
  title: "Partner / Client",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Refinery", "Shipping", "Storage", "International", "Logistics"] },
    }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "url", title: "Website", type: "url" }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "logo" } },
});
