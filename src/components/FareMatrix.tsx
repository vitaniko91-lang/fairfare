// All three tiers are equal columns: same size, same weight, full perk list, real
// prices. No preselected tier, no "most popular" badge, no struck-through anchors.
import { FARES, eur } from '../lib/pricing'
import type { FareTier } from '../lib/types'

export function FareMatrix({ basicCents, value, onChange }: {
  basicCents: number; value: FareTier | null; onChange: (t: FareTier) => void
}) {
  return (
    <div role="radiogroup" aria-label="Fare" className="grid gap-4 sm:grid-cols-3">
      {(Object.keys(FARES) as FareTier[]).map(tier => {
        const f = FARES[tier]
        const selected = value === tier
        return (
          <button key={tier} type="button" role="radio" aria-checked={selected} onClick={() => onChange(tier)}
            className={`rounded-xl border p-5 text-left transition-colors duration-200
              ${selected ? 'border-navy bg-white ring-2 ring-navy' : 'border-line bg-white hover:border-navy/50'}`}>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-ink">{f.label}</span>
              <span className="text-lg font-bold tabular-nums text-ink">{eur(basicCents + f.addOnCents)}</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-body">
              {f.perks.map(p => <li key={p} className="flex gap-2"><span aria-hidden className="text-ok">✓</span>{p}</li>)}
            </ul>
          </button>
        )
      })}
    </div>
  )
}
