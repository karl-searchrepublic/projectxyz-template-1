import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  fields: [
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'SEO description shown in search results and social share previews',
      },
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'subtext', type: 'textarea' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Shown alongside the headline on larger screens',
          },
        },
        {
          name: 'primaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'servicesPreview',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Services' },
        { name: 'subtext', type: 'textarea' },
        {
          name: 'featuredServices',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          maxRows: 3,
          admin: {
            description: 'Shown on the homepage services grid — max 3.',
          },
        },
        { name: 'viewAllLabel', type: 'text', defaultValue: 'View All Services' },
        {
          name: 'readMoreLabel',
          type: 'text',
          defaultValue: 'Read more',
          admin: {
            description: 'Link label shown at the bottom of each service card',
          },
        },
      ],
    },
    {
      name: 'trustStripHeading',
      type: 'text',
      label: 'Trust Strip Heading',
      admin: {
        description:
          'Section heading above the stats. The stats themselves come from Company Stats.',
      },
      defaultValue: 'Why Choose Us',
    },
    {
      name: 'finalCta',
      type: 'group',
      label: 'Final CTA Banner',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'subtext', type: 'textarea' },
        { name: 'buttonLabel', type: 'text' },
        { name: 'buttonHref', type: 'text' },
      ],
    },
  ],
}
