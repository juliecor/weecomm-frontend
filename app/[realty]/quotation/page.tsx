import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, FilePlus2 } from "lucide-react"
import { ApiError, api } from "@/lib/api"
import { brandFonts } from "@/lib/brand-fonts"
import { longDate, php, phpExact, shortDate, sqm } from "@/lib/format"
import type { Quotation, QuotationInput } from "@/lib/quotation"
import { assistantName } from "@/lib/assistant-name"
import { requireRealtyUser } from "@/lib/realty-auth"
import { DownloadPdf, PrintOnOpen } from "../report/report-tools"
import { BuyerName } from "./buyer-name"

const heading = "font-[family-name:var(--font-display),var(--font-geist-sans)] font-bold tracking-tight"

type Props = { params: Promise<{ realty: string }>; searchParams: Promise<{ q?: string; print?: string }> }

/** The terms out of the address (see quotationHref), or null when it's been cut or changed. */
function readInput(q: string | undefined): QuotationInput | null {
  if (!q || q.length > 6000) return null
  try {
    const data = JSON.parse(Buffer.from(q, "base64url").toString("utf8"))
    return data && typeof data === "object" && !Array.isArray(data) ? (data as QuotationInput) : null
  } catch {
    return null
  }
}

// The title is the PDF's file name: "Weecomm quotation for Rosa Cruz".
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { realty } = await params
  const input = readInput((await searchParams).q)
  const name = realty.charAt(0).toUpperCase() + realty.slice(1)
  return { title: { absolute: `${name} quotation${input?.buyer ? ` for ${input.buyer}` : ""}` }, robots: { index: false, follow: false } }
}

/**
 * jvconline.ph/<realty>/quotation — a sample computation to hand a buyer, on an A4 page to print or save
 * as a PDF: the letterhead, who it's for and from, the home, the price, the payment terms and every
 * payment, the project's fee notes, and lines to sign. Opened from the AI's payment card; worked out
 * again here at today's price and plan. ?print=1 opens the print window by itself.
 */
export default async function QuotationPage({ params, searchParams }: Props) {
  const { realty: slug } = await params
  const { q, print } = await searchParams
  const { user, token } = await requireRealtyUser(slug)
  const input = readInput(q)
  if (!input) notFound()
  const accent = user.realty.accent_color ?? "#1f2937"

  let quote: Quotation | null = null
  let problem = ""
  try {
    quote = await api<Quotation>("/realty/quotation", { method: "POST", token, body: input })
  } catch (e) {
    if (!(e instanceof ApiError && (e.status === 404 || e.status === 422))) throw e
    problem = e.message
  }

  const offerHref = quote?.can_offer && quote.unit && quote.project ? `/${slug}/dashboard/offers/new?${new URLSearchParams({ project: String(quote.project.id), unit: String(quote.unit.id), ...(quote.plan_id ? { plan: String(quote.plan_id) } : { terms: JSON.stringify(quote.milestones) }) })}` : null

  return (
    <main className={`${brandFonts} min-h-screen bg-[#e4e8f1] px-3 py-6 text-[#0f1222] sm:px-6 print:bg-white print:p-0`} style={{ ["--accent" as string]: accent }}>
      <style>{`@page { size: A4; margin: 12mm 12mm 14mm; } @media print { html, body { background: #fff; } }`}</style>

      <div className="mx-auto flex max-w-[210mm] flex-col gap-3 pb-5 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/${slug}/dashboard/ai`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2f3450] hover:text-[#0f1222]">
            <ArrowLeft className="h-4 w-4" /> Back to the dashboard
          </Link>
          {quote && (
            <div className="flex flex-wrap gap-2">
              {offerHref && (
                <Link href={offerHref} className="inline-flex items-center gap-2 rounded-xl border border-[#d6dae6] bg-white px-4 py-3 text-[15px] font-bold text-[#0f1222] transition hover:border-[#0f1222]">
                  <FilePlus2 className="h-5 w-5" /> Make offer
                </Link>
              )}
              <DownloadPdf />
            </div>
          )}
        </div>
        {quote && <p className="text-sm text-[#4a5070]">Check the buyer&apos;s name under &ldquo;Prepared for&rdquo; (you can type it in). Then Download PDF and choose &ldquo;Save as PDF&rdquo; in the print window.</p>}
      </div>

      {quote ? (
        <article className="mx-auto max-w-[210mm] bg-white px-5 py-6 shadow-[0_30px_70px_-30px_rgba(23,21,15,0.55)] [print-color-adjust:exact] [-webkit-print-color-adjust:exact] sm:px-[12mm] sm:py-[12mm] print:max-w-none print:p-0 print:shadow-none">
          <Sheet quote={quote} />
        </article>
      ) : (
        <div className="mx-auto max-w-xl rounded-2xl bg-white px-6 py-12 text-center">
          <h1 className={`${heading} text-2xl`}>This quotation can&apos;t be made</h1>
          <p className="mt-3 text-[#4a5070]">{problem || `Ask ${assistantName(user.realty.name)} to work the payments out again.`}</p>
        </div>
      )}
      {quote && print === "1" && <PrintOnOpen />}
    </main>
  )
}

