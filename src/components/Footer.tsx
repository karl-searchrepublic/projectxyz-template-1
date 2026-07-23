import Link from 'next/link'

import type { CompanyInfo, Footer as FooterGlobal } from '@/payload-types'
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from '@/components/icons/SocialIcons'

export function Footer({ data, companyInfo }: { data: FooterGlobal; companyInfo: CompanyInfo }) {
  const socialLinks = [
    { href: companyInfo.socialLinks?.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: companyInfo.socialLinks?.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: companyInfo.socialLinks?.x, label: 'X', Icon: XIcon },
    { href: companyInfo.socialLinks?.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  ].filter((link): link is { href: string; label: string; Icon: typeof FacebookIcon } =>
    Boolean(link.href),
  )

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-section-y">
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

          <div className="flex flex-col gap-3 sm:items-end">
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

            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    aria-label={label}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href={href}
                    key={label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            )}
          </div>
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
