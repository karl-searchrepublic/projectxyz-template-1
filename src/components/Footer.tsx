import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import type { CompanyInfo, Footer as FooterGlobal, Media, SiteNav } from '@/payload-types'
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from '@/components/icons/SocialIcons'
import { resolveSiteNavHref } from '@/lib/siteNavPages'

export function Footer({
  data,
  companyInfo,
  navLinks,
}: {
  data: FooterGlobal
  companyInfo: CompanyInfo
  navLinks?: SiteNav['navLinks']
}) {
  const logo =
    companyInfo.logo && typeof companyInfo.logo === 'object' ? (companyInfo.logo as Media) : null

  const socialLinks = [
    { href: companyInfo.socialLinks?.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: companyInfo.socialLinks?.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: companyInfo.socialLinks?.x, label: 'X', Icon: XIcon },
    { href: companyInfo.socialLinks?.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  ].filter((link): link is { href: string; label: string; Icon: typeof FacebookIcon } =>
    Boolean(link.href),
  )

  const privacyPolicyUrl = companyInfo.legalLinks?.privacyPolicyUrl
  const termsUrl = companyInfo.legalLinks?.termsUrl

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-section-y">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link className="flex items-center text-lg font-semibold tracking-tight" href="/">
              {logo?.url ? (
                <Image
                  alt={logo.alt}
                  className="h-[52px] w-auto object-contain"
                  height={logo.height ?? 32}
                  src={logo.url}
                  width={logo.width ?? 120}
                />
              ) : (
                companyInfo.businessName
              )}
            </Link>
            {companyInfo.footerTagline && (
              <p className="text-sm text-muted-foreground">{companyInfo.footerTagline}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              {navLinks?.map((link) => (
                <Link
                  className="transition-colors hover:text-foreground"
                  href={resolveSiteNavHref(link)}
                  key={link.id ?? link.label}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Contact</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {companyInfo.phone && (
                <a
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                  href={`tel:${companyInfo.phone.replace(/[^\d+]/g, '')}`}
                >
                  <Phone className="size-4 shrink-0" />
                  {companyInfo.phone}
                </a>
              )}
              {companyInfo.email && (
                <a
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                  href={`mailto:${companyInfo.email}`}
                >
                  <Mail className="size-4 shrink-0" />
                  {companyInfo.email}
                </a>
              )}
              {companyInfo.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span className="whitespace-pre-line">{companyInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Follow Us</h3>
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

        {(data.copyrightText || privacyPolicyUrl || termsUrl) && (
          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            {data.copyrightText && <p>{data.copyrightText}</p>}
            {(privacyPolicyUrl || termsUrl) && (
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {privacyPolicyUrl && (
                  <a className="transition-colors hover:text-foreground" href={privacyPolicyUrl}>
                    Privacy Policy
                  </a>
                )}
                {termsUrl && (
                  <a className="transition-colors hover:text-foreground" href={termsUrl}>
                    Terms
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  )
}
