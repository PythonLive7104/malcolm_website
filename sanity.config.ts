"use client";

/**
 * Sanity Studio configuration — mounted inside the Next app at /studio.
 * (It can also be deployed separately with `npx sanity deploy`.)
 * projectId/dataset come from env; in demo mode (no project id) the Studio route
 * renders but will prompt for a real project.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "pro-petroleum",
  title: "Pro Petroleum — Content",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
