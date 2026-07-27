import type { ReactNode } from 'react'
import { Eyebrow, P, Section } from './primitives'

type Step = { n: string; title: string; refs?: string; body: ReactNode; img: string; alt: string }

const STEPS: Step[] = [
  {
    n: '01',
    img: '1-search',
    alt:
      'The FAIRFARE search screen: from, to, date and passengers, with the promise that the price on the next screen is the price you pay.',
    title: 'Search',
    refs: 'Principle 01',
    body: (
      <P>
        One-way search with the honest promise stated up front: the price on the next
        screen is the price you can pay.
      </P>
    ),
  },
  {
    n: '02',
    img: '2-flights-fare',
    alt:
      'The fare step: Basic, Regular and Plus as three equal columns with full perk lists, Regular selected, and the running total already showing 57.60 euros.',
    title: 'Flights & fare',
    refs: 'Fixes 04 and 05 · Principles 02, 04',
    body: (
      <P>
        One matrix. Basic, Regular and Plus as equal columns, same size, same weight,
        full perk list, real prices. No badges, no strike-throughs, no “most popular”,
        no pre-selection. Choose and continue — there is no interstitial.
      </P>
    ),
  },
  {
    n: '03',
    img: '3-seats',
    alt:
      'The seats screen with no seats chosen: the filled yellow button is Skip for free seats at check-in, and Continue is the quiet outline button.',
    title: 'Seats',
    refs: 'Principles 03, 04',
    body: (
      <P>
        The skip button sits above the map, not hidden under it, and says what skipping
        actually gets you: free seats assigned at check-in. Honest about the trade-off —
        groups are usually seated together, not guaranteed — without turning it into a
        threat. Every seat shows its price and its zone; seats included in your fare
        read €0.00, not “free”.
      </P>
    ),
  },
  {
    n: '04',
    img: '4-extras',
    alt:
      'The extras screen: five options, none pre-ticked, with the 10kg cabin bag marked as already included in the chosen fare.',
    title: 'Extras',
    refs: 'Principle 03',
    body: (
      <P>
        One screen instead of a cascade. Nothing pre-ticked. Options included in your
        fare are shown as already-included rather than as things to buy again. Each has
        a plain description of what it is, including the honest note that a checked bag
        genuinely does cost more at the airport — because that one is true, and saying
        true things is the point.
      </P>
    ),
  },
  {
    n: '05',
    img: '5-pay',
    alt:
      'Guest checkout: passenger name and email only, a clearly labelled demo card field, and the itemized total unchanged at 70.60 euros.',
    title: 'Pay',
    refs: 'Principles 01, 05',
    body: (
      <P>
        Guest checkout. Name, email, done. The full breakdown sits beside the form,
        itemized to the cent, and it’s the same number that’s been on screen since step
        one.
      </P>
    ),
  },
  {
    n: '06',
    img: '6-confirmed',
    alt:
      'The confirmation screen listing route, date, flight, passenger, fare and seat, with the total paid matching the running total exactly.',
    title: 'Confirmed',
    body: (
      <P>
        The booking, the price, what you did and didn’t buy.{' '}
        <em className="italic">Now</em> an account is offered — to manage this booking.
      </P>
    ),
  },
]

export function Walkthrough() {
  return (
    <Section id="after" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Eyebrow className="text-navy">After</Eyebrow>
      <h2 className="mt-5 max-w-[18ch] text-h2 font-extrabold text-balance text-ink">
        The same six steps, rebuilt.
      </h2>

      <ol className="mt-16 space-y-16 md:mt-20 md:space-y-20">
        {STEPS.map(step => (
          <li
            key={step.n}
            className="grid items-start gap-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12"
          >
            <div>
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-navy">
                {step.n} · {step.title}
              </h3>
              <div className="mt-5">{step.body}</div>
              {step.refs && (
                <p className="mt-5 inline-block rounded border border-line bg-white px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-body">
                  {step.refs}
                </p>
              )}
            </div>

            <figure className="overflow-hidden rounded-xl border border-line bg-white">
              <img
                src={`walkthrough/${step.img}.webp`}
                alt={step.alt}
                width={1568}
                height={760}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </figure>
          </li>
        ))}
      </ol>
    </Section>
  )
}
