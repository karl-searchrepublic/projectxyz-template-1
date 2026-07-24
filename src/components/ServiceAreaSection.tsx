import { Chip } from '@/components/Chip'
import { ServiceAreaMap } from '@/components/ServiceAreaMap'
import { cn } from '@/lib/utils'

export function ServiceAreaSection({
  heading,
  radiusKm,
  areaLabel,
  suburbs,
  latitude,
  longitude,
  background = 'background',
}: {
  heading?: string | null
  radiusKm?: number | null
  areaLabel?: string | null
  suburbs: Array<{ id?: string | null; name: string }>
  latitude?: number | null
  longitude?: number | null
  background?: 'background' | 'accent'
}) {
  const hasSuburbs = suburbs.length > 0
  const hasMap = Boolean(latitude && longitude)

  if (!hasSuburbs && !hasMap) return null

  return (
    <section
      className={cn(
        'border-t border-border',
        background === 'accent' ? 'bg-accent' : 'bg-background',
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-section-y">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {hasSuburbs && (
            <div className={hasMap ? 'lg:col-span-2' : 'lg:col-span-5'}>
              <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {heading || 'Where We Service'}
              </h2>
              {radiusKm && areaLabel && (
                <p className="mb-6 text-muted-foreground">
                  Servicing within {radiusKm}km of {areaLabel}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {suburbs.map((suburb) => (
                  <Chip
                    background={background}
                    key={suburb.id ?? suburb.name}
                    label={suburb.name}
                  />
                ))}
              </div>
            </div>
          )}

          {hasMap && (
            <div className={hasSuburbs ? 'lg:col-span-3' : 'lg:col-span-5'}>
              <div className="min-h-[320px] overflow-hidden rounded-xl border border-border">
                <ServiceAreaMap latitude={latitude} longitude={longitude} radiusKm={radiusKm} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
