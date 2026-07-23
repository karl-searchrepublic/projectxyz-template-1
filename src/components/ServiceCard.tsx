import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export function ServiceCard({
  icon,
  title,
  description,
  href,
  readMoreLabel,
}: {
  icon?: string | null
  title: string
  description?: string | null
  href: string
  readMoreLabel?: string | null
}) {
  return (
    <Link className="block h-full no-underline" href={href}>
      <Card className="h-full transition-colors hover:border-foreground/20 hover:bg-accent/50">
        <CardHeader>
          {icon && <span className="mb-2 text-3xl">{icon}</span>}
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardFooter className="mt-auto">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4">
            {readMoreLabel || 'Read more'}
            <ArrowRight className="size-4" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
