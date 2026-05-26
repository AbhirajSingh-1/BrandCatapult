import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'

function HashScroller() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace('#', '')
      if (!id) return

      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' })
      })
    }

    const timer = window.setTimeout(scrollToHash, 0)
    window.addEventListener('hashchange', scrollToHash)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  return null
}

export default function App() {
  return (
    <>
      <HashScroller />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
