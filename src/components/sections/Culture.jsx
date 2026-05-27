/**
 * Culture.jsx — "Our Culture" stacked-coin section
 *
 * Coins: SVG closed-path coins with curved elliptical sides (matches reference).
 * Animation: CSS clip-path reveal (inset bottom → 0) on scroll — works on SVG.
 * Mobile: single-column stacked layout, coins scale via SVG viewBox.
 */

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import PillButton from '../common/PillButton'
import { culturePhotos } from '../../data/siteData'

// ─── SVG viewport ─────────────────────────────────────────────────────────────
// Wide viewBox so coins have proper width and spacing between pillars
const VW = 600
const VH = 1200

// Three columns — each pillar has its own rx for per-column width control
// Gap between pillar edges: col1_cx - col0_cx - col0_rx - col1_rx = spacing
// 200 - 80 - 58 - 58 = 4px gap  → too tight, use cx spacing of 210
// col0: cx=80,  rx=58  → edges at 22..138
// col1: cx=300, rx=58  → edges at 242..358  (gap from col0 = 242-138 = 104px ✓)
// col2: cx=520, rx=58  → edges at 462..578  (gap from col1 = 462-358 = 104px ✓)
const COLS = [
  { cx: 90,  rx: 58 },   // left
  { cx: 300, rx: 58 },   // centre (tallest, widest)
  { cx: 510, rx: 58 },   // right
]

// Coin geometry — wider, flatter discs matching reference
const COIN_H  = 9     // coin height (top-arc to bottom-arc centre distance)
const COIN_RY = 4     // ellipse ry — very flat disc
const SIDE_RX = 8     // side arc rx — more pronounced curve on sides (was 2)
const STEP    = COIN_H  // flush stacking

// Red cap — slightly wider than coin
const CAP_RY = 8
const CAP_RX = 64

// Photo circle radius
const PHOTO_R = 56

// Coin counts
// Upper: left=44, centre=44, right=50 (few extra at bottom)
const TOP_N = [44, 44, 50]
// Lower: left=12, centre=20, right=4
const BOT_N = [12, 20, 4]

// ─── Layout math ─────────────────────────────────────────────────────────────
const MARGIN_BOT = 80   // extra space below lower cylinders
const BOT_BASE   = VH - MARGIN_BOT   // more breathing room at bottom

// Pillar height = (n-1)*STEP + COIN_H
const pillarH = (n) => (n - 1) * STEP + COIN_H

const BOT_H_MAX    = pillarH(BOT_N[1])   // centre bottom pillar height
const BOT_PHOTO_CY = BOT_N.map(n => BOT_BASE - pillarH(n) - PHOTO_R - 2)

const GROUP_GAP    = 30
const TOP_BASE     = BOT_BASE - BOT_H_MAX - PHOTO_R * 2 - 6 - GROUP_GAP

// Left & right sit lower than centre by this offset
const TOP_SIDE_OFFSET = 80

// Right pillar gets 6 extra coins at the bottom — lower its baseY by that amount
const RIGHT_EXTRA = 6
const TOP_BASE_PER_COL = [
  TOP_BASE + TOP_SIDE_OFFSET,                    // left
  TOP_BASE,                                       // centre — highest
  TOP_BASE + TOP_SIDE_OFFSET + RIGHT_EXTRA * STEP, // right — extra coins at bottom
]

const TOP_PHOTO_CY = TOP_N.map((n, i) => TOP_BASE_PER_COL[i] - pillarH(n) - PHOTO_R - 2)

