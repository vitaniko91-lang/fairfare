import { Link, Outlet, useLocation, Navigate } from 'react-router-dom'
import { useBooking } from '../state/booking'
import { Stepper } from '../components/Stepper'
import { RunningTotal } from '../components/RunningTotal'
import { Disclaimer } from '../components/Disclaimer'

// '/book/done' maps past the last step so every step reads as complete and none as current.
const stepIndex: Record<string, number> = {
  '/book': 0, '/book/flights': 1, '/book/seats': 2, '/book/extras': 3, '/book/pay': 4, '/book/done': 5,
}

export function FlowLayout() {
  const { state } = useBooking()
  const { pathname } = useLocation()
  const needsFlight = ['/book/seats', '/book/extras', '/book/pay'].includes(pathname)
  if (needsFlight && (!state.flightId || !state.tier)) return <Navigate to="/book" replace />
  if (pathname === '/book/flights' && !state.search) return <Navigate to="/book" replace />

  const showTotal = state.tier && state.search && pathname !== '/book/done'
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <Link to="/" className="text-lg font-bold tracking-tight text-navy">FAIRFARE</Link>
          <Stepper current={stepIndex[pathname] ?? 0} />
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_320px]">
        <div><Outlet /></div>
        {showTotal && (
          <div className="lg:sticky lg:top-6 lg:self-start">
            <RunningTotal basicCents={state.basicCents} tier={state.tier!}
              pax={state.search!.pax} seats={state.seats} extras={state.extras} />
          </div>
        )}
      </main>
      <Disclaimer />
    </div>
  )
}
