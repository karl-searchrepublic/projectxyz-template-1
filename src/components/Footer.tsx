import Link from 'next/link'

import type { CompanyInfo, Footer as FooterGlobal } from '@/payload-types'

export function Footer({ data, companyInfo }: { data: FooterGlobal; companyInfo: CompanyInfo }) {
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

          {(companyInfo.phone || companyInfo.email) && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {companyInfo.phone && (
                <a
                  className="transition-colors hover:text-foreground"
                  href={`tel:${companyInfo.phone.replace(/[^\d+]/g, '')}`}
                >
                  {companyInfo.phone}
                </a>
              )}
              {companyInfo.email && (
                <a
                  className="transition-colors hover:text-foreground"
                  href={`mailto:${companyInfo.email}`}
                >
                  {companyInfo.email}
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
