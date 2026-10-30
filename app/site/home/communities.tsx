"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import { Photo } from "@/components/photo"
import type { PublicProjectCard } from "@/lib/public-projects-types"
import { REGIONS } from "@/lib/site/company"
import { Chapter, Hex, serif } from "../ui"

const chip = (on: boolean) => `rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${on ? "border-[#f8b800] bg-[#f8b800] text-[#0b0b0f]" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`

/**
 * Every community as a line in a list: point at one and its photo comes up beside the list. Region
 * chips narrow the list. On phones the list is cards with the photo in each.
 */
export function Communities({ projects }: { projects: PublicProjectCard[] }) {
  const [region, setRegion] = useState<string>("All")
  const shown = projects.filter((p) => region === "All" || p.region === region)
  const [active, setActive] = useState<string | null>(null)
  const current = shown.find((p) => p.slug === active) ?? shown[0]
  const count = (r: string) => projects.filter((p) => r === "All" || p.region === r).length

  return (
    <Chapter
      id="communities"
      n="01"
      title={
        <>
          {projects.length} communities, from San Juan to Davao
        </>
      }
      kicker="Mid-rise and high-rise condominiums and house-and-lot communities. Prices and unit plans are on request."
      aside={
        <div className="flex flex-wrap gap-1.5">
          {["All", ...REGIONS].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRegion(r)
                setActive(null)
              }}
              className={chip(region === r)}
            >
              {r} <span className={region === r ? "text-[#0b0b0f]/60" : "text-white/35"}>{count(r)}</span>
            </button>
          ))}
        </div>
      }
    >
      {/* Wide screens: the list and the photo of the one you point at. */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_520px]">
        <ol onMouseLeave={() => setActive(null)} className="border-t border-white/10">
          {shown.map((p, n) => {
            const on = current?.slug === p.slug
            return (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} onMouseEnter={() => setActive(p.slug)} onFocus={() => setActive(p.slug)} className={`group grid grid-cols-[44px_1fr_auto] items-center gap-5 border-b border-white/10 py-3.5 transition ${on ? "text-white" : "text-white/55 hover:text-white"}`}>
                  <span className={`${serif} text-sm ${on ? "text-[#f8b800]" : "text-white/35"}`}>{String(n + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className={`${serif} block text-2xl font-medium leading-tight tracking-tight xl:text-[28px]`}>{p.name}</span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/55">
                      <MapPin className="h-3.5 w-3.5 text-[#f8b800]" /> {p.location}
                    </span>
                  </span>
                  <span className={`shrink-0 text-right text-[10px] font-bold uppercase tracking-[0.16em] ${p.stage === "Pre-selling" ? "text-[#f8b800]" : "text-white/40"}`}>{p.stage}</span>
                </Link>
              </li>
            )
          })}
        </ol>
        <div className="sticky top-28 self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#15151c]">
            <AnimatePresence initial={false}>
              {current?.hero[0] && (
                <motion.div key={current.slug} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                  <Photo src={current.hero[0]} alt="" sizes="520px" className="h-full w-full object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
            <span aria-hidden className="wc-triline absolute inset-x-0 top-0 h-1" />
            {current && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0b0f] to-transparent p-6 pt-20">
                <p className={`${serif} text-3xl font-medium tracking-tight`}>{current.name}</p>
                <p className="mt-1 text-sm text-white/70">
                  {current.location} · {current.stage}
                </p>
                <Link href={`/projects/${current.slug}`} className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f8b800]">
                  Open the page <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phones and tablets: cards. */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {shown.map((p, n) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="group flex gap-4 border-b border-white/10 pb-4">
              <Hex className="aspect-[0.866] w-24 shrink-0">{p.hero[0] && <Photo src={p.hero[0]} alt="" sizes="96px" className="h-full w-full object-cover" />}</Hex>
              <span className="min-w-0 flex-1">
                <span className={`${serif} block text-[13px] text-[#f8b800]`}>{String(n + 1).padStart(2, "0")}</span>
                <span className={`${serif} mt-0.5 block text-2xl font-medium leading-tight tracking-tight`}>{p.name}</span>
                <span className="mt-1 block text-sm text-white/60">
                  {p.location} · {p.stage}
                </span>
              </span>
              <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-white/40 transition group-hover:text-[#f8b800]" />
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="text-white/50">No communities in that region yet.</p>}
      <Link href="/projects" className="mt-8 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#f8b800] hover:text-[#ffd04a]">
        All communities, by region <ArrowRight className="h-4 w-4" />
      </Link>
    </Chapter>
  )
}
