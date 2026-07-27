import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { byCode } from '../lib/airports'
import { computeTotal, eur, FARES } from '../lib/pricing'
import { useBooking } from '../state/booking'
import { Button } from '../components/Button'

const longDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-GB',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export function DonePage() {
  const { state, dispatch } = useBooking()
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [accountRequested, setAccountRequested] = useState(false)

  // /book/done is not guarded by FlowLayout, so it guards itself
  if (!state.confirmed) return <Navigate to="/book" replace />

  const s = state.search!
  const tier = state.tier!
  const passenger = state.passenger!
  const { totalCents } = computeTotal({
    basicCents: state.basicCents, tier, pax: s.pax, seats: state.seats, extras: state.extras,
  })

  return (
    <section className="max-w-2xl">
      {/* decorative — the heading below carries the meaning */}
      <motion.div aria-hidden
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ok/15 text-3xl font-bold text-ok">
        ✓
      </motion.div>

      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">You're booked.</h1>
      <p className="mt-2 text-sm">
        Confirmation sent to <strong className="font-semibold text-ink">{passenger.email}</strong>.
        Check in free from 24 hours before departure.
      </p>

      <dl className="mt-8 divide-y divide-line rounded-xl border border-line bg-white text-sm">
        <div className="flex justify-between gap-4 px-5 py-3">
          <dt className="text-body">Route</dt>
          <dd className="text-right font-semibold text-ink">
            {byCode(s.from).city} ({s.from}) → {byCode(s.to).city} ({s.to})
          </dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-3">
          <dt className="text-body">Date</dt>
          <dd className="text-right font-semibold text-ink">{longDate(s.date)}</dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-3">
          <dt className="text-body">Flight</dt>
          <dd className="text-right font-semibold tabular-nums text-ink">{state.flightId}</dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-3">
          <dt className="text-body">Passenger</dt>
          <dd className="text-right font-semibold text-ink">
            {passenger.name}{s.pax > 1 && ` + ${s.pax - 1} more`}
          </dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-3">
          <dt className="text-body">Fare</dt>
          <dd className="text-right font-semibold text-ink">{FARES[tier].label}</dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-3">
          <dt className="text-body">Seats</dt>
          <dd className="text-right font-semibold text-ink">
            {state.seats.length ? state.seats.join(', ') : 'Assigned free at check-in'}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-5 py-4">
          <dt className="font-semibold text-ink">Total paid</dt>
          <dd className="rounded bg-sun/20 px-2 py-0.5 text-lg font-bold tabular-nums text-ink">
            {eur(totalCents)}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-body">
        The same number you saw from the first screen. Nothing was added at the end.
      </p>

      {/* The account offer lives here — after the purchase, framed as managing this
          booking. Never a gate in the middle of the flow. */}
      <aside className="mt-8 rounded-xl border border-line bg-white p-5">
        <h2 className="text-sm font-bold text-ink">Want to manage this booking later?</h2>
        <p className="mt-1 text-xs text-body">
          An account lets you change seats, add a bag, or check in from one place. Entirely optional —
          your booking is complete, and everything works from the confirmation email either way.
        </p>
        {accountRequested
          ? <p aria-live="polite" className="mt-4 text-xs font-semibold text-ok">
              We'll email {passenger.email} a link to set a password. Nothing else changes.
            </p>
          : <Button variant="ghost" className="mt-4" onClick={() => setAccountRequested(true)}>
              Create an account
            </Button>}
      </aside>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link to="/" className="text-sm font-semibold text-navy underline underline-offset-4">
          Read the case study
        </Link>
        <button type="button"
          onClick={() => { dispatch({ type: 'RESET' }); navigate('/book') }}
          className="text-sm font-semibold text-body underline underline-offset-4 hover:text-ink">
          Start over
        </button>
      </div>
    </section>
  )
}
