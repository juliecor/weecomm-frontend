import { Fraunces, Manrope } from "next/font/google"

/**
 * Wee Comm's type on the dashboard, sign-in, offers and printable pages, the same as the website:
 * Fraunces for headings (the dashboard's display font) and Manrope for everything else.
 */
export const brandSerif = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-display" })
export const brandSans = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-brand-sans" })
export const brandFonts = `${brandSerif.variable} ${brandSans.variable} font-[family-name:var(--font-brand-sans)]`
