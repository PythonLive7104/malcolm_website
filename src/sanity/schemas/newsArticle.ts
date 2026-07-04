import { defineField, defineType } from "sanity";

export const newsArticle = defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Oil Market", "Energy News", "Shipping", "Company", "Industry Insights"],
      },
    }),
    defineField({ name: "date", title: "Publish date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      title: "Body",
      description: "One block per paragraph.",
      type: "array",
      of: [
        {
          type: "object",
          name: "paragraph",
          fields: [{ name: "text", title: "Text", type: "text", rows: 4 }],
          preview: { select: { title: "text" } },
        },
      ],
    }),
  ],
  orderings: [{ title: "Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category" } },
});