// ─── Coin path ────────────────────────────────────────────────────────────────
// Closed shape: top arc → right curved side → bottom arc → left curved side
// topCY = y of top arc centre
function coinPath(cx, rx, ry, sideRx, coinH, topCY) {
  const botCY = topCY + coinH
  const halfH = coinH / 2
  return [
    `M ${cx - rx} ${topCY}`,
    `A ${rx} ${ry} 0 0 1 ${cx + rx} ${topCY}`,       // top arc L→R
    `A ${sideRx} ${halfH} 0 0 1 ${cx + rx} ${botCY}`, // right side arc (curved)
    `A ${rx} ${ry} 0 0 1 ${cx - rx} ${botCY}`,        // bottom arc R→L
    `A ${sideRx} ${halfH} 0 0 1 ${cx - rx} ${topCY}`, // left side arc (curved)
    `Z`,
  ].join(' ')
}

// ─── SvgPillar with clip-path reveal ─────────────────────────────────────────
// Uses an SVG <clipPath> with a rect whose Y position animates from bottom to top.
// We drive this with inline style on the rect — but clipPath children don't
// respond to CSS transforms in all browsers.
// Instead: we animate the rect's `y` and `height` attributes via a CSS animation
// defined in a <style> tag, keyed by pillarId.

function SvgPillar({ col, n, baseY, hasRedCap, revealed, delay, pillarId }) {
  const { cx, rx } = COLS[col]

  const coins = Array.from({ length: n }, (_, i) => baseY - COIN_H - i * STEP)
  const pillarTopCY = coins[n - 1]

  const clipTop    = pillarTopCY - CAP_RY - PHOTO_R * 2 - 10
  const clipBottom = baseY + COIN_RY + 4
  const clipH      = clipBottom - clipTop
  const clipId     = `cp-${pillarId}`
  const animId     = `anim-${pillarId}`

  return (
    <g>
      <defs>
        {/* Keyframe: rect starts at clipBottom (height=0) and expands upward */}
        {revealed && (
          <style>{`
            @keyframes ${animId} {
              from { y: ${clipBottom}px; height: 0px; }
              to   { y: ${clipTop}px;   height: ${clipH}px; }
            }
            #${clipId} rect {
              animation: ${animId} 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s both;
            }
          `}</style>
        )}
        <clipPath id={clipId}>
          <rect
            x={cx - rx - 60}
            y={revealed ? clipTop : clipBottom}
            width={rx * 2 + 120}
            height={revealed ? clipH : 0}
          />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {coins.map((topCY, i) => (
          <path
            key={i}
            d={coinPath(cx, rx, COIN_RY, SIDE_RX, COIN_H, topCY)}
            fill="white"
            stroke="#1a1a1a"
            strokeWidth="0.9"
          />
        ))}

        {hasRedCap && (
          <ellipse
            cx={cx}
            cy={pillarTopCY - CAP_RY}
            rx={CAP_RX}
            ry={CAP_RY}
            fill="#cf2436"
            stroke="#1a1a1a"
            strokeWidth="0.9"
          />
        )}
      </g>
    </g>
  )
}

