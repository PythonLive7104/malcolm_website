import type { SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { service } from "./service";
import { newsArticle } from "./newsArticle";
import { jobListing } from "./jobListing";
import { teamMember } from "./teamMember";
import { partnerLogo } from "./partnerLogo";
import { certification } from "./certification";
import { companyStat } from "./companyStat";

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  service,
  newsArticle,
  jobListing,
  teamMember,
  partnerLogo,
  certification,
  companyStat,
];
