import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PillButton from '../common/PillButton'
import SectionReveal from '../common/SectionReveal'
import { culturePhotos } from '../../data/siteData'

// ─── Animated form field ──────────────────────────────────────────────────────
function Field({ label, type = 'text', className = '', textarea = false, delay = 0 }) {
  const [focused, setFocused] = useState(false)
  const controlClasses =
    'w-full border-0 bg-transparent py-3 text-white outline-none placeholder:text-white/35 transition-colors duration-300'

  return (
    <motion.label
      className={`relative block ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="block text-[13px] font-semibold uppercase tracking-[0.3em] text-white/80 mb-1"
        animate={{ color: focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)' }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>

      {textarea
        ? <textarea
            className={`${controlClasses} min-h-24 resize-none`}
            rows="3"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        : <input
            type={type}
            className={controlClasses}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
      }

      {/* Animated underline */}
      <span className="block h-px w-full bg-white/30 relative overflow-hidden">
        <motion.span
          className="absolute inset-y-0 left-0 bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </motion.label>
  )
}

// ─── Orbit social widget ──────────────────────────────────────────────────────
function OrbitSocial() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const positions = [
    'left-[44%] top-0',
    'left-[8%] top-[36%]',
    'right-[4%] top-[43%]',
    'left-[30%] bottom-[3%]',
    'right-[22%] top-[20%]',
  ]
  const sizes = ['h-20 w-20', 'h-28 w-28', 'h-24 w-24', 'h-16 w-16', 'h-16 w-16']

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[360px]">

      {/* Pulsing outer glow */}
      {inView && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(159,181,255,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Concentric rings — draw in one by one */}
      {[10, 24, 38].map((inset, i) => (
        <motion.div
          key={inset}
          className="absolute rounded-full border border-white/40"
          style={{ inset: `${inset}%` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Slow continuous rotation on the outermost ring */}
      {inView && (
        <motion.div
          className="absolute rounded-full border border-white/15"
          style={{ inset: '4%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Blue accent dot */}
      <motion.span
        className="absolute left-[46%] top-[67%] h-8 w-8 rounded-full bg-[#9fb5ff]"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.45 }}
      />

      {/* Photo bubbles */}
      {culturePhotos.slice(1, 6).map((item, index) => (
        <motion.img
          key={item.alt}
          src={item.image}
          alt={item.alt}
          className={`absolute rounded-full object-cover shadow-xl ${positions[index]} ${sizes[index]}`}
          loading="lazy"
          initial={{ opacity: 0, scale: 0.55, y: 12 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            duration: 0.65,
            delay: 0.2 + index * 0.1,
            ease: [0.34, 1.4, 0.64, 1],
          }}
          whileHover={{ scale: 1.1, zIndex: 20, boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }}
        />
      ))}
    </div>
  )
}

// ─── Heading with split-line reveal ──────────────────────────────────────────
const headingLines = ['We Don\'t Chase.', 'We Calibrate.']

function SplitHeading() {
  return (
    <motion.h2
      className="max-w-xl text-5xl font-light uppercase leading-none text-white sm:text-6xl lg:text-7xl"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
    >
      {headingLines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.01 } },
          }}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </motion.h2>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      window.setTimeout(() => setSubmitted(false), 3000)
    }, 900)
  }

  return (
    <SectionReveal id="contact" className="bg-cat-dark text-white">

      {/* ── Contact form section ── */}
      <div className="bg-cat-red px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

          {/* Left — heading + subtext */}
          <div>
            <SplitHeading />
            <motion.p
              className="mt-8 max-w-md text-base leading-relaxed text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              If you are thinking big, thinking bold, or thinking finally, you are thinking like us.
            </motion.p>

            {/* Decorative animated line */}
            <motion.div
              className="mt-10 h-px bg-white/25 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Right — form */}
          <motion.form
            className="grid gap-9"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Field label="Name" delay={0.15} />
            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Email" type="email" delay={0.22} />
              <Field label="Phone" type="tel" delay={0.29} />
            </div>
            <Field label="Message" textarea delay={0.36} />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex items-center gap-3 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Message sent — we'll be in touch soon.
                </motion.div>
              ) : (
                <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PillButton
                    type="submit"
                    variant="dark"
                    disabled={isSubmitting}
                    className="w-full text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </span>
                    ) : 'Start a conversation'}
                  </PillButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>

      {/* ── Social section ── */}
      <div className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
          <OrbitSocial />
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="mb-4 text-[12px] font-bold uppercase tracking-[0.5em] text-cat-red"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Social Presence
            </motion.p>
            <motion.h2
              className="text-6xl font-light uppercase leading-tight text-white/75 sm:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Spam
              <span className="block">The Gram</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <PillButton href="https://www.instagram.com/brandcatapult/" className="mt-8">
                Follow @brandcatapult
              </PillButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </SectionReveal>
  )
}
