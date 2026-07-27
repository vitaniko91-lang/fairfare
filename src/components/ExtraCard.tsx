// Nothing is pre-selected. Extras already covered by the chosen fare are shown as
// included — not offered for sale a second time.
import { EXTRAS, extraCents, eur } from '../lib/pricing'
import type { ExtraId, FareTier } from '../lib/types'

export function ExtraCard({ id, tier, pax, checked, onToggle }: {
  id: ExtraId; tier: FareTier; pax: number; checked: boolean; onToggle: () => void
}) {
  const price = extraCents(id, tier)
  const included = price === 0
  return (
    <label className={`flex items-start gap-4 rounded-xl border bg-white p-5
      ${included ? 'border-ok/40' : checked ? 'border-navy ring-2 ring-navy' : 'border-line'}`}>
      <input type="checkbox" checked={included || checked} disabled={included} onChange={onToggle}
        className="mt-1 h-4 w-4 accent-navy" />
      <span className="flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-bold text-ink">{EXTRAS[id].label}</span>
          <span className="text-sm font-semibold tabular-nums text-ink">
            {included ? <span className="text-ok">Included in your fare</span> : `${eur(price)} × ${pax}`}
          </span>
        </span>
        <span className="mt-1 block text-xs text-body">{EXTRAS[id].desc}</span>
      </span>
    </label>
  )
}
