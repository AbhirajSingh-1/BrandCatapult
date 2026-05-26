import { ArrowUpRight } from 'lucide-react'
import SectionReveal from '../common/SectionReveal'
import { assets, serviceBullets, serviceList } from '../../data/siteData'

export default function Services() {
  return (
    <SectionReveal id="services" className="slant-top -mt-20 bg-cat-dark pb-28 pt-36 text-white sm:pb-36 sm:pt-44">
      <div className="grid w-full gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
        <div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-white">Our Services</p>
          <p className="mb-10 text-sm font-bold uppercase tracking-[0.2em] text-cat-red">People</p>
          <div className="space-y-5">
            {serviceList.map((service, index) => (
              <div key={service} className="flex items-center gap-4">
                {index === 3 ? <span className="font-mono text-[10px] text-white">04</span> : <span className="hidden w-5 sm:block" />}
                <h2
                  className={`text-3xl font-light uppercase transition sm:text-4xl ${
                    index === 3 ? 'text-cat-red' : 'text-white/22 hover:text-white/55'
                  }`}
                >
                  {service}
                </h2>
                {index === 3 ? (
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cat-red text-white">
                    <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-start gap-8">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-[0.38em] text-white/70">
            <span className="text-cat-red">Real Brands.</span>
            <span>Real Shifts.</span>
            <span className="text-cat-red">Real Results.</span>
          </div>

          <div className="grid gap-8 sm:grid-cols-[280px_1fr] sm:items-end">
            <img
              src={assets.servicePreview}
              alt="Brand identity and cocktail presentation for a hospitality case study"
              className="h-44 w-full rounded-md object-cover sm:h-52"
              loading="lazy"
            />
            <div className="border-t border-white/16 pt-5">
              <ul className="space-y-2 text-sm text-white/76">
                {serviceBullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 rounded-full bg-white" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
