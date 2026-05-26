import PillButton from '../common/PillButton'
import SectionReveal from '../common/SectionReveal'
import { culturePhotos } from '../../data/siteData'

function CulturePhoto({ item, className = '' }) {
  return (
    <img
      src={item.image}
      alt={item.alt}
      className={`absolute h-28 w-28 rounded-full border border-cat-dark object-cover shadow-[0_12px_30px_rgba(0,0,0,0.16)] ${className}`}
      loading="lazy"
    />
  )
}

function CoinColumn({ height = 'h-[520px]', className = '' }) {
  return (
    <div className={`relative w-36 rounded-t-full border border-cat-dark bg-white sm:w-44 ${height} ${className}`}>
      <div className="coin-stack absolute inset-0 rounded-t-full" aria-hidden="true" />
      <div className="absolute -top-4 left-1/2 h-12 w-[112%] -translate-x-1/2 rounded-[50%] border border-cat-dark bg-cat-red" aria-hidden="true" />
    </div>
  )
}

export default function Culture() {
  return (
    <SectionReveal id="culture" className="overflow-hidden bg-white">
      <div className="grid min-h-[920px] lg:grid-cols-2">
        <div className="relative min-h-[700px] px-5 pt-28 sm:px-8 lg:min-h-[920px] lg:px-12">
          <div className="absolute bottom-0 left-0 right-0 h-[46%] bg-cat-blue/60" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-xl grid-cols-3 items-end gap-5">
            <div className="relative">
              <div className="absolute -top-28 left-5 h-24 w-24 rounded-full bg-cat-blue" aria-hidden="true" />
              <CulturePhoto item={culturePhotos[0]} className="-top-20 left-2 z-10" />
              <CoinColumn height="h-[560px]" />
            </div>
            <div className="relative pb-20">
              <div className="absolute -top-36 left-8 h-28 w-28 rounded-full bg-cat-yellow" aria-hidden="true" />
              <CulturePhoto item={culturePhotos[1]} className="-top-32 left-5 z-10" />
              <CoinColumn height="h-[620px]" />
              <CulturePhoto item={culturePhotos[4]} className="bottom-[-78px] left-5 z-10" />
              <CoinColumn height="h-[230px]" className="mt-20" />
            </div>
            <div className="relative">
              <div className="absolute -top-24 left-6 h-24 w-24 rounded-full bg-[#ffe3dc]" aria-hidden="true" />
              <CulturePhoto item={culturePhotos[2]} className="-top-20 left-3 z-10" />
              <CoinColumn height="h-[520px]" />
              <CulturePhoto item={culturePhotos[3]} className="bottom-[-96px] left-1 z-10" />
              <CoinColumn height="h-[170px]" className="mt-24" />
            </div>
          </div>
        </div>

        <div className="grid bg-cat-blue/60 lg:grid-rows-2">
          <div className="bg-white px-5 py-20 sm:px-10 lg:py-28">
            <div className="max-w-xl">
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <h2 className="text-5xl font-light uppercase leading-tight text-[#3d3d3d] sm:text-7xl">
                  Rituals
                  <span className="block">That Echo</span>
                  <span className="block">The Energy</span>
                </h2>
                <PillButton href="#contact" className="self-start">
                  Our Culture
                </PillButton>
              </div>
              <p className="max-w-lg text-lg leading-relaxed text-[#828282]">
                Shared rituals keep the pace human: ideas on the wall, wins at the table, and tiny habits that make ambitious work feel alive.
              </p>
            </div>
          </div>

          <div className="px-5 py-20 sm:px-10 lg:py-28">
            <div className="max-w-xl">
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <h2 className="text-5xl font-light uppercase leading-tight text-[#3d3d3d] sm:text-7xl">
                  And Folks
                  <span className="block">Who Make</span>
                  <span className="block">It Happen</span>
                </h2>
                <PillButton href="#contact" className="self-start">
                  Join the team
                </PillButton>
              </div>
              <p className="max-w-lg text-lg leading-relaxed text-[#828282]">
                We are a small, distributed team that likes clean thinking, quick experiments, open feedback, and work that leaves a mark.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
