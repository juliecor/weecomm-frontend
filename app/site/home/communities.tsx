"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import { Photo } from "@/components/photo"
import type { PublicProjectCard } from "@/lib/public-projects-types"
import { REGIONS } from "@/lib/site/company"
import { Eyebrow, Reveal, serif } from "../ui"

/** Every published community as a tall photo card, filtered by region and by pre-selling. */
export function Communities({ projects }: { projects: PublicProjectCard[] }) {
  const [region, setRegion] = useState<string>("All")
  const [preselling, setPreselling] = useState(false)
  const shown = projects.filter((p) => (region === "All" || p.region === region) && (!preselling || p.stage === "Pre-selling"))
  const count = (r: string) => projects.filter((p) => r === "All" || p.region === r).length
  const chip = (on: boolean, tone = "border-[#f8b800] bg-[#f8b800] text-[#0b0b0f]") => `rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] transition ${on ? tone : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`

  return (
    <section id="communities" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <Eyebrow>Our communities</Eyebrow>
              <h2 className={`${serif} mt-4 text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl`}>
                {projects.length} communities, <span className="italic text-[#f8b800]">from San Juan to Davao.</span>
              </h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:text-white">
              All communities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {["All", ...REGIONS].map((r) => (
            <button key={r} type="button" onClick={() => setRegion(r)} className={chip(region === r)}>
              {r} <span className={region === r ? "text-[#0b0b0f]/60" : "text-white/35"}>{count(r)}</span>
            </button>
          ))}
          <button type="button" onClick={() => setPreselling((v) => !v)} aria-pressed={preselling} className={`${chip(preselling, "border-[#4080f0] bg-[#4080f0] text-white")} sm:ml-auto`}>
            Pre-selling only
          </button>
        </div>

        <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <motion.li key={p.slug} layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: (i % 3) * 0.06 }}>
              <Link href={`/projects/${p.slug}`} data-cursor="View" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#15151c]">
                {p.hero[0] && <Photo src={p.hero[0]} alt="" sizes="(min-width: 1440px) 460px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105" />}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/25 to-transparent" />
                {p.stage && <span className={`absolute left-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${p.stage === "Pre-selling" ? "bg-[#f8b800] text-[#0b0b0f]" : "bg-white/15 text-white backdrop-blur"}`}>{p.stage}</span>}
                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:bg-[#f8b800] group-hover:text-[#0b0b0f]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className={`${serif} text-3xl font-medium leading-[1.02] tracking-tight`}>{p.name}</p>
                  {p.location && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/75">
                      <MapPin className="h-3.5 w-3.5 text-[#f8b800]" /> {p.location}
                    </p>
                  )}
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        {shown.length === 0 && <p className="mt-10 text-center text-white/50">No communities match that filter.</p>}
        <p className="mt-8 max-w-2xl text-sm text-white/45">Unit types, floor areas and prices are on request: ask about any community below and Wee Comm&apos;s team replies with the details.</p>
      </div>
    </section>
  )
}
