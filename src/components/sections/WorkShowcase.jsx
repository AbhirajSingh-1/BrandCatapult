import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Autoplay, FreeMode, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import PillButton from '../common/PillButton'
import SectionReveal from '../common/SectionReveal'
import { assets, projectCards } from '../../data/siteData'

function Tag({ children, filled = false }) {
  return (
    <span
      className={`inline-flex h-5 items-center rounded-full border px-2.5 text-[9px] font-bold uppercase ${
        filled ? 'border-cat-red bg-cat-red text-white' : 'border-white/55 text-white'
      }`}
    >
      {children}
    </span>
  )
}

function ProjectCard({ project, index }) {
  return (
    <article className="group min-w-0">
      <div className="relative h-44 overflow-hidden rounded-md bg-white/5 sm:h-56 lg:h-60">
        <img
          src={project.image}
          alt={project.alt}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-5 px-5 text-center text-white">
          <h3 className="text-3xl font-black">{project.title}</h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.32em] text-white/70">{project.subtitle}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <Tag key={tag} filled={tagIndex === project.tags.length - 1 && index === 1}>
            {tag}
          </Tag>
        ))}
      </div>
    </article>
  )
}

export default function WorkShowcase() {
  const swiperRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselCards = [...projectCards, ...projectCards]
  const progress = ((activeSlide % projectCards.length) + 1) / projectCards.length

  return (
    <SectionReveal id="work" className="overflow-hidden bg-cat-dark text-white">
      <div className="relative min-h-[780px] border-t border-cat-red/30 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="fine-noise absolute inset-0 opacity-70" aria-hidden="true" />
        <img
          src={assets.featuredPerson}
          alt="Featured Accato campaign performer in dark hoodie"
          className="absolute bottom-48 right-[-8%] top-8 z-0 h-[620px] max-w-none object-contain opacity-70 sm:right-0 sm:h-[720px] lg:right-[6%] lg:top-12"
          loading="lazy"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-28 text-[11px] font-bold uppercase tracking-[0.55em] text-white/75">Featured Projects</p>

          <div className="grid min-h-[420px] gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-5">
                <span className="font-mono text-lg text-cat-red">(01)</span>
                <h2 className="text-5xl font-black sm:text-7xl">accato</h2>
              </div>
              <p className="mt-20 text-3xl font-light uppercase text-white/5 sm:text-5xl">We Adapt For You</p>
            </div>

            <div className="max-w-md">
              <h3 className="mb-5 text-base font-bold uppercase tracking-[0.24em] text-cat-red">Our Approach</h3>
              <div className="mb-5 flex gap-2">
                <Tag>Branding</Tag>
                <Tag filled>Strategy</Tag>
              </div>
              <p className="text-sm leading-relaxed text-white/85">
                We transform brand positions into identities, narratives, and market systems designed to move with the people they serve.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cat-red text-white shadow-[0_0_28px_rgba(207,36,54,0.55)] transition hover:-translate-y-1 hover:bg-white hover:text-cat-red"
            aria-label="Open featured case study"
          >
            <ArrowUpRight size={20} strokeWidth={2.6} aria-hidden="true" />
          </button>

          <div className="mt-24 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-cat-red" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            </div>
            <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-white/80">
              We Curate <span className="rounded-full bg-white px-4 py-2 text-cat-red">Branding</span> For{' '}
              <span className="rounded-full bg-white px-4 py-2 text-cat-red">D2C Brands</span>
            </p>
          </div>

          <div className="mt-12">
            <Swiper
              modules={[Autoplay, FreeMode, Keyboard]}
              autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
              freeMode={{ enabled: true, momentum: true, momentumRatio: 0.9 }}
              grabCursor
              keyboard={{ enabled: true }}
              loop
              speed={850}
              slidesPerView={1.1}
              spaceBetween={24}
              watchOverflow={false}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => setActiveSlide(swiper.realIndex ?? swiper.activeIndex)}
              breakpoints={{
                640: { slidesPerView: 2.1 },
                1024: { slidesPerView: 3.05 },
                1280: { slidesPerView: 3.35 },
              }}
            >
              {carouselCards.map((project, index) => (
                <SwiperSlide key={`${project.title}-${index}`}>
                  <ProjectCard project={project} index={index % projectCards.length} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-12 flex items-center justify-center gap-5" aria-label="Project carousel controls">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/28 text-white transition hover:border-cat-red hover:bg-cat-red"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous project"
            >
              <ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />
            </button>
            <div className="h-px w-56 max-w-[42vw] bg-white/28">
              <div className="h-[3px] -translate-y-px bg-cat-red transition-all duration-500" style={{ width: `${progress * 100}%` }} />
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/28 text-white transition hover:border-cat-red hover:bg-cat-red"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next project"
            >
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 flex justify-center">
            <PillButton href="#services" className="shadow-[0_0_36px_rgba(207,36,54,0.35)]">
              More of work
            </PillButton>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
