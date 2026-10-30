"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { BLUE, GOLD, INK, RED, ease, serif } from "./tokens"

export { BLUE, GOLD, INK, RED, ease, serif }

/** Fades and lifts its children in when they scroll into view. */
export function Reveal({ children, delay = 0, y = 24, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease }} className={className}>
      {children}
    </motion.div>
  )
}

/** A small label with the logo's hexagon as its bullet. */
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] ${light ? "text-[#f8b800]" : "text-[#f8b800]"}`}>
      <span aria-hidden className="wc-hex inline-block h-2.5 w-[9px] shrink-0 bg-[#f8b800]" />
      {children}
    </p>
  )
}

/** The logo's three colours as one hairline. */
export function TriLine({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`wc-triline block h-px w-full ${className}`} />
}

/** A photo or anything else cut as the logo's hexagon. */
export function Hex({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`wc-hex overflow-hidden bg-white/[0.06] ${className}`}>{children}</div>
}

/**
 * A chapter of the page: its number and title in a column that stays put while the content
 * scrolls beside it. On phones the title simply sits above the content.
 */
export function Chapter({ id, n, title, kicker, aside, children, className = "" }: { id: string; n: string; title: React.ReactNode; kicker?: string; aside?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-white/[0.08] px-5 py-20 sm:px-8 lg:py-28 ${className}`}>
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className={`${serif} text-[15px] text-[#f8b800]`}>({n})</p>
          <h2 className={`${serif} mt-3 text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl`}>{title}</h2>
          {kicker && <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/55">{kicker}</p>}
          {aside && <div className="mt-6">{aside}</div>}
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

/** A strip of short items drifting left, each separated by a small hexagon. */
export function Ticker({ items, className = "", slow = false }: { items: string[]; className?: string; slow?: boolean }) {
  const row = [...items, ...items, ...items]
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`${slow ? "wc-marquee-slow" : "wc-marquee"} flex w-max items-center gap-8 whitespace-nowrap`}>
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            {t}
            <span aria-hidden className="wc-hex inline-block h-2.5 w-[9px] bg-[#f8b800]" />
          </span>
        ))}
      </div>
    </div>
  )
}

/** A figure that counts up from zero when it scrolls into view. */
export function Count({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView || reduce) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1800)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduce])
  return (
    <span ref={ref} className={className}>
      {(reduce ? to : v).toLocaleString("en-PH")}
      {suffix}
    </span>
  )
}