// ─── SvgPhoto ─────────────────────────────────────────────────────────────────
function SvgPhoto({ id, col, cy, src, halo, revealed, delay }) {
  const { cx } = COLS[col]
  const clipId = `cp-photo-${id}`
  const glowId = `glow-${id}`
  const animId = `anim-photo-${id}`

  return (
    <g>
      <defs>
        {revealed && (
          <style>{`
            @keyframes ${animId} {
              from { opacity: 0; transform: scale(0.55); }
              to   { opacity: 1; transform: scale(1); }
            }
            .photo-${id} {
              transform-origin: ${cx}px ${cy}px;
              transform-box: fill-box;
              animation: ${animId} 0.65s cubic-bezier(0.34,1.4,0.64,1) ${delay}s both;
            }
          `}</style>
        )}
        {halo && (
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={halo} stopOpacity="0.75" />
            <stop offset="55%"  stopColor={halo} stopOpacity="0.12" />
            <stop offset="100%" stopColor={halo} stopOpacity="0" />
          </radialGradient>
        )}
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={PHOTO_R} />
        </clipPath>
      </defs>

      <g className={`photo-${id}`} style={{ opacity: revealed ? undefined : 0 }}>
        {halo && (
          <circle cx={cx} cy={cy} r={PHOTO_R * 2.4} fill={`url(#${glowId})`} />
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
      </g>
    </g>
  )
}

// ─── CultureCopy ──────────────────────────────────────────────────────────────
function CultureCopy({ title, button, href, copy, delay }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
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
  const svgRef     = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Use IntersectionObserver directly — more reliable than useInView for SVG
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const photos = culturePhotos

  return (
    <section
      ref={sectionRef}
      id="culture"
      className="relative isolate overflow-hidden"
      style={{ background: '#f4f4f4' }}
    >
      {/* Background split — sits at the midpoint of the upper cylinders (~52%)
          so upper cylinders straddle the gray/blue boundary */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ top: '52%', background: '#e6edf8' }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ top: '52%', background: '#e6edf8' }}
        />

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col md:flex-row md:items-stretch">

          {/* LEFT — SVG coin panel */}
          <div className="relative w-full shrink-0 md:w-[48%] lg:w-[45%]">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VW} ${VH}`}
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block"
              aria-hidden="true"
            >
              {/* Top pillars — left & right sit lower than centre */}
              {TOP_N.map((n, col) => (
                <SvgPillar
                  key={`t${col}`}
                  pillarId={`t${col}`}
                  col={col} n={n} baseY={TOP_BASE_PER_COL[col]} hasRedCap
                  revealed={revealed}
                  delay={col === 1 ? 0.05 : col === 0 ? 0.15 : 0.2}
                />
              ))}

              {/* Bottom pillars */}
              {BOT_N.map((n, col) => (
                <SvgPillar
                  key={`b${col}`}
                  pillarId={`b${col}`}
                  col={col} n={n} baseY={BOT_BASE} hasRedCap={false}
                  revealed={revealed}
                  delay={col === 1 ? 0.28 : 0.33}
                />
              ))}

              {/* Top photos */}
              <SvgPhoto id="tL" col={0} cy={TOP_PHOTO_CY[0]} src={photos[0].image} halo="#6496ff" revealed={revealed} delay={0.70} />
              <SvgPhoto id="tC" col={1} cy={TOP_PHOTO_CY[1]} src={photos[1].image} halo="#ffc846" revealed={revealed} delay={0.58} />
              <SvgPhoto id="tR" col={2} cy={TOP_PHOTO_CY[2]} src={photos[2].image} halo="#ff8c6e" revealed={revealed} delay={0.75} />

              {/* Bottom photos */}
              <SvgPhoto id="bL" col={0} cy={BOT_PHOTO_CY[0]} src={photos[3].image} revealed={revealed} delay={0.85} />
              <SvgPhoto id="bC" col={1} cy={BOT_PHOTO_CY[1]} src={photos[4].image} revealed={revealed} delay={0.80} />
              <SvgPhoto id="bR" col={2} cy={BOT_PHOTO_CY[2]} src={photos[5].image} revealed={revealed} delay={0.85} />
            </svg>
          </div>

          {/* RIGHT — copy: two blocks aligned with the two halves of the section */}
          <div className="relative z-20 flex flex-col md:w-[52%]">
            {/* TOP copy — sits in the upper (gray) half */}
            <div className="flex items-center px-6 py-14 md:h-[52%] md:items-start md:px-10 md:pt-20 md:pb-0 lg:px-14 xl:px-20">
              <CultureCopy
                title={['Rituals', 'That Echo', 'The Energy']}
                button="OUR CULTURE"
                href="#culture"
                copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
                delay={0.25}
              />
            </div>

            {/* BOTTOM copy — sits in the lower (blue) half */}
            <div className="flex items-center px-6 pb-14 md:h-[48%] md:items-start md:px-10 md:pt-12 md:pb-0 lg:px-14 xl:px-20">
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
      </div>
    </section>
  )
}
