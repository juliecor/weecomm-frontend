"use client"

import { Printer } from "lucide-react"

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 bg-[#0f1222] px-5 py-3 text-[15px] font-bold text-white hover:bg-[#2f3450]">
      <Printer className="h-5 w-5" /> Print
    </button>
  )
}
