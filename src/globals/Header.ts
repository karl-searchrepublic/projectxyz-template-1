import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site Settings',
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  fields: [
    {
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaHref',
      type: 'text',
    },
    {
      name: 'callButtonLabel',
      type: 'text',
      defaultValue: 'Call Now',
      admin: {
        description: 'Label for the "call" button on the mobile sticky CTA bar',
      },
    },
  ],
}
