import { SiteShell, siteMetadata } from "../site/shell"

export const metadata = siteMetadata

/** /projects and /projects/<slug> in the site's look. */
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
