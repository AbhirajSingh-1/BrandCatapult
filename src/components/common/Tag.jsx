import { cn } from '../../utils/cn'

export default function Tag({ children, filled = false, muted = false, className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex min-h-6 items-center justify-center rounded-full border px-3 text-[10px] font-bold uppercase tracking-[0.1em]',
        filled && 'border-cat-red bg-cat-red text-white',
        muted && 'border-white bg-white text-cat-ink',
        !filled && !muted && 'border-white/70 text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}
