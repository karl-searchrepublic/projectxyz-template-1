import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const TrustStrip: GlobalConfig = {
  slug: 'trust-strip',
  label: 'Trust Strip',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  admin: {
    group: 'Components',
    description: 'Credential/stat numbers shown on both the homepage and the About page.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Why Choose Us',
      admin: {
        description: 'Shown above the stats on the homepage. Not shown on the About page.',
      },
    },
    {
      name: 'stats',
      type: 'array',
      labels: {
        singular: 'Stat',
        plural: 'Stats',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
