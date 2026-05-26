import SectionReveal from '../common/SectionReveal'

export default function Intro() {
  return (
    <SectionReveal id="about" className="relative overflow-hidden bg-cat-soft py-24 sm:py-32">
      <div className="soft-dot-field absolute inset-x-0 top-0 h-full opacity-80" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <p className="text-xl font-light leading-relaxed text-cat-muted sm:text-2xl">
          A growing collective of thinkers, storytellers, designers, and strategists,{' '}
          <span className="font-semibold text-cat-ink">60+ strong, across 9 countries,</span>
          <span className="block font-semibold text-cat-ink">grown steadily over 10+ years</span>
        </p>
      </div>
    </SectionReveal>
  )
}
