import SectionReveal from '../common/SectionReveal'
import { assets } from '../../data/siteData'

export default function ClientLogos() {
  return (
    <SectionReveal className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] space-y-24 px-5 sm:px-8 lg:px-12">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex justify-center opacity-90" aria-hidden={row > 0}>
            <img
              src={assets.clientLogos}
              alt={row === 0 ? 'Client logos including Savoy, Courtyard, Aura, Rosha, Nirmals and Cocoyaya' : ''}
              className="h-auto w-full max-w-[1180px]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </SectionReveal>
  )
}
