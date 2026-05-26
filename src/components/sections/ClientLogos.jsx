import SectionReveal from '../common/SectionReveal'
import { assets } from '../../data/siteData'

export default function ClientLogos() {
  return (
    <SectionReveal className="overflow-hidden bg-white py-16 sm:py-24">
      <div className="space-y-20">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex w-max gap-28 logo-marquee opacity-90" aria-hidden={row > 0}>
            <img
              src={assets.clientLogos}
              alt={row === 0 ? 'Client logos including Savoy, Courtyard, Aura, Rosha, Nirmals and Cocoyaya' : ''}
              className="h-20 w-auto max-w-none"
              loading="lazy"
            />
            <img src={assets.clientLogos} alt="" className="h-20 w-auto max-w-none" loading="lazy" />
          </div>
        ))}
      </div>
    </SectionReveal>
  )
}
