import { CtaLink, P, Section } from './primitives'

export function Colophon() {
  return (
    <Section id="colophon" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="max-w-[14ch] text-h2 font-extrabold text-balance text-ink">
        What this is
      </h2>

      <div className="mt-8 space-y-6">
        <P>
          Built in React, TypeScript and Tailwind. The pricing engine is unit-tested —
          the running total is provably correct at every step, which is the whole
          argument, so it seemed worth proving. Flight data is deterministic mock data;
          no real prices, no API, no payment.
        </P>
        <P>Designed and built by one person, from audit to deployed prototype.</P>
      </div>

      <div className="mt-12">
        <CtaLink to="/book" variant="primary" size="lg">Try the flow →</CtaLink>
      </div>
    </Section>
  )
}
