import { Link } from 'react-router-dom'
import { Disclaimer } from '../components/Disclaimer'
import { Hero } from './Hero'
import { Problem } from './Problem'
import { Audit } from './Audit'
import { Principles } from './Principles'
import { Walkthrough } from './Walkthrough'
import { Business } from './Business'
import { Colophon } from './Colophon'

export function CasePage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="text-lg font-bold tracking-tight text-navy">FAIRFARE</Link>
          <Link
            to="/book"
            className="text-sm font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition-colors duration-200 hover:decoration-navy"
          >
            Try the flow →
          </Link>
        </div>
      </header>

      <main>
        <Hero />
        <Problem />
        <Audit />
        <Principles />
        <Walkthrough />
        <Business />
        <Colophon />
      </main>

      <footer className="border-t border-line">
        <Disclaimer />
      </footer>
    </div>
  )
}
