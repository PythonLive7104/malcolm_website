/**
 * Embedded Sanity Studio, served at /studio (all sub-routes via the catch-all).
 * The client edits Products, News, Careers etc. here with no separate hosting.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
