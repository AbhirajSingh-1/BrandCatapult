import { motion } from 'framer-motion'
import { assets } from '../../data/siteData'

export default function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[720px] overflow-hidden bg-white pt-24 sm:min-h-[780px] lg:min-h-[860px]">
      <img
        src={assets.heroOrbit}
        alt="Abstract orbiting spheres over a white planet form"
        className="absolute inset-x-0 bottom-[-2%] z-0 h-[64%] w-full object-cover object-bottom sm:h-[72%] lg:h-[78%]"
        loading="eager"
      />
      <div className="absolute inset-x-0 top-24 z-10 mx-auto max-w-6xl px-5 text-center sm:top-32">
        <motion.p
          className="mb-7 text-[13px] font-bold uppercase tracking-[0.5em] text-cat-muted sm:text-[17px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Market Strategies
        </motion.p>
        <motion.h1
          className="mx-auto max-w-5xl text-[56px] font-light uppercase leading-[0.98] text-[#8f8f8f] sm:text-[86px] md:text-[108px] lg:text-[124px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8 }}
        >
          That Move
          <span className="block">With You</span>
        </motion.h1>
      </div>

      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5" aria-label="Hero slide indicators">
        <span className="h-1.5 w-1.5 rounded-full bg-cat-ink" />
        <span className="h-1.5 w-1.5 rounded-full bg-cat-muted" />
        <span className="h-1.5 w-1.5 rounded-full bg-cat-red" />
        <span className="h-1.5 w-1.5 rounded-full bg-cat-muted" />
      </div>
    </section>
  )
}
