import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
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
            { name: 'label', type: 'text', defaultValue: 'Get a Quote' },
            { name: 'href', type: 'text', defaultValue: '/contact' },
          ],
        },
      ],
    },
    {
      name: 'introHeading',
      type: 'text',
      label: 'Services List Heading',
      defaultValue: 'Our Services',
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Services List Body Text',
      defaultValue: 'See below for a full list of the services we provide.',
    },
    {
      name: 'whatsIncludedHeading',
      type: 'text',
      label: "'What's Included' Heading (service detail pages)",
      defaultValue: "What's Included",
    },
    {
      name: 'relatedServicesHeading',
      type: 'text',
      label: "'Related Services' Heading (service detail pages)",
      defaultValue: 'Related Services',
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
