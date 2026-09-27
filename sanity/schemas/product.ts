import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product name",
      type: "string",
      validation: (R) => R.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "Shown on product cards (1–2 lines).",
      type: "string",
      validation: (R) => R.max(140),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Leave blank if you prefer 'Contact for price'.",
    }),
    defineField({
      name: "priceDisplayMode",
      title: "Price display",
      type: "string",
      options: {
        list: [
          { title: "Show exact price", value: "EXACT_PRICE" },
          { title: "Contact for price", value: "CONTACT_FOR_PRICE" },
          { title: "Hide price", value: "HIDDEN" },
        ],
        layout: "radio",
      },
      initialValue: "CONTACT_FOR_PRICE",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "images",
      title: "Product images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "video",
      title: "Product video (optional)",
      type: "object",
      fields: [
        { name: "url", title: "Video URL (MP4/HLS)", type: "url" },
        {
          name: "poster",
          title: "Poster image",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "available",
      title: "Available for purchase",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      description: "Lower numbers appear first.",
      type: "number",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string" },
        { name: "metaDescription", title: "Meta description", type: "text" },
        {
          name: "socialImage",
          title: "Social share image",
          type: "image",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      subtitle: "category.name",
    },
  },
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});