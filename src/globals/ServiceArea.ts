import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const ServiceArea: GlobalConfig = {
  slug: 'service-area',
  label: 'Service Area',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  admin: {
    group: 'Components',
    description:
      'Homepage "Where We Service" section heading. The suburbs, radius, and map come from Company Info.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Where We Service',
    },
  ],
}
