"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

/** A Google static map that bows out quietly (a dark panel with a pin) when the key doesn't allow this site. */
export function StaticMap({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) {
    return (
      <div className={`flex items-center justify-center bg-[#15151c] text-white/25 ${className}`} role="img" aria-label={alt}>
        <MapPin className="h-10 w-10" />
      </div>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} onError={() => setBroken(true)} className={className} />
}
