import Link from 'next/link'

import type { Footer as FooterGlobal } from '@/payload-types'

export function Footer({ data }: { data: FooterGlobal }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="site-footer__nav">
          {data.navLinks?.map((link) => (
            <Link key={link.id ?? link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="site-footer__contact">
          {data.contactPhone && <span>{data.contactPhone}</span>}
          {data.contactEmail && <span>{data.contactEmail}</span>}
        </div>
        {data.copyrightText && <p className="site-footer__copyright">{data.copyrightText}</p>}
      </div>
    </footer>
  )
}
