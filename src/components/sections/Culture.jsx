/**
 * Culture.jsx — "Our Culture" stacked-coin section
 *
 * Coin pillars rendered as SVG.
 * Each coin = white filled rect-with-rounded-top-arc shape.
 * Result: flat stacked discs, no slinky/spring look.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PillButton from '../common/PillButton'
import { culturePhotos } from '../../data/siteData'

// ─── SVG viewport ─────────────────────────────────────────────────────────────
const VW = 480
const VH = 980

// Three columns
const COLS = [
  { cx: 80,  rx: 38 },
  { cx: 240, rx: 38 },
  { cx: 400, rx: 38 },
]

// Coin dimensions
// COIN_H = vertical distance between top-arc centre and bottom-arc centre
// The side border is a vertical ellipse arc with rx_side = small curve inward
const COIN_H    = 10    // centre-to-centre distance top→bottom arc
const COIN_RY   = 4     // ellipse ry for top/bottom arc (flat disc look)
const COIN_RX   = 38    // ellipse rx (= column half-width)
// Side arc: connects right endpoint of top arc to right endpoint of bottom arc
// We use a tall narrow ellipse: rx_side = small (gives the curved-in side look)
const SIDE_RX   = 4     // horizontal radius of the side arc curve
const COIN_GAP  = 0     // gap between stacked coins (0 = flush)
const STEP      = COIN_H + COIN_GAP

// Red cap
const CAP_RY = 6
const CAP_RX = 42

// Photo
const PHOTO_R = 50

// Disc counts
const TOP_N = [36, 48, 36]
const BOT_N = [16, 20, 16]

// ─── Layout ───────────────────────────────────────────────────────────────────
// baseY = centre of the bottom arc of the bottommost coin
// Pillar total height (top arc centre to bottom arc centre) = (n-1) * STEP + COIN_H
// Photo sits above the topmost coin's top arc centre

const MARGIN_BOT  = 12
const BOT_BASE    = VH - MARGIN_BOT                                          // 968

// Height from bottom arc centre to top arc centre of tallest bottom pillar
const BOT_H_MAX   = (BOT_N[1] - 1) * STEP + COIN_H                          // 190+10=200
// Photo centre = BOT_BASE - BOT_H_MAX - PHOTO_R - 2
const BOT_PHOTO_CY = BOT_N.map(n =>
  BOT_BASE - ((n - 1) * STEP + COIN_H) - PHOTO_R - 2
)

const GROUP_GAP   = 26
// TOP_BASE = bottom of top pillar group = top photo top of bottom group - gap
const TOP_BASE    = BOT_BASE - BOT_H_MAX - PHOTO_R * 2 - 4 - GROUP_GAP

const TOP_PHOTO_CY = TOP_N.map(n =>
  TOP_BASE - ((n - 1) * STEP + COIN_H) - PHOTO_R - 2
)

// ─── Coin path builder ────────────────────────────────────────────────────────
/**
 * Each coin is a closed path with:
 *   - Top edge:    elliptical arc (rx, ry) left→right  [the top face]
 *   - Right side:  elliptical arc (SIDE_RX, COIN_H/2) top-right→bottom-right
 *                  This gives the curved-inward side border matching the reference
 *   - Bottom edge: elliptical arc (rx, ry) right→left  [the bottom face]
 *   - Left side:   elliptical arc (SIDE_RX, COIN_H/2) bottom-left→top-left
 *
 * `topCY` = y-coordinate of the TOP arc centre (not the top edge)
 * Top arc endpoints are at y = topCY (centre of top ellipse)
 * Bottom arc endpoints are at y = topCY + COIN_H
 */
function coinPath(cx, rx, ry, sideRx, coinH, topCY) {
  const botCY = topCY + coinH
  const halfH = coinH / 2
  return [
    // Start at left end of top arc
    `M ${cx - rx} ${topCY}`,
    // Top arc: left → right (sweep=1 = clockwise = top of ellipse going right)
    `A ${rx} ${ry} 0 0 1 ${cx + rx} ${topCY}`,
    // Right side arc: top-right → bottom-right (curved inward)
    // Large-arc=0, sweep=1 (curves right/outward slightly then down)
    `A ${sideRx} ${halfH} 0 0 1 ${cx + rx} ${botCY}`,
    // Bottom arc: right → left (sweep=1 = same direction = bottom of ellipse going left)
    `A ${rx} ${ry} 0 0 1 ${cx - rx} ${botCY}`,
    // Left side arc: bottom-left → top-left (curved inward, mirror of right)
    `A ${sideRx} ${halfH} 0 0 1 ${cx - rx} ${topCY}`,
    `Z`,
  ].join(' ')
}

