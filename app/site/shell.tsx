import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"
import { COMPANY } from "@/lib/site/company"
import "./site.css"
import { SmoothScroll } from "./smooth-scroll"

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
  return (
    <div className={`${serif.variable} ${sans.variable} relative isolate min-h-screen bg-[#0c1020] font-[family-name:var(--font-site-sans)] text-[#f3f1ea] selection:bg-[#f8b800] selection:text-[#0b0b0f]`}>
      {/* The backdrop: midnight navy with the logo's three colours as soft, slowly drifting glows, and a faint hexagon grid. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="wc-drift absolute -inset-[20%] bg-[radial-gradient(45%_40%_at_82%_12%,rgba(64,128,240,0.42),transparent_62%),radial-gradient(40%_36%_at_8%_88%,rgba(232,64,48,0.3),transparent_62%),radial-gradient(34%_30%_at_55%_58%,rgba(248,184,0,0.14),transparent_60%)]" />
        <div className="wc-hexgrid absolute inset-0 opacity-[0.06]" />
        <div className="wc-grain absolute inset-0 opacity-[0.07] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,16,32,0)_0%,rgba(8,11,24,0.3)_100%)]" />
      </div>
      <SmoothScroll />
      {children}
    </div>
  )
}
