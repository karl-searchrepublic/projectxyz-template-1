export type GoogleReview = {
  id: string
  authorName: string
  authorPhotoUrl?: string
  rating: number
  text: string
  relativeTime: string
}

export type GooglePlaceDetails = {
  rating: number
  reviewCount: number
  mapsUri: string
  reviews: GoogleReview[]
}

/**
 * Fetches the business's aggregate Google rating and up to 5 recent reviews
 * via Places API (New). Cached for a day via Next's fetch cache — this data
 * doesn't need to be live-accurate, and caching avoids hitting Google (and
 * re-serving cached review text past what Google's terms allow) too often.
 */
export async function getGooglePlaceDetails(placeId: string): Promise<GooglePlaceDetails | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) return null

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?reviewsSort=NEWEST`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
        },
        next: { revalidate: 86400 },
      },
    )

    if (!response.ok) return null

    const data = await response.json()
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') return null

    const reviews: GoogleReview[] = Array.isArray(data.reviews)
      ? data.reviews.map((review: Record<string, unknown>, index: number) => {
          const authorAttribution = review.authorAttribution as
            { displayName?: string; photoUri?: string } | undefined
          const text = review.text as { text?: string } | undefined

          return {
            id: (review.name as string) ?? String(index),
            authorName: authorAttribution?.displayName ?? 'Anonymous',
            authorPhotoUrl: authorAttribution?.photoUri,
            rating: (review.rating as number) ?? 0,
            text: text?.text ?? '',
            relativeTime: (review.relativePublishTimeDescription as string) ?? '',
          }
        })
      : []

    return {
      rating: data.rating,
      reviewCount: data.userRatingCount,
      mapsUri: data.googleMapsUri,
      reviews,
    }
  } catch {
    return null
  }
}
