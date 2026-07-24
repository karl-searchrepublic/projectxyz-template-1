import { ChevronDown } from 'lucide-react'

export function Accordion({
  items,
}: {
  items: Array<{ id?: string | null; question: string; answer: string }>
}) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border">
      {items.map((item) => (
        <details className="group px-5 py-4" key={item.id ?? item.question}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
