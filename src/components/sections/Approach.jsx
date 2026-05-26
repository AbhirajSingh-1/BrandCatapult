import SectionReveal from '../common/SectionReveal'
import { assets } from '../../data/siteData'

function HaloVisual({ src, alt, halo, className = '', imageClassName = '', loading = 'lazy' }) {
  return (
    <div className={`relative flex min-h-[260px] items-center justify-center ${className}`}>
      <span className={`absolute aspect-square rounded-full ${halo}`} aria-hidden="true" />
      <span className={`absolute aspect-square rounded-full ${halo} opacity-60 scale-[0.72]`} aria-hidden="true" />
      <img src={src} alt={alt} className={`relative z-10 w-full max-w-[360px] object-contain ${imageClassName}`} loading={loading} />
    </div>
  )
}

export default function Approach() {
  return (
    <SectionReveal id="approach" className="bg-white">
      <div className="relative overflow-hidden bg-white pb-14 pt-24 sm:pb-20 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-[36%] bg-cat-dark" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="overflow-hidden rounded-[20px] bg-cat-dark shadow-[0_24px_70px_rgba(17,17,17,0.16)]">
            <img src={assets.orbitPanel} alt="Abstract red sphere framed by dark gold forms" className="aspect-video h-auto w-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-[34%] h-[31%] origin-left -skew-y-[3deg] bg-[#fafafa]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] origin-right -skew-y-[3deg] bg-[#f7f7f7]" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-[1500px] gap-8 px-5 py-16 sm:px-8 md:min-h-[760px] md:grid-cols-2 md:py-0 lg:px-12">
        <div className="md:absolute md:left-[4.5%] md:top-[19%] md:w-[42%] lg:w-[36%]">
          <p className="max-w-[460px] text-sm leading-relaxed text-[#555555] md:max-w-[350px] md:text-[13px] lg:text-sm">
            We believe one size fits one, and only one! We work to become the right agency for our clients- researching, learning,
            experimenting and adapting tirelessly until we become the masters of their trade.
          </p>
        </div>

        <HaloVisual
          src={assets.planSign}
          alt="Plan A and Plan B directional signs"
          halo="w-[360px] bg-cat-blue/70"
          className="md:absolute md:right-[5%] md:top-[1%] md:h-[290px] md:w-[39%] lg:right-[8%] lg:h-[310px]"
          imageClassName="max-w-[350px] md:max-w-[320px] lg:max-w-[380px]"
        />

        <HaloVisual
          src={assets.cubeObject}
          alt="Translucent cube orbit object"
          halo="w-[360px] bg-cat-yellow/70"
          className="md:absolute md:left-0 md:top-[27%] md:h-[300px] md:w-[41%] lg:top-[28%]"
          imageClassName="max-w-[250px] md:max-w-[245px] lg:max-w-[310px]"
        />

        <div className="md:absolute md:left-[47%] md:top-[48.5%] md:w-[47%] lg:left-[49%] lg:w-[43%]">
          <p className="max-w-[620px] text-sm leading-relaxed text-[#555555] md:max-w-[430px] md:text-[13px] lg:text-sm">
            Our clients think of us as an extension of their team. With an approach guided by empathy, flexibility and consistent
            communication we take ownership of our role as their partners.
          </p>
        </div>

        <h2 className="text-xl font-semibold uppercase tracking-[0.18em] text-cat-red md:absolute md:left-[39%] md:top-[61%] md:text-[16px] lg:text-xl">
          Globally Since 2015
        </h2>

        <div className="md:absolute md:bottom-[13%] md:left-[4.5%] md:w-[46%] lg:w-[39%]">
          <p className="max-w-[560px] text-sm leading-relaxed text-[#555555] md:max-w-[430px] md:text-[13px] lg:text-sm">
            We help brands transform faster than their consumers do. Every strategy, campaign or goal we set out is tied to concrete and
            measurable metrics. It's this reflection and evaluation that helps us create dynamic strategies and rock-solid processes.
          </p>
          <h3 className="mt-2 text-xl font-semibold uppercase tracking-[0.18em] text-cat-red md:text-[16px] lg:text-xl">Projects</h3>
        </div>

        <HaloVisual
          src={assets.atomObject}
          alt="Green translucent orbit object around a red sphere"
          halo="w-[380px] bg-cat-green/75"
          className="md:absolute md:bottom-[-7%] md:right-[2%] md:h-[340px] md:w-[47%] lg:right-[6%] lg:h-[390px]"
          imageClassName="max-w-[340px] -scale-x-100 md:max-w-[330px] lg:max-w-[410px]"
        />
        </div>
      </div>
    </SectionReveal>
  )
}
