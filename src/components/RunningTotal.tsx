import { computeTotal, eur, extraCents, seatCents, EXTRAS, FARES } from '../lib/pricing'
import type { ExtraId, FareTier } from '../lib/types'

export function RunningTotal({ basicCents, tier, pax, seats, extras }: {
  basicCents: number; tier: FareTier; pax: number; seats: string[]; extras: ExtraId[]
}) {
  const t = computeTotal({ basicCents, tier, pax, seats, extras })
  return (
    <aside aria-label="Price summary"
      className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,30,58,0.06)]">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-body">Your price — no surprises</h2>
      <dl className="mt-3 space-y-1.5 text-sm text-ink">
        <div className="flex justify-between"><dt>{pax} × {FARES[tier].label} fare</dt><dd>{eur(t.fareCents)}</dd></div>
        {seats.map(s => (
          <div key={s} className="flex justify-between"><dt>Seat {s}</dt><dd>{eur(seatCents(s, tier))}</dd></div>
        ))}
        {extras.map(e => (
          <div key={e} className="flex justify-between"><dt>{EXTRAS[e].label}</dt><dd>{eur(extraCents(e, tier) * pax)}</dd></div>
        ))}
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
        <span className="text-sm font-semibold text-ink">Total</span>
        <span className="rounded bg-sun/20 px-2 py-0.5 text-lg font-bold tabular-nums text-ink">{eur(t.totalCents)}</span>
      </div>
    </aside>
  )
}
