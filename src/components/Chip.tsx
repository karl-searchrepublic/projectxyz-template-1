import { Badge } from '@/components/ui/badge'

export function Chip({ label }: { label: string }) {
  return <Badge variant="secondary">{label}</Badge>
}
