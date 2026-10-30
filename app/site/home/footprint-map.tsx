"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Photo } from "@/components/photo"
import type { PublicProjectCard } from "@/lib/public-projects-types"
import { FOOTPRINT } from "@/lib/site/company"
import { PH_HEIGHT, PH_PATH, PH_WIDTH, project } from "@/lib/site/philippines"
import { Hex, serif } from "../ui"

type City = (typeof FOOTPRINT)[number]

/** The pointy-top hexagon of the logo, centred on a point. */
const hex = (x: number, y: number, r: number) => [0, 60, 120, 180, 240, 300].map((a) => `${(x + r * Math.sin((a * Math.PI) / 180)).toFixed(1)},${(y - r * Math.cos((a * Math.PI) / 180)).toFixed(1)}`).join(" ")

/** The inset: Metro Manila and Rizal enlarged, since five of the cities sit within a few pixels of each other. */
const INSET = { cx: 300, cy: 250, r: 92, k: 13, lat: 14.56, lng: 121.06 }
const inset = (lat: number, lng: number) => {
  const c = project(INSET.lat, INSET.lng)
  const p = project(lat, lng)
  return { x: INSET.cx + (p.x - c.x) * INSET.k, y: INSET.cy + (p.y - c.y) * INSET.k }
}
const inInset = (c: City) => c.region === "Metro Manila" || c.city.includes("Rizal")

/** The communities in a city: the project's location names the city. */
const inCity = (projects: PublicProjectCard[], c: City) => {
  const key = c.city.split(",")[0].toLowerCase()
  return projects.filter((p) => (p.location ?? "").toLowerCase().includes(key))
}

/**
 * Where Wee Comm builds, on a map of the Philippines drawn in the site's own ink: a gold hexagon per
 * city, an inset for Metro Manila, and a card with the communities of the city you point at.
 */
