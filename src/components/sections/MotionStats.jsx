import SectionReveal from '../common/SectionReveal'
import { stats } from '../../data/siteData'

export default function MotionStats() {
  return (
    <SectionReveal className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="relative mb-24 text-center">
          <span className="absolute left-[10%] top-2 h-8 w-8 rounded-full bg-[#9576d1]" aria-hidden="true" />
          <span className="absolute right-[14%] top-0 h-4 w-4 rounded-full bg-cat-red" aria-hidden="true" />
          <span className="absolute left-[22%] top-[-34px] h-2.5 w-2.5 rounded-full bg-[#ffca2f]" aria-hidden="true" />
          <span className="absolute right-[9%] top-24 h-2.5 w-2.5 rounded-full bg-[#97dc91]" aria-hidden="true" />
          <span className="absolute left-[19%] top-36 h-4 w-4 rounded-full bg-[#81d6ec]" aria-hidden="true" />
          <h2 className="mx-auto max-w-2xl text-4xl font-light uppercase leading-tight text-[#666666] sm:text-5xl lg:text-6xl">
            We Partner
            <span className="block">With People</span>
            <span className="block">In Motion</span>
          </h2>
          <p className="mx-auto mt-8 max-w-sm text-sm leading-relaxed text-[#888888]">
            Founders with conviction, teams feeling the stretch, ideas too big to stay small.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="space-y-14">
            {stats.map((stat) => (
              <div key={stat.value} className="grid gap-5 sm:grid-cols-[190px_1fr] sm:items-start">
                <p className="text-7xl font-light leading-none text-cat-red sm:text-8xl">{stat.value}</p>
                <p className="max-w-sm text-xl leading-snug text-[#828282]">{stat.copy}</p>
              </div>
            ))}
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[580px]">
            <div className="dot-globe absolute inset-0 rounded-full bg-white" aria-hidden="true" />
            <span className="absolute right-0 top-[48%] rounded-full bg-cat-dark px-6 py-2 text-lg font-bold uppercase tracking-[0.16em] text-white shadow-xl">
              India
            </span>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
