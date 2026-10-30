import Link from "next/link"

/**
 * The realty dashboard's building blocks. One look for every realty, tinted by
 * its own brand colour (--accent, set on the shell) — hairlines and type, not
 * a grid of identical cards.
 */

/** Headline type for the dashboard: the brand serif, bold (the brand sans for the rest). */
export const display = "font-[family-name:var(--font-display),var(--font-geist-sans)] font-bold"

/** A card's title: the brand serif, a size up. */
export const cardTitle = "font-[family-name:var(--font-display),var(--font-geist-sans)] text-[19px] font-bold tracking-tight text-[#0f1222]"

export function PageHeader({ eyebrow, title, lede, action }: { eyebrow?: string; title: string; lede?: string; action?: React.ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">{eyebrow}</p>}
        <h1 className={`${display} mt-2 text-3xl tracking-tight text-[#0f1222] sm:text-4xl`}>{title}</h1>
        {lede && <p className="mt-2 max-w-2xl text-[15px] text-[#4a5070]">{lede}</p>}
      </div>
      {action && <div className="flex shrink-0 flex-wrap gap-2">{action}</div>}
    </header>
  )
}

/** A row of big numbers, each on its own white card. */
export function Ledger({ items }: { items: { label: string; value: string | number; note?: string; href?: string }[] }) {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {items.map((it) => {
        const body = (
          <>
            <dd className={`${display} tabular-nums tracking-tight text-[#0f1222] ${String(it.value).length > 8 ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>{typeof it.value === "number" ? it.value.toLocaleString("en-PH") : it.value}</dd>
            <dt className="mt-1 text-sm font-semibold text-[#0f1222] sm:text-[15px]">{it.label}</dt>
            {it.note && <dd className="mt-0.5 text-[13px] text-[#5b6283] sm:text-sm">{it.note}</dd>}
          </>
        )
        const cls = "flex flex-col rounded-2xl border border-[#e8eaed] bg-white shadow-[0_2px_12px_-2px_rgba(23,21,15,0.06)] p-4 transition-shadow hover:shadow-[0_6px_22px_-4px_rgba(23,21,15,0.12)] sm:p-5"
        return it.href ? (
          <Link key={it.label} href={it.href} className={`${cls} outline-none transition hover:border-[#0f1222] focus-visible:ring-2 focus-visible:ring-[var(--accent)]`}>
            {body}
          </Link>
        ) : (
          <div key={it.label} className={cls}>
            {body}
          </div>
        )
      })}
    </dl>
  )
}

/** A white card with a title bar — lists and forms live inside. */
export function Panel({ title, aside, children, className = "" }: { title: string; aside?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`mt-8 rounded-2xl border border-[#e8eaed] bg-white shadow-[0_2px_12px_-2px_rgba(23,21,15,0.06)] ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-[#eef0f6] px-5 py-4">
        <h2 className={cardTitle}>{title}</h2>
        {aside && <div className="text-sm text-[#5b6283]">{aside}</div>}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  )
}

/** Row list inside a Panel: hairlines between rows. */
export function Rows({ children }: { children: React.ReactNode }) {
  return <ul className="-my-4 divide-y divide-[#eceef5]">{children}</ul>
}

export function Row({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return <li className={`flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between ${muted ? "opacity-60" : ""}`}>{children}</li>
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="py-6 text-center text-[15px] text-[#7a8099]">{children}</p>
}

export function Tag({ tone = "neutral", children }: { tone?: "neutral" | "good" | "warn" | "bad" | "accent"; children: React.ReactNode }) {
  const tones = {
    neutral: "border-[#e2e5ef] text-[#5b6283]",
    good: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warn: "border-amber-200 bg-amber-50 text-amber-700",
    bad: "border-red-200 bg-red-50 text-red-700",
    accent: "border-[var(--accent)] text-[var(--accent)]",
  }
  return <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${tones[tone]}`}>{children}</span>
}

export const btn = {
  primary: "inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-[15px] font-bold text-white transition hover:brightness-110 disabled:opacity-60",
  ghost: "inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#d6dae6] bg-white px-3 py-2 text-xs font-semibold text-[#0f1222] transition hover:border-[#0f1222] disabled:opacity-60",
  /** A row's own action: flat, bordered, bold ("View", "Open"). */
  outline: "inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#d6dae6] bg-white px-3.5 py-2.5 text-sm font-bold text-[#0f1222] transition hover:border-[#0f1222] disabled:opacity-60",
}

export const field = "mt-1.5 block w-full rounded-xl border border-[#d6dae6] bg-white px-3.5 py-2.5 text-[15px] text-[#0f1222] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 disabled:bg-[#f3f5fa] disabled:text-[#7a8099]"
