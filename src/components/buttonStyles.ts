// Shared between <Button> (in-flow) and the case page's CTA links, so a router
// <Link> can wear the exact same variant colours without drifting from Button.
export const buttonVariants = {
  primary: 'bg-sun text-ink hover:brightness-95',
  navy: 'bg-navy text-white hover:bg-navy-deep',
  ghost: 'border border-line text-ink hover:border-navy',
} as const

export type ButtonVariant = keyof typeof buttonVariants

export const buttonBase =
  'rounded-md px-6 py-3 text-sm font-semibold transition-colors duration-200'
