import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Autoplay, FreeMode, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import PillButton from '../common/PillButton'
import SectionReveal from '../common/SectionReveal'
import { assets, projectCards } from '../../data/siteData'

function Tag({ children, filled = false, muted = false }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full border px-3 text-[10px] font-bold uppercase tracking-[0.1em] ${
        filled
          ? 'border-cat-red bg-cat-red text-white'
          : muted
            ? 'border-white/90 bg-white text-cat-ink'
            : 'border-white/65 text-white'
      }`}
    >
      {children}
    </span>
  )
}

function FilterPill({ children }) {
  return (
    <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/85 bg-white px-5 text-[12px] font-bold uppercase tracking-[0.12em] text-cat-red shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]">
      {children}
      <ChevronDown size={13} strokeWidth={3} aria-hidden="true" />
    </span>
  )
}

function ProjectCard({ project, index }) {
  const isSecondCard = index === 1
  const isShishu = project.title.toLowerCase() === 'shishu'

  return (
    <article className="group min-w-0">
      <div className="relative h-[220px] overflow-hidden rounded-md bg-white/5 sm:h-[210px] md:h-[151px] lg:h-[240px] xl:h-[296px]">
        <img
          src={project.image}
          alt={project.alt}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </div>
      <div className="mt-5 flex min-h-7 flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <Tag key={tag} filled={isSecondCard && tagIndex === project.tags.length - 1}>
            {tag}
          </Tag>
        ))}
        {isShishu ? <Tag muted>+3</Tag> : null}
      </div>
    </article>
  )
}

export default function WorkShowcase() {
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselCards = [...projectCards, ...projectCards]
  const progress = ((activeSlide % projectCards.length) + 1) / projectCards.length

  return (
    <SectionReveal id="work" className="overflow-hidden bg-cat-dark text-white">
      <div className="relative border-t border-cat-red/25 bg-cat-dark">
        <div className="relative min-h-[560px] overflow-hidden sm:min-h-[620px] md:min-h-[535px] lg:min-h-[650px]">
          <img
            src={assets.featuredPerson}
            alt="Featured Accato campaign performer in dark hoodie"
            className="absolute inset-0 h-full w-full object-cover object-[50%_22%] opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_20%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(180deg,rgba(18,18,18,0.22),rgba(18,18,18,0.52)_62%,#171717_100%)]" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-[1500px] px-6 pt-24 sm:px-10 md:px-12 md:pt-28 lg:px-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.55em] text-white/78">Featured Projects</p>

            <div className="mt-24 grid gap-8 md:grid-cols-[0.82fr_0.36fr_0.74fr] md:items-start lg:mt-32 lg:grid-cols-[0.9fr_0.34fr_0.78fr]">
              <div>
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[13px] font-bold text-cat-red">(01)</span>
                  <h2 className="text-5xl font-black leading-none sm:text-6xl md:text-[44px] lg:text-[58px]">accato</h2>
                </div>
                <div className="mt-20 flex items-center gap-5 md:mt-[72px]">
                  <p className="text-2xl font-light uppercase text-white/[0.045] sm:text-4xl md:text-[28px] lg:text-[46px]">We Adapt For You</p>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cat-red text-white shadow-[0_0_28px_rgba(207,36,54,0.55)] transition hover:-translate-y-1 hover:bg-white hover:text-cat-red"
                    aria-label="Open featured case study"
                  >
                    <ArrowUpRight size={20} strokeWidth={2.6} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <h3 className="text-[15px] font-bold uppercase tracking-[0.18em] text-cat-red md:pt-2">Our Approach</h3>

              <div className="max-w-[360px] md:pt-1">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Tag>Branding</Tag>
                  <Tag filled>Strategy</Tag>
                </div>
                <p className="text-[13px] leading-[1.3] text-white/90 sm:text-sm">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                  dummy text ever since the 1500s, when an unknown printer took a galley of type
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden px-6 pb-12 pt-10 sm:px-10 md:px-12 lg:px-20">
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-cat-dark via-cat-dark/90 to-transparent" aria-hidden="true" />
          <p className="pointer-events-none absolute left-[48%] top-[88px] hidden -translate-x-1/2 text-[52px] font-light uppercase text-white/[0.035] md:block lg:text-[72px]">
            We Stand With You
          </p>
          <p className="pointer-events-none absolute bottom-12 left-12 hidden text-[52px] font-light uppercase text-white/[0.035] md:block lg:text-[70px]">
            We Transform You
          </p>

          <div className="relative z-10 mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                <span className="h-2 w-2 rounded-full bg-white/55" />
                <span className="h-2 w-2 rounded-full bg-cat-red" />
                <span className="h-2 w-2 rounded-full bg-white/55" />
              </div>
              <div className="flex flex-wrap items-center gap-5 text-[12px] font-bold uppercase tracking-[0.5em] text-white/88">
                <span>We Curate</span>
                <FilterPill>Branding</FilterPill>
                <span>For</span>
                <FilterPill>D2C Brands</FilterPill>
              </div>
            </div>

            <div className="mt-12 md:mt-14 lg:mt-20">
              <Swiper
                modules={[Autoplay, FreeMode, Keyboard]}
                autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
                freeMode={{ enabled: true, momentum: true, momentumRatio: 0.9 }}
                grabCursor
                keyboard={{ enabled: true }}
                loop
                speed={850}
                slidesPerView={1.08}
                spaceBetween={24}
                watchOverflow={false}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex ?? swiper.activeIndex)}
                breakpoints={{
                  640: { slidesPerView: 2.05, spaceBetween: 24 },
                  768: { slidesPerView: 3.05, spaceBetween: 18 },
                  1024: { slidesPerView: 3.05, spaceBetween: 28 },
                  1200: { slidesPerView: 3.1, spaceBetween: 34 },
                  1500: { slidesPerView: 3.25, spaceBetween: 34 },
                }}
              >
                {carouselCards.map((project, index) => (
                  <SwiperSlide key={`${project.title}-${index}`}>
                    <ProjectCard project={project} index={index % projectCards.length} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-12 flex items-center justify-center" aria-label="Project carousel progress">
              <div className="h-px w-96 max-w-[55vw] bg-white/38">
                <div className="h-[4px] -translate-y-0.5 rounded-full bg-cat-red transition-all duration-500" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <PillButton href="#services" className="shadow-[0_0_36px_rgba(207,36,54,0.35)]">
                More of work
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
