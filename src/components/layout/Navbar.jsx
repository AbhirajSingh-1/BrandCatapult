import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import PillButton from '../common/PillButton'
import { navItems, assets } from '../../data/siteData'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../utils/cn'

function LogoMark() {
  return (
    <a href="#home" className="group flex items-center" aria-label="Brand Catapult home">
      <img
        src={assets.headerLogo}
        alt="Brand Catapult"
        className="h-9 w-auto object-contain sm:h-11"
        loading="eager"
      />
    </a>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeId = useActiveSection(navItems)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
        isScrolled
          ? 'border-b border-black/5 bg-white/85 shadow-[0_12px_40px_rgba(16,16,16,0.05)] backdrop-blur-lg'
          : 'bg-transparent',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12',
          isScrolled ? 'h-16 lg:h-20' : 'h-24 lg:h-28',
        )}
        aria-label="Primary navigation"
      >
        <LogoMark />

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item, index) => (
            <div key={item.id} className="flex items-center gap-7">
              <a
                href={item.href}
                className={cn(
                  'text-[12px] font-bold uppercase tracking-[0.22em] transition',
                  activeId === item.id ? 'text-cat-red' : 'text-cat-muted hover:text-cat-red',
                )}
              >
                {item.label}
              </a>
              {index < navItems.length - 1 ? <span className="h-1.5 w-1.5 rounded-full bg-cat-red" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <PillButton href="#culture" variant="dark" className="h-10 px-6">
            Join the team
          </PillButton>
          <PillButton href="#contact" className="h-10 px-6">
            Contact
          </PillButton>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cat-dark text-white transition hover:bg-cat-red lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      <div
        className={cn(
          'grid overflow-hidden bg-white shadow-[0_24px_48px_rgba(17,17,17,0.1)] transition-all duration-300 lg:hidden',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="space-y-1 px-5 pb-6 sm:px-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'block border-b border-black/5 py-4 text-sm font-bold uppercase tracking-[0.18em]',
                  activeId === item.id ? 'text-cat-red' : 'text-cat-ink',
                )}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              <PillButton href="#culture" variant="dark" onClick={closeMenu}>
                Join the team
              </PillButton>
              <PillButton href="#contact" onClick={closeMenu}>
                Contact
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
