// label always visible, error announced via aria-live
import type { InputHTMLAttributes } from 'react'
export function Field({ label, error, id, ...rest }:
  InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-ink">{label}</label>
      <input id={id} aria-invalid={!!error} {...rest}
        className="rounded-md border border-line bg-white px-4 py-3 text-sm text-ink aria-invalid:border-err" />
      <p aria-live="polite" className="min-h-4 text-xs text-err">{error ?? ''}</p>
    </div>
  )
}
