import Link from 'next/link'

import type { Header as HeaderGlobal } from '@/payload-types'

export function Header({ data }: { data: HeaderGlobal }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__site-name" href="/">
          {data.siteName}
        </Link>
        <nav className="site-header__nav">
          {data.navLinks?.map((link) => (
            <Link key={link.id ?? link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        {data.ctaLabel && data.ctaHref && (
          <Link className="site-header__cta" href={data.ctaHref}>
            {data.ctaLabel}
          </Link>
        )}
      </div>
    </header>
  )
}
