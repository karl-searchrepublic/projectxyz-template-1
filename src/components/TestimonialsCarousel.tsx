'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { GooglePlaceDetails } from '@/lib/googleRating'

export function TestimonialsCarousel({
  heading,
  reviews,
  placeDetails,
  showReviewsPill,
  background = 'background',
}: {
  heading?: string | null
  reviews: GooglePlaceDetails['reviews']
  placeDetails?: GooglePlaceDetails | null
  showReviewsPill?: boolean | null
  background?: 'background' | 'accent'
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (reviews.length === 0) return null

  const hasRatingPill = Boolean(
    showReviewsPill && placeDetails?.rating && placeDetails?.reviewCount,
  )
  const hasReviewLink = Boolean(showReviewsPill && placeDetails?.mapsUri)

  const scrollByCard = (direction: 1 | -1) => {
    const container = scrollRef.current
    if (!container) return

    const card = container.querySelector<HTMLElement>('[data-testimonial-card]')
    const amount = (card?.offsetWidth ?? 320) + 24
    container.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  return (
    <section
      className={cn(
        'border-t border-border',
        background === 'accent' ? 'bg-accent' : 'bg-background',
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-section-y">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {heading || 'What Our Customers Say'}
            </h2>
            {(hasRatingPill || hasReviewLink) && (
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                {hasRatingPill && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                    <Star className="size-4 fill-current text-primary" />
                    {placeDetails!.rating.toFixed(1)} · {placeDetails!.reviewCount} Google Reviews
                  </span>
                )}
                {hasReviewLink && (
                  <a
                    className="text-sm font-medium text-muted-foreground underline"
                    href={placeDetails!.mapsUri}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Read all our reviews →
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <Button
              aria-label="Previous review"
              onClick={() => scrollByCard(-1)}
              size="icon"
              variant="outline"
            >
              <ChevronLeft />
            </Button>
            <Button
              aria-label="Next review"
              onClick={() => scrollByCard(1)}
              size="icon"
              variant="outline"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={scrollRef}
        >
          {reviews.map((review) => (
            <Card
              className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
              data-testimonial-card
              key={review.id}
            >
              <CardContent className="flex h-full flex-col gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      className={
                        i < review.rating
                          ? 'size-4 fill-current text-primary'
                          : 'size-4 text-muted-foreground'
                      }
                      key={i}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
                <div className="mt-auto flex items-center gap-3 pt-2">
                  {review.authorPhotoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element -- external Google-hosted avatar, not a local/Payload asset
                    <img
                      alt={review.authorName}
                      className="size-9 rounded-full"
                      src={review.authorPhotoUrl}
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{review.authorName}</p>
                    <p className="text-xs text-muted-foreground">{review.relativeTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
