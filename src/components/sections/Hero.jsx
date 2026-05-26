import { useState } from 'react'
import { assets } from '../../data/siteData'

const slides = [
  { eyebrow: 'Market Strategies', lines: ['That Move', 'With You'], image: assets.heroOrbit },
  { eyebrow: 'Brand Systems', lines: ['That Stand', 'With You'], image: assets.heroOrbit1 },
  { eyebrow: 'Creative Motion', lines: ['That Build', 'With You'], image: assets.heroOrbit2 },
  { eyebrow: 'Real Shifts', lines: ['That Grow', 'With You'], image: assets.heroOrbit3 },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  return (
    <section
      id="home"
      className="relative isolate h-screen w-full overflow-hidden bg-white flex items-center justify-center"
    >
      {/* 3D Render Background Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={assets.heroOrbit3}
          alt="Abstract orbiting spheres over a white planet form"
          className="h-[90vh] sm:h-[95vh] md:h-[100vh] w-auto object-contain select-none translate-y-[2vh] sm:translate-y-[3vh] md:translate-y-[4vh]"
          loading="eager"
        />
      </div>

      {/* Bottom Corner Vignette Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.04)_0%,transparent_60%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.04)_0%,transparent_60%)]"
        aria-hidden="true"
      />


      {/* Hero Typography Overlays */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 text-center -translate-y-[8vh] sm:-translate-y-[10vh]">
        <p
          className="mb-6 uppercase transition-all duration-700"
          style={{
            fontFamily: "'ID Grotesk Trial', 'Montserrat', sans-serif",
            fontWeight: 550,
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            letterSpacing: '0.45em',
            color: '#757575',
          }}
        >
          {slide.eyebrow}
        </p>
        <h1
          className="mx-auto uppercase select-none"
          style={{
            fontFamily: "'ID Grotesk Trial' ",
            fontWeight: 300,
            fontSize: 'clamp(32px, 5.5vw, 76px)',
            lineHeight: 1.05,
            letterSpacing: '0.06em',
            color: '#757575',
          }}
        >
          <span className="block mb-2 transition-all duration-700">
            {slide.lines[0]}
          </span>
          <span className="flex items-center justify-center">
            <span>WITH</span>
            {/* The responsive gap exactly frames the centered 3D blue sphere */}
            <span
              className="w-[clamp(8rem,16vw,19rem)] shrink-0"
              aria-hidden="true"
            />
            <span>YOU</span>
          </span>
        </h1>
      </div>

      {/* Slide Indicators */}
      <div
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-8"
        aria-label="Hero slide indicators"
      >
        {slides.map((item, index) => (
          <button
            key={item.eyebrow}
            type="button"
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? 'bg-cat-red scale-125'
                : 'bg-cat-ink/30 hover:bg-cat-ink/65'
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show hero slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
