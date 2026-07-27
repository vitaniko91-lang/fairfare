import { P, Section } from './primitives'

export function Problem() {
  return (
    <Section id="problem" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="font-display font-bold max-w-[17ch] text-h2 text-balance text-noir">
        Dark patterns are a loan against trust.
      </h2>

      <div className="mt-8 space-y-5">
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

      {/* The pivot of the case. Red is allowed here because the question is the
          indictment — it is the one non-exhibit place the accent appears. */}
      <figure className="mt-12 mb-12 max-w-3xl md:mt-14 md:mb-14">
        <span aria-hidden="true" className="block h-0.5 w-14 bg-redline" />
        <blockquote className="mt-6">
          <p className="font-display font-bold text-pull text-balance text-noir">
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
