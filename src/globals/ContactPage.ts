import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
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
      name: 'emergencyCallout',
      type: 'group',
      fields: [
        { name: 'show', type: 'checkbox', defaultValue: true },
        { name: 'message', type: 'text' },
      ],
    },
    {
      name: 'pageIntro',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'subtext', type: 'textarea' },
      ],
    },
    {
      name: 'contactDetails',
      type: 'group',
      fields: [
        { name: 'phoneLabel', type: 'text', defaultValue: 'Phone' },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email' },
        { name: 'addressLabel', type: 'text', defaultValue: 'Address' },
        { name: 'hoursLabel', type: 'text', defaultValue: 'Hours' },
      ],
    },
  ],
}
