'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Header as HeaderGlobal, Media } from '@/payload-types'

export function Header({ data, phone }: { data: HeaderGlobal; phone?: string | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const logo = data.logo && typeof data.logo === 'object' ? (data.logo as Media) : null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-header-background text-header-foreground">
      <div className="mx-auto flex h-20 max-w-6xl items-center px-6">
        <Link
          className="flex shrink-0 items-center text-lg font-semibold tracking-tight no-underline"
          href="/"
        >
          {logo?.url ? (
            <Image
              alt={logo.alt}
              className="h-[58px] w-auto max-w-[216px] object-contain md:h-[67px]"
              height={logo.height ?? 32}
              priority
              src={logo.url}
              width={logo.width ?? 120}
            />
          ) : (
            data.siteName
          )}
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {data.navLinks?.map((link) => (
              <Link
                className="text-header-foreground/70 transition-colors hover:text-header-foreground"
                href={link.href}
                key={link.id ?? link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {data.ctaLabel && data.ctaHref && (
              <Button asChild size="sm" variant="outline">
                <Link href={data.ctaHref}>
                  {data.ctaLabel}
                  <ArrowRight />
                </Link>
              </Button>
            )}
            {phone && (
              <Button asChild size="sm">
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
                  <Phone />
                  {phone}
                </a>
              </Button>
            )}
          </div>

          <Button
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            size="icon"
            variant="ghost"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'border-t border-border bg-header-background md:hidden',
          isMenuOpen ? 'flex flex-col gap-1 px-6 py-4' : 'hidden',
        )}
      >
        {data.navLinks?.map((link) => (
          <Link
            className="rounded-md px-3 py-2 text-sm font-medium text-header-foreground/70 transition-colors hover:bg-accent hover:text-header-foreground"
            href={link.href}
            key={link.id ?? link.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        {data.ctaLabel && data.ctaHref && (
          <Button asChild className="mt-2" onClick={() => setIsMenuOpen(false)} size="sm">
            <Link href={data.ctaHref}>{data.ctaLabel}</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
