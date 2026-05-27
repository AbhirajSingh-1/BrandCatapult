import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '../common/SectionReveal'
import { assets, serviceList } from '../../data/siteData'
import { cn } from '../../utils/cn'

const serviceDetails = [
  ['Market Research & Analysis', 'Brand Positioning Strategy', 'Go-to-Market Planning', 'Consumer Insights', 'Competitor Benchmarking'],
  ['Media Relations & Outreach', 'Press Release Distribution', 'Crisis Communication', 'Reputation Management', 'Influencer Relations'],
  ['Social Media Management', 'Search Engine Optimization', 'Performance Marketing', 'Content Creation Strategy', 'Email Campaigns'],
  ['Brand Identity Development', 'Re-Branding', 'Brand Communications', 'Brand Collaterals', 'Packaging Design', 'Marketing Collaterals'],
  ['Event Production & Planning', 'Outdoor Advertising', 'Experiential Marketing', 'Retail Visual Merchandising', 'Direct Mail Campaigns'],
  ['Commercial Product Shoots', 'Lifestyle Shoots', 'Corporate Headshots', 'Campaign Coverage', 'Post-Production Retouching'],
  ['Custom Website Development', 'E-commerce Solutions', 'Mobile App Development', 'CMS Integration', 'Interactive Prototypes'],
  ['3D Product Animation', 'Virtual Production Assets', 'VFX Compositing', 'Motion Graphics', 'Immersive Experiences'],
]

export default function Services() {
  const [activeService, setActiveService] = useState(3)
  const bullets = serviceDetails[activeService]

  return (
    <SectionReveal id="services" className="slant-top -mt-16 bg-cat-dark text-white md:-mt-20">
      <div className="relative mx-auto min-h-[760px] max-w-[1500px] px-5 py-28 sm:px-8 md:h-[670px] md:min-h-0 md:px-11 md:py-0 lg:h-[800px] lg:px-16">
        <div className="md:absolute md:left-[5.5%] md:top-[22%]">
          <motion.p
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-white"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.p>
          <motion.p
            className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-cat-red"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            People
          </motion.p>
          <div className="space-y-4 md:space-y-5">
            {serviceList.map((service, index) => {
              const isActive = index === activeService

              return (
                <motion.button
                  key={service}
                  type="button"
                  className="group flex w-full items-center gap-3 text-left md:gap-4"
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                >
                  {isActive ? (
                    <span className="w-5 font-mono text-[10px] text-white">{String(index + 1).padStart(2, '0')}</span>
                  ) : (
                    <span className="hidden w-5 md:block" />
                  )}
                  <motion.span
                    className={cn(
                      'font-light uppercase leading-none transition duration-300',
                      isActive
                        ? 'text-[31px] text-cat-red md:text-[31px] lg:text-[42px]'
                        : 'text-[25px] text-white/24 group-hover:text-white/55 md:text-[25px] lg:text-[34px]',
                    )}
                    animate={{ x: isActive ? 4 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    {service}
                  </motion.span>
                  {isActive ? (
                    <>
                      <span className="hidden h-px flex-1 bg-white/14 md:block" aria-hidden="true" />
                      <motion.span
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cat-red text-white shadow-[0_0_22px_rgba(207,36,54,0.42)] md:h-9 md:w-9"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                      </motion.span>
                    </>
                  ) : null}
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8 md:mt-0">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.34em] text-white/60 md:absolute md:left-[29%] md:top-[43%]">
            <span className="text-cat-red">Real Brands.</span>
            <span>Real Shifts.</span>
            <span className="text-cat-red">Real Results.</span>
          </div>

          <motion.img
            src={assets.servicePreview}
            alt="Brand identity and cocktail presentation for a hospitality case study"
            className="h-44 w-full rounded-sm object-cover sm:h-52 md:absolute md:right-[7.5%] md:top-[33%] md:h-[122px] md:w-[25%] lg:h-[170px] lg:w-[28%]"
            loading="lazy"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="border-t border-white/20 pt-5 md:absolute md:right-[7.5%] md:top-[53%] md:w-[38%] lg:top-[54%] lg:w-[40%]">
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeService}
                className="space-y-1.5 text-xs leading-relaxed text-white/78 lg:text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {bullets.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex gap-2"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-white" aria-hidden="true" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
