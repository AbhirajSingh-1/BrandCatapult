import { motion } from 'framer-motion'
import SectionReveal from '../common/SectionReveal'
import { assets } from '../../data/siteData'

export default function ClientLogos() {
  return (
    <SectionReveal className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] space-y-16 px-5 sm:px-8 lg:px-12">
        {[0, 1, 2].map((row) => (
          <motion.div
            key={row}
            className="flex justify-center opacity-90"
            aria-hidden={row > 0}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: row === 0 ? 0.9 : 0.9, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: row * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={assets.clientLogos}
              alt={row === 0 ? 'Client logos including Savoy, Courtyard, Aura, Rosha, Nirmals and Cocoyaya' : ''}
              className="h-auto w-full max-w-[1180px]"
              loading="lazy"
              whileHover={{ scale: 1.012 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  )
}
