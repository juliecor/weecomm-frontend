"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Photo } from "@/components/photo"
import { COMPANY, HERO_SLIDES, STATS } from "@/lib/site/company"
import { Odometer, RiseWords, ease, serif } from "../ui"

/** Full-screen opening: the company's own facades crossfading under "Beyond Ordinary™", then its four figures. */
export function Hero() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % HERO_SLIDES.length), 6500)
    return () => clearInterval(t)
  }, [reduce])
  const slide = HERO_SLIDES[i]

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b0b0f] text-white">
      <AnimatePresence initial={false}>
        <motion.div key={slide.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6 }} className="absolute inset-0">
          <Photo src={slide.src} alt="" sizes="100vw" loading="eager" fetchPriority={i === 0 ? "high" : "auto"} className={`h-full w-full object-cover ${reduce ? "" : "wc-kenburns"}`} />
        </motion.div>
      </AnimatePresence>
      {/* The other slides, fetched now so the crossfade never waits. */}
      <div aria-hidden className="hidden">
        {HERO_SLIDES.map((s) => (
          <Photo key={s.src} src={s.src} alt="" sizes="100vw" loading="eager" />
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/55 to-[#0b0b0f]/15" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0b0b0f]/70 via-[#0b0b0f]/10 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-8 pt-36 sm:px-8 sm:pb-10">
        <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f8b800]">
          <span className="h-px w-10 bg-[#f8b800]/70" />
          {COMPANY.name}
        </motion.p>
        <h1 className={`${serif} mt-5 text-[clamp(3.6rem,11.5vw,10.5rem)] font-medium leading-[0.9] tracking-[-0.025em]`}>
          <RiseWords text="Beyond" delay={0.15} />
          <br />
          <RiseWords text="Ordinary™" delay={0.35} accent={["Ordinary™"]} accentClass="italic text-[#f8b800]" />
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6, ease }} className="max-w-xl text-[17px] leading-relaxed text-white/75 sm:text-lg">
            {COMPANY.intro}
          </motion.p>
          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75, ease }} className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Link href="#communities" data-cursor="Explore" className="group inline-flex items-center gap-2 rounded-full bg-[#f8b800] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0b0b0f] transition hover:bg-[#ffd04a]">
              Explore the communities <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="#inquire" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-[#0b0b0f]">
              Inquire now
            </Link>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
          <span className="inline-flex items-center gap-2">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" /> Scroll
          </span>
          <div className="flex items-center gap-4">
            <span>{slide.caption}</span>
            <span className="flex gap-1.5">
              {HERO_SLIDES.map((s, n) => (
                <button key={s.src} type="button" onClick={() => setI(n)} aria-label={s.caption} className={`h-1 rounded-full transition-all ${n === i ? "w-8 bg-[#f8b800]" : "w-3 bg-white/30 hover:bg-white/60"}`} />
              ))}
            </span>
          </div>
        </div>

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className={`${serif} text-4xl font-medium tracking-tight sm:text-5xl`}>{typeof s.value === "number" ? <Odometer value={s.value} suffix={"suffix" in s ? s.suffix : ""} /> : s.value}</dd>
              <dt className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
