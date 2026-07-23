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
      name: 'pageIntro',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text', required: true },
        { name: 'subtext', type: 'textarea' },
      ],
    },
    { name: 'howItWorksHeading', type: 'text', defaultValue: 'How It Works' },
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
    { name: 'faqHeading', type: 'text', defaultValue: 'Frequently Asked Questions' },
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
