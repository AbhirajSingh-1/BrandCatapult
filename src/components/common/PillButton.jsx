import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

const variants = {
  red: 'bg-cat-red text-white hover:bg-[#b91e30] focus-visible:outline-cat-red',
  dark: 'bg-cat-dark text-white hover:bg-black focus-visible:outline-cat-dark',
  light: 'bg-white text-cat-red hover:bg-cat-soft focus-visible:outline-white',
}

export default function PillButton({
  children,
  href,
  className = '',
  variant = 'red',
  withIcon = false,
  type = 'button',
  onClick,
  disabled = false,
}) {
  const classes = `inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-70 ${variants[variant]} ${className}`

  const motionProps = {
    whileHover: { scale: 1.045 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} onClick={onClick} {...motionProps}>
        <span>{children}</span>
        {withIcon ? <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.6} /> : null}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} className={classes} onClick={onClick} disabled={disabled} {...motionProps}>
      <span>{children}</span>
      {withIcon ? <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.6} /> : null}
    </motion.button>
  )
}
