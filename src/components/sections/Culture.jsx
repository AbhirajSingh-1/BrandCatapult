import { useEffect, useRef } from 'react'
import PillButton from '../common/PillButton'
import { culturePhotos } from '../../data/siteData'

// ─── data ─────────────────────────────────────────────────────────────────────

// Top 3: tall stacks, red cap + glow
const topStacks = [
  { id: 'cake',   imageIndex: 0, x: 12,   y: 22.2, width: 22,   height: 44.5, layers: 48, halo: 'rgba(150,183,255,0.32)' },
  { id: 'team',   imageIndex: 1, x: 36.4, y: 15.6, width: 22,   height: 51.2, layers: 55, halo: 'rgba(255,213,116,0.34)' },
  { id: 'ritual', imageIndex: 2, x: 62.6, y: 22.4, width: 21.5, height: 44.3, layers: 48, halo: 'rgba(255,188,164,0.28)' },
]

// Bottom 3: aligned with top stacks, no red cap
// y ≈ where top stacks end (~66.7 %)  height ≈ remaining space
const bottomStacks = [
  { id: 'desk',   imageIndex: 3, x: 12,   y: 67, width: 22,   height: 24, layers: 22 },
  { id: 'board',  imageIndex: 4, x: 36.4, y: 67, width: 22,   height: 24, layers: 22 },
  { id: 'laptop', imageIndex: 5, x: 62.6, y: 67, width: 21.5, height: 24, layers: 22 },
]

const topImageOffsets = {
  cake:   { size: 84, x: 50, y: -18 },
  team:   { size: 82, x: 50, y: -17 },
  ritual: { size: 82, x: 50, y: -18 },
}

// ─── shared coin layers ────────────────────────────────────────────────────────

function CoinLayers({ layers }) {
  return Array.from({ length: layers }).map((_, i) => (
    <span
      key={i}
      className="absolute left-1/2 h-[13px] w-full -translate-x-1/2 rounded-[50%] border border-cat-dark bg-white"
      style={{ bottom: `${(i / Math.max(layers - 1, 1)) * 96}%`, zIndex: i }}
      aria-hidden="true"
    />
  ))
}

// ─── top coin stack ────────────────────────────────────────────────────────────

