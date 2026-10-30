import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BadgeCheck, Ban, Landmark, Percent, ScrollText, Wallet } from "lucide-react"
import { COMPANY, GUIDE } from "@/lib/site/company"
import { Footer } from "../site/home/footer"
import { SiteHeader } from "../site/header"
import { SiteShell, siteMetadata } from "../site/shell"
import { serif } from "../site/tokens"
import { Eyebrow, Reveal } from "../site/ui"

export const metadata: Metadata = {
  ...siteMetadata,
  title: "Buyer's guide",
  description: `How reserving, paying and financing a Wee Comm home works: reservation requirements, payment terms, accredited banks, Pag-IBIG and in-house loans, fees. From ${COMPANY.short}'s own FAQs.`,
}

const H2 = `${serif} mt-4 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl`
const card = "rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
const List = ({ items }: { items: readonly string[] }) => (
  <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-white/70">
    {items.map((t) => (
      <li key={t} className="flex gap-2.5">
        <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-[#f8b800]/80" /> {t}
      </li>
    ))}
  </ul>
)

/** /buyers-guide — the FAQs from weecomm.ph, laid out to read: reserving, paying, financing, documents and fees. */
export default function BuyersGuidePage() {
  const g = GUIDE
  return (
    <SiteShell>
      <SiteHeader solid />
      <main className="mx-auto max-w-[1200px] px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Reveal>
          <Eyebrow>Buyer&apos;s guide</Eyebrow>
          <h1 className={`${serif} mt-4 text-5xl font-medium leading-[0.98] tracking-tight sm:text-7xl`}>
            From reservation <span className="italic text-[#f8b800]">to turnover.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/65">How buying a Wee Comm home works, step by step, as the company sets it out. Prices and unit plans for any community are on request: <Link href="/#inquire" className="font-semibold text-[#f8b800] hover:underline">inquire here</Link>.</p>
          <nav className="mt-8 flex flex-wrap gap-2">
            {[
              ["#reserve", "Reserving"],
              ["#pay", "Payment terms"],
              ["#finance", "Financing"],
              ["#documents", "Documents"],
              ["#fees", "Fees and penalties"],
            ].map(([href, l]) => (
              <a key={href} href={href} className="rounded-full border border-white/15 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:border-white/40 hover:text-white">
                {l}
              </a>
            ))}
          </nav>
        </Reveal>

        <section id="reserve" className="mt-20 scroll-mt-28">
          <Reveal>
            <Eyebrow>1 · Reserving</Eyebrow>
            <h2 className={H2}>The reservation process</h2>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {g.reservation.timeline.map((s, i) => (
              <li key={s.step}>
                <Reveal delay={i * 0.05} className="h-full">
                  <div className={`${card} h-full`}>
                    <p className={`${serif} text-4xl font-medium text-[#f8b800]`}>{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-3 text-[17px] font-semibold">{s.step}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/65">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className={card}>
                <p className="flex items-center gap-2 text-[17px] font-semibold">
                  <ScrollText className="h-5 w-5 text-[#f8b800]" /> Reservation requirements
                </p>
                <List items={g.reservation.requirements} />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className={card}>
                <p className="flex items-center gap-2 text-[17px] font-semibold">
                  <Ban className="h-5 w-5 text-[#e84030]" /> A reservation may be cancelled for
                </p>
                <List items={g.reservation.cancellation} />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="pay" className="mt-20 scroll-mt-28">
          <Reveal>
            <Eyebrow>2 · Paying</Eyebrow>
            <h2 className={H2}>Payment terms and channels</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {g.terms.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05} className="h-full">
                <div className={`${card} h-full`}>
                  <Wallet className="h-6 w-6 text-[#f8b800]" />
                  <p className={`${serif} mt-4 text-2xl font-medium`}>{t.name}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className={card}>
                <p className="text-[17px] font-semibold">Down payment and recurring payments</p>
                <List items={g.payments.recurring} />
                <p className="mt-4 text-sm leading-relaxed text-white/50">{g.payments.ofw}</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className={card}>
                <p className="text-[17px] font-semibold">Balance, fees and one-time payments</p>
                <List items={g.payments.oneTime} />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="finance" className="mt-20 scroll-mt-28">
          <Reveal>
            <Eyebrow>3 · Financing</Eyebrow>
            <h2 className={H2}>Bank, Pag-IBIG or in-house</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal className="h-full">
              <div className={`${card} h-full`}>
                <Landmark className="h-6 w-6 text-[#f8b800]" />
                <p className={`${serif} mt-4 text-2xl font-medium`}>Bank financing</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{g.financing.bank}</p>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Accredited banks</p>
                <p className="mt-2 text-[15px] text-white/80">{g.financing.banks.join(" · ")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.05} className="h-full">
              <div className={`${card} h-full`}>
                <Landmark className="h-6 w-6 text-[#f8b800]" />
                <p className={`${serif} mt-4 text-2xl font-medium`}>Pag-IBIG (HDMF)</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{g.financing.pagibig}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className={`${card} h-full`}>
                <Percent className="h-6 w-6 text-[#f8b800]" />
                <p className={`${serif} mt-4 text-2xl font-medium`}>In-house loan</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{g.financing.inHouse}</p>
                <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {g.financing.inHouseRates.map((r) => (
                    <div key={r.term} className="flex items-center justify-between py-2 text-[15px]">
                      <dt className="text-white/70">{r.term}</dt>
                      <dd className="font-semibold text-[#f8b800]">{r.rate}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="documents" className="mt-20 scroll-mt-28">
          <Reveal>
            <Eyebrow>4 · Documents</Eyebrow>
            <h2 className={H2}>What to prepare</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">Within 30 days of the approved reservation for local buyers, 60 for OFW or international buyers.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["Everyone", g.documents.personal],
              ["Locally employed", g.documents.employed],
              ["Self-employed", g.documents.selfEmployed],
              ["Overseas Filipino workers", g.documents.ofw],
            ].map(([t, items], i) => (
              <Reveal key={t as string} delay={i * 0.05} className="h-full">
                <div className={`${card} h-full`}>
                  <p className="text-[17px] font-semibold">{t as string}</p>
                  <List items={items as string[]} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="fees" className="mt-20 scroll-mt-28">
          <Reveal>
            <Eyebrow>5 · Fees and penalties</Eyebrow>
            <h2 className={H2}>Good to know</h2>
          </Reveal>
          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {g.fees.map((f) => (
              <div key={f.name} className="grid gap-2 py-5 sm:grid-cols-[260px_1fr] sm:gap-8">
                <dt className="text-[17px] font-semibold">{f.name}</dt>
                <dd className="text-[15px] leading-relaxed text-white/65">{f.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Reveal>
          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#f8b800] p-8 text-[#0b0b0f] sm:p-10">
            <div>
              <p className={`${serif} text-3xl font-medium tracking-tight sm:text-4xl`}>Ready to look at a home?</p>
              <p className="mt-2 text-[15px] text-[#0b0b0f]/70">Ask for the price list and unit plans of any community.</p>
            </div>
            <Link href="/#inquire" className="inline-flex items-center gap-2 rounded-full bg-transparent px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#2a2a33]">
              Inquire now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-10 text-xs text-white/35">From the FAQs on weecomm.ph. Payment structures outside these guidelines are subject to the management&apos;s approval; the Reservation Agreement and Contract to Sell prevail.</p>
        </Reveal>
      </main>
      <Footer />
    </SiteShell>
  )
}
