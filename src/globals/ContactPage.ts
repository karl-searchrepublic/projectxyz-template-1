import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  fields: [
    {
      name: 'emergencyCallout',
      type: 'group',
      fields: [
        { name: 'show', type: 'checkbox', defaultValue: true },
        { name: 'message', type: 'text' },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      name: 'pageIntro',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text', required: true },
        { name: 'subtext', type: 'textarea' },
      ],
    },
    {
      name: 'contactDetails',
      type: 'group',
      fields: [
        { name: 'phoneLabel', type: 'text', defaultValue: 'Phone' },
        { name: 'phone', type: 'text' },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email' },
        { name: 'email', type: 'text' },
        { name: 'addressLabel', type: 'text', defaultValue: 'Address' },
        { name: 'address', type: 'textarea' },
        { name: 'hoursLabel', type: 'text', defaultValue: 'Hours' },
        { name: 'hours', type: 'textarea' },
      ],
    },
    {
      name: 'mapPlaceholder',
      type: 'group',
      fields: [
        { name: 'embedUrl', type: 'text' },
        { name: 'placeholderLabel', type: 'text', defaultValue: 'Map coming soon' },
      ],
    },
    { name: 'serviceAreaHeading', type: 'text', defaultValue: 'Areas We Service' },
    {
      name: 'serviceAreaSuburbs',
      type: 'array',
      labels: {
        singular: 'Suburb',
        plural: 'Suburbs',
      },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
  ],
}
