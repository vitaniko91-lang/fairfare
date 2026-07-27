import { hashString, mulberry32 } from './seed'
import type { Flight } from './types'

export function generateFlights(from: string, to: string, date: string): Flight[] {
  const rnd = mulberry32(hashString(`${from}-${to}-${date}`))
  const count = 5 + Math.floor(rnd() * 4)                       // 5–8
  // Real schedules sit on a 5-minute grid, and published block times are rarely a round
  // number of hours — "2h 05m" reads as a schedule, "2h 0m" reads as placeholder data.
  const routeMin = 90 + Math.floor(mulberry32(hashString(`${from}-${to}`))() * 30) * 5
  const durationMin = routeMin % 60 === 0 ? routeMin + 5 : routeMin   // 90–240, step 5
  const flights: Flight[] = []
  const usedIds = new Set<string>()
  const nextId = () => {
    let id = `FR${1000 + Math.floor(rnd() * 9000)}`
    while (usedIds.has(id)) id = `FR${1000 + Math.floor(rnd() * 9000)}`
    usedIds.add(id)
    return id
  }
  for (let i = 0; i < count; i++) {
    const departMin = 6 * 60 + Math.floor(rnd() * 192) * 5      // 06:00–22:00, step 5
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
