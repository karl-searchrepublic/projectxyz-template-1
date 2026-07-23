let mapsPromise: Promise<void> | null = null

/**
 * Loads the Google Maps JS SDK once and caches the promise, so mounting
 * multiple map components on a page (or remounting one) doesn't inject
 * the script tag more than once.
 */
export function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.google?.maps) return Promise.resolve()

  if (!mapsPromise) {
    mapsPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        mapsPromise = null
        reject(new Error('Failed to load Google Maps script'))
      }
      document.head.appendChild(script)
    })
  }

  return mapsPromise
}
