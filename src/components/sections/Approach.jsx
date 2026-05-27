import { motion } from 'framer-motion'
import SectionReveal from '../common/SectionReveal'
import { assets } from '../../data/siteData'
import { cn } from '../../utils/cn'

const copyBlocks = [
  {
    text: 'We believe one size fits one, and only one! We work to become the right agency for our clients - researching, learning, experimenting and adapting tirelessly until we become the masters of their trade.',
  },
  {
    text: 'Our clients think of us as an extension of their team. With an approach guided by empathy, flexibility and consistent communication we take ownership of our role as their partners.',
  },
  {
    text: "We help brands transform faster than their consumers do. Every strategy, campaign or goal we set out is tied to concrete and measurable metrics. It's this reflection and evaluation that helps us create dynamic strategies and rock-solid processes.",
    label: 'Projects',
  },
]

function HaloVisual({ src, alt, tone, className = '', imageClassName = '', reverse = false }) {
  const tones = {
    blue: 'bg-cat-blue/70',
    yellow: 'bg-cat-yellow/70',
    green: 'bg-cat-green/70',
  }

  return (
    <motion.div
      className={cn('relative flex aspect-square items-center justify-center', className)}
      initial={{ opacity: 0, scale: 0.92, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={cn('absolute aspect-square w-[118%] rounded-full blur-[2px]', tones[tone])} aria-hidden="true" />
      <span className={cn('absolute aspect-square w-[76%] rounded-full opacity-60 blur-2xl', tones[tone])} aria-hidden="true" />
      <img src={src} alt={alt} className={cn('relative z-10 object-contain', reverse && '-scale-x-100', imageClassName)} loading="lazy" />
    </motion.div>
  )
}

function TextBlock({ children, className = '', label }) {
  return (
    <div className={cn('max-w-[430px]', className)}>
      <p className="text-sm leading-relaxed text-[#555]">{children}</p>
      {label ? <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.24em] text-cat-red">{label}</h3> : null}
    </div>
  )
}

export default function Approach() {
  return (
    <SectionReveal id="approach" className="bg-white">
      <div className="relative overflow-hidden bg-white pb-14 pt-24 sm:pb-20 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-[36%] bg-cat-dark" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
          <motion.div
            className="overflow-hidden rounded-[20px] bg-cat-dark shadow-[0_24px_70px_rgba(17,17,17,0.16)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-14%' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={assets.orbitPanel}
              alt="Abstract red sphere framed by dark gold forms"
              className="aspect-video h-auto w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:min-h-svh md:grid-cols-2 md:items-center md:gap-16 md:px-10 lg:px-14">
          <TextBlock className="md:translate-y-10">{copyBlocks[0].text}</TextBlock>
          <HaloVisual
            src={assets.planSign}
            alt="Plan A and Plan B directional signs"
            tone="blue"
            className="mx-auto w-[min(76vw,340px)] md:ml-auto md:w-[min(38vw,430px)] md:-translate-y-10"
            imageClassName="w-[70%]"
          />
          <HaloVisual
            src={assets.cubeObject}
            alt="Translucent cube orbit object"
            tone="yellow"
            className="mx-auto w-[min(76vw,340px)] md:mr-auto md:w-[min(38vw,430px)] md:-translate-y-6"
            imageClassName="w-[58%]"
          />
          <TextBlock className="md:translate-y-8">{copyBlocks[1].text}</TextBlock>
        </div>
        <h2 className="pb-16 text-center text-sm font-bold uppercase tracking-[0.26em] text-cat-red md:-mt-24 md:pb-24">
          Globally Since 2015
        </h2>
      </div>

      <div className="relative overflow-hidden bg-[#f5f5f5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:min-h-[78svh] md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-10 lg:px-14">
          <TextBlock label={copyBlocks[2].label}>{copyBlocks[2].text}</TextBlock>
          <HaloVisual
            src={assets.atomObject}
            alt="Green translucent orbit object around a red sphere"
            tone="green"
            reverse
            className="mx-auto w-[min(82vw,390px)] md:ml-auto md:w-[min(46vw,560px)]"
            imageClassName="w-[68%]"
          />
        </div>
      </div>
    </SectionReveal>
  )
}
