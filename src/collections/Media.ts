import type { CollectionBeforeOperationHook, CollectionConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

// Blob storage URLs get percent-encoded once when generated, then encoded
// again by Next.js's image optimizer — any character requiring escaping
// (spaces especially) ends up double-encoded and 404s. Stripping those
// characters from the filename up front avoids the issue entirely.
const sanitizeFilename = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.')
  const name = lastDot > 0 ? filename.slice(0, lastDot) : filename
  const extension = lastDot > 0 ? filename.slice(lastDot) : ''

  const safeName = name
    .trim()
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return `${safeName || 'file'}${extension}`
}

const sanitizeUploadedFilename: CollectionBeforeOperationHook = ({ req, operation }) => {
  if ((operation === 'create' || operation === 'update') && req.file) {
    req.file.name = sanitizeFilename(req.file.name)
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [sanitizeUploadedFilename],
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
