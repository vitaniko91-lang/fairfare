import { P, Section } from './primitives'

export function Problem() {
  return (
    <Section id="problem" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="max-w-[18ch] text-h2 font-extrabold text-balance text-ink">
        Dark patterns are a loan against trust.
      </h2>

      <div className="mt-8 space-y-6">
        <P>
          They work. That’s the uncomfortable part — scarcity badges, pre-ticked boxes
          and guilt-framed buttons all move numbers this quarter. The cost lands later,
          in support tickets, chargebacks, regulatory attention and the quiet decision
          to book elsewhere next time.
        </P>
        <P>
          So the interesting design question isn’t “are dark patterns bad.” It’s
          narrower and harder:
        </P>
      </div>

      {/* The pivot of the whole case — the one place yellow is allowed to mark
          something that isn't a button. */}
      <figure className="mt-14 mb-14 max-w-3xl md:mt-16 md:mb-16">
        <span aria-hidden="true" className="block h-1 w-16 bg-sun" />
        <blockquote className="mt-7">
          <p className="text-pull font-extrabold text-balance text-ink">
            Can you remove the manipulation and keep the revenue?
          </p>
        </blockquote>
      </figure>

      <P>
        Every ancillary product in this redesign survives — seats, bags, priority,
        insurance, fast track. Not one is deleted. Only how they’re presented changes.
      </P>
    </Section>
  )
}
