import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      initialValue: "Craftimacy",
    }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      description: "Digits only, with country code. Example: 919876543210",
      type: "string",
    }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "googleMapsUrl", title: "Google Maps URL", type: "url" }),
    defineField({ name: "googleReviewsUrl", title: "Google Reviews URL", type: "url" }),
    defineField({
      name: "googleRating",
      title: "Google rating",
      description: "Only set if verified.",
      type: "number",
    }),
    defineField({
      name: "googleReviewCount",
      title: "Google review count",
      description: "Only set if verified.",
      type: "number",
    }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "openingHours", title: "Opening hours", type: "string" }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO title", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "Default SEO description", type: "text" }),
    defineField({ name: "defaultSocialImage", title: "Default social image", type: "image" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});