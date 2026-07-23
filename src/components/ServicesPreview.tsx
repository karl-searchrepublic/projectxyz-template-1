import Link from 'next/link'

import { ServiceCard } from '@/components/ServiceCard'
import { Button } from '@/components/ui/button'
import type { Service } from '@/payload-types'

export function ServicesPreview({
  heading,
  subtext,
  services,
  viewAllLabel,
  readMoreLabel,
}: {
  heading?: string | null
  subtext?: string | null
  services: Service[]
  viewAllLabel?: string | null
  readMoreLabel?: string | null
}) {
  if (services.length === 0) return null

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-section-y">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
          {heading && <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>}
          {subtext && <p className="text-muted-foreground">{subtext}</p>}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              description={service.subtext}
              href={`/services/${service.slug}`}
              icon={service.icon}
              key={service.id}
              readMoreLabel={readMoreLabel}
              title={service.title}
            />
          ))}
        </div>

        {viewAllLabel && (
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/services">{viewAllLabel}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
