import { Label, Section } from './primitives'

const PRINCIPLES = [
  {
    n: '01',
    title: 'The price never surprises.',
    body: 'The total is on screen from the first step and it is always the number you will pay. No fee appears later. If something changes the price, it changes the number you’re already looking at.',
  },
  {
    n: '02',
    title: 'An upsell is an informed choice.',
    body: 'Every paid option is shown with its real price, in a comparison you can actually read, before you decide. Once you decide, the flow executes — it doesn’t argue.',
  },
  {
    n: '03',
    title: 'Zero pre-selected checkboxes.',
    body: 'Nothing is added to your basket that you didn’t add. Skip every optional screen and the total is unchanged.',
  },
  {
    n: '04',
    title: 'Skipping is a first-class action.',
    body: '“No thanks” gets the same visual weight as “yes”. No scare copy about being separated from your group, no red crosses on the option you picked.',
  },
  {
    n: '05',
    title: 'No account hostage-taking.',
    body: 'You can buy a ticket as a guest. An account is offered after purchase, on the confirmation screen, where it’s genuinely useful for managing the booking.',
  },
]

/** The page's single inverted band — the hinge between the audit and the rebuild. */
export function Principles() {
  return (
    <Section id="principles" className="bg-noir">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Label className="text-bone/75">Principles</Label>
        <h2 className="font-display font-bold mt-5 max-w-[18ch] text-h2 text-balance text-bone">
          Five rules I designed against.
        </h2>

        <ol className="mt-14 grid gap-x-10 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map(p => (
            <li key={p.n} className="border-t border-bone/25 pt-6">
              <p className="font-mono text-label tabular-nums text-bone/75">{p.n}</p>
              <h3 className="mt-4 max-w-[20ch] text-xl font-semibold text-balance text-bone">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone/70">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
