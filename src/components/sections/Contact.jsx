import { useState } from 'react'
import PillButton from '../common/PillButton'
import SectionReveal from '../common/SectionReveal'
import { culturePhotos } from '../../data/siteData'

function Field({ label, type = 'text', className = '', textarea = false }) {
  const controlClasses =
    'w-full border-0 border-b border-white/65 bg-transparent py-3 text-white outline-none transition placeholder:text-white/45 focus:border-white'

  return (
    <label className={`block ${className}`}>
      <span className="text-[13px] font-semibold uppercase tracking-[0.3em] text-white/80">{label}</span>
      {textarea ? <textarea className={`${controlClasses} min-h-24 resize-none`} rows="3" /> : <input type={type} className={controlClasses} />}
    </label>
  )
}

function OrbitSocial() {
  const positions = ['left-[44%] top-0', 'left-[8%] top-[36%]', 'right-[4%] top-[43%]', 'left-[30%] bottom-[3%]', 'right-[22%] top-[20%]']
  const sizes = ['h-20 w-20', 'h-28 w-28', 'h-24 w-24', 'h-16 w-16', 'h-16 w-16']

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      <div className="absolute inset-[10%] rounded-full border border-white/45" />
      <div className="absolute inset-[24%] rounded-full border border-white/45" />
      <div className="absolute inset-[38%] rounded-full border border-white/45" />
      <span className="absolute left-[46%] top-[67%] h-8 w-8 rounded-full bg-[#9fb5ff]" />
      {culturePhotos.slice(1, 6).map((item, index) => (
        <img
          key={item.alt}
          src={item.image}
          alt={item.alt}
          className={`absolute rounded-full object-cover shadow-xl ${positions[index]} ${sizes[index]}`}
          loading="lazy"
        />
      ))}
    </div>
  )
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    window.setTimeout(() => setIsSubmitting(false), 900)
  }

  return (
    <SectionReveal id="contact" className="bg-cat-dark text-white">
      <div className="bg-cat-red px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="max-w-xl text-5xl font-light uppercase leading-none text-white sm:text-7xl lg:text-8xl">
              We Don't
              <span className="block">Chase.</span>
              <span className="block">We Calibrate.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/90">
              If you are thinking big, thinking bold, or thinking finally, you are thinking like us.
            </p>
          </div>

          <form className="grid gap-9" onSubmit={handleSubmit}>
            <Field label="Name" />
            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Email" type="email" />
              <Field label="Phone" type="tel" />
            </div>
            <Field label="Message" textarea />
            <PillButton type="submit" variant="dark" disabled={isSubmitting} className="w-full text-base">
              {isSubmitting ? 'Sending...' : 'Start a conversation'}
            </PillButton>
          </form>
        </div>
      </div>

      <div className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
          <OrbitSocial />
          <div>
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.5em] text-cat-red">Social Presence</p>
            <h2 className="text-6xl font-light uppercase leading-tight text-white/75 sm:text-7xl">
              Spam
              <span className="block">The Gram</span>
            </h2>
            <PillButton href="https://www.instagram.com/brandcatapult/" className="mt-8">
              Follow @brandcatapult
            </PillButton>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
