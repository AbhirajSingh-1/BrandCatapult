import PillButton from '../common/PillButton'
import { culturePhotos } from '../../data/siteData'

const stacks = [
  { id: 'cake', imageIndex: 0, x: 12, y: 22.2, width: 22, height: 44.5, layers: 48, halo: 'rgba(150,183,255,0.32)', cap: true },
  { id: 'team', imageIndex: 1, x: 36.4, y: 15.6, width: 22, height: 51.2, layers: 55, halo: 'rgba(255,213,116,0.34)', cap: true },
  { id: 'ritual', imageIndex: 2, x: 62.6, y: 22.4, width: 21.5, height: 44.3, layers: 48, halo: 'rgba(255,188,164,0.28)', cap: true },
  { id: 'desk', imageIndex: 3, x: 12.4, y: 73.4, width: 21, height: 13.3, layers: 12, halo: 'rgba(255,213,116,0.16)', cap: false },
  { id: 'board', imageIndex: 4, x: 36.6, y: 64.5, width: 22, height: 22.5, layers: 22, halo: 'rgba(150,183,255,0.16)', cap: false },
  { id: 'laptop', imageIndex: 5, x: 62.8, y: 79.2, width: 20.8, height: 8.1, layers: 7, halo: 'rgba(255,188,164,0.15)', cap: false },
]

const imageOffsets = {
  cake: { size: 84, x: 50, y: -18 },
  team: { size: 82, x: 50, y: -17 },
  ritual: { size: 82, x: 50, y: -18 },
  desk: { size: 90, x: 50, y: -46 },
  board: { size: 88, x: 50, y: -36 },
  laptop: { size: 92, x: 52, y: -94 },
}

function CoinLayers({ layers }) {
  return Array.from({ length: layers }).map((_, index) => (
    <span
      key={index}
      className="absolute left-1/2 h-[13px] w-full -translate-x-1/2 rounded-[50%] border border-cat-dark bg-white"
      style={{
        bottom: `${(index / Math.max(layers - 1, 1)) * 96}%`,
        zIndex: index,
      }}
      aria-hidden="true"
    />
  ))
}

function CulturePhoto({ stack, item }) {
  const offset = imageOffsets[stack.id]

  return (
    <div
      className="absolute z-30 aspect-square"
      style={{
        width: `${offset.size}%`,
        left: `${offset.x}%`,
        top: `${offset.y}%`,
        transform: 'translateX(-50%)',
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${stack.halo} 0 20%, transparent 21% 35%, ${stack.halo} 36% 48%, transparent 49% 61%, ${stack.halo} 62% 72%, transparent 73%)`,
        }}
        aria-hidden="true"
      />
      <img src={item.image} alt={item.alt} className="h-full w-full rounded-full border border-cat-dark object-cover" loading="lazy" />
    </div>
  )
}

function CoinStack({ stack }) {
  const item = culturePhotos[stack.imageIndex]

  return (
    <div
      className="absolute"
      style={{
        left: `${stack.x}%`,
        top: `${stack.y}%`,
        width: `${stack.width}%`,
        height: `${stack.height}%`,
      }}
    >
      <div className="absolute inset-0">
        <CoinLayers layers={stack.layers} />
        {stack.cap ? (
          <span
            className="absolute left-1/2 top-0 z-[90] h-[18px] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cat-dark bg-cat-red"
            aria-hidden="true"
          />
        ) : null}
      </div>
      <CulturePhoto stack={stack} item={item} />
    </div>
  )
}

function CultureCopy({ eyebrow, title, button, copy, lower = false }) {
  return (
    <div
      className={`relative z-20 px-5 sm:px-8 md:absolute md:px-0 ${
        lower ? 'pt-12 md:left-[52%] md:top-[55%] md:pt-0' : 'pt-8 md:left-[52%] md:top-[4%] md:pt-0'
      }`}
    >
      <div className="relative max-w-[360px] lg:max-w-[470px]">
        {eyebrow ? <p className="mb-4 text-[12px] font-bold uppercase text-cat-red md:mb-2">{eyebrow}</p> : null}
        <div className="relative inline-block">
          <h2 className="text-[42px] font-light uppercase leading-[1.08] tracking-normal text-[#343434] sm:text-[50px] md:text-[40px] lg:text-[62px]">
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <PillButton
            href={lower ? '#contact' : '#culture'}
            className={`mt-3 h-7 min-h-7 whitespace-nowrap px-3 py-1 text-[10px] tracking-[0.12em] md:absolute md:mt-0 ${
              lower ? 'md:left-[69%] md:top-[59%]' : 'md:left-[58%] md:top-[10%]'
            }`}
          >
            {button}
          </PillButton>
        </div>
        <p className="mt-5 max-w-[330px] text-[12px] leading-[1.25] text-[#7f7f7f] lg:max-w-[420px] lg:text-sm">{copy}</p>
      </div>
    </div>
  )
}

export default function Culture() {
  return (
    <section id="culture" className="relative isolate overflow-hidden border-t-[6px] border-[#4a2d36] bg-white">
      <div className="absolute inset-x-0 bottom-0 top-[42%] -z-10 bg-[#eaf1fc]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] pb-16 md:h-[744px] md:pb-0 lg:h-[900px]">
        <div className="absolute inset-x-0 bottom-0 top-[42%] bg-[#eaf1fc]" aria-hidden="true" />
        <div className="relative mx-auto h-[650px] w-full max-w-[390px] md:absolute md:left-0 md:top-0 md:h-full md:w-1/2 md:max-w-none">
          {stacks.map((stack) => (
            <CoinStack key={stack.id} stack={stack} />
          ))}
        </div>

        <div className="relative z-20 pt-0 md:static">
          <CultureCopy
            eyebrow="Culture"
            title={['Rituals', 'That Echo', 'The Energy']}
            button="Our Culture"
            copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type"
          />
          <CultureCopy
            lower
            title={['And Folks', 'Who Make', 'It Happen']}
            button="Join the team"
            copy="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type"
          />
        </div>
      </div>
    </section>
  )
}
