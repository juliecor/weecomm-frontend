"use client"

import { useState } from "react"
import { Bath, BedDouble, Car, Layers, Ruler, SquareDashed } from "lucide-react"
import { Reveal, serif } from "../../site/ui"
import { type PublicUnitType, SPEC_LABELS } from "@/lib/public-projects-types"
import { Lightbox } from "./lightbox"
import { Photo } from "@/components/photo"

const ICON = { usable_floor_area: Ruler, typical_floor_area: SquareDashed, bedrooms: BedDouble, baths: Bath, floors: Layers, parking: Car } as const
const UNIT = { usable_floor_area: " sqm", typical_floor_area: " sqm", bedrooms: "", baths: "", floors: "", parking: "" } as const

/** The house or unit models, each with its renders and Wee Comm's own spec sheet. */
export function UnitTypes({ units, sections }: { units: PublicUnitType[]; sections: { href: string; label: string }[] }) {
  const [view, setView] = useState<{ photos: string[]; index: number; name: string } | null>(null)
  return (
    <>
      <div className={`mt-12 grid gap-6 ${units.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {units.map((u, n) => (
          <Reveal key={u.name} delay={n * 0.08}>
            <article className={`border border-[#f3f1ea]/10 bg-[#15151c] ${units.length === 1 ? "lg:grid lg:grid-cols-[1.35fr_1fr]" : ""}`}>
              {u.images[0] && (
                <button type="button" onClick={() => setView({ photos: u.images, index: 0, name: u.name })} className="group relative block w-full overflow-hidden" aria-label={`View renders of ${u.name}`}>
                  <Photo src={u.images[0]} alt={u.name} sizes={units.length === 1 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"} className={`w-full object-cover transition duration-700 group-hover:scale-[1.02] ${units.length === 1 ? "h-full min-h-[360px]" : "aspect-[16/10]"}`} />
                  {u.images.length > 1 && <span className="absolute bottom-4 right-4 rounded-sm bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{u.images.length} renders</span>}
                </button>
              )}
              <div className="flex flex-col p-7 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8b800]">Unit type</p>
                <h3 className={`${serif} mt-2 text-3xl font-semibold tracking-tight text-[#f3f1ea] sm:text-4xl`}>{u.name}</h3>
                {u.specs && (
                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                    {(Object.keys(SPEC_LABELS) as (keyof typeof SPEC_LABELS)[]).map((k) => {
                      const v = u.specs?.[k]
                      if (!v) return null
                      const Icon = ICON[k]
                      return (
                        <div key={k} className="flex items-start gap-3">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#f8b800]" />
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8f8e99]">{SPEC_LABELS[k]}</dt>
                            <dd className="mt-0.5 text-lg font-semibold text-[#f3f1ea]">
                              {v}
                              <span className="text-sm font-medium text-[#b3b2bc]">{UNIT[k]}</span>
                            </dd>
                          </div>
                        </div>
                      )
                    })}
                  </dl>
                )}
                {u.specs?.bedrooms?.includes("*") && <p className="mt-4 text-[11px] text-[#8f8e99]">* As marked on Wee Comm&apos;s page.</p>}
                <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#f3f1ea]/10 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em]">
                  {sections.map((sec) => (
                    <a key={sec.href} href={sec.href} className="text-[#b3b2bc] hover:text-[#f8b800]">{sec.label} ↓</a>
                  ))}
                </nav>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Lightbox photos={view?.photos ?? []} index={view ? view.index : null} caption={view?.name} onClose={() => setView(null)} onIndex={(i) => setView((v) => (v ? { ...v, index: i } : v))} />
    </>
  )
}
