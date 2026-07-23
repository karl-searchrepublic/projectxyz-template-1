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
      'Homepage "What Our Customers Say" section. The reviews themselves are pulled live from Google using the Place ID set on Company Info.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'What Our Customers Say',
    },
    {
      name: 'showGoogleReviewsPill',
      type: 'checkbox',
      label: 'Show overall Google Reviews score and link to all reviews?',
      defaultValue: true,
      admin: {
        description:
          'When on, shows the live Google rating/review count next to the heading, with a link out to the full reviews. Pulled automatically from the Google Place ID on Company Info — nothing to enter manually.',
      },
    },
  ],
}
