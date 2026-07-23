import { Star } from 'lucide-react'

import type { GooglePlaceDetails } from '@/lib/googleRating'

export function CredentialsStrip({
  heading,
  items,
  googleRating,
}: {
  heading?: string | null
  items: Array<{ id?: string | null; label: string; value: string }>
  googleRating?: GooglePlaceDetails | null
}) {
  if (items.length === 0 && !googleRating) return null

  return (
    <section className="border-t border-border bg-accent">
      <div className="mx-auto max-w-6xl px-6 py-section-y">
        {heading && (
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {heading}
          </h2>
        )}
        {items.length > 0 && (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {items.map((item) => (
              <div
                className="flex flex-col items-center gap-1 text-center"
                key={item.id ?? item.label}
              >
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">{item.value}</span>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        )}
        {googleRating && (
          <div className="mt-8 flex justify-center">
            <a
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium no-underline"
              href={googleRating.mapsUri}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Star className="size-4 fill-current text-primary" />
              {googleRating.rating.toFixed(1)} · {googleRating.reviewCount} Google Reviews
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
