"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, BadgeCheck, Compass, ScrollText } from "lucide-react"
import { AccountLink } from "@/components/account-link"
import { COMPANY } from "@/lib/site/company"
import { serif } from "../ui"

const SOCIAL = [
  ["Facebook", COMPANY.social.facebook],
  ["Instagram", COMPANY.social.instagram],
  ["LinkedIn", COMPANY.social.linkedin],
  ["YouTube", COMPANY.social.youtube],
] as const

/** A compact footer: the logo, the office, where to go next, and the tagline as a watermark behind it all. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-transparent text-white">
      <span aria-hidden className="wc-triline absolute inset-x-0 top-0 h-px" />
            <p aria-hidden className={`${serif} wc-outline pointer-events-none absolute -bottom-6 left-1/2 w-max -translate-x-1/2 whitespace-nowrap text-[22vw] font-medium leading-none opacity-[0.14] lg:text-[16vw]`}>
        Beyond Ordinary™
      </p>
      <div className="relative mx-auto max-w-[1440px] px-5 pb-28 pt-16 sm:px-8 sm:pb-36 sm:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/weecomm/logo-wide-light.png" alt={COMPANY.name} width={1600} height={480} className="h-10 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{COMPANY.since}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8b800]">Head office</p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              {COMPANY.hq[0]}
              <br />
              {COMPANY.hq[1]}
              <br />
              {COMPANY.phones[0]}
              <br />
              {COMPANY.phones[1]}
              <br />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                {COMPANY.email}
              </a>
            </p>
          </div>
          <div className="flex flex-col items-start gap-2.5">
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
          <div className="flex flex-col items-start gap-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8b800]">Follow</p>
            {SOCIAL.map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-white/85 transition hover:text-white">
                {name} <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.18em] text-white/35">
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
