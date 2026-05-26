import SectionReveal from '../common/SectionReveal'
import { assets } from '../../data/siteData'

export default function Approach() {
  return (
    <SectionReveal className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-md bg-cat-dark shadow-[0_22px_70px_rgba(17,17,17,0.18)]">
          <img src={assets.orbitPanel} alt="Abstract red sphere framed by dark gold forms" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>

      <div className="grid gap-y-8 px-5 pb-8 pt-24 sm:px-8 md:grid-cols-2 md:gap-x-12 md:pt-32 lg:px-12">
        <div className="flex items-center">
          <p className="max-w-xl text-base leading-relaxed text-[#555555] sm:text-lg">
            We believe one size fits one, and only one. We work to become the right agency for our clients, researching, learning,
            experimenting and adapting tirelessly until we become the masters of their trade.
          </p>
        </div>

        <div className="relative min-h-[360px]">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cat-blue/60 sm:h-[420px] sm:w-[420px]" aria-hidden="true" />
          <div className="absolute right-8 top-8 h-64 w-64 rounded-full bg-cat-blue/70 sm:h-[300px] sm:w-[300px]" aria-hidden="true" />
          <img
            src={assets.planSign}
            alt="Plan A and Plan B directional signs"
            className="relative ml-auto block w-full max-w-[430px] object-contain"
            loading="lazy"
          />
        </div>

        <div className="relative min-h-[430px] md:-mt-12">
          <div className="absolute left-[-16%] top-0 h-[420px] w-[420px] rounded-full bg-cat-yellow/70 sm:h-[520px] sm:w-[520px]" aria-hidden="true" />
          <div className="absolute left-8 top-16 h-72 w-72 rounded-full bg-cat-yellow/60 sm:h-[360px] sm:w-[360px]" aria-hidden="true" />
          <img
            src={assets.cubeObject}
            alt="Translucent cube orbit object"
            className="relative mx-auto block w-full max-w-[420px] object-contain"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center gap-12 md:pt-12">
          <p className="max-w-xl text-base leading-relaxed text-[#555555] sm:text-lg">
            Our clients think of us as an extension of their team. With an approach guided by empathy, flexibility and consistent
            communication we take ownership of our role as their partners.
          </p>
          <h2 className="text-2xl font-semibold uppercase tracking-[0.22em] text-cat-red sm:text-3xl">Globally Since 2015</h2>
        </div>

        <div className="flex flex-col justify-center gap-4 md:pb-24">
          <p className="max-w-xl text-base leading-relaxed text-[#555555] sm:text-lg">
            We help brands transform faster than their consumers do. Every strategy, campaign or goal we set out is tied to concrete
            and measurable metrics.
          </p>
          <h3 className="text-2xl font-semibold uppercase tracking-[0.22em] text-cat-red sm:text-3xl">Projects</h3>
        </div>

        <div className="relative min-h-[430px]">
          <div className="absolute right-[-8%] top-0 h-[420px] w-[420px] rounded-full bg-cat-green/75 sm:h-[520px] sm:w-[520px]" aria-hidden="true" />
          <img
            src={assets.atomObject}
            alt="Green translucent orbit object around a red sphere"
            className="relative ml-auto block w-full max-w-[490px] object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </SectionReveal>
  )
}
