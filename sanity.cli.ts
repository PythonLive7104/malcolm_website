import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

/**
 * Sanity CLI config — used by `npx sanity ...` commands (dataset import,
 * deploy, etc.). Reads the same env vars as the app.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
});
