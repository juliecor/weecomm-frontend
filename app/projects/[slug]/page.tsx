import type { Metadata } from "next"
import Link from "next/link"
import { AccountLink } from "@/components/account-link"
import { notFound } from "next/navigation"
import { ArrowUpRight, MapPin, Send } from "lucide-react"
import { publicProject, publicProjects } from "@/lib/public-projects"
import { COMPANY } from "@/lib/site/company"
import { Eyebrow, Reveal } from "../../site/ui"
import { serif } from "../../site/tokens"
import { SiteHeader } from "../../site/header"
import { Amenities } from "./amenities"
import { ProjectHero } from "./hero"
import { SectionHead } from "./section-head"
import { SitePlan } from "./site-plan"
import { SiteMapViewer } from "@/components/site-map/site-map"
import { UnitTypes } from "./unit-types"
import { Updates } from "./updates"
import { Photo } from "@/components/photo"
import { StaticMap } from "@/components/static-map"

type Props = { params: Promise<{ slug: string }> }

const REGION_LINE: Record<string, string> = {
  "Metro Manila": "In Metro Manila, where Wee Comm began in San Juan and now builds in Mandaluyong and Quezon City.",
  Luzon: "In Rizal, Wee Comm's entrance into the affordable residential condominium market east of Metro Manila.",
  Visayas: "In Iloilo, Wee Comm's first venture into the Visayas.",
  Mindanao: "In Cagayan de Oro and Davao, Wee Comm's communities in Mindanao.",
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await publicProject(slug)
  if (!p) return {}
  const description = `${p.name} by ${COMPANY.name} in ${p.location ?? "the Philippines"}: ${p.unit_types.map((u) => u.name).join(", ")}, ${p.amenities.length} amenities${p.updates.length ? `, construction updates since ${p.updates[0].label}` : ""}.`
  const image = p.hero[0] ?? p.cover_url ?? undefined
  return {
    title: p.name,
    description,
    openGraph: { title: `${p.name} · ${COMPANY.name}`, description, images: image ? [{ url: image }] : [] },
    twitter: { card: "summary_large_image", title: `${p.name} · ${COMPANY.short}`, description, images: image ? [image] : [] },
  }
}

