import type { ButtonHTMLAttributes } from 'react'
const styles = {
  primary: 'bg-sun text-ink hover:brightness-95',
  navy: 'bg-navy text-white hover:bg-navy-deep',
  ghost: 'border border-line text-ink hover:border-navy',
} as const
export function Button({ variant = 'navy', className = '', ...rest }:
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof styles }) {
  return <button {...rest}
    className={`rounded-md px-6 py-3 text-sm font-semibold transition-colors duration-200 ${styles[variant]} ${className}`} />
}
