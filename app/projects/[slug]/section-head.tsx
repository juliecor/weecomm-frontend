import { Eyebrow, Reveal } from "../../site/ui"
import { serif } from "../../site/tokens"

/** Section opener: title on the left, one line of context (and an optional action) on the right, so the row is full. */
export function SectionHead({ eyebrow, lede, action, children }: { eyebrow: string; lede: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="grid gap-6 border-b-2 border-[#f3f1ea] pb-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={`${serif} mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl`}>{children}</h2>
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end lg:text-right">
          <p className="max-w-md text-[15px] leading-relaxed text-[#b3b2bc]">{lede}</p>
          {action}
        </div>
      </div>
    </Reveal>
  )
}
