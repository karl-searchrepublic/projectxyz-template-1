import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  access: {
    read: () => true,
  },
  fields: [
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
      name: 'howItWorks',
      type: 'array',
      label: 'How It Works Steps',
      labels: {
        singular: 'Step',
        plural: 'Steps',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'FAQ',
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
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
