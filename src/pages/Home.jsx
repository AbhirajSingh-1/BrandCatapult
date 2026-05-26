import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  assets,
  caseStudyLinks,
  culturePhotos,
  navItems,
  projectCards,
  quickLinks,
  serviceBullets,
  serviceList,
  stats,
} from '../data/siteData'
import { worldLandDots } from '../data/worldLandDots'

const globeCountries = [{ name: 'INDIA', lat: 22.9, lon: 78.9 }]

const cultureStacks = [
  { id: 'cake', imageIndex: 0, x: 5, y: 32, width: 25, height: 59, layers: 64, halo: 'blue', cap: true },
  { id: 'team', imageIndex: 1, x: 32, y: 22, width: 25, height: 58, layers: 61, halo: 'gold', cap: true },
  { id: 'ritual', imageIndex: 2, x: 61, y: 32, width: 25, height: 59, layers: 64, halo: 'peach', cap: true },
  { id: 'desk', imageIndex: 3, x: 5, y: 108, width: 25, height: 14, layers: 13, halo: 'gold', cap: false },
  { id: 'board', imageIndex: 4, x: 31, y: 91, width: 25, height: 31, layers: 30, halo: 'blue', cap: false },
  { id: 'laptop', imageIndex: 5, x: 61, y: 112, width: 25, height: 11, layers: 9, halo: 'peach', cap: false },
]

const socialPositions = [
  { x: 49, y: 5, size: 84 },
  { x: 20, y: 42, size: 140 },
  { x: 79, y: 55, size: 140 },
  { x: 30, y: 83, size: 58 },
  { x: 68, y: 34, size: 82 },
]

