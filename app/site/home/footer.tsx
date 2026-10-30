"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUp, ArrowUpRight, BadgeCheck, Building2, Compass, ScrollText } from "lucide-react"
import { AccountLink } from "@/components/account-link"
import { COMPANY } from "@/lib/site/company"
import { Magnetic, RiseWords, serif } from "../ui"

const SOCIAL = [
  ["Facebook", COMPANY.social.facebook],
  ["Instagram", COMPANY.social.instagram],
  ["LinkedIn", COMPANY.social.linkedin],
  ["YouTube", COMPANY.social.youtube],
] as const

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0b0b0f] text-white">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[#f8b800]/15 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#4080f0]/15 blur-[160px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
        <p className={`${serif} text-[17vw] font-medium leading-[0.9] tracking-[-0.03em] lg:text-[13vw] xl:text-[11.5rem]`}>
          <RiseWords text="Beyond Ordinary™" accent={["Ordinary™"]} accentClass="italic text-[#f8b800]" />
        </p>
        <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto]">
          <div>
            <Image src="/weecomm/logo-wide-light.png" alt={COMPANY.name} width={1600} height={480} className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{COMPANY.since}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {SOCIAL.map(([name, href]) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:text-white">
                    {name} <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8b800]">Head office</p>
            <p className="mt-3 flex gap-2 text-sm leading-relaxed text-white/75">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {COMPANY.hq[0]}
                <br />
                {COMPANY.hq[1]}
                <br />
                {COMPANY.phones.join(" · ")}
                <br />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  {COMPANY.email}
                </a>
              </span>
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8b800]">Explore</p>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white">
              <Compass className="h-4 w-4" /> All communities
            </Link>
            <Link href="/buyers-guide" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white">
              <ScrollText className="h-4 w-4" /> Buyer&apos;s guide
            </Link>
            <Link href="/accreditation" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white">
              <BadgeCheck className="h-4 w-4" /> Broker accreditation
            </Link>
            <AccountLink signIn="Realty & agent sign in" dashboard="Your dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white" />
          </div>
          <div className="flex items-start sm:justify-end">
            <Magnetic strength={0.5}>
              <a href="#top" aria-label="Back to top" data-cursor="Top" className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-[#f8b800] hover:text-[#0b0b0f]">
                <ArrowUp className="h-5 w-5" />
              </a>
            </Magnetic>
          </div>
        </div>
        <p className="mt-14 flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
          <span>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </span>
          <span>
            Powered by{" "}
            <Link href="/platform" className="text-white/50 hover:text-white">
              jvconline
            </Link>
          </span>
        </p>
      </div>
    </footer>
  )
}
