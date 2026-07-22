import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { HomePage } from '@/payload-types'

export function Hero({ data }: { data: HomePage['hero'] }) {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-8 py-24 text-center sm:py-32">
        {data.eyebrow && (
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            {data.eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {data.headline}
        </h1>
        {data.subtext && (
          <p className="max-w-2xl text-lg text-muted-foreground text-balance">{data.subtext}</p>
        )}
        {(data.primaryCta?.label || data.secondaryCta?.label) && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            {data.primaryCta?.label && data.primaryCta?.href && (
              <Button asChild size="lg">
                <Link href={data.primaryCta.href}>{data.primaryCta.label}</Link>
              </Button>
            )}
            {data.secondaryCta?.label && data.secondaryCta?.href && (
              <Button asChild size="lg" variant="outline">
                <Link href={data.secondaryCta.href}>{data.secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
