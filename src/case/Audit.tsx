import type { ReactNode } from 'react'
import { Eyebrow, P, Section, UiQuote, UiQuoteBlock } from './primitives'

type Shot = { src: string; alt: string; caption: string; eager?: boolean }

type Pattern = {
  n: string
  name: string
  where: string
  quote: string[]
  shots: Shot[]
  body: ReactNode
  showpiece?: boolean
}

// base: './' in vite.config.ts — these must stay relative.
const PATTERNS: Pattern[] = [
  {
    n: '01',
    name: 'Confirmshaming',
    where: 'Homepage',
    quote: ['"Why are you not subscribed?"'],
    shots: [{
      src: 'audit/01-home-newsletter-guilt.webp',
      alt: 'Ryanair homepage. A blue panel pinned to the lower-right corner reads “Why are you not subscribed?” above an email field and a yellow “Sign me up!” button, overlapping the promotional banner beneath it. The panel carries no close control.',
      caption: 'Ryanair.com homepage — the panel is present from first paint and stays for the session.',
      eager: true,
    }],
    body: (
      <P>
        The headline presumes you’re at fault and asks you to account for it. There’s
        no dismiss control; the panel occupies the lower-right corner for the whole
        session.
      </P>
    ),
  },
  {
    n: '02',
    name: 'Sneaking',
    where: 'Search',
    quote: ['"By clicking search you agree to the Website Terms of Use"'],
    shots: [{
      src: 'audit/02-search-implicit-terms.webp',
      alt: 'The Ryanair search widget filled in with Dublin to Milan Bergamo, Wed 16 Sept, 1 Adult, next to a yellow Search button. To the right of the button sits an empty, unchecked checkbox beside the sentence “By clicking search you agree to the Website Terms of Use”.',
      caption: 'The checkbox and the sentence beside it contradict each other.',
    }],
    body: (
      <P>
        An unchecked checkbox sits next to a sentence stating that searching{' '}
        <em className="italic">already</em> constitutes agreement. The checkbox implies
        a choice the copy has removed. Checking a price is not a moment that should
        require accepting terms.
      </P>
    ),
  },
  {
    n: '03',
    name: 'Manufactured scarcity',
    where: 'Results',
    quote: ['"2 seats left at this price"'],
    shots: [{
      src: 'audit/03-results-scarcity.webp',
      alt: 'Search results for Dublin to Milan Bergamo. A date strip advertises €70.99 for 16 Sept, while the first flight row below it — the 06:15 — is priced €79.74 and carries a small blue badge reading “2 seats left at this price” directly above its Select button.',
      caption: 'Applied per flight row, with nothing to verify it against.',
    }],
    body: (
      <P>
        Per flight row, unverifiable, and not what it sounds like — “this price” is a
        fare bucket, not the number of empty seats on the aircraft. It exists to
        shorten your thinking.
      </P>
    ),
  },
  {
    n: '04',
    name: 'Misdirection',
    where: 'Fare table',
    quote: ['"Continue with basic for €70.99"'],
    shots: [
      {
        src: 'audit/04-fare-basic-demoted.webp',
        alt: 'The “Choose your fare” step. BASIC sits above the fare table as a single plain white strip with a small outline button reading “Continue with basic for €70.99”. Below it, the paid tiers begin as photographed cards with yellow and blue “UP TO 5% OFF!” banners.',
        caption: 'Basic, above the table: a white strip and an outline button.',
      },
      {
        src: 'audit/05-fare-matrix-no-basic-column.webp',
        alt: 'The fare comparison matrix, scrolled down. Columns for REGULAR, PLUS and FLEXI PLUS carry photography, “UP TO 5% OFF!” headers and struck-through prices such as +€29.00 reduced to +€27.56. The feature rows — small bag, reserved seat, priority boarding, 10kg locker bag — have no Basic column.',
        caption: 'The same table, scrolled: three columns, and Basic is not one of them.',
      },
    ],
    body: (
      <>
        <P>
          The structural one.{' '}
          <strong className="font-semibold text-ink">
            Basic isn’t a column in the comparison table.
          </strong>{' '}
          It sits above the table as a plain white strip with an outline button, while
          Regular, Plus and Flexi Plus get photography, coloured headers, star badges
          and filled buttons — and the feature matrix has columns only for them. You
          cannot compare the cheapest option against the others in one glance, because
          it was architecturally removed from the comparison.
        </P>
        <P className="mt-5">
          Alongside it, false anchoring: <UiQuote>"UP TO 5% OFF!"</UiQuote> over
          struck-through add-on prices (<s className="text-body">+€29.00</s>{' '}
          <span className="font-semibold text-ink">+€27.56</span>) — a discount against
          a reference price you were never offered.
        </P>
      </>
    ),
  },
  {
    n: '05',
    name: 'Confirmshaming + loss framing',
    where: 'After you choose',
    showpiece: true,
    quote: [
      '"REGULAR is ideal for your trip!"',
      '"Basic does not include a 10kg overhead locker bag, priority boarding or seat selection."',
    ],
    shots: [{
      src: 'audit/06-interstitial-upsell-red-x.webp',
      alt: 'A full-screen modal fired after choosing Basic. The headline reads “REGULAR is ideal for your trip!”. Two columns compare BASIC and REGULAR: Basic’s rows for reserved seat, priority boarding and 10kg locker bag are marked with large red crosses, Regular’s with blue ticks. At the foot, a pale outline “Continue with Basic” sits beside a large filled yellow “Switch to Regular”.',
      caption: 'Fired after the choice was made, not before it.',
    }],
    body: (
      <>
        <P>
          You already chose. The flow stops you to argue with the choice. Basic’s rows
          get <strong className="font-semibold text-ink">red ✗ marks</strong>; your
          selection is rendered as a list of failures.{' '}
          <UiQuote>"Continue with Basic"</UiQuote> is a pale outline button next to a
          large filled yellow <UiQuote>"Switch to Regular"</UiQuote>.
        </P>
        <P className="mt-5">
          And <UiQuote>"only €27.56 more"</UiQuote> is 39% of the fare.
        </P>
      </>
    ),
  },
  {
    n: '06',
    name: 'Forced action',
    where: 'The login wall',
    showpiece: true,
    quote: ['"Log in to myRyanair to proceed with your booking"'],
    shots: [{
      src: 'audit/08-forced-login-wall.webp',
      alt: 'A white panel headed “Log in to myRyanair / to proceed with your booking”, listing “Checkout easily”, “Retrieve saved companion and payment details” and “Manage your booking”, above a filled yellow Sign up button and a filled blue Log in button. On a separate row beneath sits a small text link, “Log in later ›”. The Passengers form behind the panel is rendered grey and non-interactive.',
      caption: 'The escape hatch is the smallest of the three controls — and it did not work.',
    }],
    body: (
      <>
        <P>
          The passenger form renders greyed out behind it. Two large filled buttons say
          Sign up and Log in; the escape hatch, <UiQuote>"Log in later"</UiQuote>, is a
          small text link on the row below.
        </P>
        <P className="mt-5">
          <strong className="font-semibold text-ink">And it didn’t work.</strong> I
          clicked it three times — twice by position, once by resolved element
          reference. The panel stayed, the fields stayed disabled, the Continue button
          stayed grey. I could not complete a booking as a guest, which is where this
          audit ended.
        </P>
        <P className="mt-5">
          Bug or intent, the effect on a customer is identical: at the point of maximum
          commitment, you’re asked for an account. Note what it’s sold on —{' '}
          <UiQuote>"Retrieve saved companion and payment details."</UiQuote> Data
          collection, framed as convenience.
        </P>
      </>
    ),
  },
]

