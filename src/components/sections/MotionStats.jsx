import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import SectionReveal from '../common/SectionReveal'
import { stats } from '../../data/siteData'
import { worldLandDots } from '../../data/worldLandDots'

const countries = [
  { name: 'INDIA', lat: 22.9, lon: 78.9 },
  { name: 'USA', lat: 39.5, lon: -98.4 },
  { name: 'JAPAN', lat: 37.7, lon: 138.2 },
  { name: 'GERMANY', lat: 51.1, lon: 10.4 },
]

const decorativeDots = [
  'left-[10%] top-4 h-8 w-8 bg-[#9b7ad8]',
  'right-[14%] top-0 h-4 w-4 bg-cat-red',
  'left-[23%] top-[-34px] h-2.5 w-2.5 bg-[#ffcf3c]',
  'right-[8%] top-28 h-2.5 w-2.5 bg-[#9cdd98]',
  'left-[19%] top-40 h-4 w-4 bg-[#7fd4ec]',
  'right-[24%] top-56 h-2.5 w-2.5 bg-[#86a9ed]',
]

function createGlobePoints() {
  return worldLandDots.map(([lat, lon]) => ({ lat, lon }))
}

function projectPoint(lat, lon, rotationLon, rotationLat, radius, center) {
  const phi = (lat * Math.PI) / 180
  const lambda = ((lon + rotationLon) * Math.PI) / 180
  const tilt = (rotationLat * Math.PI) / 180
  const cosPhi = Math.cos(phi)

  const x = radius * cosPhi * Math.sin(lambda)
  const rawY = -radius * Math.sin(phi)
  const rawZ = radius * cosPhi * Math.cos(lambda)
  const y = rawY * Math.cos(tilt) - rawZ * Math.sin(tilt)
  const z = rawY * Math.sin(tilt) + rawZ * Math.cos(tilt)

  return {
    x: center + x,
    y: center + y,
    z: z / radius,
    rawX: x,
    rawY: y,
  }
}

