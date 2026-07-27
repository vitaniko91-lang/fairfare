import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'

/**
 * One scroll reveal per section: whole-section fade + 20px rise, 0.6s ease-out,
 * once. No stagger, no per-item delay, transform + opacity only.
 * Under prefers-reduced-motion the section renders at full opacity from the
 * first frame — the animation props are never attached at all.
 */
export function Section({ id, className = '', children }: {
  id?: string; className?: string; children: ReactNode
}) {
  const reduce = useReducedMotion()
  const anim = reduce ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -80px 0px' },
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
  }
  return (
    <motion.section id={id} {...anim} className={`scroll-mt-10 ${className}`}>
      {children}
    </motion.section>
  )
}

/**
 * Utility label. Monospace is reserved for the record-keeping layer — exhibit
 * numbers, pattern names, captions, legends. Anything read as prose is set in
 * the display or body face.
 */
export function Label({ children, className = '' }: {
  children: ReactNode; className?: string
}) {
  return (
    <p className={`font-mono text-label uppercase ${className}`}>{children}</p>
  )
}

/** Ryanair's own words, quoted inline in my prose — never blended into it.
 *  The quotation marks are in the content, so weight and colour are enough to
 *  separate their voice from mine without switching typeface mid-sentence. */
export function UiQuote({ children }: { children: ReactNode }) {
  return <span className="font-medium text-noir">{children}</span>
}

/**
 * Ryanair's own words as a block exhibit. Straight quotes inside the quotation;
 * curly quotes everywhere else on the page.
 */
export function UiQuoteBlock({ lines }: { lines: string[] }) {
  return (
    <blockquote
      cite="https://www.ryanair.com/gb/en"
      className="border-l-2 border-redline pl-5 sm:pl-6"
    >
      {lines.map(line => (
        <p key={line} className="font-display text-quote font-medium text-noir">{line}</p>
      ))}
    </blockquote>
  )
}

/** Body copy at a reading measure. */
export function P({ children, className = '' }: {
  children: ReactNode; className?: string
}) {
  return <p className={`max-w-[68ch] text-prose text-graphite ${className}`}>{children}</p>
}

/** Emphasis inside prose — the claim, not decoration. */
export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-noir">{children}</strong>
}

const cta = {
  solid: 'bg-noir text-bone hover:bg-graphite',
  outline: 'border border-noir/25 text-noir hover:border-noir',
} as const

/** A router Link styled for the case page's own world. */
export function CtaLink({ to, variant = 'solid', size = 'md', className = '', children }: {
  to: string
  variant?: keyof typeof cta
  size?: 'md' | 'lg'
  className?: string
  children: ReactNode
}) {
  const pad = size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm'
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 ${pad} ${cta[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
