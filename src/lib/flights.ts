import { hashString, mulberry32 } from './seed'
import type { Flight } from './types'

export function generateFlights(from: string, to: string, date: string): Flight[] {
  const rnd = mulberry32(hashString(`${from}-${to}-${date}`))
  const count = 5 + Math.floor(rnd() * 4)                       // 5–8
  const durationMin = 90 + Math.floor(mulberry32(hashString(`${from}-${to}`))() * 150)
  const flights: Flight[] = []
  const usedIds = new Set<string>()
  const nextId = () => {
    let id = `FR${1000 + Math.floor(rnd() * 9000)}`
    while (usedIds.has(id)) id = `FR${1000 + Math.floor(rnd() * 9000)}`
    usedIds.add(id)
    return id
  }
  for (let i = 0; i < count; i++) {
    const departMin = 6 * 60 + Math.floor(rnd() * (16 * 60))    // 06:00–22:00
    const depart = new Date(`${date}T00:00:00Z`)
    depart.setUTCMinutes(departMin)
    const arrive = new Date(depart.getTime() + durationMin * 60_000)
    flights.push({
      id: nextId(),
      from, to,
      departISO: depart.toISOString(), arriveISO: arrive.toISOString(),
      durationMin,
      basicCents: 1990 + Math.floor(rnd() * 601) * 10,          // €19.90–79.90
    })
  }
  return flights.sort((a, b) => a.departISO.localeCompare(b.departISO))
}
