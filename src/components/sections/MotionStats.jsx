import InteractiveGlobe from '../common/InteractiveGlobe'
import SectionReveal from '../common/SectionReveal'
import { stats } from '../../data/siteData'

const decorativeDots = [
  'left-[10%] top-4 h-8 w-8 bg-[#9b7ad8]',
  'right-[14%] top-0 h-4 w-4 bg-cat-red',
  'left-[23%] top-[-34px] h-2.5 w-2.5 bg-[#ffcf3c]',
  'right-[8%] top-28 h-2.5 w-2.5 bg-[#9cdd98]',
  'left-[19%] top-40 h-4 w-4 bg-[#7fd4ec]',
  'right-[24%] top-56 h-2.5 w-2.5 bg-[#86a9ed]',
]

export default function MotionStats() {
  return (
    <SectionReveal className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="px-5 sm:px-8 lg:px-14">
        <div className="relative mb-20 text-center sm:mb-24">
          {decorativeDots.map((dot) => (
            <span key={dot} className={`absolute rounded-full ${dot}`} aria-hidden="true" />
          ))}
          <span className="absolute left-[24%] top-[56%] hidden h-1 w-64 rounded-full bg-[#9fbaff] sm:block" aria-hidden="true" />
          <span className="absolute right-[18%] top-[38%] hidden h-1 w-44 rounded-full bg-[#ffd346] sm:block" aria-hidden="true" />
          <h2 className="mx-auto max-w-4xl text-[clamp(3rem,8vw,6.4rem)] font-light uppercase leading-[1.02] text-[#676767]">
            We Partner
            <span className="block">With People</span>
            <span className="block">In Motion</span>
          </h2>
          <p className="mx-auto mt-10 max-w-md text-base leading-relaxed text-[#858585] sm:text-xl">
            Founders with conviction, teams feeling the stretch, ideas too big to stay small.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="space-y-16 sm:space-y-20">
            {stats.map((stat) => (
              <div key={stat.value} className="grid gap-5 sm:grid-cols-[250px_1fr] sm:items-start lg:grid-cols-[320px_1fr]">
                <p className="text-[clamp(5rem,11vw,8.5rem)] font-light leading-none text-cat-red">{stat.value}</p>
                <p className="max-w-sm text-xl leading-snug text-[#808080] sm:pt-4 sm:text-2xl">{stat.copy}</p>
              </div>
            ))}
          </div>

          <InteractiveGlobe />
        </div>
      </div>
    </SectionReveal>
  )
}
