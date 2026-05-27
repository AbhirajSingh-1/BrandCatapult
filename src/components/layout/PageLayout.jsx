import Footer from './Footer'
import Navbar from './Navbar'

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-cat-ink">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
