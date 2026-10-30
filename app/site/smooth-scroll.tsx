"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

/**
 * Scrolling with a little inertia, the way the wheel feels on a trackpad, on screens with a mouse.
 * Phones keep their native scrolling, and so does anyone who asked for reduced motion.
 * Anchor links glide to their section (Lenis honours each section's scroll margin).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ lerp: 0.085, anchors: true })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
  return null
}
