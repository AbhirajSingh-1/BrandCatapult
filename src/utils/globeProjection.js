export function projectGlobePoint(lat, lon, rotationLon, rotationLat, radius, center) {
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
