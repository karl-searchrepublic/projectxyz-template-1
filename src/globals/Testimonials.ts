import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const Testimonials: GlobalConfig = {
  slug: 'testimonials',
  label: 'Testimonials',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  admin: {
    group: 'Components',
    description:
      'Homepage "What Our Customers Say" section heading. The reviews themselves are pulled live from Google using the Place ID and toggle on Company Info.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'What Our Customers Say',
    },
  ],
}
