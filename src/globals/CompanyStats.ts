import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const CompanyStats: GlobalConfig = {
  slug: 'company-stats',
  label: 'Company Stats',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  admin: {
    description:
      'Shared credential/stat numbers shown on both the About page and the homepage trust strip.',
  },
  fields: [
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
