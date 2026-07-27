import { Exhibit, type After, type Before } from './Exhibit'
import { Label, P, Section, Strong, UiQuote } from './primitives'

type Entry = {
  n: string
  pattern: string
  where: string
  quote: string[]
  before: Before
  after: After
  body: React.ReactNode
}

const A = (img: string, alt: string): After => ({ kind: 'shot', img, alt })

const ENTRIES: Entry[] = [
  {
    n: '01',
    pattern: 'Confirmshaming',
    where: 'Homepage',
    quote: ['"Why are you not subscribed?"'],
    before: {
      img: 'audit/01-home-newsletter-guilt.webp',
      alt: 'The Ryanair homepage with a newsletter panel pinned to the lower-right corner, headed "Why are you not subscribed?".',
      callouts: [
        { x: 77, y: 46, text: 'presumes you are at fault' },
        { x: 97, y: 46, text: 'no dismiss control — there is no close button' },
      ],
    },
    after: {
      kind: 'gone',
      statement: 'No newsletter capture anywhere in the flow. Nothing competes with the task you came to do.',
    },
    body: (
      <P>
        The headline presumes you are at fault and asks you to account for it. There is no
        dismiss control; the panel holds the lower-right corner for the whole session.
      </P>
    ),
  },
  {
    n: '02',
    pattern: 'Sneaking',
    where: 'Search',
    quote: ['"By clicking search you agree to the Website Terms of Use"'],
    before: {
      img: 'audit/02-search-implicit-terms.webp',
      alt: 'The Ryanair search widget with an unchecked checkbox beside text stating that clicking search constitutes agreement to the terms of use.',
      callouts: [{ x: 71, y: 31, text: 'unchecked box, agreement already claimed' }],
    },
    after: A(
      'walkthrough/1-search.webp',
      'The FAIRFARE search screen: from, to, date and passengers, and no consent gate of any kind.',
    ),
    body: (
      <P>
        An unchecked checkbox sits next to a sentence saying that searching <em>already</em>{' '}
        constitutes agreement. The box implies a choice the copy has removed. Checking a price
        is not a moment that should require accepting terms — so here it doesn’t. Terms are
        surfaced once, at payment, where a commitment is actually made.
      </P>
    ),
  },
  {
    n: '03',
    pattern: 'Manufactured scarcity',
    where: 'Results',
    quote: ['"2 seats left at this price"'],
    before: {
      img: 'audit/03-results-scarcity.webp',
      alt: 'Ryanair search results, with a badge reading "2 seats left at this price" above the Select button of the first flight.',
      callouts: [{ x: 84, y: 66, text: 'unverifiable, and not what it sounds like' }],
    },
    after: A(
      'walkthrough/2-flights-list.webp',
      'The FAIRFARE results list: departure and arrival times, duration, flight number and a final fare per row — no badges, no countdowns.',
    ),
    body: (
      <P>
        Per flight row, unverifiable, and not what it sounds like — <UiQuote>this price</UiQuote>{' '}
        is a fare bucket, not the number of empty seats on the aircraft. It exists to shorten
        your thinking. The rebuilt list carries times, duration and a fare, and nothing else.
      </P>
    ),
  },
  {
    n: '04',
    pattern: 'Misdirection',
    where: 'Fare table',
    quote: ['"Continue with basic for €70.99"'],
    before: {
      img: 'audit/05-fare-matrix-no-basic-column.webp',
      alt: 'The Ryanair fare comparison table showing Regular, Plus and Flexi Plus as columns with photography and star badges — Basic has no column at all.',
      callouts: [
        { x: 44, y: 26, text: 'star badge + "up to 5% off"' },
        { x: 41, y: 57, text: 'struck price you were never offered' },
        { x: 20, y: 74, text: 'no Basic column to compare against' },
      ],
    },
    after: A(
      'walkthrough/2-flights-fare.webp',
      'The FAIRFARE fare step: Basic, Regular and Plus as three equal columns with full perk lists and real prices, and the running total already visible.',
    ),
    body: (
      <>
        <P>
          The structural one. <Strong>Basic isn’t a column in the comparison table.</Strong> It
          sits above the table as a plain white strip with an outline button, while Regular, Plus
          and Flexi Plus get photography, coloured headers, star badges and filled buttons — and
          the feature matrix has columns only for them. You cannot compare the cheapest option
          against the others in one glance, because it was architecturally removed from the
          comparison.
        </P>
        <P>
          Alongside it, false anchoring: <UiQuote>"UP TO 5% OFF!"</UiQuote> over struck-through
          add-on prices — a discount against a reference price you were never offered.
        </P>
        <P>
          Rebuilt: one matrix, three equal columns, same size and weight, full perk list, real
          prices. No badges, no strike-throughs, no “most popular”, no pre-selection.
        </P>
      </>
    ),
  },
  {
    n: '05',
    pattern: 'Confirmshaming + loss framing',
    where: 'After you choose',
    quote: [
      '"REGULAR is ideal for your trip!"',
      '"Basic does not include a 10kg overhead locker bag, priority boarding or seat selection."',
    ],
    before: {
      img: 'audit/06-interstitial-upsell-red-x.webp',
      alt: 'A full-screen Ryanair modal comparing Basic and Regular, with red crosses against the Basic option the user has just chosen and a large filled "Switch to Regular" button.',
      callouts: [
        { x: 54, y: 70, text: 'red ✗ on the option you chose' },
        { x: 68, y: 92, text: 'filled button is the upsell' },
      ],
    },
    after: A(
      'walkthrough/3-seats.webp',
      'What FAIRFARE shows instead: the seats screen, reached directly, with Skip as the emphasised action.',
    ),
    body: (
      <>
        <P>
          You already chose. The flow stops you to argue with the choice. Basic’s rows get{' '}
          <span className="font-semibold text-redline">red ✗ marks</span>; your selection is
          rendered as a list of failures. <UiQuote>"Continue with Basic"</UiQuote> is a pale
          outline button next to a large filled yellow <UiQuote>"Switch to Regular"</UiQuote>.
          And <UiQuote>"only €27.56 more"</UiQuote> is 39% of the fare.
        </P>
        <P>
          There is no interstitial in the rebuild. A choice, once made, is executed — the next
          thing you see is the next step.
        </P>
      </>
    ),
  },
  {
    n: '06',
    pattern: 'Forced action',
    where: 'The login wall',
    quote: ['"Log in to myRyanair to proceed with your booking"'],
    before: {
      img: 'audit/08-forced-login-wall.webp',
      alt: 'A Ryanair panel demanding login to proceed, with the passenger form greyed out behind it and a small "Log in later" text link below two large filled buttons.',
      callouts: [
        { x: 50, y: 57, text: 'the escape hatch — and it did not work' },
        { x: 28, y: 88, text: 'passenger form disabled' },
      ],
    },
    after: A(
      'walkthrough/5-pay.webp',
      'FAIRFARE guest checkout: passenger name and email only, no account required, with the itemized total unchanged beside the form.',
    ),
    body: (
      <>
        <P>
          The passenger form renders greyed out behind it. Two large filled buttons say Sign up
          and Log in; the escape hatch, <UiQuote>"Log in later"</UiQuote>, is a small text link
          on the row below.
        </P>
        <P>
          <Strong>And it didn’t work.</Strong> I clicked it three times — twice by position, once
          by resolved element reference. The panel stayed, the fields stayed disabled, the
          Continue button stayed grey. I could not complete a booking as a guest, which is where
          this audit ended.
        </P>
        <P>
          Bug or intent, the effect on a customer is identical: at the point of maximum
          commitment, you’re asked for an account. Note what it’s sold on —{' '}
          <UiQuote>"Retrieve saved companion and payment details."</UiQuote> Data collection,
          framed as convenience.
        </P>
      </>
    ),
  },
]

