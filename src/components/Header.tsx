'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Header as HeaderGlobal } from '@/payload-types'

export function Header({ data }: { data: HeaderGlobal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link className="text-lg font-semibold tracking-tight" href="/">
          {data.siteName}
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
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

        <div className="hidden md:block">
          {data.ctaLabel && data.ctaHref && (
            <Button asChild size="sm">
              <Link href={data.ctaHref}>{data.ctaLabel}</Link>
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

      <div
        className={cn(
          'border-t border-border bg-background md:hidden',
          isMenuOpen ? 'flex flex-col gap-1 px-6 py-4' : 'hidden',
        )}
      >
        {data.navLinks?.map((link) => (
          <Link
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