/** /projects/<slug> — one Wee Comm community, from the realty's own dashboard. */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [p, all] = await Promise.all([publicProject(slug), publicProjects()])
  if (!p) notFound()
  const idx = all.findIndex((x) => x.slug === slug)
  const prev = all.length > 1 ? all[(idx - 1 + all.length) % all.length] : null
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null
  const hero = p.hero.length ? p.hero : p.cover_url ? [p.cover_url] : []
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const hasPin = p.lat !== null && p.lng !== null
  const spot = hasPin ? `${p.lat},${p.lng}` : [p.name, p.location, "Philippines"].filter(Boolean).join(", ")
  const mapOpen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot)}`
  const mapImg = key ? `https://maps.googleapis.com/maps/api/staticmap?size=640x400&scale=2&zoom=${hasPin ? 15 : 13}&maptype=roadmap&markers=color:0xb4241c%7C${encodeURIComponent(spot)}&key=${key}` : null

  const sections = [
    ...(p.site_plans.length ? [{ href: "#site-plan", label: "Site plan" }] : []),
    ...(p.amenities.length ? [{ href: "#amenities", label: "Amenities" }] : []),
    { href: "#location", label: "Location" },
    ...(p.updates.length ? [{ href: "#updates", label: "Updates" }] : []),
  ]
  const lotsDrawn = !!p.site_map && p.site_map.lots.length > 0
  const lotsAvailable = p.site_map?.lots.filter((l) => l.status === "available").length ?? 0
  const facts = [
    ...(lotsDrawn ? [{ v: lotsAvailable.toLocaleString("en-PH"), l: "Lots available" }] : []),
    ...(p.unit_types.length ? [{ v: String(p.unit_types.length), l: p.unit_types.length === 1 ? "Unit type" : "Unit types" }] : []),
    ...(p.amenities.length ? [{ v: String(p.amenities.length), l: "Amenities & facilities" }] : []),
    ...(p.updates.length ? [{ v: String(p.updates.length), l: "Months of updates" }, { v: String(p.total_photos), l: "Progress photos" }] : []),
    ...(p.stage ? [{ v: p.stage, l: "Status" }] : []),
    ...(p.location ? [{ v: p.location, l: "Location" }] : []),
    ...(p.region ? [{ v: p.region, l: "Region" }] : []),
  ]

  const sitePlan = p.site_plans.length > 0 && (
        <section id="site-plan" className="scroll-mt-20 bg-white/[0.03] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1400px]">
            <SectionHead
              eyebrow="Site development plan"
              lede={p.site_map ? `Every lot, coloured by whether it is still available: ${lotsAvailable.toLocaleString("en-PH")} of ${p.site_map.lots.length.toLocaleString("en-PH")} are. Tap or click one to see its photos, block, lot and size.` : "Blocks, lots, roads, parks and open spaces as drawn by Johndorf's planners. Tap to view full screen."}
            >
              The lay of the land.
            </SectionHead>
            {p.site_map ? (
              <>
                <div className="mt-12 bg-white/[0.06] p-4 sm:p-6">
                  <SiteMapViewer map={p.site_map} alt={`${p.name} site development plan`} maxHeight="80vh" details modelPhotos={Object.fromEntries(p.unit_types.map((u) => [u.name, u.images]))} />
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#f3f1ea]/10 pt-5">
                    <p className="text-[15px] text-[#d2d1d8]">
                      <b className="text-[#f3f1ea]">{lotsAvailable.toLocaleString("en-PH")} of {p.site_map.lots.length.toLocaleString("en-PH")} lots</b> still available. Prices and reservations are through Wee Comm&apos;s team.
                    </p>
                    <Link href={`/?project=${p.slug}#inquire`} className="inline-flex items-center gap-2 rounded-full bg-[#f8b800] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0b0b0f] hover:bg-[#ffd04a]">
                      Inquire about this community <Send className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                {p.site_plans.filter((s) => s !== p.site_map?.image).length > 0 && <SitePlan plans={p.site_plans.filter((s) => s !== p.site_map?.image)} name={p.name} />}
              </>
            ) : (
              <SitePlan plans={p.site_plans} name={p.name} />
            )}
          </div>
        </section>
  )

  return (
    <div className="bg-white/[0.03] text-[#f3f1ea]">
      <SiteHeader light />
      <ProjectHero name={p.name} place={p.location ?? ""} status={p.stage ?? undefined} photos={hero} lots={lotsDrawn ? { available: lotsAvailable, total: p.site_map!.lots.length } : undefined} more={p.unit_types.length ? { href: "#homes", label: "See the homes" } : { href: "#location", label: "Where it is" }} />

      <section className="border-b border-[#f3f1ea]/10 bg-white/[0.06]">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-2 divide-[#f3f1ea]/10 px-5 sm:grid-cols-3 sm:divide-x sm:px-8 lg:grid-cols-6">
          {facts.map((f) => (
            <div key={f.l} className="py-7 sm:px-6 sm:first:pl-0">
              <dd className={`${serif} text-3xl font-semibold tracking-tight sm:text-4xl ${f.l === "Lots available" ? "text-[#f8b800]" : ""}`}>{f.v}</dd>
              <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f8e99]">{f.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      {lotsDrawn && sitePlan}

      {p.unit_types.length > 0 && (
        <section id="homes" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1400px]">
            <SectionHead eyebrow="The homes" lede="Wee Comm's spec sheet for each model: usable floor area, bedrooms, toilet and bath, floors and parking. Tap a render to see it full screen.">
              {p.unit_types.length === 1 ? "One model, " : `${p.unit_types.length} models, `}
              <span className="italic text-[#f8b800]">Beyond Ordinary™.</span>
            </SectionHead>
            <UnitTypes units={p.unit_types} sections={sections} />
          </div>
        </section>
      )}

      {p.description && (
        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-[1400px] border-t border-[#f3f1ea]/10 pt-10 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-12">
            <Eyebrow>About {p.name}</Eyebrow>
            <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-[#d2d1d8] lg:mt-0">{p.description}</p>
          </div>
        </section>
      )}

      {!lotsDrawn && sitePlan}

      {p.amenities.length > 0 && (
        <section id="amenities" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1400px]">
            <SectionHead eyebrow="Amenities & facilities" lede={`${p.amenities.length} amenities and facilities, as listed by Wee Comm for ${p.name}.`}>
              Everything a community needs.
            </SectionHead>
            <Amenities items={p.amenities} project={p.name} />
          </div>
        </section>
      )}

      <section id="location" className="scroll-mt-20 bg-transparent px-5 py-24 text-white sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Reveal>
            <Eyebrow light>Location</Eyebrow>
            <h2 className={`${serif} mt-4 text-4xl font-semibold tracking-tight sm:text-6xl`}>{p.location ?? p.name}.</h2>
            <p className="mt-5 max-w-md text-white/70">{(p.region && REGION_LINE[p.region]) ?? "Part of Wee Comm's communities across the Philippines."}</p>
            <a href={mapOpen} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-sm border border-white/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10">
              <MapPin className="h-4 w-4" /> Open in Google Maps <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            {mapImg ? (
              <a href={mapOpen} target="_blank" rel="noreferrer" className="block overflow-hidden border border-white/15">
                <StaticMap src={mapImg} alt={`Map of ${p.name}`} className="aspect-[16/10] w-full object-cover" />
              </a>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center border border-white/10 text-sm text-white/50">Map unavailable</div>
            )}
          </Reveal>
        </div>
      </section>

      {p.updates.length > 0 && (
        <section id="updates" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1400px]">
            <SectionHead eyebrow="Construction updates" lede={`${p.total_photos} photos from Wee Comm's site team, ${p.updates[0].label} to ${p.updates[p.updates.length - 1].label}. Newest month first.`}>
              Watch it rise, <span className="italic text-[#f8b800]">month by month.</span>
            </SectionHead>
            <Updates months={p.updates} />
          </div>
        </section>
      )}

      <section className="border-t border-[#f3f1ea]/10 bg-white/[0.06] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <Eyebrow>Interested?</Eyebrow>
                <h2 className={`${serif} mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl`}>Ask about {p.name}.</h2>
                <p className="mt-5 max-w-lg text-[#b3b2bc]">{lotsDrawn ? `${lotsAvailable.toLocaleString("en-PH")} lots are still available. ` : ""}Ask Wee Comm&apos;s team about prices, unit plans and reservations, or sign in if you&apos;re an agent to prepare a sales offer for your buyer.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/?project=${p.slug}#inquire`} className="inline-flex items-center gap-2 rounded-full bg-[#f8b800] px-7 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-[#0b0b0f] hover:bg-[#ffd04a]">
                    Inquire about {p.name} <Send className="h-4 w-4" />
                  </Link>
                  <AccountLink signIn="Agent sign in" dashboard="Open your dashboard" icon={false} className="inline-flex items-center gap-2 rounded-sm border border-[#f3f1ea]/20 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#f3f1ea] hover:border-[#f8b800] hover:text-[#f8b800]" />
                </div>
              </div>
              {prev && next && (
                <div className="grid grid-cols-2 gap-6">
                  {[prev, next].map((q, n) => (
                    <Link key={q.slug} href={`/projects/${q.slug}`} className="group relative overflow-hidden bg-transparent text-white">
                      <Photo src={q.hero[0]} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/5] w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">{n === 0 ? "Previous" : "Next"}</p>
                        <p className={`${serif} mt-1 text-2xl font-semibold leading-tight`}>{q.name}</p>
                        <p className="mt-1 text-xs text-white/70">{q.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
          <p className="mt-16 text-[11px] text-[#8f8e99]">Details, renders and photos published by Wee Community Developers, Inc. Specifications and availability may change.</p>
        </div>
      </section>
    </div>
  )
}
