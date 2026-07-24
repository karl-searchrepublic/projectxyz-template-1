import { cn } from '@/lib/utils'

export function PageIntro({
  headline,
  subtext,
  background = 'background',
}: {
  headline: string
  subtext?: string | null
  background?: 'background' | 'accent'
}) {
  return (
    <section
      className={cn(background === 'accent' ? 'bg-accent text-accent-foreground' : 'bg-background text-foreground')}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-section-y text-center sm:py-section-y-lg">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">{headline}</h1>
        {subtext && (
          <p className="max-w-2xl text-lg text-muted-foreground text-balance">{subtext}</p>
        )}
      </div>
    </section>
  )
}
