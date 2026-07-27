import { P, Section } from './primitives'

const ROWS = [
  ['Fare tiers (Basic / Regular / Plus)', 'Comparable in one matrix; Basic included as an equal column'],
  ['Seat selection', 'Priced per zone, visible up front; free-skip stated plainly'],
  ['Cabin & checked bags', 'Presented once, unticked, with a real reason to buy now'],
  ['Priority boarding', 'A fare perk, listed in the matrix instead of an interstitial'],
  ['Insurance & fast track', 'Optional, unticked, described in one sentence each'],
  ['Account sign-up', 'Moved after purchase, where it helps the customer'],
]

export function Business() {
  return (
    <Section id="business" className="border-y border-hair bg-white/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="font-display font-bold max-w-[20ch] text-h2 text-balance text-noir">
          Nothing was removed from the business.
        </h2>

        {/* Scrollable regions need to be reachable by keyboard, hence tabIndex. */}
        <div
          className="mt-12 overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Selling moments kept in the redesign"
        >
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">
              Every selling moment in the Ryanair flow, whether the redesign keeps it,
              and what changed about how it is presented.
            </caption>
            <thead>
              <tr className="border-b border-noir/20">
                <th scope="col" className="py-3 pr-6 font-mono text-label uppercase text-graphite">
                  Selling moment
                </th>
                <th scope="col" className="py-3 pr-6 font-mono text-label uppercase text-graphite">
                  Kept?
                </th>
                <th scope="col" className="py-3 font-mono text-label uppercase text-graphite">
                  What changed
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([moment, changed]) => (
                <tr key={moment} className="border-b border-hair align-top">
                  <th scope="row" className="py-5 pr-6 text-[0.9375rem] font-semibold text-noir">
                    {moment}
                  </th>
                  <td className="py-5 pr-6 text-[0.9375rem] font-semibold whitespace-nowrap text-ok">
                    Kept
                  </td>
                  <td className="py-5 text-[0.9375rem] leading-relaxed text-graphite">
                    {changed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <P className="mt-12">
          The bet: the same products sell, with fewer abandoned carts and fewer refund
          requests from people who didn’t understand what they bought. Transparency
          isn’t the opposite of conversion — it’s the version of it that survives the
          second purchase.
        </P>
      </div>
    </Section>
  )
}
