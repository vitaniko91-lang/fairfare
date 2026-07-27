import { CtaLink, Label } from './primitives'

/**
 * No entrance animation: the h1 is the LCP element and the house motion rules
 * flag mount animations on static headings.
 *
 * The one place the display face runs at full width and weight. Everything
 * after this is quieter by design.
 */
export function Hero() {
  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <Label className="text-redline">Unsolicited redesign · 2026</Label>

        <h1 className="font-display font-bold mt-7 max-w-[15ch] text-display text-balance text-noir">
          An honest booking flow that still sells.
        </h1>

        <p className="mt-9 max-w-[46ch] text-xl leading-snug text-graphite md:text-2xl md:leading-snug">
          Ryanair’s checkout is a masterclass in dark patterns. I rebuilt it without
          them — and kept every place the airline actually makes money. This is a
          working prototype, not a mockup.
        </p>

        <div className="mt-11 flex flex-wrap items-center gap-3">
          <CtaLink to="/book" variant="solid" size="lg">Try the flow →</CtaLink>
          <a
            href="#exhibits"
            className="inline-flex items-center px-6 py-4 text-base font-semibold text-noir underline decoration-noir/25 underline-offset-[6px] transition-colors duration-200 hover:decoration-noir"
          >
            See the evidence
          </a>
        </div>

        <p className="mt-16 max-w-[62ch] font-mono text-[0.6875rem] leading-relaxed text-graphite">
          Unofficial concept by Vitalina Nikulina. Not affiliated with or endorsed by
          Ryanair. Prices are illustrative.
        </p>
      </div>
    </section>
  )
}
