import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  access: {
    read: () => true,
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
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'address', type: 'textarea' },
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
