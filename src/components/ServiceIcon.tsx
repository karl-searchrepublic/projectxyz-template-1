import { Wrench } from 'lucide-react'

import { cn } from '@/lib/utils'
import { SERVICE_ICONS } from '@/lib/serviceIcons'

export function ServiceIcon({
  name,
  className,
}: {
  name?: string | null
  className?: string
}) {
  const Icon = (name && SERVICE_ICONS[name]) || Wrench

  return (
    <span
      className={cn(
        'inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary',
        className,
      )}
    >
      <Icon className="size-6" />
    </span>
  )
}
