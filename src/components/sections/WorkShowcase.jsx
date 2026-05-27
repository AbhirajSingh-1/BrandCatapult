import 'swiper/css'
import 'swiper/css/free-mode'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Autoplay, FreeMode, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import DropdownPill from '../common/DropdownPill'
import PillButton from '../common/PillButton'
import SectionReveal from '../common/SectionReveal'
import Tag from '../common/Tag'
import { assets, projectCards } from '../../data/siteData'
import { audienceOptions, curateOptions, filterProjects } from '../../utils/projects'

function ProjectCard({ project, index }) {
  const isFeaturedFill = project.title === 'HappiNest'
  const isShishu = project.title.toLowerCase() === 'shishu'

  return (
    <article className="group min-w-0">
      <div className="relative h-[220px] overflow-hidden rounded-md bg-white/5 sm:h-[210px] md:h-[151px] lg:h-[240px] xl:h-[296px]">
        <img
          src={project.image}
          alt={project.alt}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </div>
      <div className="mt-5 flex min-h-7 flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <Tag key={tag} filled={isFeaturedFill && tagIndex === project.tags.length - 1}>
            {tag}
          </Tag>
        ))}
        {isShishu ? <Tag muted>+3</Tag> : null}
      </div>
    </article>
  )
}

export default function WorkShowcase() {
  const [curateFilter, setCurateFilter] = useState('Branding')
  const [audienceFilter, setAudienceFilter] = useState('D2C Brands')
  const [activeSlide, setActiveSlide] = useState(0)
  const [openFilter, setOpenFilter] = useState(null)
  const swiperRef = useRef(null)

  const filteredProjects = useMemo(
    () => filterProjects(projectCards, curateFilter, audienceFilter),
    [curateFilter, audienceFilter],
  )

  const slides = filteredProjects.length > 1 ? [...filteredProjects, ...filteredProjects] : filteredProjects
  const progress = filteredProjects.length ? ((activeSlide % filteredProjects.length) + 1) / filteredProjects.length : 0

  const selectFilter = (setter) => (value) => {
    setter(value)
    setOpenFilter(null)
    setActiveSlide(0)
  }

  const goToSlide = (index) => {
    setActiveSlide(index)
    swiperRef.current?.slideToLoop?.(index)
  }

  return (
    <SectionReveal id="work" className="overflow-hidden bg-cat-dark text-white">
      <div className="relative border-t border-cat-red/25 bg-cat-dark">
        <div className="relative min-h-[560px] overflow-hidden sm:min-h-[620px] md:min-h-[535px] lg:min-h-[650px]">
          <motion.img
            src={assets.featuredPerson}
            alt="Featured Accato campaign performer in dark hoodie"
            className="absolute inset-0 h-full w-full object-cover object-[50%_22%] opacity-80"
            loading="lazy"
            initial={{ scale: 1.04 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
                  dummy text ever since the 1500s, when an unknown printer took a galley of type.
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
              <div className="flex gap-2" aria-label="Project carousel slides">
                {(filteredProjects.length ? filteredProjects : projectCards).map((project, index) => (
                  <button
                    key={project.title}
                    type="button"
                    className={`h-2 w-2 rounded-full transition ${filteredProjects.length && index === activeSlide % filteredProjects.length ? 'bg-cat-red' : 'bg-white/60 hover:bg-white'}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Show project ${index + 1}`}
                    disabled={!filteredProjects.length}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-5 text-[12px] font-bold uppercase tracking-[0.5em] text-white/88">
                <span>We Curate</span>
                <DropdownPill
                  label="Select project discipline"
                  value={curateFilter}
                  options={curateOptions}
                  open={openFilter === 'curate'}
                  onToggle={() => setOpenFilter((current) => (current === 'curate' ? null : 'curate'))}
                  onSelect={selectFilter(setCurateFilter)}
                />
                <span>For</span>
                <DropdownPill
                  label="Select project audience"
                  value={audienceFilter}
                  options={audienceOptions}
                  open={openFilter === 'audience'}
                  onToggle={() => setOpenFilter((current) => (current === 'audience' ? null : 'audience'))}
                  onSelect={selectFilter(setAudienceFilter)}
                />
              </div>
            </div>

            <div className="mt-12 md:mt-14 lg:mt-20">
              {slides.length ? (
                <Swiper
                  key={`${curateFilter}-${audienceFilter}`}
                  modules={[Autoplay, FreeMode, Keyboard]}
                  autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  freeMode={{ enabled: true, momentum: true, momentumRatio: 0.9 }}
                  grabCursor
                  keyboard={{ enabled: true }}
                  loop={filteredProjects.length > 1}
                  speed={850}
                  slidesPerView={1.08}
                  spaceBetween={24}
                  watchOverflow
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                  }}
                  onSlideChange={(swiper) => {
                    setActiveSlide((swiper.realIndex ?? swiper.activeIndex) % filteredProjects.length)
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2.05, spaceBetween: 24 },
                    768: { slidesPerView: 3.05, spaceBetween: 18 },
                    1024: { slidesPerView: 3.05, spaceBetween: 28 },
                    1200: { slidesPerView: 3.1, spaceBetween: 34 },
                    1500: { slidesPerView: 3.25, spaceBetween: 34 },
                  }}
                >
                  {slides.map((project, index) => (
                    <SwiperSlide key={`${project.title}-${index}`}>
                      <ProjectCard project={project} index={index % filteredProjects.length} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="grid min-h-[296px] place-items-center rounded-md border border-white/10 bg-white/5 px-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-white/58">
                  No projects match the selected filters.
                </div>
              )}
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
