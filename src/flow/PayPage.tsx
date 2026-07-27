import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../state/booking'
import { Field } from '../components/Field'
import { Button } from '../components/Button'

export function PayPage() {
  const { dispatch } = useBooking()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: { name?: string; email?: string } = {}
    if (!name.trim()) errs.name = 'Enter the passenger name.'
    if (!/.+@.+\..+/.test(email)) errs.email = 'Enter a valid email.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    dispatch({ type: 'SET_PASSENGER', passenger: { name: name.trim(), email } })
    dispatch({ type: 'CONFIRM' })
    navigate('/book/done')
  }

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Pay as a guest</h1>
      <p className="mt-2 max-w-lg text-sm">No account required. Your total on the right is
        exactly what you'd be charged — no fees appear at this step.</p>
      <form onSubmit={submit} noValidate className="mt-8 grid max-w-lg gap-4">
        <Field id="name" label="Passenger name" autoComplete="name" value={name}
          onChange={e => setName(e.target.value)} error={errors.name} />
        <Field id="email" label="Email for the boarding pass" type="email" autoComplete="email"
          value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
        <fieldset className="rounded-xl border border-line bg-white p-5">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-body">
            Card — demo, no real payment
          </legend>
          <input disabled value="4242 4242 4242 4242" readOnly aria-label="Card number (demo)"
            className="w-full rounded-md border border-line bg-paper px-4 py-3 text-sm text-body" />
        </fieldset>
        <Button type="submit" variant="primary">Pay now</Button>
      </form>
    </section>
  )
}
