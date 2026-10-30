import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { publicProjects } from "@/lib/public-projects"
import { Eyebrow, Reveal } from "../site/ui"
import { serif } from "../site/tokens"
import { SiteHeader } from "../site/header"
import { Photo } from "@/components/photo"

export const metadata: Metadata = {
  title: "Projects",
  description: "Wee Community Developers, Inc.'s communities across Metro Manila, Rizal, Iloilo, Cagayan de Oro and Davao: every project with its homes, site plan, amenities and updates.",
}

const REGION_ORDER = ["Metro Manila", "Luzon", "Visayas", "Mindanao"]

/** /projects — every published Wee Comm community, by region, straight from the dashboard. */
export default async function ProjectsIndexPage() {
  const all = await publicProjects()
  const regions = [...new Set(all.map((p) => p.region ?? "Other"))].sort((a, b) => {
    const ia = REGION_ORDER.indexOf(a), ib = REGION_ORDER.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  const preselling = all.filter((p) => p.stage === "Pre-selling").length

  return (
    <div className="bg-[#0f0f14] text-[#f3f1ea]">
      <SiteHeader />

      <section className="border-b border-[#f3f1ea]/10 px-5 pb-10 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className={`${serif} mt-4 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl`}>
              Communities across <span className="italic text-[#f8b800]">the Philippines.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-3 gap-px border border-[#f3f1ea]/10 bg-[#f3f1ea]/10">
              {[
                [String(all.length), "Projects"],
                [String(regions.length), regions.length === 1 ? "Region" : "Regions"],
                [String(preselling), "Pre-selling"],
              ].map(([v, l]) => (
                <div key={l} className="bg-[#15151c] p-5">
                  <dd className={`${serif} text-3xl font-semibold tracking-tight sm:text-4xl`}>{v}</dd>
                  <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f8e99]">{l}</dt>
                </div>
              ))}
            </dl>
            <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.14em]">
              {regions.map((r) => (
                <a key={r} href={`#${r.toLowerCase().replace(/\s+/g, "-")}`} className="text-[#d2d1d8] hover:text-[#f8b800]">
                  {r} <span className="text-[#8f8e99]">{all.filter((p) => (p.region ?? "Other") === r).length}</span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {all.length === 0 && (
        <section className="px-5 py-24 text-center text-[#b3b2bc] sm:px-8">Project pages are being prepared.</section>
      )}

      {regions.map((region, r) => {
        const items = all.filter((p) => (p.region ?? "Other") === region)
        return (
          <section key={region} id={region.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-20 px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-[1400px]">
              <Reveal>
                <div className="flex items-end justify-between border-b-2 border-[#f3f1ea] pb-3">
                  <h2 className={`${serif} text-3xl font-semibold tracking-tight sm:text-4xl`}>{region}</h2>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f8e99]">{items.length} project{items.length === 1 ? "" : "s"}</p>
                </div>
              </Reveal>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {items.map((p, n) => {
                  const feature = n === 0
                  return (
                    <li key={p.slug} className={feature ? "sm:col-span-2" : ""}>
                      <Reveal delay={(n % 2) * 0.07}>
                        <Link href={`/projects/${p.slug}`} className={`group relative block overflow-hidden bg-[#0b0b0f] text-white ${feature ? "aspect-[4/3] sm:aspect-[21/9]" : "aspect-[4/3] sm:aspect-[16/10]"}`}>
                          {p.hero[0] && (
                            <Photo
                              src={p.hero[0]}
                              alt=""
                              sizes={feature ? "(min-width: 1400px) 1400px, 100vw" : "(min-width: 1400px) 700px, (min-width: 640px) 50vw, 100vw"}
                              // The first big card is on screen at once; the rest load as you scroll.
                              loading={r === 0 && feature ? "eager" : "lazy"}
                              className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
                            />
                          )}
                          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f]/90 via-[#0b0b0f]/20 to-transparent" />
                          {p.stage && <span className="absolute left-0 top-0 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0b0b0f]">{p.stage}</span>}
                          <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center bg-white/10 text-white backdrop-blur transition group-hover:bg-[#f8b800]">
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </span>
                          <div className={`absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-8 ${feature ? "lg:flex-row lg:items-end lg:justify-between" : ""}`}>
                            <div>
                              <h3 className={`${serif} font-semibold leading-[1.02] tracking-tight ${feature ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}>{p.name}</h3>
                              {p.location && <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/80 sm:text-base"><MapPin className="h-4 w-4 text-[#fbd14d]" /> {p.location}</p>}
                            </div>
                            {(p.unit_types.length > 0 || p.amenities_count > 0 || p.total_photos > 0) && (
                              <dl className="flex gap-6 text-white">
                                {(
                                  [
                                    [p.unit_types.length, p.unit_types.length === 1 ? "Model" : "Models"],
                                    [p.amenities_count, "Amenities"],
                                    [p.total_photos, "Photos"],
                                  ] as [number, string][]
                                )
                                  .filter(([v]) => v > 0)
                                  .map(([v, l]) => (
                                    <div key={l}>
                                      <dd className={`${serif} text-2xl font-semibold sm:text-3xl`}>{v}</dd>
                                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">{l}</dt>
                                    </div>
                                  ))}
                              </dl>
                            )}
                          </div>
                        </Link>
                      </Reveal>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        )
      })}
    </div>
  )
}
