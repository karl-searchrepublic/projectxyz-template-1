export type GoogleRating = {
  rating: number
  reviewCount: number
  mapsUri: string
}

/**
 * Fetches the business's aggregate Google rating via Places API (New).
 * Cached for a day via Next's fetch cache — ratings don't need to be
 * live-accurate, and this avoids hitting Google on every page render.
 */
export async function getGoogleRating(placeId: string): Promise<GoogleRating | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) return null

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri',
      },
      next: { revalidate: 86400 },
    })

    if (!response.ok) return null

    const data = await response.json()
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') return null

    return {
      rating: data.rating,
      reviewCount: data.userRatingCount,
      mapsUri: data.googleMapsUri,
    }
  } catch {
    return null
  }
}
