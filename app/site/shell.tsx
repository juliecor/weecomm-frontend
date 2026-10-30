import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"
import { COMPANY } from "@/lib/site/company"
import "./site.css"

/**
 * Wee Comm's look: an editorial serif for headlines, a clean sans for everything else,
 * near-black pages with the brand's gold. Shared by the front door (/) and the public pages.
 */
const serif = Fraunces({ subsets: ["latin"], variable: "--font-site-serif", display: "swap" })
const sans = Manrope({ subsets: ["latin"], variable: "--font-site-sans", display: "swap" })

const image = { url: "/weecomm/projects/baron-lvxe/2.jpg", width: 1800, height: 1013, alt: "Baron Lvxe by Wee Comm" }

export const siteMetadata: Metadata = {
  title: { absolute: `${COMPANY.name} · ${COMPANY.tagline}`, template: `%s · ${COMPANY.short}` },
  description: COMPANY.intro,
  manifest: null,
  icons: { icon: "/weecomm/mark.png", apple: "/weecomm/mark.png" },
  openGraph: { title: `${COMPANY.short} · ${COMPANY.tagline}`, description: COMPANY.intro, siteName: COMPANY.name, images: [image] },
  twitter: { card: "summary_large_image", title: `${COMPANY.short} · ${COMPANY.tagline}`, description: COMPANY.intro, images: [image.url] },
  // The public pages are indexable; dashboards, logins and offers opt out themselves.
  robots: { index: true, follow: true },
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#0b0b0f] font-[family-name:var(--font-site-sans)] text-[#f3f1ea] selection:bg-[#f8b800] selection:text-[#0b0b0f]`}>{children}</div>
}