export function Exhibits() {
  return (
    <Section id="exhibits" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Label className="text-redline">The evidence</Label>
      <h2 className="font-display-wide mt-5 max-w-[16ch] text-h2 text-balance text-noir">
        Six patterns, each with its own name.
      </h2>
      <P className="mt-6">
        Dublin → Milan Bergamo, one way, one adult, cheapest fare. Chrome, 1440×900, July 2026.
        I never completed the booking. Red marks a pattern; the right-hand column never has any.
      </P>

      <ol className="mt-14 space-y-14 md:mt-16 md:space-y-20">
        {ENTRIES.map(e => (
          <Exhibit
            key={e.n}
            n={e.n}
            pattern={e.pattern}
            where={e.where}
            quote={e.quote}
            before={e.before}
            after={e.after}
          >
            {e.body}
          </Exhibit>
        ))}
      </ol>

      <aside className="mt-16 border border-hair bg-white/60 p-6 md:p-8">
        <Label className="text-graphite">Note on the remaining steps</Label>
        <P className="mt-4">
          Seats, Bags, Extras and Review &amp; Pay aren’t shown here — the login wall ended the
          walk, and inventing before-images for them is the one dishonesty a case about honesty
          cannot afford. What Ryanair’s own progress bar already tells you stands on its own:
        </P>
        <p className="mt-5 font-mono text-[0.8125rem] text-noir">
          Flights → Seats → Bags → Extras → Review &amp; Pay
        </p>
        <P className="mt-5">
          Four separate opportunities to add cost between choosing a flight and paying for it.
        </P>
      </aside>
    </Section>
  )
}
