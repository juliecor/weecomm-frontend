"use client"

import type { PublicProjectCard } from "@/lib/public-projects-types"
import { SiteHeader } from "../header"
import { CursorFollower } from "../ui"
import { Communities } from "./communities"
import { Footer } from "./footer"
import { Hero } from "./hero"
import { Inquire } from "./inquire"
import { Awards, Footprint, GuideTeaser, Leaders, News, Partners, Signature, Story } from "./sections"

/** The front door: one long page in Wee Comm's own words and photos, with the inquiry form at the end. */
export function Landing({ projects, preselect }: { projects: PublicProjectCard[]; preselect?: string }) {
  return (
    <div id="top" className="relative">
      <div aria-hidden className="wc-grain pointer-events-none fixed z-[70]" />
      <CursorFollower />
      <SiteHeader />
      <Hero />
      <Communities projects={projects} />
      <Signature projects={projects} />
      <Story />
      <Footprint />
      <Leaders />
      <Awards />
      <Partners />
      <GuideTeaser />
      <News />
      <Inquire projects={projects} preselect={preselect} />
      <Footer />
    </div>
  )
}
