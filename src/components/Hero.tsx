import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { HomePage, Media } from '@/payload-types'

export function Hero({ data, phone }: { data: HomePage['hero']; phone?: string | null }) {
  const image = data.image && typeof data.image === 'object' ? (data.image as Media) : null

  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center lg:col-span-6">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
            {data.headline}
          </h1>
          {data.subtext && (
            <p className="mb-6 text-lg font-light text-muted-foreground lg:mb-8 lg:text-xl">
              {data.subtext}
            </p>
          )}
          {(data.primaryCta?.label || phone) && (
            <div className="flex flex-wrap items-center gap-3">
              {data.primaryCta?.label && data.primaryCta?.href && (
                <Button asChild size="lg" variant="outline">
                  <Link href={data.primaryCta.href}>
                    {data.primaryCta.label}
                    <ArrowRight />
                  </Link>
                </Button>
              )}
              {phone && (
                <Button asChild size="lg">
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
                    <Phone />
                    {phone}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        {image?.url && (
          <div className="hidden items-center lg:col-span-6 lg:flex">
            <div className="w-full overflow-hidden rounded-xl border border-border">
              <Image
                alt={image.alt}
                className="h-auto w-full object-cover"
                height={image.height ?? 400}
                src={image.url}
                width={image.width ?? 400}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
