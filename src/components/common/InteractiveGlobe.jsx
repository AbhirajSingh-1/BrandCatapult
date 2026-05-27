import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { worldLandDots } from '../../data/worldLandDots'
import { projectGlobePoint } from '../../utils/globeProjection'

const countries = [
  { name: 'INDIA', lat: 22.9, lon: 78.9 },
  { name: 'USA', lat: 39.5, lon: -98.4 },
  { name: 'JAPAN', lat: 36.2, lon: 138.2 },
  { name: 'GERMANY', lat: 51.1, lon: 10.4 },
  { name: 'BRAZIL', lat: -14.2, lon: -51.9 },
  { name: 'AUSTRALIA', lat: -25.3, lon: 133.8 },
  { name: 'CANADA', lat: 56.1, lon: -106.3 },
  { name: 'UK', lat: 55.4, lon: -3.4 },
  { name: 'FRANCE', lat: 46.2, lon: 2.2 },
  { name: 'CHINA', lat: 35.9, lon: 104.2 },
  { name: 'MEXICO', lat: 23.6, lon: -102.6 },
  { name: 'SOUTH AFRICA', lat: -30.6, lon: 22.9 },
  { name: 'UAE', lat: 23.4, lon: 53.8 },
  { name: 'SINGAPORE', lat: 1.4, lon: 103.8 },
  { name: 'NIGERIA', lat: 9.1, lon: 8.7 },
  { name: 'ARGENTINA', lat: -38.4, lon: -63.6 },
  { name: 'ITALY', lat: 41.9, lon: 12.6 },
  { name: 'SPAIN', lat: 40.5, lon: -3.7 },
  { name: 'INDONESIA', lat: -0.8, lon: 113.9 },
  { name: 'TURKEY', lat: 38.9, lon: 35.2 },
]

// Target 30fps for auto-rotation (16ms = 60fps, 33ms = 30fps)
const FRAME_INTERVAL = 33

