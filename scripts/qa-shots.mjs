// Responsive + a11y QA capture. Uses the system Chrome via playwright-core so it needs
// no browser download, and — unlike `chrome --headless --window-size` — it can emulate
// viewports below Chrome's 500px minimum window width.
//
//   node scripts/qa-shots.mjs            # against http://localhost:4173
//   BASE=https://… node scripts/qa-shots.mjs
import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const BASE = process.env.BASE ?? 'http://localhost:4173'
// Resolved from the working directory (run this from the project root).
const OUT = resolve(process.env.OUT ?? '../../docs/portfolio/fairfare/qa')
const WIDTHS = [1920, 768, 375]

// Each entry drives the stateful flow from /book, since the deep routes are guarded.
const toFlights = async page => {
  await page.fill('#date', '2026-09-16')
  await page.getByRole('button', { name: 'Find flights' }).click()
  await page.getByRole('heading', { name: /Dublin/ }).waitFor()
}
const toFare = async page => {
  await toFlights(page)
  await page.locator('li button[aria-expanded]').first().click()
  await page.getByRole('radio', { name: /REGULAR/i }).click()
}
const toSeats = async page => {
  await toFare(page)
  await page.getByRole('button', { name: /^Continue with/ }).click()
  await page.getByRole('heading', { name: /Pick seats/ }).waitFor()
}
const toExtras = async page => {
  await toSeats(page)
  await page.getByRole('button', { name: /^Skip/ }).click()
  await page.getByRole('heading', { name: /Anything else/ }).waitFor()
}
const toPay = async page => {
  await toExtras(page)
  await page.getByRole('button', { name: 'Continue to payment' }).click()
  await page.getByRole('heading', { name: /Pay as a guest/ }).waitFor()
}

const STEPS = [
  { name: 'case', path: '/', drive: null },
  { name: 'search', path: '/book', drive: null },
  { name: 'flights', path: '/book', drive: toFare },
  { name: 'seats', path: '/book', drive: toSeats },
  { name: 'extras', path: '/book', drive: toExtras },
  { name: 'pay', path: '/book', drive: toPay },
]

const results = []

const browser = await chromium.launch({ channel: 'chrome' })
await mkdir(OUT, { recursive: true })

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: 'no-preference',
  })
  const page = await ctx.newPage()

  for (const step of STEPS) {
    await page.goto(BASE + step.path, { waitUntil: 'networkidle' })
    if (step.drive) await step.drive(page)
    await page.waitForTimeout(600)

    // Scroll the whole page so every whileInView reveal fires, then return to the top.
    await page.evaluate(async () => {
      const h = document.body.scrollHeight
      for (let y = 0; y < h; y += window.innerHeight) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 90))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)

    const audit = await page.evaluate(() => {
      const de = document.documentElement
      // An element may legitimately exceed the viewport when it lives inside a
      // horizontal scroll container (the house rules require exactly that for wide
      // tables and the seat map). Only flag it when NO ancestor scrolls it.
      const insideScroller = el => {
        for (let p = el.parentElement; p; p = p.parentElement) {
          const ox = getComputedStyle(p).overflowX
          if (ox === 'auto' || ox === 'scroll') return true
        }
        return false
      }
      const overflowing = [...document.querySelectorAll('body *')]
        .filter(el => {
          const cs = getComputedStyle(el)
          if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') return false
          if (el.getBoundingClientRect().right <= de.clientWidth + 1) return false
          return !insideScroller(el)
        })
        .slice(0, 5)
        .map(el => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`)
      const imgs = [...document.images]
      return {
        docW: de.scrollWidth,
        winW: window.innerWidth,
        overflowing,
        brokenImgs: imgs.filter(i => i.complete && i.naturalWidth === 0).length,
        imgsWithoutAlt: imgs.filter(i => !i.alt).length,
        h1s: document.querySelectorAll('h1').length,
      }
    })
    results.push({ width, step: step.name, ...audit })

    await page.screenshot({
      path: `${OUT}/${width}-${step.name}.png`,
      fullPage: true,
    })
  }
  await ctx.close()
}

// Reduced-motion: every revealed section must be at full opacity on the first frame.
const rmCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const rmPage = await rmCtx.newPage()
await rmPage.goto(BASE + '/', { waitUntil: 'networkidle' })
await rmPage.waitForTimeout(400)
const reduced = await rmPage.evaluate(() =>
  [...document.querySelectorAll('section')].map(s => {
    const cs = getComputedStyle(s)
    return { opacity: cs.opacity, transform: cs.transform }
  }),
)
const rmBad = reduced.filter(s => s.opacity !== '1' || (s.transform !== 'none' && s.transform !== 'matrix(1, 0, 0, 1, 0, 0)'))
await rmCtx.close()
await browser.close()

console.log(JSON.stringify({ results, reducedMotionViolations: rmBad }, null, 1))
const fail = results.some(r => r.docW > r.winW || r.overflowing.length || r.brokenImgs || r.imgsWithoutAlt || r.h1s !== 1)
console.log(fail || rmBad.length ? '\nFAIL' : '\nPASS')
process.exit(fail || rmBad.length ? 1 : 0)
