import { defineField, defineType } from "sanity";

export const jobListing = defineType({
  name: "jobListing",
  title: "Job Listing",
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
    defineField({ name: "department", title: "Department", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "type",
      title: "Employment type",
      type: "string",
      options: { list: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"] },
      initialValue: "Full-time",
    }),
    defineField({ name: "postedAt", title: "Posted date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "active", title: "Active (visible)", type: "boolean", initialValue: true }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "responsibilities", title: "Responsibilities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "requirements", title: "Requirements", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { select: { title: "title", subtitle: "location" } },
});
