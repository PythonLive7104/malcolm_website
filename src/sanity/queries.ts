import { groq } from "next-sanity";

/**
 * Image projection → resolves a Sanity image to the same shape as our local
 * SiteImage ({ src, alt, width, height }) so pages consume one type regardless
 * of source. `$fallbackAlt` fills alt text when the editor left it blank.
 */
const IMAGE = groq`
  "image": image{
    "src": asset->url,
    "alt": coalesce(alt, ^.name, ^.title, ""),
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }`;

/* Products -----------------------------------------------------------------*/
export const productsQuery = groq`
  *[_type == "product"] | order(order asc, name asc){
    "slug": slug.current, name, category, tagline, summary,
    applications, specs, ${IMAGE}
  }`;

export const productSlugsQuery = groq`*[_type == "product" && defined(slug.current)].slug.current`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    "slug": slug.current, name, category, tagline, summary,
    applications, specs, ${IMAGE}
  }`;

/* Services -----------------------------------------------------------------*/
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc){
    "slug": slug.current, title, icon, intro, features, ${IMAGE}
  }`;

/* News ---------------------------------------------------------------------*/
export const articlesQuery = groq`
  *[_type == "newsArticle"] | order(date desc){
    "slug": slug.current, title, category, date, author, excerpt,
    "body": body[].text, ${IMAGE}
  }`;

export const articleSlugsQuery = groq`*[_type == "newsArticle" && defined(slug.current)].slug.current`;

export const articleBySlugQuery = groq`
  *[_type == "newsArticle" && slug.current == $slug][0]{
    "slug": slug.current, title, category, date, author, excerpt,
    "body": body[].text, ${IMAGE}
  }`;

/* Careers ------------------------------------------------------------------*/
export const jobsQuery = groq`
  *[_type == "jobListing" && active == true] | order(postedAt desc){
    "slug": slug.current, title, location, type, department, postedAt,
    summary, responsibilities, requirements
  }`;

export const jobSlugsQuery = groq`*[_type == "jobListing" && defined(slug.current)].slug.current`;

export const jobBySlugQuery = groq`
  *[_type == "jobListing" && slug.current == $slug][0]{
    "slug": slug.current, title, location, type, department, postedAt,
    summary, responsibilities, requirements
  }`;

/* Homepage / About client-editable bits ------------------------------------*/
export const statsQuery = groq`*[_type == "companyStat"] | order(order asc){ label, value, prefix, suffix }`;
export const teamQuery = groq`*[_type == "teamMember"] | order(order asc){ name, role, bio }`;
export const certificationsQuery = groq`*[_type == "certification"] | order(order asc){ code, label }`;
export const partnersQuery = groq`*[_type == "partnerLogo"] | order(name asc){ name, category }`;
