export const SITE_NAV_PAGE_OPTIONS = [
  { label: 'Home', value: '/' },
  { label: 'About', value: '/about' },
  { label: 'Services', value: '/services' },
  { label: 'Contact', value: '/contact' },
  { label: 'Custom URL', value: 'custom' },
]

export const SITE_NAV_CUSTOM_PAGE_VALUE = 'custom'

export function resolveSiteNavHref(link: {
  page?: string | null
  customUrl?: string | null
}): string {
  if (link.page === SITE_NAV_CUSTOM_PAGE_VALUE) return link.customUrl ?? '#'
  return link.page ?? '#'
}
