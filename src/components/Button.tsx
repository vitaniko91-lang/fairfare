import type { ButtonHTMLAttributes } from 'react'
import { buttonBase, buttonVariants, type ButtonVariant } from './buttonStyles'

export function Button({ variant = 'navy', className = '', ...rest }:
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button {...rest}
    className={`${buttonBase} ${buttonVariants[variant]} ${className}`} />
}
