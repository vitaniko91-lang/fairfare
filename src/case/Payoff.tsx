import { Label, P, Section } from './primitives'

/**
 * The close of principle 01. Every exhibit above is an accusation; this is the
 * one place the rebuild is asked to prove something on its own terms — so no
 * red, no annotation, no before-frame. Just the receipt.
 */
export function Payoff() {
  return (
    <Section id="payoff" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Label className="text-noir">The payoff</Label>
      <h2 className="font-display font-bold mt-5 max-w-[16ch] text-h2 text-balance text-noir">
        The number never moved.
      </h2>
      <P className="mt-6">
        €73.80 for the Regular fare. €13.00 for seat 3C, itemized the moment it was picked.
        €86.80 at payment, €86.80 charged. Choosing something changed the total — and it
        changed the total that was already on screen, which is the whole of principle 01.
        Nothing appeared at the end that wasn’t there before it.
      </P>

      <figure className="mt-12 md:mt-14">
        <div className="overflow-hidden border border-hair">
          <img
            src="walkthrough/6-confirmed.webp"
            alt="The FAIRFARE confirmation screen: route, date, flight, passenger, fare and seat, with the total paid matching the running total, and an optional account offer below it."
            width={1152}
            height={860}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="mt-2.5 flex items-baseline gap-2">
          <span className="font-mono text-label uppercase text-noir">Confirmed</span>
          <span className="font-mono text-[0.625rem] text-graphite">fairfare</span>
        </figcaption>
      </figure>

      <P className="mt-10">
        This is also the first and only time an account is mentioned. Not as a wall, not as
        a condition of paying — as an offer to manage a booking that is already complete.
        Everything still works from the confirmation email if you decline it.
      </P>
    </Section>
  )
}
