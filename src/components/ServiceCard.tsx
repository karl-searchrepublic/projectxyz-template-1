import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function ServiceCard({
  icon,
  title,
  description,
  href,
}: {
  icon?: string | null
  title: string
  description?: string | null
  href: string
}) {
  return (
    <Link className="block h-full" href={href}>
      <Card className="h-full transition-colors hover:border-foreground/20 hover:bg-accent/50">
        <CardHeader>
          {icon && <span className="mb-2 text-3xl">{icon}</span>}
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      </Card>
    </Link>
  )
}
