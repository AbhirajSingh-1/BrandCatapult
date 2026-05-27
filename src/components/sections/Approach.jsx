import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionReveal from '../common/SectionReveal'
import { assets } from '../../data/siteData'

/* Parallax wrapper for circles — vertical float */
function ParallaxCircle({ children, style, offset = [-60, 60] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], offset)
  return (
    <motion.div ref={ref} style={{ ...style, y }}>
      {children}
    </motion.div>
  )
}

/* Parallax wrapper for text — opposite vertical float + subtle x drift */
function ParallaxText({ children, className, yOffset = [-30, 30], xOffset = [0, 0] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], yOffset)
  const x = useTransform(scrollYProgress, [0, 1], xOffset)
  return (
    <motion.div ref={ref} style={{ y, x }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Approach() {
  return (
    <SectionReveal id="approach">

      {/* ══ ROW 1: white · text left · blue circle right ══ */}
      <div className="bg-white">
        <div className="grid grid-cols-1 items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 md:gap-0 md:px-0 md:py-9">

          {/* col left: text */}
          <div className="flex justify-center md:justify-end md:pr-0 md:pl-5">
            <ParallaxText
              yOffset={[30, -30]}
              xOffset={[-15, 15]}
              className="max-w-sm md:max-w-[380px]"
            >
              <motion.p
                className="m-0 text-sm leading-relaxed text-[#4a4a4a] italic"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                We believe one size fits one, and only one! We work to become the right
                agency for our clients- researching, learning, experimenting and adapting
                tirelessly until we become the masters of their trade.
              </motion.p>
            </ParallaxText>
          </div>

          {/* col right: blue circle */}
          <div className="flex items-center justify-center overflow-hidden py-5">
            <ParallaxCircle
              offset={[-50, 50]}
              style={{
                width: 'clamp(220px, 28vw, 320px)',
                height: 'clamp(220px, 28vw, 320px)',
                borderRadius: '50%',
                background: '#dce4f7',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
              >
                <div style={{
                  position: 'absolute',
                  inset: -40,
                  borderRadius: '50%',
                  border: '24px solid #c2d0f2',
                  opacity: 0.25,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: '50%',
                  border: '20px solid #c2d0f2',
                  opacity: 0.35,
                  pointerEvents: 'none',
                }} />
                <img
                  src={assets.planSign}
                  alt="Plan A and Plan B signs"
                  style={{ width: '70%', height: 'auto', objectFit: 'contain', display: 'block', position: 'relative', zIndex: 1 }}
                  loading="lazy"
                />
              </motion.div>
            </ParallaxCircle>
          </div>
        </div>
      </div>

      {/* ══ ROW 2: white · yellow circle left · text right ══ */}
      <div className="bg-white">
        <div className="grid grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 md:grid-cols-2 md:gap-0 md:px-0 md:py-6">

          {/* col left: yellow circle — on mobile shows after text, on md shows first */}
          <div className="order-2 flex items-center justify-center overflow-hidden py-5 md:order-1">
            <ParallaxCircle
              offset={[50, -50]}
              style={{
                width: 'clamp(230px, 30vw, 340px)',
                height: 'clamp(230px, 30vw, 340px)',
                borderRadius: '50%',
                background: '#faecd4',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img
                  src={assets.cubeObject}
                  alt="Translucent cube object"
                  style={{ width: '62%', height: 'auto', objectFit: 'contain', display: 'block' }}
                  loading="lazy"
                />
              </motion.div>
            </ParallaxCircle>
          </div>

          {/* col right: text */}
          <div className="order-1 flex justify-center px-0 md:order-2 md:justify-start md:pl-3 md:pr-14">
            <ParallaxText
              yOffset={[-30, 30]}
              xOffset={[15, -15]}
              className="max-w-sm md:max-w-[400px]"
            >
              <motion.p
                className="m-0 text-sm leading-relaxed text-[#4a4a4a]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                Our clients think of us as an extension of their team. With an approach guided
                by empathy, flexibility and consistent communication we take ownership of our
                role as their partners.
              </motion.p>
            </ParallaxText>
          </div>
        </div>

        {/* GLOBALLY SINCE 2015 */}
        <motion.p
          className="m-0 pb-8 text-center text-[11px] font-bold uppercase tracking-[0.30em] text-[#cf2436]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Globally Since 2015
        </motion.p>
      </div>

      {/* ══ ROW 3: gray · text left · green circle right ══ */}
      <div className="bg-[#f2f2f2]">
        <div className="grid grid-cols-1 items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 md:gap-0 md:px-0 md:py-9">

          {/* col left: text */}
          <div className="flex justify-center md:justify-end md:pr-0 md:pl-5">
            <ParallaxText
              yOffset={[25, -25]}
              xOffset={[-10, 10]}
              className="max-w-sm md:max-w-[380px]"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="m-0 text-sm leading-relaxed text-[#4a4a4a]">
                  We help brands transform faster than their consumers do. Every strategy, campaign
                  or goal we set out is tied to concrete and measurable metrics. It's this reflection and
                  evaluation that helps us create dynamic strategies and rock-solid processes.
                </p>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#cf2436]">
                  Projects
                </p>
              </motion.div>
            </ParallaxText>
          </div>

          {/* col right: green circle — image flipped */}
          <div className="flex items-center justify-center overflow-hidden py-5">
            <ParallaxCircle
              offset={[-40, 40]}
              style={{
                width: 'clamp(230px, 30vw, 340px)',
                height: 'clamp(230px, 30vw, 340px)',
                borderRadius: '50%',
                background: '#ccdccc',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img
                  src={assets.atomObject}
                  alt="Green orbit object with red sphere"
                  style={{ width: '66%', height: 'auto', objectFit: 'contain', display: 'block', transform: 'scaleX(-1)' }}
                  loading="lazy"
                />
              </motion.div>
            </ParallaxCircle>
          </div>
        </div>
      </div>

    </SectionReveal>
  )
}
