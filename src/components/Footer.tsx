import Link from 'next/link'

import type { Footer as FooterGlobal } from '@/payload-types'

export function Footer({ data }: { data: FooterGlobal }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            {data.navLinks?.map((link) => (
              <Link
                className="transition-colors hover:text-foreground"
                href={link.href}
                key={link.id ?? link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {(data.contactPhone || data.contactEmail) && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {data.contactPhone && (
                <a
                  className="transition-colors hover:text-foreground"
                  href={`tel:${data.contactPhone.replace(/[^\d+]/g, '')}`}
                >
                  {data.contactPhone}
                </a>
              )}
              {data.contactEmail && (
                <a
                  className="transition-colors hover:text-foreground"
                  href={`mailto:${data.contactEmail}`}
                >
                  {data.contactEmail}
                </a>
              )}
            </div>
          )}
        </div>

        {data.copyrightText && (
          <p className="border-t border-border pt-6 text-sm text-muted-foreground">
            {data.copyrightText}
          </p>
        )}
      </div>
    </footer>
  )
}
