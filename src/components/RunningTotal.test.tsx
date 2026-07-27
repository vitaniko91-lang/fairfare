import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { RunningTotal } from './RunningTotal'

describe('RunningTotal', () => {
  it('itemizes fare, seats, extras and shows the true total', () => {
    render(<RunningTotal basicCents={2990} tier="regular" pax={2} seats={['2A']} extras={['insurance']} />)
    expect(screen.getByText(/total/i)).toBeInTheDocument()
    // fare (29.90+24.00)*2=107.80; seat 2A front 13.00; insurance 14.00*2=28.00 → 148.80
    expect(screen.getByText('€148.80')).toBeInTheDocument()
    expect(screen.getByText(/2 × Regular fare/i)).toBeInTheDocument()
    expect(screen.getByText(/Seat 2A/i)).toBeInTheDocument()
  })
})
