"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import { Photo } from "@/components/photo"
import type { PublicProjectCard } from "@/lib/public-projects-types"
import { COMPANY } from "@/lib/site/company"
import { Eyebrow, serif } from "../ui"

/** How many facades the reel shows before the card that leads to all of them. */
const SHOWN = 8

/** One facade of the strip. */
function Card({ p, n }: { p: PublicProjectCard; n: number }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group relative block w-[78vw] shrink-0 snap-start sm:w-[52vw] lg:w-[min(32vw,40vh)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-white/[0.05]">
        <Photo src={p.hero[0]} alt={p.name} sizes="(min-width: 1024px) 32vw, 78vw" className="h-full w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.05]" />
        <span aria-hidden className="wc-triline absolute inset-x-0 top-0 h-[3px]" />
        <span className={`${serif} wc-outline absolute -bottom-4 left-4 text-[5.5rem] font-medium leading-none opacity-70`}>{String(n + 1).padStart(2, "0")}</span>
        <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${p.stage === "Pre-selling" ? "bg-[#f8b800] text-[#0b0b0f]" : "bg-[#0c1020]/70 text-white/80 backdrop-blur"}`}>{p.stage}</span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className={`${serif} text-3xl font-medium leading-tight tracking-tight`}>{p.name}</p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-white/60">
            <MapPin className="h-3.5 w-3.5 text-[#f8b800]" /> {p.location}
          </p>
        </div>
        <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-white/40 transition group-hover:text-[#f8b800]" />
      </div>
    </Link>
  )
}

/** The last card: the way to all of them. */
function Last({ count }: { count: number }) {
  return (
    <Link href="/projects" className="group flex w-[78vw] shrink-0 snap-start flex-col justify-between rounded-sm border border-white/10 bg-white/[0.03] p-8 sm:w-[52vw] lg:w-[min(26vw,34vh)]">
      <p className={`${serif} wc-outline text-[5.5rem] font-medium leading-none opacity-70`}>{count}</p>
      <div>
        <p className={`${serif} text-3xl font-medium leading-tight tracking-tight`}>Every community, by region.</p>
        <p className="mt-3 text-sm leading-relaxed text-white/60">Metro Manila, Luzon, Visayas and Mindanao. Prices and unit plans on request.</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#f8b800]">
          See them all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

/**
 * The facades as a film strip: on wide screens the strip pins to the screen and slides sideways as
 * you scroll, one community after another. On phones it's a strip you swipe.
 */
export function Reel({ projects }: { projects: PublicProjectCard[] }) {
  const reduce = useReducedMotion()
  const shown = projects.filter((p) => p.hero[0]).slice(0, SHOWN)
  const section = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  useEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [shown.length])
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const head = (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <Eyebrow>The portfolio</Eyebrow>
        <h2 className={`${serif} mt-4 text-4xl font-medium leading-[1] tracking-tight sm:text-5xl`}>
          {COMPANY.tagline}, <span className="italic text-[#f8b800]">address by address.</span>
        </h2>
      </div>
      <p className="max-w-xs text-sm leading-relaxed text-white/55">{COMPANY.kinds}</p>
    </div>
  )

  // Phones, tablets, and reduced motion: a strip to swipe.
  const strip = (
    <div className={`${reduce ? "" : "lg:hidden"} py-20`}>
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">{head}</div>
      <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {shown.map((p, n) => (
          <Card key={p.slug} p={p} n={n} />
        ))}
        <Last count={projects.length} />
      </div>
    </div>
  )
  if (reduce) return <section id="portfolio">{strip}</section>

  return (
    <section id="portfolio" className="relative">
      {strip}
      <div ref={section} style={{ height: `calc(100vh + ${dist}px)` }} className="hidden lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1440px] px-8">{head}</div>
          <motion.div ref={track} style={{ x }} className="mt-8 flex w-max items-start gap-7 pl-8 pr-8">
            {shown.map((p, n) => (
              <Card key={p.slug} p={p} n={n} />
            ))}
            <Last count={projects.length} />
          </motion.div>
          <div className="mx-auto mt-8 flex w-full max-w-[1440px] items-center gap-5 px-8">
            <div className="relative h-px flex-1 bg-white/15">
              <motion.span style={{ width: bar }} className="absolute inset-y-0 left-0 bg-[#f8b800]" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Scroll to travel</p>
          </div>
        </div>
      </div>
    </section>
  )
}
