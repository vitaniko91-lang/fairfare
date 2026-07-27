import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { buttonVariants, type ButtonVariant } from '../components/buttonStyles'

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

/** Uppercase micro-label. Not a heading — pass `as` when it labels a block. */
export function Eyebrow({ children, className = '' }: {
  children: ReactNode; className?: string
}) {
  return (
    <p className={`text-[0.6875rem] font-semibold uppercase tracking-[0.2em] ${className}`}>
      {children}
    </p>
  )
}

/** Ryanair's own words, quoted inline in my prose — never blended into it. */
export function UiQuote({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-ink">{children}</span>
}

/**
 * Ryanair's own words as a block exhibit. Straight quotes inside quoted UI
 * copy; curly quotes everywhere else on the page.
 */
export function UiQuoteBlock({ lines, accent = false }: {
  lines: string[]; accent?: boolean
}) {
  return (
    <blockquote
      cite="https://www.ryanair.com/gb/en"
      className={`border-l-[3px] pl-5 sm:pl-7 ${accent ? 'border-sun' : 'border-line'}`}
    >
      {lines.map(line => (
        <p key={line} className="text-quote font-medium text-ink">{line}</p>
      ))}
    </blockquote>
  )
}

/** Body copy at a reading measure. */
export function P({ children, className = '' }: {
  children: ReactNode; className?: string
}) {
  return <p className={`max-w-[68ch] text-prose text-body ${className}`}>{children}</p>
}

/** A router Link wearing Button's variant colours. */
export function CtaLink({ to, variant = 'navy', size = 'md', className = '', children }: {
  to: string
  variant?: ButtonVariant
  size?: 'md' | 'lg'
  className?: string
  children: ReactNode
}) {
  const pad = size === 'lg' ? 'px-7 py-4 text-base' : 'px-6 py-3 text-sm'
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 ${pad} ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
