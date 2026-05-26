import { ArrowUpRight } from 'lucide-react'
import SectionReveal from '../common/SectionReveal'
import { assets, serviceBullets, serviceList } from '../../data/siteData'

export default function Services() {
  return (
    <SectionReveal id="services" className="slant-top -mt-16 bg-cat-dark text-white md:-mt-20">
      <div className="relative mx-auto min-h-[760px] max-w-[1500px] px-5 py-28 sm:px-8 md:h-[670px] md:min-h-0 md:px-11 md:py-0 lg:h-[800px] lg:px-16">
        <div className="md:absolute md:left-[5.5%] md:top-[22%]">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.5em] text-white">Our Services</p>
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-cat-red">People</p>
          <div className="space-y-4 md:space-y-5">
            {serviceList.map((service, index) => (
              <div key={service} className="flex items-center gap-3 md:gap-4">
                {index === 3 ? <span className="w-5 font-mono text-[10px] text-white">04</span> : <span className="hidden w-5 md:block" />}
                <h2
                  className={`font-light uppercase leading-none transition ${
                    index === 3
                      ? 'text-[31px] text-cat-red md:text-[31px] lg:text-[42px]'
                      : 'text-[25px] text-white/24 hover:text-white/55 md:text-[25px] lg:text-[34px]'
                  }`}
                >
                  {service}
                </h2>
                {index === 3 ? (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cat-red text-white md:h-9 md:w-9">
                    <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8 md:mt-0">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.34em] text-white/60 md:absolute md:left-[29%] md:top-[43%]">
            <span className="text-cat-red">Real Brands.</span>
            <span>Real Shifts.</span>
            <span className="text-cat-red">Real Results.</span>
          </div>

          <img
            src={assets.servicePreview}
            alt="Brand identity and cocktail presentation for a hospitality case study"
            className="h-44 w-full rounded-sm object-cover sm:h-52 md:absolute md:right-[7.5%] md:top-[33%] md:h-[122px] md:w-[25%] lg:h-[170px] lg:w-[28%]"
            loading="lazy"
          />

          <div className="border-t border-white/20 pt-5 md:absolute md:right-[7.5%] md:top-[53%] md:w-[38%] lg:top-[54%] lg:w-[40%]">
            <ul className="space-y-1.5 text-xs leading-relaxed text-white/78 lg:text-sm">
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
    </SectionReveal>
  )
}
