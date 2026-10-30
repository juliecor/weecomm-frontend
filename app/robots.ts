import type { MetadataRoute } from "next"

/** Search engines may index the public pages; everything operational stays out. */
export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://weecomm.ph"
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/platform", "/offer/", "/accreditation/", "/*/login", "/*/password", "/*/pending", "/*/dashboard", "/*/join/"] }],
    sitemap: `${site}/sitemap.xml`,
  }
}
