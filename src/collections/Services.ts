import type { CollectionConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'
import { SERVICE_ICON_OPTIONS } from '../lib/serviceIcons'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
    afterDelete: [revalidateFrontend],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Used in the URL: /services/[slug]',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'SEO description shown in search results and social share previews',
      },
    },
    {
      name: 'icon',
      type: 'select',
      options: SERVICE_ICON_OPTIONS,
      defaultValue: 'wrench',
      admin: {
        description: 'Icon shown on the services grid card',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'subtext',
      type: 'textarea',
      admin: {
        description: 'Short description shown on the services grid card and page hero',
      },
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Hero Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Get a Quote' },
        { name: 'href', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      name: 'descriptionHeading',
      type: 'text',
      defaultValue: 'Overview',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Long-form body copy for the individual service page',
      },
    },
    {
      name: 'whatsIncluded',
      type: 'array',
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
  ],
}
