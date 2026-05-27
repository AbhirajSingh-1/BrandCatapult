import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PillButton from '../common/PillButton'
import { navItems, assets } from '../../data/siteData'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../utils/cn'

function LogoMark() {
  return (
    <motion.a
      href="#home"
      className="group flex items-center"
      aria-label="Brand Catapult home"
      whileHover={{ scale: 1.05, rotateZ: -1.5 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18 }}
    >
      <img
        src={assets.headerLogo}
        alt="Brand Catapult"
        className="h-9 w-auto object-contain sm:h-11"
        loading="eager"
      />
    </motion.a>
  )
}

/* Animated dot separator — brightens when either neighbour is hovered */
function NavDot({ leftHovered, rightHovered }) {
  const active = leftHovered || rightHovered
  return (
    <motion.span
      className="rounded-full bg-cat-red"
      animate={{
        width:   active ? 8  : 6,
        height:  active ? 8  : 6,
        opacity: active ? 1  : 0.55,
        scale:   active ? 1.3 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      aria-hidden="true"
    />
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredId, setHoveredId]  = useState(null)   // ← track which link is hovered
  const activeId = useActiveSection(navItems)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <motion.header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
        isScrolled
          ? 'border-b border-black/5 bg-white/85 shadow-[0_12px_40px_rgba(16,16,16,0.05)] backdrop-blur-lg'
          : 'bg-transparent',
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12',
          isScrolled ? 'h-16 lg:h-20' : 'h-24 lg:h-28',
        )}
        aria-label="Primary navigation"
      >
        <LogoMark />

        {/* ── Desktop nav ── */}
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item, index) => {
            const isActive   = activeId  === item.id
            const isHovered  = hoveredId === item.id
            const prevItem   = navItems[index - 1]
            const isRightOfHovered = prevItem && hoveredId === prevItem.id

            return (
              <div key={item.id} className="flex items-center gap-7">
                {/* ── Nav link with sliding underline ── */}
                <motion.a
                  href={item.href}
                  className={cn(
                    'relative pb-0.5 text-[12px] font-bold uppercase transition-colors duration-200',
                    isActive || isHovered
                      ? 'text-cat-red'
                      : 'text-cat-muted hover:text-cat-red',
                  )}
                  onHoverStart={() => setHoveredId(item.id)}
                  onHoverEnd={()   => setHoveredId(null)}
                  /* Subtle letter-spacing expansion on hover */
                  animate={{
                    letterSpacing: isHovered ? '0.28em' : '0.22em',
                    y: isHovered ? -2 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                >
                  {item.label}

                  {/* Sliding underline — shared layoutId so it glides between links */}
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full bg-cat-red"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      style={{ originX: 0 }}
                    />
                  )}
                </motion.a>

                {/* Reactive dot separator */}
                {index < navItems.length - 1 && (
                  <NavDot
                    leftHovered={hoveredId === item.id}
                    rightHovered={isRightOfHovered}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* ── CTA buttons ── */}
        <div className="hidden items-center gap-4 lg:flex">
          <PillButton href="#culture" variant="dark" className="h-10 px-6">
            Join the team
          </PillButton>
          <PillButton href="#contact" className="h-10 px-6">
            Contact
          </PillButton>
        </div>

        {/* ── Hamburger — springs to red bg on hover ── */}
        <motion.button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition lg:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          style={{ backgroundColor: '#111' }}
          whileHover={{ backgroundColor: '#cf2436', scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{   rotate:  90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {isOpen
                ? <X    size={22} aria-hidden="true" />
                : <Menu size={22} aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overflow-hidden bg-white shadow-[0_24px_48px_rgba(17,17,17,0.1)] lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{   height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-1 px-5 pb-6 sm:px-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'group relative block overflow-hidden border-b border-black/5 py-4 text-sm font-bold uppercase tracking-[0.18em]',
                    activeId === item.id ? 'text-cat-red' : 'text-cat-ink',
                  )}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ x: 6, color: '#cf2436' }}
                >
                  {/* Red left-border accent that slides in on hover */}
                  <motion.span
                    className="absolute left-0 top-0 h-full w-[3px] rounded-r-full bg-cat-red"
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileHover={{ scaleY: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    style={{ originY: 0.5 }}
                  />
                  {item.label}
                </motion.a>
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}