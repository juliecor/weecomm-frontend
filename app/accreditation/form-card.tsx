import Link from "next/link"
import { brandFonts } from "@/lib/brand-fonts"
import { RealtyMark } from "@/components/form"
import { todayManila } from "@/lib/format"
import type { AgreementDoc } from "@/components/agreement-document"
import type { AccreditationDocumentRow } from "./accreditation-form"

/** What Laravel sends for the form, from an invite link or the open form on the website. */
export type AccreditationFormData = {
  developer: { name: string; logo_url: string | null; accent_color: string | null }
  /** Where the invite went; null on the open form. */
  email: string | null
  documents: AccreditationDocumentRow[]
  civil_statuses: string[]
  /** The agreement to sign on the form; null until the developer has set it up. */
  agreement: (AgreementDoc & { signed_copy_days: number }) | null
}

/** Today, and the latest date of birth that still makes the representative an adult. */
export function formDates() {
  const today = todayManila()
  const [year, month, day] = today.split("-")
  return { today, adultBy: `${Number(year) - 18}-${month}-${day}` }
}

/** The accreditation form's page: the developer's colour, its logo and name, then the form (or what went wrong). */
export function FormCard({ developer, eyebrow, children }: { developer: AccreditationFormData["developer"] | null; eyebrow: string; children: React.ReactNode }) {
  return (
    <main style={{ ["--accent" as string]: developer?.accent_color ?? "#4080f0" }} className={`${brandFonts} min-h-screen bg-[#ebe8e2] px-3 py-6 text-[#0f1222] sm:px-6 sm:py-12`}>
      <div className="mx-auto max-w-[880px] border border-[#dde1ec] bg-white shadow-[0_24px_60px_-28px_rgba(23,21,15,0.45)]">
        <div aria-hidden className="h-1.5 bg-[var(--accent)]" />

        {developer && (
          <header className="px-6 pb-9 pt-10 text-center sm:px-14 sm:pt-14">
            <div className="flex justify-center">
              <RealtyMark name={developer.name} logo={developer.logo_url} className="h-16 sm:h-20" />
            </div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#7a8099]">{eyebrow}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{developer.name}</p>
          </header>
        )}

        {children}

        <footer className="border-t border-[#e2e5ef] bg-[#f8f9fc] px-6 py-5 text-center text-xs text-[#7a8099]">
          © {new Date().getFullYear()} {developer?.name ?? "Johndorf Ventures Corporation"} · Powered by jvconline
        </footer>
      </div>
    </main>
  )
}

/** The heading and intro above the form. */
export function FormIntro({ form, children }: { form: AccreditationFormData; children: React.ReactNode }) {
  return (
    <div className="border-t border-[#e2e5ef] px-5 pb-12 pt-10 sm:px-14">
      <h1 className="text-center text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">Realty Accreditation</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-[#4a5070]">
        Tell us about your realty, attach your registration documents{form.agreement ? " and sign the accreditation agreement" : ""}. {form.developer.name} reviews every form and emails you the login for your dashboard once it is accepted.
      </p>
      <div className="mt-12">{children}</div>
    </div>
  )
}

/** When the form can't be shown: why, and the way back to the website. */
export function FormProblem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-6 py-14 text-center sm:px-14">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-[#4a5070]">{children}</p>
      <Link href="/" className="mt-7 inline-block text-sm font-bold text-[var(--accent)] underline-offset-4 hover:underline">
        Go to the Johndorf website
      </Link>
    </div>
  )
}
