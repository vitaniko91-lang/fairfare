export interface Airport { code: string; city: string; country: string }
export interface Flight {
  id: string; from: string; to: string
  departISO: string; arriveISO: string; durationMin: number
  basicCents: number
}
export type FareTier = 'basic' | 'regular' | 'plus'
export type ExtraId = 'bag20' | 'cabin10' | 'insurance' | 'fasttrack' | 'checkin'
export type SeatZone = 'front' | 'exit' | 'standard'
export interface SearchParams { from: string; to: string; date: string; pax: number }
