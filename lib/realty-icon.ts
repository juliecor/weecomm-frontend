import type { Metadata } from "next"
import { SITE_REALTY } from "./public-projects-types"

/**
 * The browser-tab icon for a realty's pages and offers: Wee Comm's mark, for Wee Comm and for the realties
 * accredited under it (their sign-in, dashboard and invitations are Wee Comm's family), or another realty's
 * initials (app/[realty]/icon.png).
 */
export function realtyIcons(slug: string, kind?: "developer" | "broker"): Metadata["icons"] {
  const icon = slug === SITE_REALTY || kind === "broker" ? "/weecomm/mark.png" : `/${encodeURIComponent(slug)}/icon.png`
  return { icon, apple: icon }
}
