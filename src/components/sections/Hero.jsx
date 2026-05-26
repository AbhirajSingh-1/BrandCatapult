import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { assets } from '../../data/siteData'

const slides = [
  { eyebrow: 'Market Strategies', lines: ['That Move', 'With You'], imagePosition: 'object-bottom' },
  { eyebrow: 'Brand Systems', lines: ['That Stand', 'With You'], imagePosition: 'object-bottom' },
  { eyebrow: 'Creative Motion', lines: ['That Build', 'With You'], imagePosition: 'object-[50%_88%]' },
  { eyebrow: 'Real Shifts', lines: ['That Grow', 'With You'], imagePosition: 'object-[50%_92%]' },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative isolate min-h-[720px] overflow-hidden bg-white pt-24 sm:min-h-[780px] lg:min-h-[860px]">
      <motion.img
        key={activeSlide}
        src={assets.heroOrbit}
        alt="Abstract orbiting spheres over a white planet form"
        className={`absolute inset-x-0 bottom-[-2%] z-0 h-[64%] w-full object-cover ${slide.imagePosition} sm:h-[72%] lg:h-[78%]`}
        loading="eager"
        initial={{ opacity: 0, scale: 1.025 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-x-0 top-24 z-10 mx-auto max-w-6xl px-5 text-center sm:top-32">
        <motion.p
          key={`${slide.eyebrow}-eyebrow`}
          className="mb-7 text-[13px] font-bold uppercase tracking-[0.5em] text-cat-muted sm:text-[17px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {slide.eyebrow}
        </motion.p>
        <motion.h1
          key={`${slide.eyebrow}-title`}
          className="mx-auto max-w-5xl text-[56px] font-light uppercase leading-[0.98] text-[#8f8f8f] sm:text-[86px] md:text-[108px] lg:text-[124px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8 }}
        >
          {slide.lines[0]}
          <span className="block">{slide.lines[1]}</span>
        </motion.h1>
      </div>

      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5" aria-label="Hero slide indicators">
        {slides.map((item, index) => (
          <button
            key={item.eyebrow}
            type="button"
            className={`h-2 w-2 rounded-full transition ${activeSlide === index ? 'bg-cat-red' : 'bg-cat-ink/55 hover:bg-cat-red/70'}`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show hero slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