export default function InteractiveGlobe() {
  const canvasRef  = useRef(null)
  const wrapperRef = useRef(null)
  const activeRef  = useRef('')
  const stateRef   = useRef({
    rotationLon: -78,
    rotationLat: -3,
    velocityLon: 0,
    velocityLat: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    idleUntil: 0,
    lastLabelUpdate: 0,
    lastFrameTime: 0,
    lastDrawnLon: null,
    lastDrawnLat: null,
  })

  // Pre-convert to plain arrays once — avoids object property lookups per frame
  const points = useMemo(
    () => worldLandDots.map(([lat, lon]) => [lat, lon]),
    [],
  )

  const [label, setLabel] = useState({ name: 'INDIA', x: 0, y: 0, visible: false })
  const labelRef = useRef(label)
  useEffect(() => { labelRef.current = label }, [label])

  useEffect(() => {
    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return undefined

    const ctx = canvas.getContext('2d', { alpha: true })
    let frameId = 0
    let size = 0
    let dpr  = 1

    // Cache the gradient — recreate only on resize
    let cachedGradient = null

    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      size = Math.max(260, Math.floor(Math.min(rect.width, rect.height || rect.width)))
      dpr  = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = Math.floor(size * dpr)
      canvas.height = Math.floor(size * dpr)
      canvas.style.width  = `${size}px`
      canvas.style.height = `${size}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cachedGradient = null // invalidate on resize
      stateRef.current.lastDrawnLon = null // force redraw
    }

    const updateLabel = (time, center, radius) => {
      if (time - stateRef.current.lastLabelUpdate < 120) return
      stateRef.current.lastLabelUpdate = time

      let best = null
      for (let i = 0; i < countries.length; i++) {
        const c = countries[i]
        const p = projectGlobePoint(c.lat, c.lon, stateRef.current.rotationLon, stateRef.current.rotationLat, radius, center)
        if (p.z > 0.15 && (!best || p.z > best.z)) {
          best = { name: c.name, x: p.x, y: p.y, z: p.z }
        }
      }

      if (!best) {
        if (activeRef.current) {
          activeRef.current = ''
          setLabel(cur => ({ ...cur, visible: false }))
        }
        return
      }

      const labelW = 110
      const next = {
        name: best.name,
        x: Math.min(size - labelW, Math.max(0, best.x - labelW / 2)),
        y: Math.min(size - 36,    Math.max(0, best.y - 18)),
        visible: true,
      }
      const cur = labelRef.current
      if (
        activeRef.current !== next.name ||
        Math.abs(cur.x - next.x) > 4 ||
        Math.abs(cur.y - next.y) > 4 ||
        cur.visible !== next.visible
      ) {
        activeRef.current = next.name
        setLabel(next)
      }
    }

    const draw = (time) => {
      frameId = window.requestAnimationFrame(draw)

      const state  = stateRef.current
      const now    = Date.now()

      // ── Physics update (always runs) ──────────────────────────────────────
      if (!state.dragging) {
        const autoSpin = now > state.idleUntil ? 0.12 : 0
        state.rotationLon += autoSpin + state.velocityLon
        state.rotationLat += state.velocityLat
        state.velocityLon *= 0.94
        state.velocityLat *= 0.90
        state.rotationLat  = Math.max(-28, Math.min(28, state.rotationLat))
      }

      // ── Frame-rate throttle: skip render if not enough time has passed ────
      // During drag we render every frame for responsiveness
      const elapsed = time - state.lastFrameTime
      if (!state.dragging && elapsed < FRAME_INTERVAL) return
      state.lastFrameTime = time

      // ── Skip redraw if rotation hasn't changed meaningfully ───────────────
      const lonDelta = Math.abs(state.rotationLon - (state.lastDrawnLon ?? state.rotationLon + 999))
      const latDelta = Math.abs(state.rotationLat - (state.lastDrawnLat ?? state.rotationLat + 999))
      if (!state.dragging && lonDelta < 0.05 && latDelta < 0.01) {
        updateLabel(time, size / 2, size * 0.43)
        return
      }
      state.lastDrawnLon = state.rotationLon
      state.lastDrawnLat = state.rotationLat

      const center = size / 2
      const radius = size * 0.43

      // ── Background ────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, size, size)
      ctx.save()
      ctx.beginPath()
      ctx.arc(center, center, radius, 0, Math.PI * 2)
      ctx.clip()

      if (!cachedGradient) {
        cachedGradient = ctx.createRadialGradient(
          center - radius * 0.36, center - radius * 0.42, radius * 0.08,
          center, center, radius,
        )
        cachedGradient.addColorStop(0,    'rgba(255,255,255,0.98)')
        cachedGradient.addColorStop(0.66, 'rgba(255,255,255,0.94)')
        cachedGradient.addColorStop(1,    'rgba(240,240,240,0.76)')
      }
      ctx.fillStyle = cachedGradient
      ctx.fillRect(center - radius, center - radius, radius * 2, radius * 2)

      // ── Land dots — batched into 2 paths by color zone ───────────────────
      // Batching: instead of arc+fill per dot, collect all dots of same color
      // into a single path and fill once. Reduces draw calls from N to ~2.
      const dotR     = Math.max(0.72, radius * 0.00315 * 1.4)
      const redPath  = new Path2D()
      const grayPath = new Path2D()

      for (let i = 0; i < points.length; i++) {
        const [lat, lon] = points[i]
        const p = projectGlobePoint(lat, lon, state.rotationLon, state.rotationLat, radius, center)
        if (p.z <= -0.22) continue
        const r = Math.max(0.72, radius * 0.00315 * (0.82 + Math.max(0, Math.min(1, (p.z + 0.22) / 1.22))))
        if (p.z > 0.16) {
          redPath.moveTo(p.x + r, p.y)
          redPath.arc(p.x, p.y, r, 0, Math.PI * 2)
        } else {
          grayPath.moveTo(p.x + r, p.y)
          grayPath.arc(p.x, p.y, r, 0, Math.PI * 2)
        }
      }

      ctx.fillStyle = 'rgba(207,36,54,0.72)'
      ctx.fill(redPath)
      ctx.fillStyle = 'rgba(204,204,204,0.22)'
      ctx.fill(grayPath)

      // ── Country marker dots ───────────────────────────────────────────────
      for (let i = 0; i < countries.length; i++) {
        const c = countries[i]
        const p = projectGlobePoint(c.lat, c.lon, state.rotationLon, state.rotationLat, radius, center)
        if (p.z <= 0.05) continue
        const alpha = Math.min(1, (p.z - 0.05) / 0.4)
        const mr = radius * 0.022
        ctx.beginPath()
        ctx.arc(p.x, p.y, mr, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(207,36,54,${alpha})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 0.012, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }

      ctx.restore()

      // ── Border ring ───────────────────────────────────────────────────────
      ctx.beginPath()
      ctx.arc(center, center, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(207,36,54,0.08)'
      ctx.lineWidth = 1
      ctx.stroke()

      updateLabel(time, center, radius)
    }

    const handlePointerDown = (e) => {
      stateRef.current.dragging  = true
      stateRef.current.lastX     = e.clientX
      stateRef.current.lastY     = e.clientY
      stateRef.current.velocityLon = 0
      stateRef.current.velocityLat = 0
      canvas.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e) => {
      const state = stateRef.current
      if (!state.dragging) return
      const dx = e.clientX - state.lastX
      const dy = e.clientY - state.lastY
      state.rotationLon += dx * 0.24
      state.rotationLat  = Math.max(-28, Math.min(28, state.rotationLat + dy * 0.16))
      state.velocityLon  = dx * 0.018
      state.velocityLat  = dy * 0.01
      state.lastX = e.clientX
      state.lastY = e.clientY
    }

    const handlePointerUp = (e) => {
      stateRef.current.dragging  = false
      stateRef.current.idleUntil = Date.now() + 2400
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
    }

    resize()
    frameId = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointerdown',  handlePointerDown)
    canvas.addEventListener('pointermove',  handlePointerMove)
    canvas.addEventListener('pointerup',    handlePointerUp)
    canvas.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown',  handlePointerDown)
      canvas.removeEventListener('pointermove',  handlePointerMove)
      canvas.removeEventListener('pointerup',    handlePointerUp)
      canvas.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [points])

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto aspect-square w-full max-w-[630px] touch-none select-none"
      aria-label="Interactive dotted world globe"
    >
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      <motion.span
        key={label.name}
        className="pointer-events-none absolute left-0 top-0 rounded-full bg-cat-dark px-5 py-2 text-base font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_38px_rgba(0,0,0,0.18)] sm:px-7 sm:text-xl"
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: label.visible ? 1 : 0, scale: label.visible ? 1 : 0.86, x: label.x, y: label.y }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {label.name}
      </motion.span>
    </div>
  )
}
