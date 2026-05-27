import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function DropdownPill({ label, value, options, open, onToggle, onSelect, className = '' }) {
  return (
    <div className={cn('relative inline-flex', className)}>
      <button
        type="button"
        className="inline-flex h-9 items-center gap-2 rounded-full border border-white/80 bg-white px-5 text-[12px] font-bold uppercase tracking-[0.12em] text-cat-red shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] transition hover:bg-cat-soft"
        onClick={onToggle}
        aria-label={label}
        aria-expanded={open}
      >
        {value}
        <ChevronDown size={13} strokeWidth={3} aria-hidden="true" />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-30 mt-2 min-w-44 overflow-hidden rounded-md border border-white/15 bg-[#202020] py-1 shadow-[0_18px_48px_rgba(0,0,0,0.32)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={cn(
                'block w-full px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] transition',
                option === value ? 'bg-cat-red text-white' : 'text-white/68 hover:bg-white/8 hover:text-white',
              )}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
