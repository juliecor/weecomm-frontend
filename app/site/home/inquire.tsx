"use client"

import { useActionState } from "react"
import { ArrowRight, Check, Clock, LoaderCircle, Mail, MapPin, Phone } from "lucide-react"
import type { PublicProjectCard } from "@/lib/public-projects-types"
import { COMPANY } from "@/lib/site/company"
import { Eyebrow, Reveal, serif } from "../ui"
import { type InquiryState, sendInquiry } from "./actions"

const field = "mt-2 block w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-white/30 focus:border-[#f8b800] focus:bg-white/[0.06]"
const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55"

/** The inquiry form and the company's contact details, side by side. */
export function Inquire({ projects, preselect }: { projects: PublicProjectCard[]; preselect?: string }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(sendInquiry, {})
  const picked = projects.find((p) => p.slug === preselect)

  return (
    <section id="inquire" className="scroll-mt-20 border-t border-white/[0.06] bg-[#0f0f14] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Inquire now</Eyebrow>
          <h2 className={`${serif} mt-4 text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl`}>
            Tell us about <span className="italic text-[#f8b800]">the home you want.</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">Prices, unit plans, a tripping schedule or a reservation: write to Wee Comm&apos;s team and they reply by email or phone.</p>
          <dl className="mt-10 space-y-5 text-[15px]">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#f8b800]" />
              <div>
                <dt className={label}>Head office</dt>
                <dd className="mt-1 text-white/80">
                  {COMPANY.hq[0]}
                  <br />
                  {COMPANY.hq[1]}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#f8b800]" />
              <div>
                <dt className={label}>Phone</dt>
                <dd className="mt-1 text-white/80">{COMPANY.phones.join(" · ")}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#f8b800]" />
              <div>
                <dt className={label}>Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${COMPANY.email}`} className="text-white/80 hover:text-white">
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#f8b800]" />
              <div>
                <dt className={label}>Hours</dt>
                <dd className="mt-1 text-white/80">{COMPANY.hours}</dd>
              </div>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          {state.ok ? (
            <div className="flex h-full flex-col justify-center rounded-2xl border border-[#f8b800]/40 bg-[#f8b800]/5 p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8b800] text-[#0b0b0f]">
                <Check className="h-6 w-6" strokeWidth={3} />
              </span>
              <p className={`${serif} mt-6 text-3xl font-medium tracking-tight`}>Thank you, {state.name?.split(" ")[0]}.</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Your inquiry is with Wee Comm&apos;s team. They&apos;ll get back to you at <b className="text-white">{state.email}</b>, {COMPANY.hours.toLowerCase()}.
              </p>
            </div>
          ) : (
            <form action={action} className="rounded-2xl border border-white/10 bg-[#0b0b0f] p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
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
                  <textarea name="message" required rows={5} maxLength={2000} className={`${field} resize-y`} placeholder={picked ? `I'd like to know the prices and unit types at ${picked.name}.` : "What would you like to know?"} />
                </label>
              </div>
              {state.error && (
                <p role="alert" className="mt-4 rounded-xl border border-[#e84030]/40 bg-[#e84030]/10 px-4 py-3 text-sm font-semibold text-[#ffb3aa]">
                  {state.error}
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-white/40">Sent to {COMPANY.email}. Your details are used only to reply to you.</p>
                <button type="submit" disabled={pending} className="group inline-flex items-center gap-2 rounded-full bg-[#f8b800] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0b0b0f] transition hover:bg-[#ffd04a] disabled:opacity-60">
                  {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null} Send inquiry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
