"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Photo } from "@/components/photo"
import { COMPANY, HERO_SLIDES, STATS } from "@/lib/site/company"
import { Hex, Ticker, TriLine, ease, serif } from "../ui"

/** How long each facade stays before the next one comes forward. */
const HOLD = 6500

/** A line of the title rising out of a hidden row, like a title card. The padding sits on the word itself, so its descender is inside the box the gold gradient paints. */
function Rise({ children, delay = 0, still = false, className = "" }: { children: React.ReactNode; delay?: number; still?: boolean; className?: string }) {
  return (
    <span className="-mb-[0.3em] -mt-[0.1em] block overflow-hidden">
      <motion.span initial={still ? false : { y: "112%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay, ease }} className={`block pb-[0.3em] pt-[0.1em] ${className}`}>
        {children}
      </motion.span>
    </span>
  )
}

/** A thin hexagon drawn in the logo's three colours, for decoration behind the photo. */
function HexRing({ className = "", id }: { className?: string; id: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 115.47" className={`pointer-events-none absolute ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e84030" />
          <stop offset="0.5" stopColor="#f8b800" />
          <stop offset="1" stopColor="#4080f0" />
        </linearGradient>
      </defs>
      <polygon points="50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87" fill="none" stroke={`url(#${id})`} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/**
 * The opening: "Beyond" drawn in outline over "Ordinary™" in gold, beside the company's own facades
 * cut as the logo's hexagon, with the next one waiting in a smaller hexagon. Behind it all, the company's
 * own drone footage, dimmed; the scene leans gently with the mouse and drifts as you scroll.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setI((n) => (n + 1) % HERO_SLIDES.length), HOLD)
    return () => clearTimeout(t)
  }, [i, reduce])
  const slide = HERO_SLIDES[i]
  const next = HERO_SLIDES[(i + 1) % HERO_SLIDES.length]
  const up = reduce ? false : { opacity: 0, y: 18 }

  // The mouse tilts the scene: the photo follows it a little, the glow behind leans the other way.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const artX = useTransform(sx, (v) => v * 16)
  const glowX = useTransform(sx, (v) => v * -40)
  const glowY = useTransform(sy, (v) => v * -40)

  // Scrolling away: the words fade and the photo lifts slower than the page.
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const lift = useTransform(scrollYProgress, [0, 1], [0, -110])
  const artY = useTransform([sy, lift], ([v, l]: number[]) => v * 16 + l)

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section ref={ref} onMouseMove={onMove} onMouseLeave={() => (mx.set(0), my.set(0))} className="relative overflow-hidden bg-transparent text-white">
      {/* Behind the scene: Wee Comm's own film, the drone shots of its towers, muted and dimmed into an atmosphere.
          With reduced motion it's the facade of the slide, blurred, instead. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div style={{ x: glowX, y: glowY }} className="absolute -inset-[6%]">
          {reduce ? (
            <Photo src={slide.src} alt="" sizes="480px" className="h-full w-full object-cover opacity-45 blur-[60px] saturate-[1.5]" />
          ) : (
            <video autoPlay muted loop playsInline preload="metadata" poster="/weecomm/video/hero.jpg" className="h-full w-full object-cover opacity-[0.55] saturate-[1.15]">
              <source src="/weecomm/video/hero.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,16,32,0.92)_0%,rgba(12,16,32,0.7)_45%,rgba(12,16,32,0.35)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,16,32,0.3)_0%,rgba(12,16,32,0.2)_50%,#0c1020_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-32">
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }}>
          <motion.p initial={up} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f8b800]">
            <span aria-hidden className="wc-hex inline-block h-2.5 w-[9px] bg-[#f8b800]" />
            {COMPANY.name} · since {COMPANY.founded}
          </motion.p>
          <h1 className={`${serif} mt-7 text-[clamp(4rem,12vw,11rem)] font-medium leading-[0.86] tracking-[-0.03em]`}>
            <Rise delay={0.1} still={!!reduce} className="wc-outline">
              Beyond
            </Rise>
            <Rise delay={0.25} still={!!reduce} className={reduce ? "text-[#f8b800]" : "wc-shine"}>
              Ordinary™
            </Rise>
          </h1>
          <motion.div initial={up} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease }} className="mt-8 max-w-xl">
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
        </motion.div>

        <motion.div style={reduce ? undefined : { x: artX, y: artY }} initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.3, ease }} className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <HexRing id="wc-ring-a" className="wc-breathe -right-[7%] -top-[8%] w-[46%] opacity-80" />
          <HexRing id="wc-ring-b" className="wc-breathe-slow -left-[4%] top-[6%] w-[22%] opacity-60" />
          {/* A hairline in the logo's three colours around the photo. */}
          <div aria-hidden className="wc-hex absolute -inset-px bg-[linear-gradient(150deg,#e84030,#f8b800_55%,#4080f0)] opacity-80" />
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
            <div className="flex items-center justify-end gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Facades">
                {HERO_SLIDES.map((s, k) => (
                  <button key={s.src} type="button" role="tab" aria-selected={k === i} aria-label={s.caption} onClick={() => setI(k)} className="group flex h-6 w-7 items-center outline-none sm:w-9">
                    <span className="block h-px w-full overflow-hidden bg-white/25 transition group-hover:bg-white/50">{k === i && <span key={i} className={`block h-full bg-[#f8b800] ${reduce ? "w-full" : "wc-fill"}`} />}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className={`${serif} mt-1.5 text-lg text-white/90`}>{slide.caption}</p>
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