const REMAINING_STEPS = ['Flights', 'Seats', 'Bags', 'Extras', 'Review & Pay']

function Figure({ shot, wide }: { shot: Shot; wide: boolean }) {
  return (
    <figure className={wide ? '' : 'max-w-4xl'}>
      <img
        src={shot.src}
        alt={shot.alt}
        width={1400}
        height={679}
        loading={shot.eager ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full rounded-lg border border-line bg-line"
      />
      <figcaption className="mt-3 max-w-[68ch] text-sm text-body">
        {shot.caption}
      </figcaption>
    </figure>
  )
}

function PatternBlock({ p }: { p: Pattern }) {
  return (
    <article className="border-t border-line pt-10 md:pt-14">
      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-navy">
        {p.n} · {p.name}
        <span className="text-body"> — {p.where}</span>
      </h3>

      <div className="mt-6">
        <UiQuoteBlock lines={p.quote} accent={p.showpiece} />
      </div>

      <div className={`mt-10 space-y-8 ${p.showpiece ? 'md:mt-12' : ''}`}>
        {p.shots.map(shot => (
          <Figure key={shot.src} shot={shot} wide={Boolean(p.showpiece)} />
        ))}
      </div>

      <div className="mt-8">{p.body}</div>
    </article>
  )
}

export function Audit() {
  return (
    <Section id="audit" className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
      <Eyebrow className="text-navy">Before</Eyebrow>
      <h2 className="mt-5 max-w-[18ch] text-h2 font-extrabold text-balance text-ink">
        I walked the real flow first.
      </h2>
      <P className="mt-6">
        Dublin → Milan Bergamo, one way, one adult, cheapest fare. Chrome, 1440×900,
        July 2026. I never completed the booking. Six patterns, each with its own name
        in the UX literature:
      </P>

      <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
        {PATTERNS.map(p => <PatternBlock key={p.n} p={p} />)}
      </div>

      <aside className="mt-16 max-w-[68ch] rounded-lg border border-line bg-white p-6 md:mt-20 md:p-8">
        <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-navy">
          Note on the remaining steps
        </h3>
        <p className="mt-4 text-prose text-body">
          Seats, Bags, Extras and Review &amp; Pay aren’t shown here — the login wall
          ended the walk. What the progress bar already tells you stands on its own:
        </p>
        <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink">
          {REMAINING_STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-body">→</span>}
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-prose text-body">
          Four separate opportunities to add cost between choosing a flight and paying
          for it.
        </p>
      </aside>
    </Section>
  )
}
