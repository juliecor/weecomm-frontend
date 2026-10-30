import type { Metadata } from "next"
import { publicProjects } from "@/lib/public-projects"
import { COMPANY } from "@/lib/site/company"
import { Landing } from "./site/home/landing"
import { SiteShell, siteMetadata } from "./site/shell"

// Shared by link, so it carries its own preview.
export const metadata: Metadata = {
  ...siteMetadata,
  title: { absolute: `${COMPANY.name} · ${COMPANY.tagline}` },
}

type Props = { searchParams: Promise<{ project?: string }> }

/** The site's front door: Wee Comm's landing page. ?project=<slug> pre-fills the inquiry form (from a project page). */
export default async function HomePage({ searchParams }: Props) {
  const [projects, { project }] = await Promise.all([publicProjects(), searchParams])
  return (
    <SiteShell>
      <Landing projects={projects} preselect={project} />
    </SiteShell>
  )
}