function CoinStack({ stack, scrollRef }) {
  const item   = culturePhotos[stack.imageIndex]
  const offset = topImageOffsets[stack.id]
  const coinsRef = useRef(null)

  useEffect(() => {
    const el = coinsRef.current
    if (!el || !scrollRef?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.clipPath = entry.isIntersecting
          ? 'inset(0% 0 0% 0)'
          : 'inset(100% 0 0% 0)'
      },
      { root: null, threshold: 0.05 },
    )
    observer.observe(scrollRef.current)
    return () => observer.disconnect()
  }, [scrollRef])

  return (
    <div
      className="absolute"
      style={{ left: `${stack.x}%`, top: `${stack.y}%`, width: `${stack.width}%`, height: `${stack.height}%` }}
    >
      {/* coin layers — scroll-reveal via clip-path */}
      <div
        ref={coinsRef}
        className="absolute inset-0"
        style={{
          clipPath: 'inset(100% 0 0% 0)',
          transition: 'clip-path 0.9s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <CoinLayers layers={stack.layers} />
        {/* red cap */}
        <span
          className="absolute left-1/2 top-0 h-[18px] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cat-dark bg-cat-red"
          style={{ zIndex: stack.layers + 10 }}
          aria-hidden="true"
        />
      </div>

      {/* photo — z-index above every coin layer */}
      <div
        className="absolute aspect-square"
        style={{
          zIndex:    stack.layers + 50,
          width:     `${offset.size}%`,
          left:      `${offset.x}%`,
          top:       `${offset.y}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <span
          className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: `radial-gradient(circle, ${stack.halo} 0%, transparent 70%)` }}
          aria-hidden="true"
        />
        <img
          src={item.image}
          alt={item.alt}
          className="h-full w-full rounded-full border border-cat-dark object-cover"
          loading="lazy"
        />
      </div>
    </div>
  )
}

// ─── bottom coin stack (no red cap, image on top) ─────────────────────────────

function BottomCoinStack({ stack, scrollRef }) {
  const item     = culturePhotos[stack.imageIndex]
  const coinsRef = useRef(null)

  useEffect(() => {
    const el = coinsRef.current
    if (!el || !scrollRef?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.clipPath = entry.isIntersecting
          ? 'inset(0% 0 0% 0)'
          : 'inset(100% 0 0% 0)'
      },
      { root: null, threshold: 0.05 },
    )
    observer.observe(scrollRef.current)
    return () => observer.disconnect()
  }, [scrollRef])

  return (
    <div
      className="absolute"
      style={{ left: `${stack.x}%`, top: `${stack.y}%`, width: `${stack.width}%`, height: `${stack.height}%` }}
    >
      {/* coin layers — no red cap, scroll-reveal */}
      <div
        ref={coinsRef}
        className="absolute inset-0"
        style={{
          clipPath: 'inset(100% 0 0% 0)',
          transition: 'clip-path 0.9s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <CoinLayers layers={stack.layers} />
      </div>

      {/* photo ── sits on the topmost coin
          • bottom: 96%  → image bottom edge aligns with top coin bottom edge
          • z-index 999  → above every top-stack coin (max ~55 + 50 = 105)        */}
      <div
        className="absolute aspect-square"
        style={{
          zIndex:    999,
          width:     '84%',
          left:      '50%',
          bottom:    '96%',
          transform: 'translateX(-50%)',
        }}
      >
        <img
          src={item.image}
          alt={item.alt}
          className="h-full w-full rounded-full border border-cat-dark object-cover"
          loading="lazy"
        />
      </div>
    </div>
  )
}

// ─── copy block ───────────────────────────────────────────────────────────────

function CultureCopy({ eyebrow, title, button, copy, lower = false }) {
  return (
    <div
      className={`relative z-20 px-5 sm:px-8 md:absolute md:px-0 ${
        lower
          ? 'pt-12 md:left-[52%] md:top-[55%] md:pt-0'
          : 'pt-8  md:left-[52%] md:top-[4%]  md:pt-0'
      }`}
    >
      <div className="relative max-w-[360px] lg:max-w-[470px]">
        {eyebrow && (
          <p className="mb-4 text-[12px] font-bold uppercase text-cat-red md:mb-2">{eyebrow}</p>
        )}
        <div className="relative inline-block">
          <h2 className="text-[42px] font-light uppercase leading-[1.08] tracking-normal text-[#343434] sm:text-[50px] md:text-[40px] lg:text-[62px]">
            {title.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>
          <PillButton
            href={lower ? '#contact' : '#culture'}
            className={`mt-3 h-7 min-h-7 whitespace-nowrap px-3 py-1 text-[10px] tracking-[0.12em] md:absolute md:mt-0 ${
              lower ? 'md:left-[69%] md:top-[59%]' : 'md:left-[58%] md:top-[10%]'
            }`}
          >
            {button}
          </PillButton>
        </div>
        <p className="mt-5 max-w-[330px] text-[12px] leading-[1.25] text-[#7f7f7f] lg:max-w-[420px] lg:text-sm">
          {copy}
        </p>
      </div>
    </div>
  )
}

// ─── section ──────────────────────────────────────────────────────────────────

export default function Culture() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} id="culture" className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-x-0 bottom-0 top-[42%] -z-10 bg-[#eaf1fc]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px] pb-16 md:h-[744px] md:pb-0 lg:h-[900px]">
        <div className="absolute inset-x-0 bottom-0 top-[42%] bg-[#eaf1fc]" aria-hidden="true" />

        {/* left panel ── all stacks */}
        <div className="relative mx-auto h-[650px] w-full max-w-[390px] md:absolute md:left-0 md:top-0 md:h-full md:w-1/2 md:max-w-none">
          {topStacks.map((stack) => (
            <CoinStack key={stack.id} stack={stack} scrollRef={sectionRef} />
          ))}
          {bottomStacks.map((stack) => (
            <BottomCoinStack key={stack.id} stack={stack} scrollRef={sectionRef} />
          ))}
        </div>

        {/* right panel ── copy */}
        <div className="relative z-20 pt-0 md:static">
          <CultureCopy
            eyebrow="Culture"
            title={['Rituals', 'That Echo', 'The Energy']}
            button="Our Culture"
            copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type"
          />
          <CultureCopy
            lower
            title={['And Folks', 'Who Make', 'It Happen']}
            button="Join the team"
            copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type"
          />
        </div>
      </div>
    </section>
  )
}