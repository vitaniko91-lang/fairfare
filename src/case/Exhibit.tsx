import type { ReactNode } from 'react'
import { Label } from './primitives'

/**
 * A callout anchored over a BEFORE exhibit. `x`/`y` are percentages of the
 * image box. Callouts exist ONLY on before-exhibits — red marks a pattern and
 * nothing else, so the right-hand column is always clean. That asymmetry is the
 * page's argument, and the types below are what keep it true.
 */
export interface Callout {
  x: number
  y: number
  text: string
}

export interface Before {
  img: string
  alt: string
  callouts: Callout[]
}

/** An after-exhibit is either a screenshot or — when the pattern was simply
 *  deleted — a stated absence. There is nothing to photograph in that case, and
 *  faking a screenshot would be the one dishonesty this case cannot afford. */
export type After =
  | { kind: 'shot'; img: string; alt: string }
  | { kind: 'gone'; statement: string }

/**
 * A numbered marker pinned to the offending element, with the wording carried
 * in a legend below the frame. Labels floating over the screenshot covered the
 * very thing they pointed at — and had nowhere to go at 375px.
 */
function Marker({ c, i }: { c: Callout; i: number }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute z-10 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-redline font-mono text-[0.625rem] font-medium text-bone ring-2 ring-bone sm:size-[1.375rem] sm:text-[0.6875rem]"
      style={{ left: `${c.x}%`, top: `${c.y}%` }}
    >
      {i + 1}
    </span>
  )
}

function Frame({ children, tone }: { children: ReactNode; tone: 'before' | 'after' }) {
  return (
    <div
      className={`relative overflow-hidden border ${
        tone === 'before' ? 'border-redline/35' : 'border-hair'
      }`}
    >
      {children}
    </div>
  )
}

export function Exhibit({
  n,
  pattern,
  where,
  quote,
  before,
  after,
  children,
}: {
  n: string
  pattern: string
  where: string
  quote: string[]
  before: Before
  after: After
  children: ReactNode
}) {
  return (
    <li className="border-t border-hair pt-8 md:pt-12">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <Label className="text-redline">Exhibit {n} — {pattern}</Label>
        <Label className="text-graphite">{where}</Label>
      </div>

      <blockquote
        cite="https://www.ryanair.com/gb/en"
        className="mt-5 border-l-2 border-redline pl-5 sm:pl-6"
      >
        {quote.map(line => (
          <p key={line} className="font-mono text-quote text-noir">{line}</p>
        ))}
      </blockquote>

      <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
        <figure className="m-0">
          <Frame tone="before">
            <img
              src={before.img}
              alt={before.alt}
              width={1568}
              height={760}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            {before.callouts.map((c, i) => <Marker key={c.text} c={c} i={i} />)}
          </Frame>
          <figcaption className="mt-2.5">
            <span className="flex items-baseline gap-2">
              <span className="font-mono text-label uppercase text-redline">Before</span>
              <span className="font-mono text-[0.625rem] text-graphite">ryanair.com</span>
            </span>
            <ol className="mt-2.5 space-y-1">
              {before.callouts.map((c, i) => (
                <li key={c.text} className="flex gap-2 font-mono text-[0.6875rem] leading-snug text-graphite">
                  <span className="shrink-0 font-medium text-redline">{i + 1}</span>
                  {c.text}
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>

        <figure className="m-0">
          <Frame tone="after">
            {after.kind === 'shot' ? (
              <img
                src={after.img}
                alt={after.alt}
                width={1568}
                height={760}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            ) : (
              <div className="flex aspect-[1568/760] items-center justify-center bg-bone px-6">
                <p className="max-w-[24ch] text-center font-mono text-[0.8125rem] leading-relaxed text-graphite">
                  {after.statement}
                </p>
              </div>
            )}
          </Frame>
          <figcaption className="mt-2.5 flex items-baseline gap-2">
            <span className="font-mono text-label uppercase text-noir">After</span>
            <span className="font-mono text-[0.625rem] text-graphite">fairfare</span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-7 space-y-4">{children}</div>
    </li>
  )
}
