import { describe, it, expect } from 'vitest'
import { AIRPORTS } from './airports'

describe('airports', () => {
  it('has 12 airports with unique IATA codes', () => {
    expect(AIRPORTS).toHaveLength(12)
    expect(new Set(AIRPORTS.map(a => a.code)).size).toBe(12)
  })
})
