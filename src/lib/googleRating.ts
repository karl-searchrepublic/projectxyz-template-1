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
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      console.error(
        `[getGooglePlaceDetails] Places API request failed (${response.status}): ${await response.text()}`,
      )
      return null
    }

    const data = await response.json()
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') {
      console.error('[getGooglePlaceDetails] Unexpected response shape:', JSON.stringify(data))
      return null
    }

    const reviewsWithPublishTime: Array<GoogleReview & { publishTime: string }> = Array.isArray(
      data.reviews,
    )
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
            publishTime: (review.publishTime as string) ?? '',
          }
        })
      : []

    // Google doesn't offer a "sort by newest" request param on this endpoint —
    // sort client-side by publish time instead so "recent reviews" is accurate.
    // Also drop 1-3 star reviews — the API only ever returns up to 5 reviews
    // total (no pagination), so this can reduce that further, not backfill it.
    const reviews: GoogleReview[] = reviewsWithPublishTime
      .filter((review) => review.rating >= 4)
      .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
      .map(({ publishTime, ...review }) => {
        void publishTime
        return review
      })

    return {
      rating: data.rating,
      reviewCount: data.userRatingCount,
      mapsUri: data.googleMapsUri,
      reviews,
    }
  } catch (err) {
    console.error(
      '[getGooglePlaceDetails] Request threw:',
      err instanceof Error ? err.message : err,
    )
    return null
  }
}
