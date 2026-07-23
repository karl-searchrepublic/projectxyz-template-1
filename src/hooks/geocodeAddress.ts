import type { GlobalBeforeChangeHook } from 'payload'

/**
 * Geocodes the business address once, on save, instead of on every page load.
 * Reuses the same key as the client-side Maps JS SDK (NEXT_PUBLIC_ vars are
 * readable server-side too) — its Application restriction must be "None"
 * rather than "HTTP referrers" for this server-to-server call to succeed.
 */
export const geocodeAddress: GlobalBeforeChangeHook = async ({ data, originalDoc, req }) => {
  const address = data.address as string | undefined

  if (!address) return data
  if (address === originalDoc?.address && originalDoc?.latitude && originalDoc?.longitude) {
    return data
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    req.payload.logger.warn('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set — skipping geocoding')
    return data
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`,
    )
    const json = await response.json()
    const location = json?.results?.[0]?.geometry?.location

    if (location) {
      data.latitude = location.lat
      data.longitude = location.lng
    } else {
      req.payload.logger.warn(`Geocoding returned no results for address: ${address}`)
    }
  } catch (err) {
    req.payload.logger.error(
      `Geocoding request failed: ${err instanceof Error ? err.message : err}`,
    )
  }

  return data
}
