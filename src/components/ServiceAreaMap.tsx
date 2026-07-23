'use client'

import { useEffect, useRef } from 'react'

import { loadGoogleMaps } from '@/lib/googleMaps'

export function ServiceAreaMap({
  latitude,
  longitude,
  radiusKm,
}: {
  latitude?: number | null
  longitude?: number | null
  radiusKm?: number | null
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!latitude || !longitude || !radiusKm || !containerRef.current) return

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) return

    let cancelled = false

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !containerRef.current) return

        const center = { lat: latitude, lng: longitude }
        const map = new google.maps.Map(containerRef.current, {
          center,
          zoom: 11,
          disableDefaultUI: true,
          zoomControl: true,
        })

        const accentColor =
          getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() ||
          '#f5f5f5'

        const circle = new google.maps.Circle({
          map,
          center,
          radius: radiusKm * 1000,
          fillColor: accentColor,
          fillOpacity: 0.25,
          strokeColor: accentColor,
          strokeOpacity: 0.9,
          strokeWeight: 2,
        })

        const bounds = circle.getBounds()
        if (bounds) {
          map.fitBounds(bounds)
          google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
            const zoom = map.getZoom()
            if (zoom !== undefined) map.setZoom(zoom + 1)
          })
        }
      })
      .catch((err) => {
        console.warn('[ServiceAreaMap] failed to load Google Maps:', err)
      })

    return () => {
      cancelled = true
    }
  }, [latitude, longitude, radiusKm])

  if (!latitude || !longitude || !radiusKm) return null

  return <div className="h-full min-h-[320px] w-full" ref={containerRef} />
}
