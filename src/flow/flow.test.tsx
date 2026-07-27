// End-to-end guard for the five principles the redesign is judged against.
// Each case locks in the absence of a specific live-Ryanair dark pattern.
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { BookingProvider } from '../state/booking'
import { generateFlights } from '../lib/flights'
import { eur, fareCents } from '../lib/pricing'
import { FlowLayout } from './FlowLayout'
import { SearchPage } from './SearchPage'
import { FlightsPage } from './FlightsPage'
import { SeatsPage } from './SeatsPage'
import { ExtrasPage } from './ExtrasPage'
import { PayPage } from './PayPage'
import { DonePage } from './DonePage'

function Harness({ initial = '/book' }: { initial?: string }) {
  return (
    <BookingProvider>
      <MemoryRouter initialEntries={[initial]}>
        <Routes>
          <Route path="/" element={<h1>CaseStub</h1>} />
          <Route path="/book" element={<FlowLayout />}>
            <Route index element={<SearchPage />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="seats" element={<SeatsPage />} />
            <Route path="extras" element={<ExtrasPage />} />
            <Route path="pay" element={<PayPage />} />
            <Route path="done" element={<DonePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </BookingProvider>
  )
}

describe('search screen', () => {
  it('blocks same from/to, requires a date, then navigates', () => {
    render(<Harness />)
    expect(screen.getByRole('heading', { name: 'Where to?' })).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('To'), { target: { value: 'DUB' } })
    fireEvent.click(screen.getByRole('button', { name: 'Find flights' }))
    expect(screen.getByText('Departure and destination must differ.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('To'), { target: { value: 'BGY' } })
    fireEvent.click(screen.getByRole('button', { name: 'Find flights' }))
    expect(screen.getByText('Pick a travel date.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2026-09-10' } })
    fireEvent.change(screen.getByLabelText('Passengers'), { target: { value: '2' } })
    fireEvent.click(screen.getByRole('button', { name: 'Find flights' }))

    // landed on /book/flights
    expect(screen.getByRole('heading', { name: /Dublin → Milan Bergamo/ })).toBeInTheDocument()
  })
})

function toFlights() {
  render(<Harness />)
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2026-09-10' } })
  fireEvent.change(screen.getByLabelText('Passengers'), { target: { value: '2' } })
  fireEvent.click(screen.getByRole('button', { name: 'Find flights' }))
}

describe('flights + fare matrix', () => {
  it('expands the matrix, has no preselected tier, and continues straight to seats', () => {
    toFlights()
    // no running total before a tier is chosen
    expect(screen.queryByLabelText('Price summary')).toBeNull()

    const rows = screen.getAllByRole('button', { expanded: false })
    fireEvent.click(rows[0])

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
    expect(radios.every(r => r.getAttribute('aria-checked') === 'false')).toBe(true)
    expect(screen.getByText('Basic')).toBeInTheDocument()
    expect(screen.getByText('Regular')).toBeInTheDocument()
    expect(screen.getByText('Plus')).toBeInTheDocument()
    // no Continue until a tier is chosen (no interstitial to dismiss either)
    expect(screen.queryByRole('button', { name: /^Continue with/ })).toBeNull()

    fireEvent.click(radios[1]) // Regular
    expect(screen.getByLabelText('Price summary')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Continue with Regular' }))
    expect(screen.getByRole('heading', { name: /Pick seats/ })).toBeInTheDocument()
  })
})

// the first flight of DUB→BGY on 2026-09-10, Regular fare × 2 pax, nothing else
const FIRST = generateFlights('DUB', 'BGY', '2026-09-10')[0]
const FARE_ONLY = eur(fareCents(FIRST.basicCents, 'regular') * 2)

// the grand total is the last € figure in the running-total panel
const totalNow = () => screen.getByLabelText('Price summary').textContent!.match(/€[\d.]+$/)![0]

function toSeats(tierIndex = 1) {
  toFlights()
  fireEvent.click(screen.getAllByRole('button', { expanded: false })[0])
  fireEvent.click(screen.getAllByRole('radio')[tierIndex])
  fireEvent.click(screen.getByRole('button', { name: /^Continue with/ }))
}

describe('seats', () => {
  it('never disables Continue — it explains via aria-live instead', () => {
    toSeats()
    fireEvent.click(screen.getByRole('button', { name: 'Continue with 0/2 seats' }))
    expect(screen.getByText('Pick 2 more seats, or skip for free seats at check-in.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Pick seats/ })).toBeInTheDocument()
  })

  it('prices seats by zone and reaches extras once pax seats are picked', () => {
    toSeats() // regular: standard zone included, front/exit still cost money
    expect(screen.getAllByLabelText(/^Seat \d+[A-F], front, €13\.00/).length).toBeGreaterThan(0)
    expect(screen.getAllByLabelText(/^Seat \d+[A-F], standard, €0\.00/).length).toBeGreaterThan(0)
    expect(screen.getAllByLabelText(/^Seat 1[67][A-F], exit, €15\.00/)).toHaveLength(12)

    const free = screen.getAllByLabelText(/front, €13.00$/) // '$' excludes ', taken'
    fireEvent.click(free[0])
    fireEvent.click(free[1])
    expect(free[0].getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(screen.getByRole('button', { name: 'Continue with 2/2 seats' }))
    expect(screen.getByRole('heading', { name: 'Anything else?' })).toBeInTheDocument()
  })

  it('Plus includes every zone — the legend quotes €0.00 across the board', () => {
    toSeats(2)
    expect(screen.getByText('Front (rows 1–5) — €0.00')).toBeInTheDocument()
    expect(screen.getByText('Extra legroom (rows 16–17) — €0.00')).toBeInTheDocument()
    expect(screen.getByText('Standard — €0.00')).toBeInTheDocument()
  })

  it('skip is a real escape hatch with equal weight', () => {
    toSeats()
    fireEvent.click(screen.getByRole('button', { name: 'Skip — free seats at check-in' }))
    expect(screen.getByRole('heading', { name: 'Anything else?' })).toBeInTheDocument()
  })
})

describe('extras', () => {
  it('pre-selects nothing and marks fare-included extras as included', () => {
    toSeats() // Regular includes cabin10
    fireEvent.click(screen.getByRole('button', { name: 'Skip — free seats at check-in' }))

    const boxes = screen.getAllByRole('checkbox') as HTMLInputElement[]
    expect(boxes).toHaveLength(5)
    const included = boxes.filter(b => b.disabled)
    expect(included).toHaveLength(1)                              // cabin10 only
    expect(boxes.filter(b => !b.disabled).every(b => !b.checked)).toBe(true)
    expect(screen.getByText('Included in your fare')).toBeInTheDocument()

    // total does not move until the user opts in
    expect(totalNow()).toBe(FARE_ONLY)
    fireEvent.click(boxes.find(b => !b.disabled)!)
    expect(totalNow()).not.toBe(FARE_ONLY)
  })
})

describe('pay + done', () => {
  it('walks the whole flow and the confirmed total matches the running total', () => {
    toSeats()
    const free = screen.getAllByLabelText(/front, €13.00$/)
    fireEvent.click(free[0])
    fireEvent.click(free[1])
    fireEvent.click(screen.getByRole('button', { name: 'Continue with 2/2 seats' }))

    const boxes = screen.getAllByRole('checkbox') as HTMLInputElement[]
    fireEvent.click(boxes.find(b => !b.disabled)!)
    const runningTotal = totalNow()
    fireEvent.click(screen.getByRole('button', { name: 'Continue to payment' }))

    // submit is never disabled — empty form gives inline errors, stays on the page
    expect(screen.getByRole('button', { name: 'Pay now' })).not.toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Pay now' }))
    expect(screen.getByText('Enter the passenger name.')).toBeInTheDocument()
    expect(screen.getByText('Enter a valid email.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Passenger name'), { target: { value: 'Ada Lovelace' } })
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'nope' } })
    fireEvent.click(screen.getByRole('button', { name: 'Pay now' }))
    expect(screen.getByText('Enter a valid email.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'ada@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Pay now' }))

    expect(screen.getByRole('heading', { name: "You're booked." })).toBeInTheDocument()
    expect(screen.getByText('Ada Lovelace + 1 more')).toBeInTheDocument()
    expect(screen.getByText(/Dublin \(DUB\) → Milan Bergamo \(BGY\)/)).toBeInTheDocument()
    expect(screen.getByText('10 September 2026')).toBeInTheDocument()
    // the final number equals the running total the user watched the whole way
    expect(screen.getByText(runningTotal)).toBeInTheDocument()
    expect(screen.queryByLabelText('Price summary')).toBeNull()

    // account offer is here, after purchase — and it is a plain offer
    fireEvent.click(screen.getByRole('button', { name: 'Create an account' }))
    expect(screen.getByText(/We'll email ada@example.com a link/)).toBeInTheDocument()
  })

  it('skips seats entirely and says so on the confirmation', () => {
    toSeats()
    fireEvent.click(screen.getByRole('button', { name: 'Skip — free seats at check-in' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue to payment' }))
    fireEvent.change(screen.getByLabelText('Passenger name'), { target: { value: 'Grace H' } })
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'g@h.io' } })
    fireEvent.click(screen.getByRole('button', { name: 'Pay now' }))
    expect(screen.getByText('Assigned free at check-in')).toBeInTheDocument()
    expect(screen.getByText(FARE_ONLY)).toBeInTheDocument()   // fare × pax, nothing added
  })

  it('guards /book/done when nothing was confirmed', () => {
    render(<Harness initial="/book/done" />)
    expect(screen.getByRole('heading', { name: 'Where to?' })).toBeInTheDocument()
  })

  it('Start over resets the booking', () => {
    toSeats()
    fireEvent.click(screen.getByRole('button', { name: 'Skip — free seats at check-in' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue to payment' }))
    fireEvent.change(screen.getByLabelText('Passenger name'), { target: { value: 'Grace H' } })
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'g@h.io' } })
    fireEvent.click(screen.getByRole('button', { name: 'Pay now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Start over' }))
    expect(screen.getByRole('heading', { name: 'Where to?' })).toBeInTheDocument()
  })
})
