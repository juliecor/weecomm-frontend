import "server-only"
import { ApiError, api } from "./api"

/**
 * The site's public project pages, read from Laravel. The site belongs to one
 * realty (SITE_REALTY), so it is fixed here; other realties don't have public
 * pages on this domain.
 */
import { SITE_REALTY } from "./public-projects-types"
export { SITE_REALTY }

export type { PublicProject, PublicProjectCard, PublicSpecs, PublicUnitType, PublicUpdate } from "./public-projects-types"
export { SPEC_LABELS } from "./public-projects-types"
import type { PublicProject, PublicProjectCard } from "./public-projects-types"

/** Published projects, or none when Laravel is unreachable (the site still renders). */
export async function publicProjects(): Promise<PublicProjectCard[]> {
  return api<PublicProjectCard[]>(`/realties/${SITE_REALTY}/projects`).catch(() => [])
}

/** One published project, or null when there isn't one at that address. */
export async function publicProject(slug: string): Promise<PublicProject | null> {
  try {
    return await api<PublicProject>(`/realties/${SITE_REALTY}/projects/${encodeURIComponent(slug)}`)
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null
    throw e
  }
}
