import { caseStudyLinks, quickLinks, assets } from '../../data/siteData'

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="mb-8 text-[12px] font-bold uppercase tracking-[0.35em] text-white">{title}</h3>
      <ul className="space-y-4 text-sm text-white/45">
        {items.map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="transition hover:text-white">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const socialLinks = [
  {
    label: 'Behance',
    href: 'https://www.behance.net',
    icon: (
      <span className="text-[13px] font-bold leading-none tracking-tight">Be</span>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#141414] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_0.6fr_0.6fr]">
        <div className="flex min-h-60 flex-col justify-between">
          <a href="#home" aria-label="Brand Catapult home">
            <img src={assets.footerLogo} alt="Brand Catapult" className="h-auto w-64 max-w-full" loading="lazy" />
          </a>
          {/* Social icons */}
          <div className="mt-12 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/70 transition hover:border-white hover:text-white"
              >
                {icon}
              </a>
            ))}
            <span className="ml-2 text-sm text-white/60">Follow Us</span>
          </div>
        </div>
        <FooterColumn title="Case Studies" items={caseStudyLinks} />
        <FooterColumn title="Quick Links" items={quickLinks} />
      </div>
    </footer>
  )
}
