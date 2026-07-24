import { cn } from '@/lib/utils'

export function CredentialsStrip({
  heading,
  items,
  background = 'accent',
}: {
  heading?: string | null
  items: Array<{ id?: string | null; label: string; value: string }>
  background?: 'background' | 'accent'
}) {
  if (items.length === 0) return null

  return (
    <section
      className={cn(
        'border-t border-border',
        background === 'accent' ? 'bg-accent' : 'bg-background',
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-section-y">
        {heading && (
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {items.map((item) => (
            <div
              className="flex flex-col items-center gap-1 text-center"
              key={item.id ?? item.label}
            >
              <span className="text-3xl font-bold tracking-tight sm:text-4xl">{item.value}</span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
