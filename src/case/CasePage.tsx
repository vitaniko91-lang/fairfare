import { Link } from 'react-router-dom'
import { Hero } from './Hero'
import { Problem } from './Problem'
import { Exhibits } from './Exhibits'
import { Principles } from './Principles'
import { Business } from './Business'
import { Colophon } from './Colophon'

export function CasePage() {
  return (
    <div className="case-root min-h-screen">
      <header className="border-b border-hair">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="font-display-wide text-lg tracking-tight text-noir">
            FAIRFARE
          </Link>
          <Link
            to="/book"
            className="text-sm font-semibold text-noir underline decoration-noir/25 underline-offset-4 transition-colors duration-200 hover:decoration-noir"
          >
            Try the flow →
          </Link>
        </div>
      </header>

      <main>
        <Hero />
        <Problem />
        <Exhibits />
        <Principles />
        <Business />
        <Colophon />
      </main>

      <footer className="border-t border-hair">
        <p className="mx-auto max-w-3xl px-6 py-8 text-center font-mono text-[0.6875rem] leading-relaxed text-graphite">
          FAIRFARE is an unofficial design concept by Vitalina Nikulina. Not affiliated with or
          endorsed by Ryanair. All prices are illustrative.
        </p>
      </footer>
    </div>
  )
}
