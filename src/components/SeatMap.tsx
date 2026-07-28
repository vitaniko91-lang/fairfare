import { useMemo } from 'react'
import { hashString, mulberry32 } from '../lib/seed'
import { SEAT_ZONES, seatCents, zoneOf, eur } from '../lib/pricing'
import type { FareTier, SeatZone } from '../lib/types'

const ROWS = 33
const COLS = ['A', 'B', 'C', 'D', 'E', 'F']
// one representative seat per zone, so the legend can quote a real price
const SAMPLE_ROW: Record<SeatZone, string> = { front: '2A', exit: '16A', standard: '20A' }

// available seats carry their zone tint; taken seats are a distinctly darker solid
// so a free standard seat is never mistaken for an occupied one
const swatch: Record<SeatZone, string> = {
  front: 'bg-navy/25', exit: 'bg-ok/25', standard: 'bg-line',
}
const TAKEN = 'bg-ink/30'

export function SeatMap({ flightId, tier, selected, onToggle }: {
  flightId: string; tier: FareTier; selected: string[]; onToggle: (id: string) => void
}) {
  // deterministic occupancy: the same flight always shows the same taken seats
  const taken = useMemo(() => {
    const rnd = mulberry32(hashString(flightId))
    const set = new Set<string>()
    for (let r = 1; r <= ROWS; r++) for (const c of COLS) { if (rnd() < 0.55) set.add(`${r}${c}`) }
    return set
  }, [flightId])

  return (
    <div>
      <ul className="flex flex-wrap gap-4 text-xs text-body">
        {(Object.keys(SEAT_ZONES) as SeatZone[]).map(z => (
          <li key={z}>
            <span aria-hidden className={`mr-1.5 inline-block h-3 w-3 rounded-sm align-middle ${swatch[z]}`} />
            {SEAT_ZONES[z].label} — {eur(seatCents(SAMPLE_ROW[z], tier))}
          </li>
        ))}
        <li>
          <span aria-hidden className={`mr-1.5 inline-block h-3 w-3 rounded-sm align-middle ${TAKEN}`} />
          Already taken
        </li>
      </ul>
      <div className="mt-4 inline-grid grid-cols-[repeat(3,2rem)_1.5rem_repeat(3,2rem)] gap-1.5 rounded-xl border border-line bg-white p-4">
        {Array.from({ length: ROWS }, (_, i) => i + 1).flatMap(row =>
          COLS.flatMap((col, ci) => {
            const id = `${row}${col}`
            const zone = zoneOf(id)
            const isTaken = taken.has(id)
            const isSel = selected.includes(id)
            const cell = (
              <button key={id} type="button" disabled={isTaken} onClick={() => onToggle(id)}
                aria-pressed={isSel}
                aria-label={`Seat ${id}, ${zone}, ${eur(seatCents(id, tier))}${isTaken ? ', taken' : ''}`}
                className={`h-8 w-8 rounded-sm text-[0.625rem] font-semibold transition-colors duration-200
                  ${isTaken ? `cursor-not-allowed ${TAKEN} text-muted`
                    : isSel ? 'bg-navy text-white'
                    : zone === 'front' ? 'bg-navy/25 text-ink hover:bg-navy/45'
                    : zone === 'exit' ? 'bg-ok/25 text-ink hover:bg-ok/45'
                    : 'bg-line text-ink hover:bg-navy/30'}`}>
                {id}
              </button>
            )
            return ci === 2
              ? [cell, <span key={`${row}-aisle`} aria-hidden className="w-6 text-center text-[0.625rem] leading-8 text-muted">{row}</span>]
              : [cell]
          }),
        )}
      </div>
    </div>
  )
}
