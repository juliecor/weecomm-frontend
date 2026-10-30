"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "framer-motion"
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, Handshake, Landmark, MapPin, Play, ScrollText, Users, Wallet } from "lucide-react"
import { Photo } from "@/components/photo"
import { PH_DOTS, PH_GRID } from "@/lib/ph-dots"
import type { PublicProjectCard } from "@/lib/public-projects-types"
import { AWARDS, COMPANY, FOOTPRINT, FOUNDER, GUIDE, LEADERS, MISSION, NEWS, PARTNERS, PRINCIPLE, SIGNATURE, VALUES, VISION } from "@/lib/site/company"
import { Eyebrow, Reveal, RiseWords, serif } from "../ui"

const H2 = `${serif} mt-4 text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl`

/** The Baron line in San Juan, oldest to newest, as a row you scroll through. */
export function Signature({ projects }: { projects: PublicProjectCard[] }) {
  const photo = (slug: string) => projects.find((p) => p.slug === slug)?.hero[0]
  return (
    <section id="signature" className="scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#0f0f14] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <Eyebrow>The signature line · San Juan</Eyebrow>
              <h2 className={H2}>
                Five Barons, <span className="italic text-[#f8b800]">one street at a time.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-white/60 lg:text-right lg:justify-self-end">From the pioneer First Baron Residences in 2010 to Baron Lvxe today, the Baron line is where Wee Comm set its standard: elegance, class and superior quality, in the heart of San Juan.</p>
          </div>
        </Reveal>
      </div>
      <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15">
        {SIGNATURE.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06} className="w-[82vw] shrink-0 snap-start sm:w-[420px]">
            <Link href={`/projects/${s.slug}`} data-cursor="View" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#15151c]">
                {photo(s.slug) && <Photo src={photo(s.slug) as string} alt={s.name} sizes="(min-width: 640px) 420px, 82vw" className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105" />}
                <span className={`${serif} absolute left-5 top-4 text-5xl font-medium text-white/90 [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]`}>{s.year}</span>
              </div>
              <p className={`${serif} mt-5 text-2xl font-medium tracking-tight`}>{s.name}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{s.line}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Vision, mission and the operating principle, in the company's own words. */
export function Story() {
  return (
    <section id="story" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
            <p className={`${serif} mt-6 text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl`}>
              <RiseWords text={VISION} accent={["leader"]} accentClass="italic text-[#f8b800]" />
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Vision</p>
            <p className={`${serif} mt-10 text-2xl font-medium leading-[1.2] tracking-tight text-white/85 sm:text-3xl`}>{MISSION}</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Mission</p>
            <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl">
              <Photo src="/weecomm/site/team-outdoor.jpg" alt="The Wee Comm team" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8b800]">Operating principle</p>
            {PRINCIPLE.map((t) => (
              <p key={t} className="mt-6 text-[17px] leading-relaxed text-white/75">
                {t}
              </p>
            ))}
            <p className="mt-8 text-[15px] leading-relaxed text-white/55">{COMPANY.since}</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                { v: "2008", l: "One employee at the start" },
                { v: "350+", l: "Employees today" },
                { v: "₱8–10B", l: "Reserved sales a year, on average" },
                { v: "9", l: "Philippine Property Awards in 2020, the most that year" },
              ].map((f) => (
                <div key={f.l} className="rounded-2xl border border-white/10 p-5">
                  <p className={`${serif} text-3xl font-medium tracking-tight text-[#f8b800]`}>{f.v}</p>
                  <p className="mt-1 text-sm text-white/60">{f.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <div className="mt-20 overflow-hidden border-y border-white/[0.06] py-5">
        <div className="wc-marquee flex w-max gap-10 whitespace-nowrap">
          {[...VALUES, ...VALUES, ...VALUES].map((v, i) => (
            <span key={i} className={`${serif} text-2xl font-medium text-white/80 sm:text-3xl`}>
              {v} <span className="mx-4 text-[#f8b800]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

const toGrid = (lat: number, lng: number) => ({ x: (lng - PH_GRID.lon0) / PH_GRID.step, y: (PH_GRID.lat1 - lat) / PH_GRID.step })
const DOTS = (() => {
  const out: { x: number; y: number }[] = []
  for (let i = 0; i < PH_DOTS.length; i += 2) out.push({ x: PH_DOTS[i], y: PH_DOTS[i + 1] })
  return out
})()

/** Which pins carry a label, and where it sits: the Metro Manila cluster gets one label, the rest their own. */
const LABELS: Record<string, { text: string; dx: number; dy: number; anchor?: "start" | "end" }> = {
  "Quezon City": { text: "Metro Manila · Rizal", dx: 2.6, dy: -0.6 },
  Iloilo: { text: "Iloilo", dx: -2.4, dy: 0.9, anchor: "end" },
  Bacolod: { text: "Bacolod", dx: 2.2, dy: 2.6 },
  "Cagayan de Oro": { text: "Cagayan de Oro", dx: 2.4, dy: 0.9 },
  Davao: { text: "Davao", dx: 2.4, dy: 0.9 },
  "Las Piñas": { text: "Las Piñas", dx: -2.4, dy: 1.6, anchor: "end" },
}

/** Where the communities are: the Philippines in dots, Wee Comm's cities marked, the next ones hollow. */
export function Footprint() {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, margin: "-120px" })
  const built = FOOTPRINT.filter((c) => !c.upcoming)
  const next = FOOTPRINT.filter((c) => c.upcoming)
  return (
    <section id="footprint" className="scroll-mt-20 border-t border-white/[0.06] bg-[#0f0f14] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <Eyebrow>Our footprint</Eyebrow>
          <h2 className={H2}>
            Metro Manila to Mindanao, <span className="italic text-[#f8b800]">and growing.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">Wee Comm began in San Juan and grew into Mandaluyong, Quezon City, Rizal, Iloilo, Cagayan de Oro and Davao. Las Piñas and Bacolod are next.</p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {built.map((c) => (
              <li key={c.city} className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 text-[15px]">
                <span className="inline-flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#f8b800]" /> {c.city}
                </span>
                <span className="text-white/45">
                  {c.projects} {c.projects === 1 ? "community" : "communities"}
                </span>
              </li>
            ))}
            {next.map((c) => (
              <li key={c.city} className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 text-[15px] text-white/60">
                <span className="inline-flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full border border-[#f8b800]" /> {c.city}
                </span>
                <span className="text-white/35">upcoming</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <div ref={ref} className={`relative mx-auto w-full max-w-[560px] ${on ? "wc-on" : ""}`}>
          <svg viewBox="17 30 70 100" className="h-auto w-full" role="img" aria-label="Map of the Philippines with Wee Comm's cities">
            {DOTS.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={0.36} fill="#ffffff" fillOpacity={0.13} className="wc-dot" style={{ animationDelay: `${d.y * 12}ms` }} />
            ))}
            {FOOTPRINT.map((c) => {
              const { x, y } = toGrid(c.lat, c.lng)
              const label = LABELS[c.city]
              return (
                <g key={c.city} className="wc-pin">
                  {!c.upcoming && <circle cx={x} cy={y} r={1.6} fill="#f8b800" fillOpacity={0.35} className="wc-ring" />}
                  <circle cx={x} cy={y} r={c.upcoming ? 1 : 1.15} fill={c.upcoming ? "#0f0f14" : "#f8b800"} stroke="#f8b800" strokeWidth={0.35} />
                  {label && (
                    <text x={x + label.dx} y={y + label.dy} fontSize={2.6} textAnchor={label.anchor ?? "start"} fill="#ffffff" fillOpacity={c.upcoming ? 0.55 : 0.92} fontWeight={600} style={{ fontFamily: "var(--font-site-sans)" }}>
                      {label.text}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}

/** The founder, then the leaders who run the areas, in the site's own words. */
export function Leaders() {
  return (
    <section id="leaders" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <Eyebrow>Our leaders</Eyebrow>
          <h2 className={H2}>
            Built by people who <span className="italic text-[#f8b800]">mentor as they build.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#15151c] sm:aspect-[3/4]">
              <Photo src={FOUNDER.photo} alt={FOUNDER.name} sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f]/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className={`${serif} text-3xl font-medium tracking-tight`}>{FOUNDER.name}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8b800]">{FOUNDER.role}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {FOUNDER.bio.map((t) => (
              <p key={t} className="mt-5 text-[16px] leading-relaxed text-white/72 first:mt-0">
                {t}
              </p>
            ))}
            <blockquote className={`${serif} mt-8 border-l-2 border-[#f8b800] pl-5 text-2xl font-medium leading-snug text-white/90`}>
              In 2020, Wee Comm won nine major awards in the Philippine Property Awards, the most by any developer that year.
            </blockquote>
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERS.map((l, i) => (
            <li key={l.name}>
              <Reveal delay={i * 0.06}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#15151c]">
                  <Photo src={l.photo} alt={l.name} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover object-top" />
                </div>
                <p className={`${serif} mt-4 text-2xl font-medium tracking-tight`}>{l.name}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f8b800]">{l.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{l.bio[0]}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** The awards, as the site lists them. */
export function Awards() {
  const logos = AWARDS.filter((a) => a.logo)
  return (
    <section id="awards" className="scroll-mt-20 border-t border-white/[0.06] bg-[#0f0f14] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Recognition</Eyebrow>
          <h2 className={H2}>
            Awarded, <span className="italic text-[#f8b800]">year after year.</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {logos.map((a) => (
              <div key={a.title} className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-white p-5">
                <Image src={a.logo as string} alt={a.title} width={400} height={300} className="max-h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {AWARDS.map((a) => (
              <li key={a.title} className="grid gap-2 py-5 sm:grid-cols-[110px_1fr] sm:gap-6">
                <span className={`${serif} text-2xl font-medium text-[#f8b800]`}>{a.year}</span>
                <span>
                  <span className="block text-[17px] font-semibold text-white/90">{a.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/55">{a.by}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

/** Brokers, agents and joint-venture partners: how to work with Wee Comm. */
export function Partners() {
  return (
    <section id="partners" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <Eyebrow>Partner with us</Eyebrow>
          <h2 className={H2}>
            Sell Beyond Ordinary™ homes <span className="italic text-[#f8b800]">with us.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {[
            {
              icon: Handshake,
              title: "Realty companies and brokers",
              text: "Apply for accreditation online. Once accepted, your firm gets its own dashboard: every community, sales offers for your buyers, and your agents' progress in one place.",
              cta: { href: "/accreditation", label: "Apply for accreditation" },
            },
            {
              icon: Users,
              title: "Salespersons and agents",
              text: "Sales agents join through their accredited broker or Wee Comm's own sales team, and get a simple way to send buyers a sales offer with the price, the payment schedule and their contact details.",
              cta: { href: "/#inquire", label: "Ask about joining" },
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0f0f14] p-7 sm:p-9">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8b800] text-[#0b0b0f]">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className={`${serif} mt-6 text-3xl font-medium tracking-tight`}>{c.title}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/65">{c.text}</p>
                <Link href={c.cta.href} className="group mt-auto inline-flex items-center gap-2 pt-8 text-[12px] font-bold uppercase tracking-[0.14em] text-[#f8b800]">
                  {c.cta.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-14 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Joint-venture companies</p>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
            {PARTNERS.map((p) => (
              <li key={p.name} className="text-[15px] text-white/75">
                <span className="font-semibold text-white/90">{p.name}</span>
                {"with" in p && p.with && <span className="text-white/45"> · with {p.with}</span>}
                {"where" in p && p.where && <span className="text-white/45"> · {p.where}</span>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/** The buyer's guide, in three glances, leading to the full page. */
export function GuideTeaser() {
  const cards = [
    { icon: ScrollText, title: "Reserving", lines: [`${GUIDE.reservation.requirements.length} reservation requirements`, "Counseling within 15 days of approval", "Documents within 30 days (60 for OFWs)"] },
    { icon: Wallet, title: "Paying", lines: GUIDE.terms.map((t) => `${t.name}: ${t.text.split(".")[0].replace("The full Total Contract Price", "the full price").replace("The net equity", "net equity")}`) },
    { icon: Landmark, title: "Financing", lines: [`${GUIDE.financing.banks.length} accredited banks`, "Pag-IBIG housing loan", "In-house loan up to 80% of the price, up to 10 years"] },
  ]
  return (
    <section id="guide" className="scroll-mt-20 border-t border-white/[0.06] bg-[#0f0f14] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Buyer&apos;s guide</Eyebrow>
              <h2 className={H2}>
                From reservation <span className="italic text-[#f8b800]">to turnover.</span>
              </h2>
            </div>
            <Link href="/buyers-guide" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-[#0b0b0f]">
              Read the full guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-white/10 p-7">
                <c.icon className="h-6 w-6 text-[#f8b800]" />
                <p className={`${serif} mt-5 text-2xl font-medium tracking-tight`}>{c.title}</p>
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
      </div>
    </section>
  )
}

/** The latest updates, as the site lists them, and the channel. */
export function News() {
  return (
    <section id="news" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Latest updates</Eyebrow>
              <h2 className={H2}>
                In the <span className="italic text-[#f8b800]">news.</span>
              </h2>
            </div>
            <a href={COMPANY.social.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:text-white">
              <Play className="h-4 w-4" /> Watch on YouTube <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {NEWS.map((n, i) => (
            <li key={n.title}>
              <Reveal delay={i * 0.06}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#15151c]">
                  <Photo src={n.photo} alt="" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8b800]">{n.date}</p>
                <p className="mt-2 text-[17px] font-semibold leading-snug text-white/90">{n.title}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export const Icons = { Building2, MapPin }
