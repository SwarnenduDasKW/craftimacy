import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero title", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "text", rows: 2 }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroVideo",
      title: "Hero video (optional)",
      type: "object",
      fields: [
        { name: "url", title: "Video URL", type: "url" },
        { name: "poster", title: "Poster image", type: "image" },
      ],
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      description: "If empty, products marked 'Featured' will be used.",
    }),
    defineField({ name: "aboutHeading", title: "About heading", type: "string" }),
    defineField({ name: "aboutText", title: "About text", type: "text", rows: 5 }),
    defineField({ name: "aboutImage", title: "About image", type: "image" }),
    defineField({
      name: "reviewSectionTitle",
      title: "Review section title",
      type: "string",
      initialValue: "Loved by Our Customers",
    }),
    defineField({
      name: "socialSectionTitle",
      title: "Social section title",
      type: "string",
      initialValue: "Follow Craftimacy",
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});