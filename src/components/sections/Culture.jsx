import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PillButton from '../common/PillButton'
import { culturePhotos } from '../../data/siteData'

const stacks = [
  { id: 'cake', imageIndex: 0, x: 7.2, y: 21.8, width: 22.8, height: 50.2, layers: 48, halo: 'rgba(150,183,255,0.35)', start: 0.03, end: 0.34, drift: 34 },
  { id: 'team', imageIndex: 1, x: 31.6, y: 14.2, width: 23.6, height: 55.4, layers: 54, halo: 'rgba(255,213,116,0.35)', start: 0.08, end: 0.41, drift: 18 },
  { id: 'ritual', imageIndex: 2, x: 58.4, y: 22.1, width: 22.4, height: 50.6, layers: 49, halo: 'rgba(255,188,164,0.28)', start: 0.13, end: 0.47, drift: 28 },
  { id: 'desk', imageIndex: 3, x: 7.6, y: 78.2, width: 22.2, height: 10.2, layers: 12, halo: 'rgba(255,213,116,0.16)', start: 0.52, end: 0.78, drift: 46 },
  { id: 'board', imageIndex: 4, x: 31.8, y: 68.1, width: 23.4, height: 20.2, layers: 22, halo: 'rgba(150,183,255,0.16)', start: 0.43, end: 0.73, drift: 32 },
  { id: 'laptop', imageIndex: 5, x: 59.6, y: 83.4, width: 20.5, height: 5.4, layers: 7, halo: 'rgba(255,188,164,0.15)', start: 0.58, end: 0.84, drift: 50 },
]

const imageOffsets = {
  cake: { size: 87, x: 50, y: -34 },
  team: { size: 78, x: 50, y: -34 },
  ritual: { size: 76, x: 50, y: -35 },
  desk: { size: 92, x: 49, y: -78 },
  board: { size: 82, x: 50, y: -51 },
  laptop: { size: 94, x: 52, y: -77 },
}

function useReveal(scrollYProgress, start, end, drift) {
  const progress = useSpring(useTransform(scrollYProgress, [start, end], [0, 1]), {
    stiffness: 86,
    damping: 24,
    mass: 0.6,
  })

  return {
    progress,
    clipPath: useTransform(progress, (value) => `inset(${(1 - value) * 100}% -8% 0 -8%)`),
    y: useTransform(progress, [0, 1], [drift, 0]),
    imageOpacity: useTransform(progress, [0.58, 0.86], [0, 1]),
    imageScale: useTransform(progress, [0.5, 1], [0.72, 1]),
    capOpacity: useTransform(progress, [0.86, 1], [0, 1]),
  }
}

function CoinLayers({ layers }) {
  return Array.from({ length: layers }).map((_, index) => (
    <span
      key={index}
      className="absolute left-1/2 h-[15px] w-full -translate-x-1/2 rounded-[50%] border border-cat-dark bg-white"
      style={{
        bottom: `${(index / Math.max(layers - 1, 1)) * 94}%`,
        zIndex: index,
      }}
      aria-hidden="true"
    />
  ))
}

function CulturePhoto({ stack, item, opacity, scale }) {
  const offset = imageOffsets[stack.id]

  return (
    <motion.div
      className="absolute z-30 aspect-square"
      style={{
        width: `${offset.size}%`,
        left: `${offset.x}%`,
        top: `${offset.y}%`,
        opacity,
        scale,
        x: '-50%',
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[185%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${stack.halo} 0 20%, transparent 21% 34%, ${stack.halo} 35% 47%, transparent 48% 60%, ${stack.halo} 61% 72%, transparent 73%)`,
        }}
        aria-hidden="true"
      />
      <img
        src={item.image}
        alt={item.alt}
        className="h-full w-full rounded-full border border-cat-dark object-cover"
        loading="lazy"
      />
    </motion.div>
  )
}

function CoinStack({ stack, scrollYProgress }) {
  const item = culturePhotos[stack.imageIndex]
  const reveal = useReveal(scrollYProgress, stack.start, stack.end, stack.drift)

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${stack.x}%`,
        top: `${stack.y}%`,
        width: `${stack.width}%`,
        height: `${stack.height}%`,
        y: reveal.y,
      }}
    >
      <motion.div className="absolute inset-0" style={{ clipPath: reveal.clipPath }}>
        <CoinLayers layers={stack.layers} />
        <motion.span
          className="absolute left-1/2 top-0 z-[90] h-[28px] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cat-dark bg-cat-red"
          style={{ opacity: reveal.capOpacity }}
          aria-hidden="true"
        />
      </motion.div>
      <CulturePhoto stack={stack} item={item} opacity={reveal.imageOpacity} scale={reveal.imageScale} />
    </motion.div>
  )
}

function CultureCopy({ eyebrow, title, button, copy, lower = false }) {
  return (
    <div
      className={`relative z-20 flex px-5 sm:px-8 lg:absolute lg:px-0 ${
        lower ? 'items-start pt-16 lg:left-[52.2%] lg:top-[55.8%]' : 'items-start pt-14 lg:left-[52.2%] lg:top-[4.6%]'
      }`}
    >
      <div className="relative max-w-[560px]">
        {eyebrow ? <p className="mb-7 text-[12px] font-bold uppercase tracking-[0.52em] text-cat-red">{eyebrow}</p> : null}
        <div className="relative inline-block">
          <h2 className="text-[clamp(3rem,10vw,5.5rem)] font-light uppercase leading-[1.02] text-[#343434] lg:text-[clamp(4.6rem,5.8vw,6.25rem)]">
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <PillButton
            href="#contact"
            className={`mt-4 min-h-9 whitespace-nowrap px-4 py-1.5 text-[11px] sm:absolute sm:mt-0 sm:text-[13px] ${
              lower ? 'sm:left-[79%] sm:top-[58%]' : 'sm:left-[72%] sm:top-[13%]'
            }`}
          >
            {button}
          </PillButton>
        </div>
        <p className="mt-8 max-w-[520px] text-base leading-relaxed text-[#808080] lg:text-[17px]">{copy}</p>
      </div>
    </div>
  )
}

export default function Culture() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 78%', 'end 36%'],
  })

  return (
    <section ref={sectionRef} id="culture" className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-x-0 bottom-0 top-[42%] -z-10 bg-[#eaf1fc]" aria-hidden="true" />
      <div className="relative mx-auto min-h-[1180px] max-w-[1600px] lg:h-[1180px]">
        <div className="absolute inset-x-0 bottom-0 top-[42%] bg-[#eaf1fc]" aria-hidden="true" />
        <div className="relative mx-auto h-[760px] w-full max-w-[760px] pt-8 sm:h-[920px] lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[51%] lg:max-w-none lg:pt-0">
          {stacks.map((stack) => (
            <CoinStack key={stack.id} stack={stack} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <div className="relative z-20 lg:static">
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
