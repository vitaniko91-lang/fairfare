const STEPS = ['Search', 'Flights', 'Seats', 'Extras', 'Pay'] as const
export function Stepper({ current }: { current: number }) {
  return (
    <ol aria-label="Booking steps" className="flex gap-2 text-xs font-semibold uppercase tracking-wider">
      {STEPS.map((s, i) => (
        <li key={s} aria-current={i === current ? 'step' : undefined}
          className={i === current ? 'text-navy' : i < current ? 'text-body' : 'text-muted'}>
          {s}{i < STEPS.length - 1 && <span aria-hidden className="mx-2 text-line">—</span>}
        </li>
      ))}
    </ol>
  )
}
