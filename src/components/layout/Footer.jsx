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

export default function Footer() {
  return (
    <footer className="bg-[#141414] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_0.6fr_0.6fr]">
        <div className="flex min-h-60 flex-col justify-between">
          <a href="#home" aria-label="Brand Catapult home">
            <img src={assets.footerLogo} alt="Brand Catapult" className="h-auto w-64 max-w-full" loading="lazy" />
          </a>
          <img src={assets.socialStrip} alt="Social links and follow us" className="mt-12 h-auto w-72 max-w-full opacity-80" loading="lazy" />
        </div>
        <FooterColumn title="Case Studies" items={caseStudyLinks} />
        <FooterColumn title="Quick Links" items={quickLinks} />
      </div>
    </footer>
  )
}
