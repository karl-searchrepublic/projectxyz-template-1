import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'
import { SITE_NAV_CUSTOM_PAGE_VALUE, SITE_NAV_PAGE_OPTIONS } from '../lib/siteNavPages'

export const SiteNav: GlobalConfig = {
  slug: 'site-nav',
  label: 'Site Nav',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  admin: {
    group: 'Site Settings',
    description: 'Nav links shared by both the Header and the Footer.',
  },
  fields: [
    {
      name: 'navLinks',
      type: 'array',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'page',
          type: 'select',
          options: SITE_NAV_PAGE_OPTIONS,
          required: true,
          defaultValue: '/',
        },
        {
          name: 'customUrl',
          type: 'text',
          label: 'Custom URL',
          admin: {
            condition: (_, siblingData) => siblingData?.page === SITE_NAV_CUSTOM_PAGE_VALUE,
            description: 'Full URL, shown only when "Custom URL" is selected above',
          },
        },
      ],
    },
  ],
}
