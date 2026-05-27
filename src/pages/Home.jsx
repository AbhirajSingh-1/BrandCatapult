import { lazy, Suspense } from 'react'
import PageLayout from '../components/layout/PageLayout'
import Hero from '../components/sections/Hero'
import Intro from '../components/sections/Intro'

// Lazy-load all below-the-fold sections — reduces initial JS parse time
const WorkShowcase  = lazy(() => import('../components/sections/WorkShowcase'))
const Approach      = lazy(() => import('../components/sections/Approach'))
const Services      = lazy(() => import('../components/sections/Services'))
const MotionStats   = lazy(() => import('../components/sections/MotionStats'))
const ClientLogos   = lazy(() => import('../components/sections/ClientLogos'))
const Culture       = lazy(() => import('../components/sections/Culture'))
const Contact       = lazy(() => import('../components/sections/Contact'))

// Minimal fallback — invisible spacer keeps layout stable while chunk loads
function SectionFallback() {
  return <div className="min-h-[200px]" aria-hidden="true" />
}

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Intro />
      <Suspense fallback={<SectionFallback />}>
        <WorkShowcase />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Approach />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MotionStats />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ClientLogos />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Culture />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </PageLayout>
  )
}
