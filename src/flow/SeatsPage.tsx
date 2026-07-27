import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../state/booking'
import { SeatMap } from '../components/SeatMap'
import { Button } from '../components/Button'

export function SeatsPage() {
  const { state, dispatch } = useBooking()
  const navigate = useNavigate()
  const [notice, setNotice] = useState('')
  const pax = state.search!.pax
  const hasSeats = state.seats.length > 0

  const proceed = () => {
    if (state.seats.length !== pax) {
      const missing = pax - state.seats.length
      setNotice(missing > 0
        ? `Pick ${missing} more seat${missing > 1 ? 's' : ''}, or skip for free seats at check-in.`
        : 'Deselect a seat — you have more seats than passengers.')
      return
    }
    setNotice('')
    navigate('/book/extras')
  }

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Pick seats — or don't.</h1>
      <p className="mt-2 max-w-lg text-sm">Skipping is free: you'll be assigned seats at check-in.
        Groups are usually seated near each other, but it isn't guaranteed.</p>
      {/* Emphasis follows what the user has actually done, never what earns more:
          picked nothing → skipping is the highlighted action, and vice versa. */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant={hasSeats ? 'ghost' : 'primary'}
          onClick={() => { dispatch({ type: 'CLEAR_SEATS' }); navigate('/book/extras') }}>
          Skip — free seats at check-in
        </Button>
        <Button variant={hasSeats ? 'primary' : 'ghost'} onClick={proceed}>
          Continue with {state.seats.length}/{pax} seats
        </Button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-xs text-err">{notice}</p>
      <div className="mt-6 overflow-x-auto">
        <SeatMap flightId={state.flightId!} tier={state.tier!} selected={state.seats}
          onToggle={id => { setNotice(''); dispatch({ type: 'TOGGLE_SEAT', seatId: id }) }} />
      </div>
    </section>
  )
}
