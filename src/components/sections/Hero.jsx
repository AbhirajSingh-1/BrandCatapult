import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { assets } from '../../data/siteData'
import { useInterval } from '../../hooks/useInterval'
import { cn } from '../../utils/cn'

const slides = [
  { eyebrow: 'Market Strategies', lines: ['That Move', 'With You'], image: assets.ffad08781666e14e85480717168d510b15096230 },
  { eyebrow: 'Brand Systems', lines: ['That Stand', 'With You'], image: assets.ffad08781666e14e85480717168d510b15096230 },
  { eyebrow: 'Creative Motion', lines: ['That Build', 'With You'], image: assets.ffad08781666e14e85480717168d510b15096230 },
  { eyebrow: 'Real Shifts', lines: ['That Grow', 'With You'], image: assets.ffad08781666e14e85480717168d510b15096230 },
]

const textVariants = {
  enter: { opacity: 0, y: 22, filter: 'blur(6px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -14, filter: 'blur(4px)' },
}

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  useInterval(() => {
    setActiveSlide((current) => (current + 1) % slides.length)
  }, 4200)

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[640px] w-full items-center justify-center overflow-hidden bg-white sm:min-h-[720px] lg:h-svh lg:min-h-0"
    >
      {/* Background orbit images */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {slides.map((item, index) => (
          <motion.img
            key={item.eyebrow}
            src={item.image}
            alt={index === activeSlide ? `${item.eyebrow} abstract orbit visual` : ''}
            className="absolute h-[86%] w-auto max-w-none select-none object-contain sm:h-[92%] lg:h-full"
            initial={false}
            animate={{
              opacity: index === activeSlide ? 1 : 0,
              scale: index === activeSlide ? 1 : 1.04,
              y: index === activeSlide ? '3vh' : '5vh',
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            loading={index === 0 ? 'eager' : 'lazy'}
            aria-hidden={index !== activeSlide}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.04)_0%,transparent_58%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.04)_0%,transparent_58%)]"
        aria-hidden="true"
      />

      {/* Text content */}
      <div className="relative z-10 mx-auto max-w-7xl -translate-y-[7vh] px-5 text-center sm:-translate-y-[8vh] lg:-translate-y-[10vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.eyebrow}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-[clamp(0.78rem,1.22vw,1.15rem)] font-semibold uppercase tracking-[0.42em] text-[#767676] sm:mb-7">
              {slide.eyebrow}
            </p>
            <h1 className="mx-auto select-none text-[clamp(2.45rem,5.4vw,5.35rem)] font-light uppercase leading-[1.05] tracking-[0.06em] text-[#767676]">
              <span className="mb-2 block">{slide.lines[0]}</span>
              <span className="flex items-center justify-center">
                <span>WITH</span>
                <span className="w-[clamp(7.3rem,16vw,19rem)] shrink-0" aria-hidden="true" />
                <span>YOU</span>
              </span>
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-8"
        aria-label="Hero slide indicators"
      >
        {slides.map((item, index) => (
          <motion.button
            key={item.eyebrow}
            type="button"
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              activeSlide === index ? 'bg-cat-red' : 'bg-cat-ink/30 hover:bg-cat-ink/65',
            )}
            animate={{ width: activeSlide === index ? 20 : 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show hero slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
