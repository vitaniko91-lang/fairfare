import { describe, it, expect } from 'vitest'
import { FARES, EXTRAS, SEAT_ZONES, zoneOf, fareCents, seatCents, extraCents, computeTotal, eur } from './pricing'

describe('pricing', () => {
  it('fare = basic + tier add-on', () => {
    expect(fareCents(2990, 'basic')).toBe(2990)
    expect(fareCents(2990, 'regular')).toBe(2990 + FARES.regular.addOnCents)
    expect(fareCents(2990, 'plus')).toBe(2990 + FARES.plus.addOnCents)
  })
  it('seat zones: rows 1–5 front, 16–17 exit, rest standard', () => {
    expect(zoneOf('2A')).toBe('front'); expect(zoneOf('16C')).toBe('exit'); expect(zoneOf('23F')).toBe('standard')
  })
  it('tier-included seats cost 0, others full zone price', () => {
    expect(seatCents('23F', 'basic')).toBe(SEAT_ZONES.standard.cents)
    expect(seatCents('23F', 'regular')).toBe(0)          // standard included in regular
    expect(seatCents('2A', 'regular')).toBe(SEAT_ZONES.front.cents)
    expect(seatCents('2A', 'plus')).toBe(0)              // all zones included in plus
  })
  it('tier-included extras cost 0', () => {
    expect(extraCents('cabin10', 'basic')).toBe(EXTRAS.cabin10.cents)
    expect(extraCents('cabin10', 'regular')).toBe(0)
    expect(extraCents('bag20', 'plus')).toBe(0)
    expect(extraCents('insurance', 'plus')).toBe(EXTRAS.insurance.cents)
  })
  it('computeTotal = fare×pax + seats + extras×pax', () => {
    const t = computeTotal({
      basicCents: 2990, tier: 'regular', pax: 2,
      seats: ['2A', '23F'], extras: ['insurance', 'cabin10'],
    })
    const fare = (2990 + FARES.regular.addOnCents) * 2
    const seats = SEAT_ZONES.front.cents + 0
    const extras = EXTRAS.insurance.cents * 2 + 0
    expect(t.fareCents).toBe(fare); expect(t.seatsCents).toBe(seats); expect(t.extrasCents).toBe(extras)
    expect(t.totalCents).toBe(fare + seats + extras)
  })
  it('eur formats cents', () => { expect(eur(2990)).toBe('€29.90'); expect(eur(0)).toBe('€0.00') })
})
