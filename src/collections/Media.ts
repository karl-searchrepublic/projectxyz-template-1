import type { CollectionConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
    afterDelete: [revalidateFrontend],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
