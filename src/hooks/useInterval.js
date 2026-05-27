import { useEffect, useRef } from 'react'

export function useInterval(callback, delay) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return undefined

    const id = window.setInterval(() => callbackRef.current(), delay)
    return () => window.clearInterval(id)
  }, [delay])
}
