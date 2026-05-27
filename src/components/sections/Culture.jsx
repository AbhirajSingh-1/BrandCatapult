/**
 * Culture.jsx — "Our Culture" stacked-coin section
 *
 * Coins: SVG closed-path coins with curved elliptical sides (matches reference).
 * Animation: CSS clip-path reveal (inset bottom → 0) on scroll — works on SVG.
 * Mobile: top copy → SVG cylinders → bottom copy (single-column stacked layout).
 */

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import PillButton from '../common/PillButton'
import { culturePhotos } from '../../data/siteData'

// ─── SVG viewport ─────────────────────────────────────────────────────────────
const VW = 600
const VH = 1200

// Three columns
const COLS = [
  { cx: 90,  rx: 58 },   // left
  { cx: 300, rx: 58 },   // centre (tallest)
  { cx: 510, rx: 58 },   // right
]

// Coin geometry
const COIN_H  = 9
const COIN_RY = 4
const SIDE_RX = 8
const STEP    = COIN_H

// Red cap
const CAP_RY = 8
const CAP_RX = 64

// Photo circle radius
const PHOTO_R = 56

// Coin counts
const TOP_N = [44, 44, 50]
const BOT_N = [12, 20, 4]

// ─── Layout math ─────────────────────────────────────────────────────────────
const MARGIN_BOT = 80
const BOT_BASE   = VH - MARGIN_BOT

const pillarH = (n) => (n - 1) * STEP + COIN_H

const BOT_H_MAX    = pillarH(BOT_N[1])
const BOT_PHOTO_CY = BOT_N.map(n => BOT_BASE - pillarH(n) - PHOTO_R - 2)

const GROUP_GAP    = 30
const TOP_BASE     = BOT_BASE - BOT_H_MAX - PHOTO_R * 2 - 6 - GROUP_GAP

const TOP_SIDE_OFFSET = 80
const RIGHT_EXTRA     = 6

const TOP_BASE_PER_COL = [
  TOP_BASE + TOP_SIDE_OFFSET,
  TOP_BASE,
  TOP_BASE + TOP_SIDE_OFFSET + RIGHT_EXTRA * STEP,
]

const TOP_PHOTO_CY = TOP_N.map((n, i) => TOP_BASE_PER_COL[i] - pillarH(n) - PHOTO_R - 2)

// ─── Coin path ────────────────────────────────────────────────────────────────
function coinPath(cx, rx, ry, sideRx, coinH, topCY) {
  const botCY = topCY + coinH
  const halfH = coinH / 2
  return [
    `M ${cx - rx} ${topCY}`,
    `A ${rx} ${ry} 0 0 1 ${cx + rx} ${topCY}`,
    `A ${sideRx} ${halfH} 0 0 1 ${cx + rx} ${botCY}`,
    `A ${rx} ${ry} 0 0 1 ${cx - rx} ${botCY}`,
    `A ${sideRx} ${halfH} 0 0 1 ${cx - rx} ${topCY}`,
    `Z`,
  ].join(' ')
}

// ─── SvgPillar ────────────────────────────────────────────────────────────────
function SvgPillar({ col, n, baseY, hasRedCap, photoCY, revealed, delay, pillarId }) {
  const { cx, rx } = COLS[col]

  const coins = Array.from({ length: n }, (_, i) => baseY - COIN_H - i * STEP)
  const pillarTopCY = coins[n - 1]

  const capCY = hasRedCap && photoCY != null
    ? photoCY + PHOTO_R - CAP_RY
    : pillarTopCY - CAP_RY

  const clipTop    = hasRedCap && photoCY != null
    ? photoCY - PHOTO_R - 10
    : pillarTopCY - CAP_RY - PHOTO_R * 2 - 10
  const clipBottom = baseY + COIN_RY + 4
  const clipH      = clipBottom - clipTop
  const clipId     = `cp-${pillarId}`
  const animId     = `anim-${pillarId}`

  return (
    <g>
      <defs>
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
            cy={capCY}
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

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRevealed(entry.isIntersecting)
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
      {/* Background split */}
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

          {/* ── MOBILE ONLY: top copy sits ABOVE the SVG cylinders ── */}
          <div className="md:hidden px-6 pt-14 pb-0">
            <CultureCopy
              title={['Rituals', 'That Echo', 'The Energy']}
              button="OUR CULTURE"
              href="#culture"
              copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
              delay={0.25}
            />
          </div>

          {/* LEFT — SVG coin panel */}
          <div
            className="relative w-full shrink-0 -mt-16 md:mt-0 md:w-[48%] lg:w-[45%]"
            style={{ perspective: '1800px' }}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VW} ${VH}`}
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block"
              aria-hidden="true"
              style={{
                transform: 'rotateX(8deg)',
                transformOrigin: '50% 50%',
              }}
            >
              {/* Top pillars */}
              {TOP_N.map((n, col) => (
                <SvgPillar
                  key={`t${col}`}
                  pillarId={`t${col}`}
                  col={col}
                  n={n}
                  baseY={TOP_BASE_PER_COL[col]}
                  hasRedCap
                  photoCY={TOP_PHOTO_CY[col]}
                  revealed={revealed}
                  delay={col === 1 ? 0.05 : col === 0 ? 0.15 : 0.2}
                />
              ))}

              {/* Bottom pillars */}
              {BOT_N.map((n, col) => (
                <SvgPillar
                  key={`b${col}`}
                  pillarId={`b${col}`}
                  col={col}
                  n={n}
                  baseY={BOT_BASE}
                  hasRedCap={false}
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

          {/* RIGHT — copy column */}
          <div className="relative z-20 flex flex-col md:w-[52%]">

            {/* TOP copy — DESKTOP ONLY (mobile version lives above the SVG) */}
            <div className="hidden md:flex items-center px-6 py-14 md:h-[52%] md:items-start md:px-10 md:pt-20 md:pb-0 lg:px-14 xl:px-20">
              <CultureCopy
                title={['Rituals', 'That Echo', 'The Energy']}
                button="OUR CULTURE"
                href="#culture"
                copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
                delay={0.25}
              />
            </div>

            {/* BOTTOM copy — visible on BOTH mobile and desktop */}
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