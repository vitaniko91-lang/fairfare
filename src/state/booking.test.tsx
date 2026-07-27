import { describe, it, expect } from 'vitest'
import { reducer, initialState } from './booking'
import type { BookingState } from './booking'

const searched: BookingState = reducer(initialState,
  { type: 'SET_SEARCH', search: { from: 'DUB', to: 'BGY', date: '2026-09-10', pax: 2 } })
const withFlight = reducer(reducer(searched,
  { type: 'SELECT_FLIGHT', flightId: 'FR1234', basicCents: 2990 }), { type: 'SET_TIER', tier: 'basic' })

describe('booking reducer', () => {
  it('SET_SEARCH resets everything downstream', () => {
    const dirty = { ...withFlight, seats: ['2A'], extras: ['insurance' as const] }
    const next = reducer(dirty, { type: 'SET_SEARCH', search: searched.search! })
    expect(next.flightId).toBeNull(); expect(next.seats).toEqual([]); expect(next.extras).toEqual([])
  })
  it('SELECT_FLIGHT keeps tier but clears seats', () => {
    const dirty = { ...withFlight, seats: ['2A'] }
    const next = reducer(dirty, { type: 'SELECT_FLIGHT', flightId: 'FR9999', basicCents: 3990 })
    expect(next.tier).toBe('basic'); expect(next.seats).toEqual([]); expect(next.basicCents).toBe(3990)
  })
  it('TOGGLE_SEAT selects, deselects, and caps at pax', () => {
    let s = reducer(withFlight, { type: 'TOGGLE_SEAT', seatId: '2A' })
    s = reducer(s, { type: 'TOGGLE_SEAT', seatId: '2B' })
    s = reducer(s, { type: 'TOGGLE_SEAT', seatId: '2C' })   // pax=2 → ignored
    expect(s.seats).toEqual(['2A', '2B'])
    s = reducer(s, { type: 'TOGGLE_SEAT', seatId: '2A' })   // deselect
    expect(s.seats).toEqual(['2B'])
  })
  it('CLEAR_SEATS empties the selection', () => {
    const s = reducer({ ...withFlight, seats: ['2A', '2B'] }, { type: 'CLEAR_SEATS' })
    expect(s.seats).toEqual([])
  })
  it('TOGGLE_EXTRA toggles', () => {
    let s = reducer(withFlight, { type: 'TOGGLE_EXTRA', extra: 'insurance' })
    expect(s.extras).toEqual(['insurance'])
    s = reducer(s, { type: 'TOGGLE_EXTRA', extra: 'insurance' })
    expect(s.extras).toEqual([])
  })
  it('CONFIRM requires passenger', () => {
    expect(reducer(withFlight, { type: 'CONFIRM' }).confirmed).toBe(false)
    const withPax = reducer(withFlight, { type: 'SET_PASSENGER', passenger: { name: 'Ada L', email: 'a@b.c' } })
    expect(reducer(withPax, { type: 'CONFIRM' }).confirmed).toBe(true)
  })
})
