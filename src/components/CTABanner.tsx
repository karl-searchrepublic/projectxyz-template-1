import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function CTABanner({
  heading,
  subtext,
  buttonLabel,
  buttonHref,
}: {
  heading?: string | null
  subtext?: string | null
  buttonLabel?: string | null
  buttonHref?: string | null
}) {
  if (!heading && !buttonLabel) return null

  return (
    <section className="border-t border-border bg-accent">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-8 py-section-y-lg text-center">
        {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
        {subtext && <p className="text-lg text-muted-foreground">{subtext}</p>}
        {buttonLabel && buttonHref && (
          <Button asChild className="mt-2" size="lg">
            <Link href={buttonHref}>{buttonLabel}</Link>
          </Button>
        )}
      </div>
    </section>
  )
}
