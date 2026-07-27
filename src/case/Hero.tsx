import { CtaLink, Eyebrow } from './primitives'

/**
 * No entrance animation here on purpose: the h1 is the LCP element and the
 * house motion rules flag mount animations on static headings.
 */
export function Hero() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <Eyebrow className="text-navy">Unsolicited redesign · 2026</Eyebrow>

        <h1 className="mt-6 max-w-[16ch] text-display font-extrabold text-balance text-ink">
          An honest booking flow that still sells.
        </h1>

        <p className="mt-8 max-w-[54ch] text-xl leading-relaxed text-body md:text-2xl md:leading-relaxed">
          Ryanair’s checkout is a masterclass in dark patterns. I rebuilt it without
          them — and kept every place the airline actually makes money. This is a
          working prototype, not a mockup.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <CtaLink to="/book" variant="primary" size="lg">Try the flow →</CtaLink>
          <a
            href="#problem"
            className="inline-flex items-center rounded-md px-4 py-4 text-base font-semibold text-navy underline decoration-navy/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-navy"
          >
            Read the reasoning
          </a>
        </div>

        <p className="mt-14 max-w-[62ch] text-xs leading-relaxed text-body">
          Unofficial concept by Vitalina Nikulina. Not affiliated with or endorsed by
          Ryanair. Prices are illustrative.
        </p>
      </div>
    </section>
  )
}
