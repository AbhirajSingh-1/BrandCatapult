import { motion } from 'framer-motion'
import SectionReveal from '../common/SectionReveal'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.018 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function AnimatedText({ text, bold = false }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className={`inline-block mr-[0.28em] ${bold ? 'font-semibold' : ''}`}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

export default function Intro() {
  return (
    <SectionReveal id="about" className="relative overflow-hidden bg-cat-soft py-24 sm:py-32">
      <div className="soft-dot-field absolute inset-x-0 top-0 h-full opacity-80" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <motion.p
          className="text-xl font-light leading-relaxed text-cat-muted sm:text-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <AnimatedText text="A growing collective of thinkers, storytellers, designers, and strategists," />
          {' '}
          <AnimatedText text="60+ strong, across 9 countries," bold />
          {' '}
          <AnimatedText text="grown steadily over 10+ years" bold />
        </motion.p>
      </div>
    </SectionReveal>
  )
}
