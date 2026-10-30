"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { AccountLink } from "@/components/account-link"
import { COMPANY } from "@/lib/site/company"
import { serif } from "./tokens"

const NAV = [
  { href: "/#communities", label: "Communities" },
  { href: "/#signature", label: "Signature line" },
  { href: "/#story", label: "Story" },
  { href: "/#leaders", label: "Leaders" },
  { href: "/#partners", label: "Partners" },
  { href: "/buyers-guide", label: "Buyer's guide" },
]

/**
 * The bar on every public page: the logo, the menu in a pill in the middle, Inquire on the right.
 * Clear at the top of the page, solid once it scrolls (or from the start on pages without an opening photo).
 * On phones the menu fills the screen.
 */
export function SiteHeader({ solid = false }: { solid?: boolean; light?: boolean }) {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])
  const bar = solid || scrolled

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${bar ? "bg-[#0c1020]/80 backdrop-blur-md" : "bg-transparent"}`}>
      {bar && <span aria-hidden className="wc-triline absolute inset-x-0 bottom-0 h-px opacity-70" />}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href="/" aria-label={`${COMPANY.short} home`} className="shrink-0">
          <Image src="/weecomm/logo-wide-light.png" alt={COMPANY.name} width={1600} height={480} priority className="h-8 w-auto sm:h-9" />
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${path === n.href ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/[0.06] hover:text-white"}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <AccountLink signIn="Sign in" dashboard="Dashboard" icon={false} className="hidden px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:text-white md:inline-flex" />
          <Link href="/#inquire" className="hidden items-center gap-1.5 rounded-full bg-[#f8b800] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0b0b0f] transition hover:bg-[#ffd04a] md:inline-flex">
            Inquire <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} data-lenis-prevent className="wc-hexgrid-faint fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#0c1020] px-6 py-4 lg:hidden">
            <div className="flex items-center justify-between">
              <Image src="/weecomm/logo-wide-light.png" alt="" width={1600} height={480} className="h-8 w-auto" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-5">
              {NAV.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link href={n.href} onClick={() => setOpen(false)} className={`${serif} flex items-baseline gap-4 text-3xl font-medium text-white`}>
                    <span className="text-sm text-[#f8b800]">0{i + 1}</span> {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <Link href="/#inquire" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f8b800] px-5 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#0b0b0f]">
                Inquire now
              </Link>
              <AccountLink signIn="Realty & agent sign in" dashboard="Open your dashboard" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80" />
              <p className="pt-2 text-center text-[11px] text-white/35">
                {COMPANY.phones[0]} · {COMPANY.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
