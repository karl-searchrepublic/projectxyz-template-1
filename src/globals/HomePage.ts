import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text', required: true },
        { name: 'subtext', type: 'textarea' },
        {
          name: 'primaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
  ],
}
