"use client"

import { useActionState } from "react"
import { ArrowRight, Check, Clock, LoaderCircle, Mail, MapPin, Phone } from "lucide-react"
import type { PublicProjectCard } from "@/lib/public-projects-types"
import { COMPANY } from "@/lib/site/company"
import { Chapter, Reveal, serif } from "../ui"
import { type InquiryState, sendInquiry } from "./actions"

const field = "mt-1 block w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-[16px] text-white outline-none transition placeholder:text-white/30 focus:border-[#f8b800]"
const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50"

/** The inquiry form, with the company's contact details beside it. */
export function Inquire({ projects, preselect }: { projects: PublicProjectCard[]; preselect?: string }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(sendInquiry, {})
  const picked = projects.find((p) => p.slug === preselect)

  return (
    <Chapter
      id="inquire"
      n="10"
      title="Tell us about the home you want"
      kicker="Prices, unit plans, a tripping schedule or a reservation: Wee Comm's team replies by email or phone."
      className="bg-white/[0.03]"
      aside={
        <dl className="space-y-4 text-[15px]">
          {[
            [MapPin, "Head office", `${COMPANY.hq[0]}, ${COMPANY.hq[1]}`],
            [Phone, "Phone", COMPANY.phones.join(" · ")],
            [Mail, "Email", COMPANY.email],
            [Clock, "Hours", COMPANY.hours],
          ].map(([Icon, k, v]) => {
            const I = Icon as typeof MapPin
            return (
              <div key={k as string} className="flex gap-3">
                <I className="mt-0.5 h-4 w-4 shrink-0 text-[#f8b800]" />
                <div>
                  <dt className={label}>{k as string}</dt>
                  <dd className="mt-0.5 text-white/80">{v as string}</dd>
                </div>
              </div>
            )
          })}
        </dl>
      }
    >
      <Reveal>
        {state.ok ? (
          <div className="border-t border-[#f8b800] pt-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8b800] text-[#0b0b0f]">
              <Check className="h-6 w-6" strokeWidth={3} />
            </span>
            <p className={`${serif} mt-6 text-3xl font-medium tracking-tight`}>Thank you, {state.name?.split(" ")[0]}.</p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
              Your inquiry is with Wee Comm&apos;s team. They&apos;ll get back to you at <b className="text-white">{state.email}</b>, {COMPANY.hours.toLowerCase()}.
            </p>
          </div>
        ) : (
          <form action={action} className="max-w-2xl">
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={label}>Your name</span>
                <input name="name" required maxLength={120} autoComplete="name" className={field} placeholder="Juan dela Cruz" />
              </label>
              <label className="block">
                <span className={label}>Email</span>
                <input name="email" type="email" required maxLength={255} autoComplete="email" className={field} placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className={label}>Mobile (optional)</span>
                <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} placeholder="0917 123 4567" />
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>I&apos;m interested in</span>
                <select name="topic" defaultValue={picked?.slug ?? ""} className={`${field} appearance-none`}>
                  <option value="" className="text-black">
                    A general inquiry
                  </option>
                  {projects.map((p) => (
                    <option key={p.slug} value={p.slug} className="text-black">
                      {p.name} · {p.location}
                    </option>
                  ))}
                  <option value="Partnering as a broker or agent" className="text-black">
                    Partnering as a broker or agent
                  </option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>Message</span>
                <textarea name="message" required rows={4} maxLength={2000} className={`${field} resize-y`} placeholder={picked ? `I'd like to know the prices and unit types at ${picked.name}.` : "What would you like to know?"} />
              </label>
            </div>
            {state.error && (
              <p role="alert" className="mt-5 border-l-2 border-[#e84030] pl-3 text-sm font-semibold text-[#ffb3aa]">
                {state.error}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-white/40">Sent to {COMPANY.email}. Your details are used only to reply to you.</p>
              <button type="submit" disabled={pending} className="group inline-flex items-center gap-2 rounded-full bg-[#f8b800] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0b0b0f] transition hover:bg-[#ffd04a] disabled:opacity-60">
                {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null} Send inquiry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </Chapter>
  )
}
