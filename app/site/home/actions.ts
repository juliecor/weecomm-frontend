"use server"

import { api, errorMessage } from "@/lib/api"
import { SITE_REALTY } from "@/lib/public-projects-types"

export type InquiryState = { ok?: boolean; error?: string; name?: string; email?: string }

/** The inquiry form: Laravel checks it and emails it to the realty's inbox. */
export async function sendInquiry(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  const text = (k: string) => String(form.get(k) ?? "").trim()
  const body = { name: text("name"), email: text("email"), phone: text("phone") || null, topic: text("topic") || null, message: text("message") }
  if (!body.name || !body.email || !body.message) return { error: "Please fill in your name, email and message." }
  try {
    await api(`/realties/${SITE_REALTY}/inquiries`, { method: "POST", body })
  } catch (e) {
    return { error: errorMessage(e) }
  }
  return { ok: true, name: body.name, email: body.email }
}
