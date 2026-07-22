import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  fields: [
    {
      name: 'copyrightText',
      type: 'text',
    },
    {
      name: 'navLinks',
      type: 'array',
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
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'text',
    },
  ],
}
