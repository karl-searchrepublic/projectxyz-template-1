import Link from 'next/link'
import { Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function MobileCtaBar({
  phone,
  callLabel,
  quoteLabel,
  quoteHref,
}: {
  phone?: string | null
  callLabel?: string | null
  quoteLabel?: string | null
  quoteHref?: string | null
}) {
  if (!phone && !(quoteLabel && quoteHref)) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 bg-primary/50 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] backdrop-blur md:hidden">
      {phone && (
        <Button asChild className="flex-1" size="lg" variant="default">
          <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
            <Phone />
            {callLabel || 'Call Now'}
          </a>
        </Button>
      )}
      {quoteLabel && quoteHref && (
        <Button asChild className="flex-1" size="lg" variant="secondary">
          <Link href={quoteHref}>{quoteLabel}</Link>
        </Button>
      )}
    </div>
  )
}
