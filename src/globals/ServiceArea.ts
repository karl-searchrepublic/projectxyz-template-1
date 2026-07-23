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
      'Homepage "Where We Service" section, also used on the Contact page. Radius, coordinates, and map come from Company Info.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Where We Service',
    },
    {
      name: 'label',
      type: 'text',
      admin: {
        description:
          'Short area name for service-radius copy, e.g. "Auckland" — shown as "Servicing within {radius}km of {this}".',
      },
    },
    {
      name: 'suburbs',
      type: 'array',
      maxRows: 20,
      labels: {
        singular: 'Suburb',
        plural: 'Suburbs',
      },
      admin: {
        description:
          'Suburb/area names shown on the Contact page and homepage service-area section — max 20.',
      },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
  ],
}
