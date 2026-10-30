"use client"

import { useRouter, useSearchParams } from "next/navigation"

/** "All realties" or one of them, kept in ?realty=<id>. Changing it reloads the list. */
export function RealtyFilter({ realties }: { realties: { id: number; name: string }[] }) {
  const router = useRouter()
  const params = useSearchParams()
  const value = params.get("realty") ?? ""
  return (
    <select
      value={value}
      onChange={(e) => router.replace(e.target.value ? `?realty=${e.target.value}` : "?")}
      aria-label="Realty"
      className={`rounded-xl block w-full min-w-[220px] border bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] sm:w-auto ${value ? "border-[#0f1222] font-bold text-[#0f1222]" : "border-[#d6dae6] font-semibold text-[#4a5070]"}`}
    >
      <option value="">All realties</option>
      {realties.map((r) => (
        <option key={r.id} value={r.id}>
          {r.name}
        </option>
      ))}
    </select>
  )
}