// ─── SvgPillar ────────────────────────────────────────────────────────────────
function SvgPillar({ col, n, baseY, hasRedCap, inView, delay }) {
  const { cx, rx } = COLS[col]

  // topCY of each coin's top arc, from bottom coin (index 0) upward
  // baseY = centre of the bottom arc of the bottommost coin
  const coins = Array.from({ length: n }, (_, i) => {
    const topCY = baseY - COIN_H - i * STEP
    return topCY
  })

  const pillarTopCY = coins[n - 1]   // top arc centre of the topmost coin

  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${baseY}px` }}
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {/* Each coin: closed path with curved sides */}
      {coins.map((topCY, i) => (
        <path
          key={i}
          d={coinPath(cx, rx, COIN_RY, SIDE_RX, COIN_H, topCY)}
          fill="white"
          stroke="#1a1a1a"
          strokeWidth="0.85"
        />
      ))}

      {/* Red cap on top */}
      {hasRedCap && (
        <ellipse
          cx={cx}
          cy={pillarTopCY - CAP_RY}
          rx={CAP_RX}
          ry={CAP_RY}
          fill="#cf2436"
          stroke="#1a1a1a"
          strokeWidth="0.85"
        />
      )}
    </motion.g>
  )
}

// ─── SvgPhoto ─────────────────────────────────────────────────────────────────
function SvgPhoto({ id, col, cy, src, halo, inView, delay }) {
  const { cx } = COLS[col]
  const clipId = `clip-${id}`
  const glowId = `glow-${id}`

  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.65, ease: [0.34, 1.4, 0.64, 1], delay }}
    >
      <defs>
        {halo && (
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={halo} stopOpacity="0.8" />
            <stop offset="55%"  stopColor={halo} stopOpacity="0.15" />
            <stop offset="100%" stopColor={halo} stopOpacity="0" />
          </radialGradient>
        )}
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={PHOTO_R} />
        </clipPath>
      </defs>

      {halo && (
        <circle cx={cx} cy={cy} r={PHOTO_R * 2.5} fill={`url(#${glowId})`} />
      )}

      <image
        href={src}
        x={cx - PHOTO_R}
        y={cy - PHOTO_R}
        width={PHOTO_R * 2}
        height={PHOTO_R * 2}
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />

      <circle cx={cx} cy={cy} r={PHOTO_R} fill="none" stroke="#1a1a1a" strokeWidth="0.9" />
    </motion.g>
  )
}

// ─── CultureCopy ──────────────────────────────────────────────────────────────
function CultureCopy({ title, button, href, copy, delay }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: 'easeOut', delay }}
    >
      <div className="relative inline-block">
        <h2 className="text-[34px] font-light uppercase leading-[1.04] tracking-tight text-[#343434] sm:text-[42px] md:text-[34px] lg:text-[52px] xl:text-[60px]">
          {title.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h2>
        <PillButton
          href={href}
          className="absolute right-0 top-[20%] translate-x-[30%] -translate-y-1/2 !h-7 !min-h-7 whitespace-nowrap !px-4 !py-0 !text-[9px] !tracking-[0.13em] md:!text-[10px]"
        >
          {button}
        </PillButton>
      </div>
      <p className="mt-5 max-w-[300px] text-[11.5px] leading-[1.65] text-[#808080] lg:max-w-[360px] lg:text-[13px]">
        {copy}
      </p>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Culture() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, amount: 0.05 })
  const photos     = culturePhotos

  return (
    <section
      ref={sectionRef}
      id="culture"
      className="relative isolate overflow-hidden"
      style={{ background: '#f4f4f4' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ top: '44%', background: '#e6edf8' }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ top: '44%', background: '#e6edf8' }}
        />

        <div className="relative flex flex-col md:flex-row md:items-stretch">

          {/* LEFT — coin SVG */}
          <div className="relative w-full shrink-0 md:w-[48%] lg:w-[45%]">
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block"
              aria-hidden="true"
            >
              {/* Top pillars (red cap) */}
              {TOP_N.map((n, col) => (
                <SvgPillar
                  key={`t${col}`}
                  col={col} n={n} baseY={TOP_BASE} hasRedCap
                  inView={inView}
                  delay={col === 1 ? 0.05 : col === 0 ? 0.15 : 0.2}
                />
              ))}

              {/* Bottom pillars (no cap) */}
              {BOT_N.map((n, col) => (
                <SvgPillar
                  key={`b${col}`}
                  col={col} n={n} baseY={BOT_BASE} hasRedCap={false}
                  inView={inView}
                  delay={col === 1 ? 0.28 : 0.33}
                />
              ))}

              {/* Top photos */}
              <SvgPhoto id="tL" col={0} cy={TOP_PHOTO_CY[0]} src={photos[0].image} halo="#6496ff" inView={inView} delay={0.70} />
              <SvgPhoto id="tC" col={1} cy={TOP_PHOTO_CY[1]} src={photos[1].image} halo="#ffc846" inView={inView} delay={0.58} />
              <SvgPhoto id="tR" col={2} cy={TOP_PHOTO_CY[2]} src={photos[2].image} halo="#ff8c6e" inView={inView} delay={0.75} />

              {/* Bottom photos */}
              <SvgPhoto id="bL" col={0} cy={BOT_PHOTO_CY[0]} src={photos[3].image} inView={inView} delay={0.85} />
              <SvgPhoto id="bC" col={1} cy={BOT_PHOTO_CY[1]} src={photos[4].image} inView={inView} delay={0.80} />
              <SvgPhoto id="bR" col={2} cy={BOT_PHOTO_CY[2]} src={photos[5].image} inView={inView} delay={0.85} />
            </svg>
          </div>

          {/* RIGHT — copy */}
          <div className="relative z-20 flex flex-col justify-around gap-16 px-6 py-14 md:w-[52%] md:py-20 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
            <CultureCopy
              title={['Rituals', 'That Echo', 'The Energy']}
              button="OUR CULTURE"
              href="#culture"
              copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
              delay={0.25}
            />
            <CultureCopy
              title={['And Folks', 'Who Make', 'It Happen']}
              button="JOIN THE TEAM"
              href="#contact"
              copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
              delay={0.45}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
