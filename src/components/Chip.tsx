import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function Chip({
  label,
  background = 'background',
}: {
  label: string
  background?: 'background' | 'accent'
}) {
  return (
    <Badge
      className={cn(
        'border-transparent',
        background === 'accent'
          ? 'bg-background text-foreground'
          : 'bg-accent text-accent-foreground',
      )}
    >
      {label}
    </Badge>
  )
}
