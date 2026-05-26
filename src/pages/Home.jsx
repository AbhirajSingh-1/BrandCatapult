import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Intro from '../components/sections/Intro'
import WorkShowcase from '../components/sections/WorkShowcase'
import Approach from '../components/sections/Approach'
import Services from '../components/sections/Services'
import MotionStats from '../components/sections/MotionStats'
import ClientLogos from '../components/sections/ClientLogos'
import Culture from '../components/sections/Culture'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <WorkShowcase />
        <Approach />
        <Services />
        <MotionStats />
        <ClientLogos />
        <Culture />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
