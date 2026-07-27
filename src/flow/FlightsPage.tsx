import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateFlights } from '../lib/flights'
import { byCode } from '../lib/airports'
import { eur, FARES } from '../lib/pricing'
import { useBooking } from '../state/booking'
import { FareMatrix } from '../components/FareMatrix'
import { Button } from '../components/Button'

const hhmm = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })

export function FlightsPage() {
  const { state, dispatch } = useBooking()
  const navigate = useNavigate()
  const s = state.search!
  const flights = useMemo(() => generateFlights(s.from, s.to, s.date), [s])

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">
        {byCode(s.from).city} → {byCode(s.to).city}
      </h1>
      <p className="mt-2 text-sm">{s.date} · {s.pax} passenger{s.pax > 1 ? 's' : ''} ·
        prices below are final fares, not teasers.</p>
      <ul className="mt-8 space-y-3">
        {flights.map(f => {
          const open = state.flightId === f.id
          return (
            <li key={f.id} className="rounded-xl border border-line bg-white">
              <button type="button"
                onClick={() => dispatch({ type: 'SELECT_FLIGHT', flightId: f.id, basicCents: f.basicCents })}
                aria-expanded={open}
                className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left">
                <span className="text-lg font-bold tabular-nums text-ink">
                  {hhmm(f.departISO)} — {hhmm(f.arriveISO)}
                </span>
                <span className="text-xs uppercase tracking-wider text-body">
                  {Math.floor(f.durationMin / 60)}h {f.durationMin % 60}m · {f.id}
                </span>
                <span className="text-sm font-semibold text-ink">from {eur(f.basicCents)}</span>
              </button>
              {open && (
                <div className="border-t border-line p-5">
                  <FareMatrix basicCents={f.basicCents} value={state.tier}
                    onChange={tier => dispatch({ type: 'SET_TIER', tier })} />
                  {state.tier && (
                    <Button variant="primary" className="mt-5" onClick={() => navigate('/book/seats')}>
                      Continue with {FARES[state.tier].label}
                    </Button>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