function Sheet({ quote: x }: { quote: Quotation }) {
  const monthly = x.schedule.find((r) => r.months && r.monthly)
  const contact = [x.realty.address, x.realty.phone, x.realty.email].filter(Boolean)
  const photo = x.unit?.photo ?? x.project?.photo ?? null
  const facts: [string, string | null][] = x.unit
    ? [
        ["House model", x.unit.model],
        ["Lot area", x.unit.lot_area_sqm ? sqm(x.unit.lot_area_sqm) : null],
        ["Floor area", x.unit.floor_area_sqm ? sqm(x.unit.floor_area_sqm) : null],
        ["Floor", x.unit.floor],
        ["Lot features", x.unit.features.length ? x.unit.features.join(", ") : null],
        ["Turnover", x.project?.completion_date ? longDate(x.project.completion_date) : null],
      ]
    : [["Turnover", x.project?.completion_date ? longDate(x.project.completion_date) : null]]
  const shown = facts.filter(([, v]) => v)

  return (
    <div className="text-[12.5px] leading-relaxed text-[#2b2822]">
      {/* Letterhead */}
      <header className="flex flex-col gap-4 border-b-[3px] border-[var(--accent)] pb-5 sm:flex-row sm:items-start sm:justify-between print:flex-row print:items-start print:justify-between">
        <div className="min-w-0">
          {x.realty.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={x.realty.logo_url} alt={x.realty.name} className="h-12 w-auto max-w-[200px] object-contain" />
          ) : (
            <p className={`${heading} text-xl`}>{x.realty.name}</p>
          )}
          <p className="mt-2 text-[11px] font-semibold text-[#2f3450]">{x.realty.name}</p>
          {contact.length > 0 && <p className="text-[10.5px] text-[#5b6283]">{contact.join(" · ")}</p>}
        </div>
        <div className="sm:text-right print:text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Quotation</p>
          <h1 className={`${heading} mt-1 text-[26px] leading-tight text-[#0f1222]`}>Sample computation</h1>
          <p className="mt-0.5 text-[11.5px] text-[#4a5070]">
            Ref. {x.prepared.reference} · {longDate(x.prepared.at)}
          </p>
        </div>
      </header>

      {/* For and from */}
      <div className="mt-4 grid gap-5 sm:grid-cols-2 print:grid-cols-2">
        <div>
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#7a8099]">Prepared for</p>
          <div className="mt-1">
            <BuyerName initial={x.buyer} />
          </div>
        </div>
        <div>
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#7a8099]">Prepared by</p>
          <p className="mt-1 text-[14px] font-bold text-[#0f1222]">{x.prepared.by}</p>
          <p className="text-[11px] text-[#4a5070]">{[x.prepared.phone, x.prepared.email].filter(Boolean).join(" · ")}</p>
        </div>
      </div>

      {/* The home */}
      <section className="mt-5 overflow-hidden rounded-xl border border-[#e2e5ef] [break-inside:avoid]">
        <div className="flex flex-col sm:flex-row print:flex-row">
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" className="h-48 w-full object-cover sm:h-auto sm:max-h-[190px] sm:w-[38%] print:h-[40mm] print:max-h-none print:w-[38%]" />
          )}
          <div className="min-w-0 flex-1 p-4">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">The home</p>
            <h2 className={`${heading} mt-1 text-[20px] leading-tight text-[#0f1222]`}>{x.unit?.name ?? x.project?.name ?? "Price quotation"}</h2>
            {x.project && (
              <p className="text-[12px] text-[#4a5070]">
                {x.unit ? x.project.name : null}
                {x.unit && x.project.location ? " · " : ""}
                {x.project.location}
              </p>
            )}
            {shown.length > 0 && (
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 print:grid-cols-3">
                {shown.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#7a8099]">{k}</dt>
                    <dd className="font-semibold text-[#0f1222]">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* The price and the terms */}
      <section className="mt-4 grid gap-px overflow-hidden rounded-xl border border-[#e2e5ef] bg-[#e2e5ef] sm:grid-cols-3 print:grid-cols-3 [break-inside:avoid]">
        <div className="bg-[#0f1222] px-4 py-3.5 text-white">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/70">Total contract price</p>
          <p className={`${heading} mt-1 text-[24px] leading-none tabular-nums`}>{php(x.price)}</p>
          {x.price_from_model && <p className="mt-1.5 text-[10.5px] text-white/70">The {x.unit?.model ?? "house model"}&apos;s price</p>}
        </div>
        <div className="bg-white px-4 py-3.5">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#7a8099]">Payment terms</p>
          <p className="mt-1 text-[14px] font-bold text-[#0f1222]">{x.terms}</p>
          <p className="text-[11px] text-[#5b6283]">From {longDate(x.purchase_date)}</p>
        </div>
        <div className="bg-white px-4 py-3.5">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#7a8099]">{monthly ? "Monthly" : "Payments"}</p>
          {monthly ? (
            <>
              <p className={`${heading} mt-1 text-[20px] leading-none tabular-nums text-[var(--accent)]`}>{phpExact(monthly.monthly as number)}</p>
              <p className="mt-1 text-[11px] text-[#5b6283]">
                for {monthly.months} months · {monthly.label.toLowerCase()}
              </p>
            </>
          ) : (
            <p className="mt-1 text-[14px] font-bold text-[#0f1222]">
              {x.schedule.length} payment{x.schedule.length === 1 ? "" : "s"}
            </p>
          )}
        </div>
      </section>

      {/* Every payment */}
      <section className="mt-5">
        <h3 className={`${heading} mb-2 flex items-center gap-2.5 text-[15px] text-[#0f1222] [break-after:avoid] before:h-4 before:w-1 before:rounded-full before:bg-[var(--accent)]`}>Payment schedule</h3>
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0 print:mx-0 print:overflow-visible print:px-0">
          <table className="w-full min-w-[520px] border-collapse text-[11.5px] sm:min-w-0 print:min-w-0">
            <thead>
              <tr className="border-b-2 border-[#0f1222] text-left text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#4a5070]">
                <th className="py-1.5 pr-2">Payment</th>
                <th className="px-2 py-1.5 text-right">Share</th>
                <th className="px-2 py-1.5">When</th>
                <th className="py-1.5 pl-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {x.schedule.map((r, i) => (
                <tr key={i} className="border-b border-[#e8ebf3] align-top [break-inside:avoid]">
                  <td className="py-2 pr-2 font-bold text-[#0f1222]">{r.label}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{r.percent}%</td>
                  <td className="px-2 py-2 text-[#2f3450]">
                    {r.months && r.monthly ? (
                      <>
                        {r.months} monthly payments of <b className="text-[#0f1222]">{phpExact(r.monthly)}</b>
                        <span className="block text-[10.5px] text-[#5b6283]">
                          {shortDate(r.date)} to {shortDate(r.end_date)}
                          {r.last_month && r.last_month !== r.monthly ? ` · the last one ${phpExact(r.last_month)}` : ""}
                        </span>
                      </>
                    ) : r.date ? (
                      r.date === x.purchase_date ? (
                        `On purchase, ${shortDate(r.date)}`
                      ) : (
                        shortDate(r.date)
                      )
                    ) : (
                      "On turnover (date to be announced)"
                    )}
                  </td>
                  <td className="py-2 pl-2 text-right font-bold tabular-nums text-[#0f1222]">{phpExact(r.amount)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-[#0f1222] font-bold text-[#0f1222]">
                <td className="py-2 pr-2">Total</td>
                <td className="px-2 py-2 text-right tabular-nums">100%</td>
                <td />
                <td className="py-2 pl-2 text-right tabular-nums">{phpExact(x.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {x.project?.fee_notes && (
        <section className="mt-4 [break-inside:avoid]">
          <h3 className={`${heading} mb-1.5 text-[13px] text-[#0f1222]`}>Other fees</h3>
          <p className="whitespace-pre-line text-[11.5px] text-[#2f3450]">{x.project.fee_notes}</p>
        </section>
      )}

      <p className="mt-4 border-l-2 border-[#d6dae6] pl-3 text-[10px] leading-snug text-[#5b6283] [break-inside:avoid]">
        <b className="text-[#2f3450]">Please note:</b> this is a sample computation to help you plan, not a reservation or a contract. Prices, terms and availability can change until the home is
        reserved. Amounts are in Philippine pesos; each part&apos;s last payment carries the centavo rounding.
      </p>

      {/* Signatures */}
      <div className="mt-7 grid grid-cols-2 gap-10 [break-inside:avoid]">
        <div>
          <div className="h-7 border-b border-[#0f1222]" />
          <p className="mt-1.5 text-[12px] font-bold text-[#0f1222]">{x.prepared.by}</p>
          <p className="text-[10.5px] text-[#5b6283]">Prepared by</p>
        </div>
        <div>
          <div className="h-7 border-b border-[#0f1222]" />
          <p className="mt-1.5 text-[12px] font-bold text-[#0f1222]">Conforme</p>
          <p className="text-[10.5px] text-[#5b6283]">Buyer&apos;s signature over printed name, and date</p>
        </div>
      </div>

      <footer className="mt-4 border-t border-[#e2e5ef] pt-2 text-[10px] text-[#7a8099]">
        {x.realty.name} · Prepared {longDate(x.prepared.at)} on jvconline.ph
      </footer>
    </div>
  )
}
