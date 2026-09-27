import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "craftimacy",
  title: "Craftimacy Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(S.document().schemaType("homepage").documentId("homepage")),
            S.divider(),
            S.documentTypeListItem("product").title("Products"),
            S.documentTypeListItem("category").title("Categories"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});