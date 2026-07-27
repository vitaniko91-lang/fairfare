import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AIRPORTS } from '../lib/airports'
import { useBooking } from '../state/booking'
import { Button } from '../components/Button'

function Select({ label, id, value, onChange, children }: {
  label: string; id: string; value: string; onChange: (v: string) => void; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-ink">{label}</label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)}
        className="rounded-md border border-line bg-white px-4 py-3 text-sm text-ink">{children}</select>
    </div>
  )
}

export function SearchPage() {
  const { dispatch } = useBooking()
  const navigate = useNavigate()
  const [from, setFrom] = useState('DUB')
  const [to, setTo] = useState('BGY')
  const [date, setDate] = useState('')
  const [pax, setPax] = useState(1)
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (from === to) return setError('Departure and destination must differ.')
    if (!date) return setError('Pick a travel date.')
    setError('')
    dispatch({ type: 'SET_SEARCH', search: { from, to, date, pax } })
    navigate('/book/flights')
  }

  const options = AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Where to?</h1>
      <p className="mt-2 max-w-lg text-sm">One-way fares. The price you see on the next screen
        is the price you can pay — every add-on is optional and itemized.</p>
      <form onSubmit={submit} noValidate className="mt-8 grid max-w-2xl gap-5 sm:grid-cols-2">
        <Select label="From" id="from" value={from} onChange={setFrom}>{options}</Select>
        <Select label="To" id="to" value={to} onChange={setTo}>{options}</Select>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-ink">Date</label>
          <input id="date" type="date" value={date} min={new Date().toISOString().slice(0, 10)}
            onChange={e => setDate(e.target.value)}
            className="rounded-md border border-line bg-white px-4 py-3 text-sm text-ink" />
        </div>
        <Select label="Passengers" id="pax" value={String(pax)} onChange={v => setPax(Number(v))}>
          {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
        </Select>
        <p aria-live="polite" className="text-xs text-err sm:col-span-2">{error}</p>
        <Button type="submit" variant="primary" className="sm:col-span-2">Find flights</Button>
      </form>
    </section>
  )
}
