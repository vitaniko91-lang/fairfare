import { describe, it, expect } from 'vitest'
import { generateFlights } from './flights'
import { AIRPORTS } from './airports'

describe('generateFlights', () => {
  const args = ['DUB', 'BGY', '2026-09-10'] as const
  it('is deterministic for identical inputs', () => {
    expect(generateFlights(...args)).toEqual(generateFlights(...args))
  })
  it('differs across dates', () => {
    expect(generateFlights('DUB', 'BGY', '2026-09-10'))
      .not.toEqual(generateFlights('DUB', 'BGY', '2026-09-11'))
  })
  it('returns 5–8 flights sorted by departure with sane fields', () => {
    const fl = generateFlights(...args)
    expect(fl.length).toBeGreaterThanOrEqual(5)
    expect(fl.length).toBeLessThanOrEqual(8)
    const times = fl.map(f => f.departISO)
    expect(times).toEqual([...times].sort())
    fl.forEach(f => {
      expect(f.basicCents).toBeGreaterThanOrEqual(1990)
      expect(f.basicCents).toBeLessThanOrEqual(7990)
      expect(f.durationMin).toBeGreaterThanOrEqual(90)
      expect(new Date(f.arriveISO).getTime() - new Date(f.departISO).getTime())
        .toBe(f.durationMin * 60_000)
      expect(f.id).toMatch(/^FR\d{4}$/)
    })
  })
  it('puts schedules on a 5-minute grid and avoids round-hour block times', () => {
    for (const a of AIRPORTS.slice(0, 6)) for (const b of AIRPORTS.slice(0, 6)) {
      if (a.code === b.code) continue
      const fl = generateFlights(a.code, b.code, '2026-09-16')
      fl.forEach(f => {
        expect(new Date(f.departISO).getUTCMinutes() % 5).toBe(0)
        expect(f.durationMin % 5).toBe(0)
        // "2h 0m" reads as placeholder data; real published block times are never round
        expect(f.durationMin % 60).not.toBe(0)
        expect(f.durationMin).toBeLessThanOrEqual(240)
      })
    }
  })
  it('emits unique ids — the React layer keys on them', () => {
    // STN→WMI on 2026-09-28 collides if ids are drawn without a dedupe pass
    const ids = generateFlights('STN', 'WMI', '2026-09-28').map(f => f.id)
    expect(new Set(ids).size).toBe(ids.length)

    const dupes: string[] = []
    for (const a of AIRPORTS) for (const b of AIRPORTS) {
      if (a.code === b.code) continue
      for (let d = 1; d <= 28; d++) {
        const date = `2026-09-${String(d).padStart(2, '0')}`
        const all = generateFlights(a.code, b.code, date).map(f => f.id)
        if (new Set(all).size !== all.length) dupes.push(`${a.code}-${b.code}-${date}`)
      }
    }
    expect(dupes).toEqual([])
  })
})
