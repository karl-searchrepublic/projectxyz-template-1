import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

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
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