function Pill({ children, href, dark = false, className = '', type = 'button' }) {
  const classes = `bc-pill ${dark ? 'bc-pill-dark' : ''} ${className}`

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bc-nav-wrap">
      <nav className="bc-nav" aria-label="Primary navigation">
        <a className="bc-logo-link" href="#home" aria-label="Brand Catapult home">
          <img className="bc-logo" src={assets.headerLogo} alt="Brand Catapult" />
        </a>

        <div className="bc-nav-links">
          {navItems.map((item, index) => (
            <span className="bc-nav-link-wrap" key={item.id}>
              <a href={item.href}>{item.label}</a>
              {index < navItems.length - 1 ? <i aria-hidden="true" /> : null}
            </span>
          ))}
        </div>

        <div className="bc-nav-actions">
          <Pill href="#culture" dark>
            Join the team
          </Pill>
          <Pill href="#contact">Contact</Pill>
        </div>

        <button className="bc-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          <span />
          <span />
        </button>
      </nav>

      <div className={`bc-mobile-menu ${open ? 'is-open' : ''}`}>
        {navItems.map((item) => (
          <a href={item.href} key={item.id} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="bc-hero">
      <img className="bc-hero-art" src={assets.heroOrbit} alt="Abstract orbiting spheres over a white planet form" />
      <div className="bc-hero-copy">
        <p>Market Strategies</p>
        <h1>
          That Move
          <span>
            With <b aria-hidden="true" /> You
          </span>
        </h1>
      </div>
      <div className="bc-slider-dots" aria-label="Hero slides">
        <span />
        <span />
        <span className="active" />
        <span />
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section id="about" className="bc-intro">
      <div className="bc-intro-band" />
      <div className="bc-intro-copy">
        <p>
          A growing collective of thinkers, storytellers, designers,
          <span> and strategists, 60+ strong, across 9 countries,</span>
          <strong> grown steadily over 10+ years</strong>
        </p>
      </div>
    </section>
  )
}

function Tag({ children, red = false, light = false }) {
  return <span className={`bc-tag ${red ? 'is-red' : ''} ${light ? 'is-light' : ''}`}>{children}</span>
}

function WorkShowcase() {
  return (
    <section id="work" className="bc-work">
      <div className="bc-work-feature">
        <img src={assets.featuredPerson} alt="Featured Accato campaign performer in dark hoodie" />
        <div className="bc-work-gradient" aria-hidden="true" />
        <p className="bc-kicker bc-work-kicker">Featured Projects</p>
        <div className="bc-feature-brand">
          <span>(01)</span>
          <h2>accato</h2>
        </div>
        <div className="bc-feature-ghost">
          <span>We Adapt For You</span>
          <button aria-label="Open featured case study" type="button">
            <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="bc-feature-approach">
          <h3>Our Approach</h3>
          <div>
            <Tag>Branding</Tag>
            <Tag red>Strategy</Tag>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of type
          </p>
        </div>
      </div>

      <div className="bc-work-gallery">
        <p className="bc-gallery-ghost top">We Stand With You</p>
        <p className="bc-gallery-ghost bottom">We Transform You</p>
        <div className="bc-work-toolbar">
          <div className="bc-slider-dots in-work">
            <span />
            <span />
            <span className="active" />
            <span />
          </div>
          <div className="bc-work-filter">
            <span>We Curate</span>
            <button type="button">
              Branding <ChevronDown size={10} />
            </button>
            <span>For</span>
            <button type="button">
              D2C Brands <ChevronDown size={10} />
            </button>
          </div>
        </div>
        <div className="bc-project-row">
          {projectCards.slice(0, 3).map((project, index) => (
            <article className="bc-project-card" key={project.title}>
              <img src={project.image} alt={project.alt} />
              <div>
                {project.tags.map((tag, tagIndex) => (
                  <Tag key={tag} red={index === 1 && tagIndex === project.tags.length - 1} light={project.title === 'shishu' && tagIndex === project.tags.length - 1}>
                    {tag}
                  </Tag>
                ))}
                {project.title === 'shishu' ? <Tag light>+3</Tag> : null}
              </div>
            </article>
          ))}
          <article className="bc-project-card is-peek">
            <img src={assets.glazaLogo} alt="Glaza Bar and Beyond identity" />
          </article>
        </div>
        <div className="bc-work-progress">
          <span />
        </div>
        <Pill href="#services" className="bc-more-work">
          More of work
        </Pill>
      </div>
    </section>
  )
}

function ApproachVisual({ className, src, alt }) {
  return (
    <div className={`bc-approach-visual ${className}`}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <img src={src} alt={alt} />
    </div>
  )
}

function Approach() {
  return (
    <section className="bc-approach">
      <div className="bc-orbit-panel">
        <img src={assets.orbitPanel} alt="Abstract red sphere framed by dark gold forms" />
      </div>
      <div className="bc-approach-grid">
        <p className="bc-a-copy one">
          We believe one size fits one, and only one! We work to become the right agency for our clients- researching, learning,
          experimenting and adapting tirelessly until we become the masters of their trade.
        </p>
        <ApproachVisual className="plan" src={assets.planSign} alt="Plan A and Plan B directional signs" />
        <ApproachVisual className="cube" src={assets.cubeObject} alt="Translucent cube orbit object" />
        <p className="bc-a-copy two">
          Our clients think of us as an extension of their team. With an approach guided by empathy, flexibility and consistent communication
          we take ownership of our role as their partners.
        </p>
        <h2>Globally Since 2015</h2>
        <div className="bc-a-copy three">
          <p>
            We help brands transform faster than their consumers do. Every strategy, campaign or goal we set out is tied to concrete and
            measurable metrics. It's this reflection and evaluation that helps us create dynamic strategies and rock-solid processes.
          </p>
          <strong>Projects</strong>
        </div>
        <ApproachVisual className="atom" src={assets.atomObject} alt="Green translucent orbit object around a red sphere" />
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="bc-services">
      <div className="bc-services-inner">
        <p className="bc-kicker">Our Services</p>
        <p className="bc-service-people">People</p>
        <div className="bc-service-list">
          {serviceList.map((service, index) => (
            <div className={index === 3 ? 'active' : ''} key={service}>
              {index === 3 ? <span>04</span> : <i />}
              <h2>{service}</h2>
              {index === 3 ? (
                <button type="button" aria-label="Open Branding and Design">
                  <ArrowUpRight size={13} />
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <p className="bc-service-line">
          <b>Real Brands.</b> Real Shifts. <b>Real Results.</b>
        </p>
        <img className="bc-service-preview" src={assets.servicePreview} alt="Brand identity and cocktail presentation for a hospitality case study" />
        <ul className="bc-service-bullets">
          {serviceBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function projectGlobePoint(lat, lon, rotationLon = -42, radius = 50) {
  const phi = (lat * Math.PI) / 180
  const lambda = ((lon + rotationLon) * Math.PI) / 180
  const x = radius + radius * Math.cos(phi) * Math.sin(lambda)
  const y = radius - radius * Math.sin(phi) * 0.86
  const z = Math.cos(phi) * Math.cos(lambda)

  return { x, y, z }
}

function DottedGlobe() {
  const dots = useMemo(
    () =>
      worldLandDots
        .map(([lat, lon]) => projectGlobePoint(lat, lon))
        .filter((dot) => dot.z > -0.18)
        .map((dot, index) => ({ ...dot, id: index })),
    [],
  )

  const india = projectGlobePoint(globeCountries[0].lat, globeCountries[0].lon)

  return (
    <div className="bc-globe" aria-label="Dotted world globe">
      {dots.map((dot) => (
        <i
          key={dot.id}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            opacity: Math.max(0.18, Math.min(1, dot.z + 0.4)),
          }}
        />
      ))}
      <span style={{ left: `${Math.min(87, india.x + 20)}%`, top: `${india.y + 2}%` }}>India</span>
    </div>
  )
}

function MotionStats() {
  return (
    <section className="bc-motion">
      <div className="bc-confetti">
        <i className="purple" />
        <i className="yellow" />
        <i className="red" />
        <i className="green" />
        <i className="blue" />
        <i className="periwinkle" />
      </div>
      <div className="bc-motion-head">
        <h2>
          We Partner
          <span>With People</span>
          <span>In Motion</span>
        </h2>
        <p>Founders with conviction, teams feeling the stretch, ideas too big to stay small.</p>
      </div>
      <div className="bc-stats">
        <div className="bc-stat-list">
          {stats.map((stat) => (
            <div className="bc-stat" key={stat.value}>
              <strong>{stat.value}</strong>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsu</p>
            </div>
          ))}
        </div>
        <DottedGlobe />
      </div>
    </section>
  )
}

function ClientLogos() {
  return (
    <section className="bc-client-logos" aria-label="Client logos">
      {[0, 1, 2].map((row) => (
        <img src={assets.clientLogos} alt={row === 0 ? 'Client logos' : ''} key={row} aria-hidden={row > 0} />
      ))}
      <span>1 / 1</span>
    </section>
  )
}

function CoinLayers({ layers }) {
  return Array.from({ length: layers }, (_, index) => <i key={index} style={{ bottom: `${(index / Math.max(layers - 1, 1)) * 96}%` }} />)
}

function CoinStack({ stack }) {
  const photo = culturePhotos[stack.imageIndex]

  return (
    <div
      className={`bc-coin-stack ${stack.cap ? 'has-cap' : ''} halo-${stack.halo}`}
      style={{ left: `${stack.x}%`, top: `${stack.y}%`, width: `${stack.width}%`, height: `${stack.height}%` }}
    >
      <CoinLayers layers={stack.layers} />
      <img src={photo.image} alt={photo.alt} />
    </div>
  )
}

function Culture() {
  return (
    <section id="culture" className="bc-culture">
      <div className="bc-culture-blue" />
      <div className="bc-culture-art">
        {cultureStacks.map((stack) => (
          <CoinStack key={stack.id} stack={stack} />
        ))}
      </div>
      <div className="bc-culture-copy top">
        <p className="bc-kicker red">Culture</p>
        <h2>
          Rituals
          <span>That Echo</span>
          <span>The Energy</span>
        </h2>
        <Pill href="#culture">Our Culture</Pill>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
          text ever since the 1500s, when an unknown printer took a galley of type
        </p>
      </div>
      <div className="bc-culture-copy bottom">
        <h2>
          And Folks
          <span>Who Make</span>
          <span>It Happen</span>
        </h2>
        <Pill href="#contact">Join the team</Pill>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
          text ever since the 1500s, when an unknown printer took a galley of type
        </p>
      </div>
    </section>
  )
}

function Field({ label, wide = false }) {
  return (
    <label className={wide ? 'wide' : ''}>
      <span>{label}</span>
      <input aria-label={label} />
    </label>
  )
}

function OrbitSocial() {
  return (
    <div className="bc-social-orbit" aria-label="Team social orbit">
      <span className="ring one" />
      <span className="ring two" />
      <span className="ring three" />
      <span className="center-dot" />
      {culturePhotos.slice(1, 6).map((photo, index) => (
        <img
          key={photo.alt}
          src={photo.image}
          alt={photo.alt}
          style={{
            left: `${socialPositions[index].x}%`,
            top: `${socialPositions[index].y}%`,
            width: `${socialPositions[index].size}px`,
            height: `${socialPositions[index].size}px`,
          }}
        />
      ))}
    </div>
  )
}

function Contact() {
  return (
    <section id="contact" className="bc-contact">
      <div className="bc-contact-red">
        <div>
          <h2>
            We Don't
            <span>Chase.</span>
            <span>We Calibrate.</span>
          </h2>
          <p>If you're thinking big, thinking bold, or thinking finally-you're thinking like us.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <Field label="Name" wide />
          <Field label="Email" />
          <Field label="Phone" />
          <Field label="Message" wide />
          <Pill dark type="submit">
            Start a conversation
          </Pill>
        </form>
      </div>
      <div className="bc-social">
        <OrbitSocial />
        <div>
          <p className="bc-kicker red">Social Presence</p>
          <h2>
            Spam
            <span>The Gram</span>
          </h2>
          <Pill href="https://www.instagram.com/brandcatapult/">Follow @brandcatapult</Pill>
        </div>
      </div>
    </section>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3>{title}</h3>
      {items.map((item) => (
        <a href="#home" key={item}>
          {item}
        </a>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="bc-footer">
      <div className="bc-footer-brand">
        <img src={assets.footerLogo} alt="Brand Catapult" />
        <img src={assets.socialStrip} alt="Social links and follow us" />
      </div>
      <FooterColumn title="Case Studies" items={caseStudyLinks} />
      <FooterColumn title="Quick Links" items={quickLinks} />
    </footer>
  )
}

export default function Home() {
  return (
    <div className="bc-page">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <WorkShowcase />
        <Approach />
        <Services />
        <MotionStats />
        <ClientLogos />
        <Culture />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
