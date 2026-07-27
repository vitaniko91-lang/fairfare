import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react'
import type { ExtraId, FareTier, SearchParams } from '../lib/types'

export interface BookingState {
  search: SearchParams | null
  flightId: string | null
  basicCents: number
  tier: FareTier | null
  seats: string[]
  extras: ExtraId[]
  passenger: { name: string; email: string } | null
  confirmed: boolean
}

export type Action =
  | { type: 'SET_SEARCH'; search: SearchParams }
  | { type: 'SELECT_FLIGHT'; flightId: string; basicCents: number }
  | { type: 'SET_TIER'; tier: FareTier }
  | { type: 'TOGGLE_SEAT'; seatId: string }
  | { type: 'CLEAR_SEATS' }
  | { type: 'TOGGLE_EXTRA'; extra: ExtraId }
  | { type: 'SET_PASSENGER'; passenger: { name: string; email: string } }
  | { type: 'CONFIRM' }
  | { type: 'RESET' }

export const initialState: BookingState = {
  search: null, flightId: null, basicCents: 0, tier: null,
  seats: [], extras: [], passenger: null, confirmed: false,
}

export function reducer(s: BookingState, a: Action): BookingState {
  switch (a.type) {
    case 'SET_SEARCH':
      return { ...initialState, search: a.search }
    case 'SELECT_FLIGHT':
      return { ...s, flightId: a.flightId, basicCents: a.basicCents, seats: [], confirmed: false }
    case 'SET_TIER':
      return { ...s, tier: a.tier }
    case 'TOGGLE_SEAT': {
      if (s.seats.includes(a.seatId)) return { ...s, seats: s.seats.filter(x => x !== a.seatId) }
      if (s.seats.length >= (s.search?.pax ?? 1)) return s
      return { ...s, seats: [...s.seats, a.seatId] }
    }
    case 'CLEAR_SEATS':
      return { ...s, seats: [] }
    case 'TOGGLE_EXTRA':
      return { ...s, extras: s.extras.includes(a.extra) ? s.extras.filter(x => x !== a.extra) : [...s.extras, a.extra] }
    case 'SET_PASSENGER':
      return { ...s, passenger: a.passenger }
    case 'CONFIRM':
      return s.passenger ? { ...s, confirmed: true } : s
    case 'RESET':
      return initialState
  }
}

const Ctx = createContext<{ state: BookingState; dispatch: Dispatch<Action> } | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>
}

export function useBooking() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBooking outside BookingProvider')
  return ctx
}
