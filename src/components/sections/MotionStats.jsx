import { motion } from 'framer-motion'
import InteractiveGlobe from '../common/InteractiveGlobe'
import SectionReveal from '../common/SectionReveal'
import { stats } from '../../data/siteData'

// ─── Decorative floating dots ─────────────────────────────────────────────────
// Positions match the reference image exactly
const DOTS = [
  { cls: 'left-[10%]  top-[14%]',  size: 'h-9 w-9',   color: 'bg-[#9b7ad8]' },   // purple — left mid
  { cls: 'right-[13%] top-[10%]',  size: 'h-4 w-4',   color: 'bg-[#cf2436]' },   // red — top right
  { cls: 'left-[22%]  top-[8%]',   size: 'h-2.5 w-2.5', color: 'bg-[#ffcf3c]' }, // yellow — top left area
  { cls: 'right-[8%]  top-[32%]',  size: 'h-2.5 w-2.5', color: 'bg-[#9cdd98]' }, // green — right mid
  { cls: 'right-[24%] top-[72%]',  size: 'h-2.5 w-2.5', color: 'bg-[#86a9ed]' }, // blue — bottom right
]

// ─── Fade-up animation variant ────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
}

export default function MotionStats() {
  return (
    <SectionReveal className="relative overflow-hidden bg-white pt-24 pb-8 sm:pt-32 sm:pb-10 lg:pt-44 lg:pb-12">

      {/* ── Decorative dots ── */}
      {DOTS.map((d, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`absolute rounded-full ${d.cls} ${d.size} ${d.color}`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: 'backOut' }}
        />
      ))}

      {/* ── Hero heading block ── */}
      <div className="relative mx-auto max-w-5xl px-5 text-center">

        {/* Heading */}
        <motion.h2
          className="mx-auto text-[clamp(2.8rem,7.5vw,6.2rem)] font-light uppercase leading-[1.06] tracking-wide text-[#6b6b6b]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.12 }}
        >
          {/* Line 1: WE PARTNER */}
          <motion.span className="block" variants={fadeUp} transition={{ duration: 0.7, ease: 'easeOut' }}>
            We Partner
          </motion.span>

          {/* Line 2: WITH PEOPLE ——— (yellow line after) */}
          <motion.span className="relative inline-flex items-center gap-4" variants={fadeUp} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <span className="block">With People</span>
            {/* Yellow horizontal line — right of "WITH PEOPLE" */}
            <motion.span
              aria-hidden="true"
              className="hidden sm:block h-[3px] w-36 rounded-full bg-[#ffd346] lg:w-52"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            />
          </motion.span>

          {/* Line 3: ——— IN MOTION (blue/lavender line before) */}
          <motion.span className="relative inline-flex items-center gap-4" variants={fadeUp} transition={{ duration: 0.7, ease: 'easeOut' }}>
            {/* Blue/lavender horizontal line — left of "IN MOTION" */}
            <motion.span
              aria-hidden="true"
              className="hidden sm:block h-[3px] w-36 rounded-full bg-[#9fbaff] lg:w-52"
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
            />
            <span className="block">In Motion</span>
          </motion.span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-10 max-w-sm text-[15px] leading-relaxed text-[#909090] sm:text-[17px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          Founders with conviction, teams feeling the<br className="hidden sm:block" />
          stretch, ideas too big to stay small.
        </motion.p>
      </div>

      {/* ── Stats + Globe ── */}
      <div className="mx-auto mt-24 max-w-6xl px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-0">

          {/* LEFT — stats */}
          <div className="flex flex-col gap-12 lg:w-[42%] lg:gap-14 lg:pr-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                className="flex items-start gap-6"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: 'easeOut' }}
              >
                <p className="w-[160px] shrink-0 text-[clamp(3.2rem,6vw,5.2rem)] font-light leading-none text-cat-red">
                  {stat.value}
                </p>
                <p className="pt-2 text-[13px] leading-[1.6] text-[#808080] sm:text-[14px]">
                  {stat.copy}
                </p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — globe, pushed to right edge */}
          <div className="lg:w-[58%] lg:translate-x-[16%]">
            <InteractiveGlobe />
          </div>

        </div>
      </div>
    </SectionReveal>
  )
}