export function FootprintMap({ projects }: { projects: PublicProjectCard[] }) {
  const [active, setActive] = useState<string | null>(null)
  const city = FOOTPRINT.find((c) => c.city === active) ?? null
  const list = city ? inCity(projects, city) : []
  const metro = project(INSET.lat, INSET.lng)

  const Marker = ({ c, at, labelSide = "right", dy = 0 }: { c: City; at: { x: number; y: number }; labelSide?: "left" | "right"; dy?: number }) => {
    const on = active === c.city
    return (
      <g onMouseEnter={() => setActive(c.city)} onClick={() => setActive(on ? null : c.city)} className="cursor-pointer" role="button" aria-label={c.city} tabIndex={0} onFocus={() => setActive(c.city)}>
        {on && !c.upcoming && <polygon points={hex(at.x, at.y, 14)} className="wc-pulse fill-[#f8b800]/25" style={{ transformOrigin: `${at.x}px ${at.y}px` }} />}
        <polygon points={hex(at.x, at.y, c.upcoming ? 5 : 6)} fill={c.upcoming ? "#0c1020" : "#f8b800"} stroke={on ? "#fff" : "#f8b800"} strokeWidth={c.upcoming ? 1 : on ? 1.2 : 0} />
        <text x={labelSide === "right" ? at.x + 11 : at.x - 11} y={at.y + 3.5 + dy} textAnchor={labelSide === "right" ? "start" : "end"} className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${on ? "fill-white" : c.upcoming ? "fill-white/45" : "fill-white/75"}`} style={{ fontFamily: "var(--font-site-sans)" }}>
          {c.city.split(",")[0]}
          {!c.upcoming && <tspan className="fill-[#f8b800]"> {c.projects}</tspan>}
        </text>
      </g>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start" onMouseLeave={() => setActive(null)}>
      <svg viewBox={`0 0 ${PH_WIDTH + 70} ${PH_HEIGHT}`} className="mx-auto w-full max-w-[520px] lg:max-w-none" role="img" aria-label="Map of the Philippines with Wee Comm's cities marked">
        <defs>
          <filter id="wc-map-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <clipPath id="wc-map-inset">
            <polygon points={hex(INSET.cx, INSET.cy, INSET.r)} />
          </clipPath>
        </defs>
        {/* The islands, with a soft blue glow beneath. */}
        <path d={PH_PATH} fill="#4080f0" opacity="0.35" filter="url(#wc-map-glow)" />
        <path d={PH_PATH} fill="rgba(64,128,240,0.13)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeLinejoin="round" />

        {/* The inset, cut as a hexagon, with a line back to where it is. */}
        <line x1={metro.x + 6} y1={metro.y - 2} x2={INSET.cx - INSET.r * 0.87} y2={INSET.cy} stroke="rgba(248,184,0,0.6)" strokeWidth="0.8" strokeDasharray="3 3" />
        <polygon points={hex(metro.x, metro.y, 9)} fill="none" stroke="#f8b800" strokeWidth="0.8" />
        <g clipPath="url(#wc-map-inset)">
          <rect x="0" y="0" width={PH_WIDTH} height={PH_HEIGHT} fill="#0c1020" />
          <g transform={`translate(${INSET.cx - INSET.k * metro.x} ${INSET.cy - INSET.k * metro.y}) scale(${INSET.k})`}>
            <path d={PH_PATH} fill="rgba(64,128,240,0.16)" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          </g>
        </g>
        <polygon points={hex(INSET.cx, INSET.cy, INSET.r)} fill="none" stroke="rgba(248,184,0,0.7)" strokeWidth="1" />
        <text x={INSET.cx} y={INSET.cy - INSET.r + 16} textAnchor="middle" className="fill-white/50 text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-site-sans)" }}>
          Metro Manila · Rizal
        </text>
        {FOOTPRINT.filter(inInset).map((c) => (
          <Marker key={c.city} c={c} at={inset(c.lat, c.lng)} labelSide={c.lng > 121.07 ? "right" : c.city === "Mandaluyong" ? "left" : "right"} />
        ))}

        {/* The cities outside the capital. */}
        {FOOTPRINT.filter((c) => !inInset(c)).map((c) => (
          <Marker key={c.city} c={c} at={project(c.lat, c.lng)} labelSide={c.city === "Iloilo" ? "left" : "right"} />
        ))}
      </svg>

      <div>
        <ul className="border-t border-white/10">
          {FOOTPRINT.map((c) => {
            const on = active === c.city
            return (
              <li key={c.city}>
                <button type="button" onMouseEnter={() => setActive(c.city)} onClick={() => setActive(on ? null : c.city)} className={`flex w-full items-center justify-between gap-4 border-b border-white/10 py-3 text-left text-[15px] transition ${on ? "text-white" : c.upcoming ? "text-white/50" : "text-white/80 hover:text-white"}`}>
                  <span className="inline-flex items-center gap-3">
                    <span aria-hidden className={`wc-hex inline-block h-2.5 w-[9px] ${c.upcoming ? "border border-[#f8b800]" : "bg-[#f8b800]"}`} /> {c.city}
                    <span className="text-[11px] uppercase tracking-[0.14em] text-white/35">{c.region}</span>
                  </span>
                  {c.upcoming ? <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">upcoming</span> : <span className={`${serif} text-xl ${on ? "text-[#f8b800]" : "text-white/80"}`}>{c.projects}</span>}
                </button>
              </li>
            )
          })}
        </ul>

        {/* The communities of the city you point at. */}
        <div className="mt-6 min-h-[120px]">
          <AnimatePresence mode="wait">
            {city ? (
              <motion.div key={city.city} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8b800]">{city.city}</p>
                {city.upcoming ? (
                  <p className="mt-2 text-[15px] text-white/65">Wee Comm&apos;s next city. Details as they are announced.</p>
                ) : list.length === 0 ? (
                  <p className="mt-2 text-[15px] text-white/65">
                    {city.projects} {city.projects === 1 ? "community" : "communities"}.
                  </p>
                ) : (
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {list.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/projects/${p.slug}`} className="group flex items-center gap-3">
                          <Hex className="aspect-[0.866] w-12 shrink-0">{p.hero[0] && <Photo src={p.hero[0]} alt="" sizes="48px" className="h-full w-full object-cover" />}</Hex>
                          <span className="min-w-0">
                            <span className={`${serif} block text-lg font-medium leading-tight`}>{p.name}</span>
                            <span className="text-xs text-white/55">{p.stage}</span>
                          </span>
                          <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/30 transition group-hover:text-[#f8b800]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ) : (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-white/45">
                Point at a city to see its communities.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
