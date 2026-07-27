import { useNavigate } from 'react-router-dom'
import { EXTRAS } from '../lib/pricing'
import type { ExtraId } from '../lib/types'
import { useBooking } from '../state/booking'
import { ExtraCard } from '../components/ExtraCard'
import { Button } from '../components/Button'

export function ExtrasPage() {
  const { state, dispatch } = useBooking()
  const navigate = useNavigate()
  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Anything else?</h1>
      <p className="mt-2 max-w-lg text-sm">Nothing on this page is pre-selected.
        Skip it all and your total doesn't change.</p>
      <div className="mt-8 grid gap-4">
        {(Object.keys(EXTRAS) as ExtraId[]).map(id => (
          <ExtraCard key={id} id={id} tier={state.tier!} pax={state.search!.pax}
            checked={state.extras.includes(id)}
            onToggle={() => dispatch({ type: 'TOGGLE_EXTRA', extra: id })} />
        ))}
      </div>
      <Button variant="primary" className="mt-8" onClick={() => navigate('/book/pay')}>
        Continue to payment
      </Button>
    </section>
  )
}
