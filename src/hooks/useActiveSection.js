import { useEffect, useState } from 'react'

export function useActiveSection(items, options = {}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: options.rootMargin ?? '-35% 0px -55% 0px',
        threshold: options.threshold ?? [0.08, 0.18, 0.28],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items, options.rootMargin, options.threshold])

  return activeId
}