function DottedGlobe() {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const activeRef = useRef('')
  const stateRef = useRef({
    rotationLon: -78,
    rotationLat: -3,
    velocityLon: 0,
    velocityLat: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    idleUntil: 0,
    lastLabelUpdate: 0,
  })
  const points = useMemo(() => createGlobePoints(), [])
  const [label, setLabel] = useState({ name: 'INDIA', x: 0, y: 0, visible: false })
  const labelRef = useRef(label)

  useEffect(() => {
    labelRef.current = label
  }, [label])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    let frameId = 0
    let size = 0
    let dpr = 1

    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      size = Math.max(260, Math.floor(Math.min(rect.width, rect.height || rect.width)))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(size * dpr)
      canvas.height = Math.floor(size * dpr)
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const updateLabel = (time, center, radius) => {
      if (time - stateRef.current.lastLabelUpdate < 80) return
      stateRef.current.lastLabelUpdate = time

      let best = null
      countries.forEach((country) => {
        const projected = projectPoint(
          country.lat,
          country.lon,
          stateRef.current.rotationLon,
          stateRef.current.rotationLat,
          radius,
          center,
        )
        const distance = Math.hypot(projected.rawX, projected.rawY * 0.82)

        if (projected.z > 0.42 && (!best || distance < best.distance)) {
          best = { country, projected, distance }
        }
      })

      if (!best) {
        if (activeRef.current) {
          activeRef.current = ''
          setLabel((current) => ({ ...current, visible: false }))
        }
        return
      }

      const next = {
        name: best.country.name,
        x: Math.min(size - 92, Math.max(18, best.projected.x + radius * 0.44)),
        y: Math.min(size - 28, Math.max(28, best.projected.y + radius * 0.02)),
        visible: true,
      }

      const currentLabel = labelRef.current

      if (
        activeRef.current !== next.name ||
        Math.abs(currentLabel.x - next.x) > 4 ||
        Math.abs(currentLabel.y - next.y) > 4 ||
        currentLabel.visible !== next.visible
      ) {
        activeRef.current = next.name
        setLabel(next)
      }
    }

    const draw = (time) => {
      const state = stateRef.current
      const center = size / 2
      const radius = size * 0.43

      if (!state.dragging) {
        if (Date.now() > state.idleUntil) {
          state.rotationLon += 0.045 + state.velocityLon
          state.rotationLat += state.velocityLat
        } else {
          state.rotationLon += state.velocityLon
          state.rotationLat += state.velocityLat
        }

        state.velocityLon *= 0.94
        state.velocityLat *= 0.9
        state.rotationLat = Math.max(-28, Math.min(28, state.rotationLat))
      }

      context.clearRect(0, 0, size, size)
      context.save()
      context.beginPath()
      context.arc(center, center, radius, 0, Math.PI * 2)
      context.clip()
      context.fillStyle = '#ffffff'
      context.fillRect(center - radius, center - radius, radius * 2, radius * 2)

      const gradient = context.createRadialGradient(center - radius * 0.36, center - radius * 0.42, radius * 0.08, center, center, radius)
      gradient.addColorStop(0, 'rgba(255,255,255,0.98)')
      gradient.addColorStop(0.66, 'rgba(255,255,255,0.94)')
      gradient.addColorStop(1, 'rgba(240,240,240,0.76)')
      context.fillStyle = gradient
      context.fillRect(center - radius, center - radius, radius * 2, radius * 2)

      points.forEach((point) => {
        const projected = projectPoint(point.lat, point.lon, state.rotationLon, state.rotationLat, radius, center)
        if (projected.z <= -0.22) return

        const depth = Math.max(0, Math.min(1, (projected.z + 0.22) / 1.22))
        const dotRadius = Math.max(0.72, radius * 0.00315 * (0.82 + depth))
        const redAlpha = 0.2 + depth * 0.82
        const greyAlpha = 0.08 + depth * 0.28

        context.beginPath()
        context.arc(projected.x, projected.y, dotRadius, 0, Math.PI * 2)
        context.fillStyle = projected.z > 0.16 ? `rgba(207,36,54,${redAlpha})` : `rgba(204,204,204,${greyAlpha})`
        context.fill()
      })

      context.restore()
      context.beginPath()
      context.arc(center, center, radius, 0, Math.PI * 2)
      context.strokeStyle = 'rgba(207,36,54,0.08)'
      context.lineWidth = 1
      context.stroke()

      updateLabel(time, center, radius)
      frameId = window.requestAnimationFrame(draw)
    }

    const handlePointerDown = (event) => {
      stateRef.current.dragging = true
      stateRef.current.lastX = event.clientX
      stateRef.current.lastY = event.clientY
      stateRef.current.velocityLon = 0
      stateRef.current.velocityLat = 0
      canvas.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event) => {
      const state = stateRef.current
      if (!state.dragging) return

      const deltaX = event.clientX - state.lastX
      const deltaY = event.clientY - state.lastY
      state.rotationLon += deltaX * 0.24
      state.rotationLat = Math.max(-28, Math.min(28, state.rotationLat + deltaY * 0.16))
      state.velocityLon = deltaX * 0.018
      state.velocityLat = deltaY * 0.01
      state.lastX = event.clientX
      state.lastY = event.clientY
    }

    const handlePointerUp = (event) => {
      stateRef.current.dragging = false
      stateRef.current.idleUntil = Date.now() + 2400
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
    }

    resize()
    frameId = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [points])

  return (
    <div ref={wrapperRef} className="relative mx-auto aspect-square w-full max-w-[630px] touch-none select-none" aria-label="Interactive dotted world globe">
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      <motion.span
        key={label.name}
        className="pointer-events-none absolute left-0 top-0 rounded-full bg-cat-dark px-5 py-2 text-base font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_38px_rgba(0,0,0,0.18)] sm:px-7 sm:text-xl"
        initial={{ opacity: 0, scale: 0.86, y: 8 }}
        animate={{ opacity: label.visible ? 1 : 0, scale: label.visible ? 1 : 0.86, x: label.x, y: label.y }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {label.name}
      </motion.span>
    </div>
  )
}

export default function MotionStats() {
  return (
    <SectionReveal className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="px-5 sm:px-8 lg:px-14">
        <div className="relative mb-20 text-center sm:mb-24">
          {decorativeDots.map((dot) => (
            <span key={dot} className={`absolute rounded-full ${dot}`} aria-hidden="true" />
          ))}
          <span className="absolute left-[24%] top-[56%] hidden h-1 w-64 rounded-full bg-[#9fbaff] sm:block" aria-hidden="true" />
          <span className="absolute right-[18%] top-[38%] hidden h-1 w-44 rounded-full bg-[#ffd346] sm:block" aria-hidden="true" />
          <h2 className="mx-auto max-w-4xl text-[clamp(3rem,8vw,6.4rem)] font-light uppercase leading-[1.02] text-[#676767]">
            We Partner
            <span className="block">With People</span>
            <span className="block">In Motion</span>
          </h2>
          <p className="mx-auto mt-10 max-w-md text-base leading-relaxed text-[#858585] sm:text-xl">
            Founders with conviction, teams feeling the stretch, ideas too big to stay small.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="space-y-16 sm:space-y-20">
            {stats.map((stat) => (
              <div key={stat.value} className="grid gap-5 sm:grid-cols-[250px_1fr] sm:items-start lg:grid-cols-[320px_1fr]">
                <p className="text-[clamp(5rem,11vw,8.5rem)] font-light leading-none text-cat-red">{stat.value}</p>
                <p className="max-w-sm text-xl leading-snug text-[#808080] sm:pt-4 sm:text-2xl">{stat.copy}</p>
              </div>
            ))}
          </div>

          <DottedGlobe />
        </div>
      </div>
    </SectionReveal>
  )
}
