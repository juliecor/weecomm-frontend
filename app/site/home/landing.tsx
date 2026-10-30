"use client"

import type { PublicProjectCard } from "@/lib/public-projects-types"
import { SiteHeader } from "../header"
import { Communities } from "./communities"
import { Footer } from "./footer"
import { Hero } from "./hero"
import { Inquire } from "./inquire"
import { Reel } from "./reel"
import { Awards, Figures, Footprint, GuideTeaser, Leaders, News, Partners, Signature, Story } from "./sections"

/** The front door: the opening, then ten numbered chapters in Wee Comm's own words and photos, ending on the inquiry form. */
export function Landing({ projects, preselect }: { projects: PublicProjectCard[]; preselect?: string }) {
  return (
    <div id="top" className="relative">
      <SiteHeader />
      <Hero />
      <Reel projects={projects} />
      <Figures projects={projects.length} />
      <Communities projects={projects} />
      <Signature projects={projects} />
      <Story />
      <Footprint projects={projects} />
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
