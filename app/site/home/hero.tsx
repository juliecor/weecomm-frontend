"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Photo } from "@/components/photo"
import { COMPANY, HERO_SLIDES, STATS } from "@/lib/site/company"
import { Hex, Ticker, TriLine, ease, serif } from "../ui"

/**
 * The opening: "Beyond" drawn in outline over "Ordinary™" in gold, beside the company's own facades
 * cut as the logo's hexagon, with the next one waiting in a smaller hexagon. Under it, the figures as a ticker.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % HERO_SLIDES.length), 6500)
    return () => clearInterval(t)
  }, [reduce])
  const slide = HERO_SLIDES[i]
  const next = HERO_SLIDES[(i + 1) % HERO_SLIDES.length]
  const up = reduce ? false : { opacity: 0, y: 18 }

  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] text-white">
      <div aria-hidden className="wc-hexgrid absolute inset-0 opacity-[0.07]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[640px] w-[640px] rounded-full bg-[#4080f0]/15 blur-[180px]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[#e84030]/10 blur-[180px]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-32">
        <div>
          <motion.p initial={up} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f8b800]">
            <span aria-hidden className="wc-hex inline-block h-2.5 w-[9px] bg-[#f8b800]" />
            {COMPANY.name} · since {COMPANY.founded}
          </motion.p>
          <h1 className={`${serif} mt-7 text-[clamp(4rem,12vw,11rem)] font-medium leading-[0.86] tracking-[-0.03em]`}>
            <motion.span initial={up} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease }} className="wc-outline block">
              Beyond
            </motion.span>
            <motion.span initial={up} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease }} className="block text-[#f8b800]">
              Ordinary™
            </motion.span>
          </h1>
          <motion.div initial={up} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease }} className="mt-8 max-w-xl">
            <TriLine />
            <p className="mt-6 text-[17px] leading-relaxed text-white/75 sm:text-lg">{COMPANY.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#communities" className="group inline-flex items-center gap-2 rounded-full bg-[#f8b800] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0b0b0f] transition hover:bg-[#ffd04a]">
                The communities <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="#inquire" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-[#0b0b0f]">
                Inquire now
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.3, ease }} className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <Hex className="relative aspect-[0.866] w-full">
            <AnimatePresence initial={false}>
              <motion.div key={slide.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }} className="absolute inset-0">
                <Photo src={slide.src} alt="" sizes="(min-width: 1024px) 45vw, 100vw" loading="eager" fetchPriority="high" className={`h-full w-full object-cover ${reduce ? "" : "wc-kenburns"}`} />
              </motion.div>
            </AnimatePresence>
          </Hex>
          {/* The next facade, waiting in a smaller hexagon; a tap brings it forward. */}
          <button type="button" onClick={() => setI((n) => (n + 1) % HERO_SLIDES.length)} aria-label={`Next: ${next.caption}`} className="group absolute -bottom-4 left-0 w-[34%] outline-none sm:-left-6 sm:w-[30%]">
            <Hex className="aspect-[0.866] w-full ring-0 transition group-hover:brightness-110">
              <Photo src={next.src} alt="" sizes="(min-width: 1024px) 15vw, 34vw" className="h-full w-full object-cover" />
            </Hex>
          </button>
          <div className="absolute bottom-2 right-0 text-right sm:bottom-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              {String(i + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
            </p>
            <p className={`${serif} mt-1 text-lg text-white/90`}>{slide.caption}</p>
          </div>
          <div aria-hidden className="hidden">
            {HERO_SLIDES.map((s) => (
              <Photo key={s.src} src={s.src} alt="" sizes="100vw" loading="eager" />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative border-y border-white/[0.08] py-4">
        <Ticker items={STATS.map((s) => `${typeof s.value === "number" ? s.value.toLocaleString("en-PH") : s.value}${"suffix" in s ? s.suffix : ""} ${s.label}`).concat([COMPANY.tagline, `${COMPANY.kinds}`])} className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70" />
      </div>
    </section>
  )
}
