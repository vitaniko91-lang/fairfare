import type { Airport } from './types'

export const AIRPORTS: Airport[] = [
  { code: 'DUB', city: 'Dublin', country: 'Ireland' },
  { code: 'STN', city: 'London Stansted', country: 'UK' },
  { code: 'BGY', city: 'Milan Bergamo', country: 'Italy' },
  { code: 'MAD', city: 'Madrid', country: 'Spain' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain' },
  { code: 'LIS', city: 'Lisbon', country: 'Portugal' },
  { code: 'KRK', city: 'Kraków', country: 'Poland' },
  { code: 'WMI', city: 'Warsaw Modlin', country: 'Poland' },
  { code: 'BER', city: 'Berlin', country: 'Germany' },
  { code: 'CRL', city: 'Brussels Charleroi', country: 'Belgium' },
  { code: 'VIE', city: 'Vienna', country: 'Austria' },
  { code: 'ATH', city: 'Athens', country: 'Greece' },
]

export const byCode = (code: string): Airport =>
  AIRPORTS.find(a => a.code === code) ?? AIRPORTS[0]
