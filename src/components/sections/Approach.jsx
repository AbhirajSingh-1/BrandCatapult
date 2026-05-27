import { motion } from 'framer-motion'
import SectionReveal from '../common/SectionReveal'
import { assets } from '../../data/siteData'

export default function Approach() {
  return (
    <SectionReveal id="approach">

      {/* ══ ROW 1 — text left · blue circle right ══ */}
      <div style={{ background: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 320,
        }}>
          {/* col left: text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '48px 32px 48px 60px',
          }}>
            <motion.p
              style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: '#555', maxWidth: 360 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              We believe one size fits one, and only one! We work to become the right
              agency for our clients- researching, learning, experimenting and adapting
              tirelessly until we become the masters of their trade.
            </motion.p>
          </div>

          {/* col right: blue circle bleeds off right */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <motion.div
              style={{
                width: 420,
                height: 420,
                borderRadius: '50%',
                background: '#c2d0f2',
                flexShrink: 0,
                marginRight: -80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={assets.planSign}
                alt="Plan A and Plan B signs"
                style={{ width: '68%', height: 'auto', display: 'block', objectFit: 'contain' }}
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ ROW 2 — yellow circle left · text right ══ */}
      <div style={{ background: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 340,
        }}>
          {/* col left: yellow circle bleeds off left */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <motion.div
              style={{
                width: 460,
                height: 460,
                borderRadius: '50%',
                background: '#f8e0b0',
                flexShrink: 0,
                marginLeft: -100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={assets.cubeObject}
                alt="Translucent cube object"
                style={{ width: '62%', height: 'auto', display: 'block', objectFit: 'contain' }}
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* col right: text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '48px 60px 48px 32px',
          }}>
            <motion.p
              style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: '#555', maxWidth: 360 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Our clients think of us as an extension of their team. With an approach guided
              by empathy, flexibility and consistent communication we take ownership of our
              role as their partners.
            </motion.p>
          </div>
        </div>

        {/* GLOBALLY SINCE 2015 */}
        <motion.p
          style={{
            margin: 0,
            padding: '0 0 52px',
            textAlign: 'center',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#cf2436',
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Globally Since 2015
        </motion.p>
      </div>

      {/* ══ ROW 3 — gray · text left · green circle right ══ */}
      <div style={{ background: '#f5f5f5', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 360,
        }}>
          {/* col left: text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '48px 32px 48px 60px',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: '#555', maxWidth: 360 }}>
                We help brands transform faster than their consumers do. Every strategy, campaign
                or goal we set out is tied to concrete and measurable metrics. It's this reflection and
                evaluation that helps us create dynamic strategies and rock-solid processes.
              </p>
              <p style={{
                margin: '12px 0 0',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#cf2436',
              }}>
                Projects
              </p>
            </motion.div>
          </div>

          {/* col right: green circle bleeds off right */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <motion.div
              style={{
                width: 460,
                height: 460,
                borderRadius: '50%',
                background: '#bcd4bc',
                flexShrink: 0,
                marginRight: -90,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={assets.atomObject}
                alt="Green orbit object with red sphere"
                style={{ width: '70%', height: 'auto', display: 'block', objectFit: 'contain' }}
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>

    </SectionReveal>
  )
}
