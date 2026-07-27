import { describe, it, expect } from 'vitest'
import { hashString, mulberry32 } from './seed'

describe('seed', () => {
  it('hashString is deterministic and differs by input', () => {
    expect(hashString('DUB-BGY-2026-09-10')).toBe(hashString('DUB-BGY-2026-09-10'))
    expect(hashString('DUB-BGY-2026-09-10')).not.toBe(hashString('DUB-BGY-2026-09-11'))
  })
  it('mulberry32 yields a reproducible sequence in [0,1)', () => {
    const a = mulberry32(42), b = mulberry32(42)
    const seqA = [a(), a(), a()], seqB = [b(), b(), b()]
    expect(seqA).toEqual(seqB)
    seqA.forEach(v => { expect(v).toBeGreaterThanOrEqual(0); expect(v).toBeLessThan(1) })
  })
})
