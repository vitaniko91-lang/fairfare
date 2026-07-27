import type { ExtraId, FareTier, SeatZone } from './types'

export const FARES: Record<FareTier, {
  label: string; addOnCents: number; includedZones: SeatZone[]; includedExtras: ExtraId[]; perks: string[]
}> = {
  basic: { label: 'Basic', addOnCents: 0, includedZones: [], includedExtras: [],
    perks: ['Small personal bag', 'Random seat assigned free at check-in'] },
  regular: { label: 'Regular', addOnCents: 2400, includedZones: ['standard'], includedExtras: ['cabin10'],
    perks: ['Small personal bag', '10kg cabin bag', 'Standard seat included', 'Priority boarding'] },
  plus: { label: 'Plus', addOnCents: 5200, includedZones: ['standard', 'front', 'exit'], includedExtras: ['bag20', 'checkin'],
    perks: ['Small personal bag', '20kg checked bag', 'Any seat included', 'Airport check-in', 'Flexible changes'] },
}

export const SEAT_ZONES: Record<SeatZone, { label: string; cents: number }> = {
  front: { label: 'Front (rows 1–5)', cents: 1300 },
  exit: { label: 'Extra legroom (rows 16–17)', cents: 1500 },
  standard: { label: 'Standard', cents: 700 },
}

export const EXTRAS: Record<ExtraId, { label: string; desc: string; cents: number }> = {
  bag20: { label: '20kg checked bag', desc: 'Goes in the hold. Add now — it costs more at the airport.', cents: 2500 },
  cabin10: { label: '10kg cabin bag', desc: 'Overhead locker, boards with you.', cents: 1200 },
  insurance: { label: 'Travel insurance', desc: 'Covers cancellation and medical. Optional.', cents: 1400 },
  fasttrack: { label: 'Security fast track', desc: 'Skip the main queue at 4 airports on this route.', cents: 800 },
  checkin: { label: 'Airport check-in', desc: 'A printed boarding pass at the desk. Online check-in stays free.', cents: 1000 },
}

export const zoneOf = (seatId: string): SeatZone => {
  const row = parseInt(seatId, 10)
  if (row <= 5) return 'front'
  if (row === 16 || row === 17) return 'exit'
  return 'standard'
}

export const fareCents = (basicCents: number, tier: FareTier) => basicCents + FARES[tier].addOnCents
export const seatCents = (seatId: string, tier: FareTier) =>
  FARES[tier].includedZones.includes(zoneOf(seatId)) ? 0 : SEAT_ZONES[zoneOf(seatId)].cents
export const extraCents = (id: ExtraId, tier: FareTier) =>
  FARES[tier].includedExtras.includes(id) ? 0 : EXTRAS[id].cents

export interface TotalInput {
  basicCents: number; tier: FareTier; pax: number; seats: string[]; extras: ExtraId[]
}
export function computeTotal({ basicCents, tier, pax, seats, extras }: TotalInput) {
  const fare = fareCents(basicCents, tier) * pax
  const seatsSum = seats.reduce((s, id) => s + seatCents(id, tier), 0)
  const extrasSum = extras.reduce((s, id) => s + extraCents(id, tier) * pax, 0)
  return { fareCents: fare, seatsCents: seatsSum, extrasCents: extrasSum, totalCents: fare + seatsSum + extrasSum }
}

export const eur = (cents: number) => `€${(cents / 100).toFixed(2)}`
