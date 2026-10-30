"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, BadgeCheck, Handshake, Landmark, Play, ScrollText, Users, Wallet } from "lucide-react"
import { Photo } from "@/components/photo"
import type { PublicProjectCard } from "@/lib/public-projects-types"
import { AWARDS, COMPANY, FOOTPRINT, FOUNDER, GUIDE, LEADERS, MISSION, NEWS, PARTNERS, PRINCIPLE, SIGNATURE, VALUES, VISION } from "@/lib/site/company"
import { Chapter, Hex, Reveal, Ticker, TriLine, serif } from "../ui"

/** The Baron line in San Juan, oldest to newest, down the page with each year set large. */
export function Signature({ projects }: { projects: PublicProjectCard[] }) {
  const photo = (slug: string) => projects.find((p) => p.slug === slug)?.hero[0]
  return (
    <Chapter id="signature" n="02" title="The Baron signature line" kicker="Five projects on San Juan's streets since 2010, where Wee Comm set its standard: elegance, class and superior quality." className="bg-[#0f0f14]">
      <ol>
        {SIGNATURE.map((s, i) => (
          <li key={s.slug} className="border-t border-white/10 last:border-b">
            <Reveal delay={i * 0.04}>
              <Link href={`/projects/${s.slug}`} className="group grid items-center gap-6 py-7 sm:grid-cols-[150px_120px_1fr] sm:gap-8">
                <span className={`${serif} text-5xl font-medium tracking-tight text-[#f8b800] sm:text-6xl`}>{s.year === "Pre-selling" ? "Now" : s.year}</span>
                <Hex className="aspect-[0.866] w-28 sm:w-full">{photo(s.slug) && <Photo src={photo(s.slug) as string} alt="" sizes="120px" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}</Hex>
                <span>
                  <span className={`${serif} flex items-center gap-3 text-2xl font-medium tracking-tight sm:text-3xl`}>
                    {s.name} <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:text-[#f8b800]" />
                  </span>
                  <span className="mt-2 block max-w-xl text-[15px] leading-relaxed text-white/60">{s.line}</span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </Chapter>
  )
}

/** Vision, mission and the operating principle, in the company's own words. */
export function Story() {
  return (
    <>
      <Chapter id="story" n="03" title="Our story" kicker={COMPANY.since}>
        <Reveal>
          <p className={`${serif} text-3xl font-medium leading-[1.12] tracking-tight sm:text-5xl`}>
            <span className="wc-outline">Vision.</span> {VISION}
          </p>
          <p className={`${serif} mt-8 text-2xl font-medium leading-[1.18] tracking-tight text-white/85 sm:text-3xl`}>
            <span className="wc-outline">Mission.</span> {MISSION}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8b800]">Operating principle</p>
            {PRINCIPLE.map((t) => (
              <p key={t} className="mt-5 text-[16px] leading-relaxed text-white/72">
                {t}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Photo src="/weecomm/site/team-outdoor.jpg" alt="The Wee Comm team" sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover" />
              <span aria-hidden className="wc-triline absolute inset-x-0 bottom-0 h-1" />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
              {[
                ["2008", "one employee at the start"],
                ["350+", "employees today"],
                ["₱8–10B", "reserved sales a year, on average"],
                ["9", "Philippine Property Awards in 2020"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dd className={`${serif} text-3xl font-medium tracking-tight text-[#f8b800]`}>{v}</dd>
                  <dt className="mt-1 text-sm text-white/55">{l}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Chapter>
      <div className="border-t border-white/[0.08] py-5">
        <Ticker items={[...VALUES]} slow className={`${serif} text-2xl font-medium text-white/80 sm:text-3xl`} />
      </div>
    </>
  )
}

/** Where the communities are: the company's own milestone map, and the cities in a list. */
export function Footprint() {
  const built = FOOTPRINT.filter((c) => !c.upcoming)
  const next = FOOTPRINT.filter((c) => c.upcoming)
  return (
    <Chapter id="footprint" n="04" title="Metro Manila to Mindanao, and growing" kicker="Wee Comm began in San Juan and grew into Mandaluyong, Quezon City, Rizal, Iloilo, Cagayan de Oro and Davao. Las Piñas and Bacolod are next." className="bg-[#0f0f14]">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
        <Reveal>
          <div className="relative overflow-hidden rounded-sm bg-[#0b0b0f]">
            <Image src="/weecomm/site/footprint-dark.jpg" alt="Wee Comm's projects across the Philippines" width={2200} height={1238} className="h-auto w-full" />
            <p className="absolute bottom-3 right-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Milestones map · Wee Comm</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="border-t border-white/10">
            {built.map((c) => (
              <li key={c.city} className="flex items-center justify-between gap-4 border-b border-white/10 py-3 text-[15px]">
                <span className="inline-flex items-center gap-3">
                  <span aria-hidden className="wc-hex inline-block h-2.5 w-[9px] bg-[#f8b800]" /> {c.city}
                </span>
                <span className={`${serif} text-xl text-white/80`}>{c.projects}</span>
              </li>
            ))}
            {next.map((c) => (
              <li key={c.city} className="flex items-center justify-between gap-4 border-b border-white/10 py-3 text-[15px] text-white/55">
                <span className="inline-flex items-center gap-3">
                  <span aria-hidden className="wc-hex inline-block h-2.5 w-[9px] border border-[#f8b800]" /> {c.city}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">upcoming</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Chapter>
  )
}

/** The founder, then the leaders who run the areas, in the site's own words, each in a hexagon. */
export function Leaders() {
  return (
    <Chapter id="leaders" n="05" title="Built by people who mentor as they build" kicker="The founder's mentorship program is how Wee Comm grew from one employee in 2008 to more than 350.">
      <div className="grid gap-10 md:grid-cols-[300px_1fr] md:gap-14">
        <Reveal>
          <Hex className="aspect-[0.866] w-full max-w-[300px]">
            <Photo src={FOUNDER.photo} alt={FOUNDER.name} sizes="300px" className="h-full w-full object-cover object-top" />
          </Hex>
          <p className={`${serif} mt-6 text-3xl font-medium tracking-tight`}>{FOUNDER.name}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8b800]">{FOUNDER.role}</p>
        </Reveal>
        <Reveal delay={0.1}>
          {FOUNDER.bio.map((t) => (
            <p key={t} className="mt-5 text-[16px] leading-relaxed text-white/72 first:mt-0">
              {t}
            </p>
          ))}
          <blockquote className={`${serif} mt-8 border-l-2 border-[#f8b800] pl-5 text-2xl font-medium leading-snug text-white/90`}>In 2020, Wee Comm won nine major awards in the Philippine Property Awards, the most by any developer that year.</blockquote>
        </Reveal>
      </div>
      <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {LEADERS.map((l, i) => (
          <li key={l.name}>
            <Reveal delay={i * 0.06}>
              <Hex className="aspect-[0.866] w-full">
                <Photo src={l.photo} alt={l.name} sizes="(min-width: 1024px) 20vw, 50vw" className="h-full w-full object-cover object-top" />
              </Hex>
              <p className={`${serif} mt-4 text-2xl font-medium tracking-tight`}>{l.name}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f8b800]">{l.role}</p>
              <p className="mt-3 hidden text-sm leading-relaxed text-white/60 sm:block">{l.bio[0]}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}

/** The awards, as the site lists them, with the logos. */
export function Awards() {
  const logos = AWARDS.filter((a) => a.logo)
  return (
    <Chapter id="awards" n="06" title="Awarded, year after year" className="bg-[#0f0f14]">
      <Reveal>
        <ol className="border-t border-white/10">
          {AWARDS.map((a) => (
            <li key={a.title} className="grid gap-1 border-b border-white/10 py-4 sm:grid-cols-[120px_1fr] sm:gap-6">
              <span className={`${serif} text-2xl text-[#f8b800]`}>{a.year}</span>
              <span>
                <span className="block text-[16px] font-semibold text-white/90">{a.title}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-white/50">{a.by}</span>
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {logos.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05}>
            <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-white p-4">
              <Image src={a.logo as string} alt={a.title} width={400} height={300} className="max-h-full w-auto object-contain" />
            </div>
          </Reveal>
        ))}
      </div>
    </Chapter>
  )
}

/** Brokers, agents and joint-venture partners: how to work with Wee Comm. */
export function Partners() {
  return (
    <Chapter id="partners" n="07" title="Sell Beyond Ordinary™ homes with us" kicker="Accredited realties and their agents sell every Wee Comm community with their own dashboard and sales offers.">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { icon: Handshake, title: "Realty companies and brokers", text: "Apply for accreditation online. Once accepted, your firm gets its own dashboard: every community, sales offers for your buyers, and your agents' progress in one place.", cta: { href: "/accreditation", label: "Apply for accreditation" } },
          { icon: Users, title: "Salespersons and agents", text: "Sales agents join through their accredited broker or Wee Comm's own sales team, and send buyers a sales offer with the price, the payment schedule and their contact details.", cta: { href: "/#inquire", label: "Ask about joining" } },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0f0f14] p-7 sm:p-8">
              <span aria-hidden className="wc-triline absolute inset-x-0 top-0 h-1" />
              <c.icon className="h-6 w-6 text-[#f8b800]" />
              <p className={`${serif} mt-5 text-2xl font-medium tracking-tight sm:text-3xl`}>{c.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">{c.text}</p>
              <Link href={c.cta.href} className="group mt-auto inline-flex items-center gap-2 pt-7 text-[12px] font-bold uppercase tracking-[0.14em] text-[#f8b800]">
                {c.cta.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Joint-venture companies</p>
        <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
          {PARTNERS.map((p) => (
            <li key={p.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 text-[15px]">
              <span className="font-semibold text-white/90">{p.name}</span>
              <span className="text-white/45">{"with" in p && p.with ? `with ${p.with}` : "where" in p && p.where ? p.where : ""}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Chapter>
  )
}

/** The buyer's guide, in three glances, leading to the full page. */
export function GuideTeaser() {
  const cards = [
    { icon: ScrollText, title: "Reserving", lines: [`${GUIDE.reservation.requirements.length} reservation requirements`, "Counseling within 15 days of approval", "Documents within 30 days (60 for OFWs)"] },
    { icon: Wallet, title: "Paying", lines: ["Spot cash: the full price 30 days after reservation", "Deferred: the full price over the equity period", "Standard: equity in equal parts, then the balance"] },
    { icon: Landmark, title: "Financing", lines: [`${GUIDE.financing.banks.length} accredited banks`, "Pag-IBIG housing loan", "In-house loan up to 80% of the price, up to 10 years"] },
  ]
  return (
    <Chapter id="guide" n="08" title="From reservation to turnover" kicker="How buying a Wee Comm home works, as the company sets it out." className="bg-[#0f0f14]" aside={
      <Link href="/buyers-guide" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-[#0b0b0f]">
        Read the full guide <ArrowRight className="h-4 w-4" />
      </Link>
    }>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07} className="h-full">
            <div className="h-full border-t border-white/15 pt-5">
              <c.icon className="h-5 w-5 text-[#f8b800]" />
              <p className={`${serif} mt-4 text-2xl font-medium tracking-tight`}>{c.title}</p>
              <ul className="mt-4 space-y-2.5 text-[15px] text-white/65">
                {c.lines.map((l) => (
                  <li key={l} className="flex gap-2.5">
                    <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-[#f8b800]/80" /> {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Chapter>
  )
}

/** The latest updates, as the site lists them, and the channel. */
export function News() {
  return (
    <Chapter id="news" n="09" title="In the news" aside={
      <a href={COMPANY.social.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:text-white">
        <Play className="h-4 w-4" /> Watch on YouTube <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    }>
      <ol className="border-t border-white/10">
        {NEWS.map((n, i) => (
          <li key={n.title} className="border-b border-white/10">
            <Reveal delay={i * 0.04}>
              <div className="grid items-center gap-5 py-5 sm:grid-cols-[96px_1fr]">
                <Hex className="aspect-[0.866] w-20 sm:w-full">
                  <Photo src={n.photo} alt="" sizes="96px" className="h-full w-full object-cover" />
                </Hex>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8b800]">{n.date}</p>
                  <p className={`${serif} mt-1 text-xl font-medium leading-snug tracking-tight text-white/90 sm:text-2xl`}>{n.title}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      <TriLine className="mt-10 opacity-60" />
    </Chapter>
  )
}
