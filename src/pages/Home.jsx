import PageLayout from '../components/layout/PageLayout'
import Approach from '../components/sections/Approach'
import ClientLogos from '../components/sections/ClientLogos'
import Contact from '../components/sections/Contact'
import Culture from '../components/sections/Culture'
import Hero from '../components/sections/Hero'
import Intro from '../components/sections/Intro'
import MotionStats from '../components/sections/MotionStats'
import Services from '../components/sections/Services'
import WorkShowcase from '../components/sections/WorkShowcase'

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Intro />
      <WorkShowcase />
      <Approach />
      <Services />
      <MotionStats />
      <ClientLogos />
      <Culture />
      <Contact />
    </PageLayout>
  )
}
