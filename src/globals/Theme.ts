import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const Theme: GlobalConfig = {
  slug: 'theme',
  label: 'Theme',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  admin: {
    group: 'Site Settings',
    description:
      'Brand colors for this site. Enter hex codes (e.g. #1a56db). Readable text color on Primary/Accent is calculated automatically.',
  },
  fields: [
    {
      name: 'primaryColor',
      type: 'text',
      required: true,
      defaultValue: '#171717',
      admin: {
        description: 'Main brand color — buttons, links, active states',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      required: true,
      defaultValue: '#ffffff',
      admin: {
        description: 'Page background color',
      },
    },
    {
      name: 'foregroundColor',
      type: 'text',
      required: true,
      defaultValue: '#1a1a1a',
      admin: {
        description: 'Main text color',
      },
    },
    {
      name: 'accentColor',
      type: 'text',
      required: true,
      defaultValue: '#f5f5f5',
      admin: {
        description: 'Secondary background — muted sections, card hovers, badges',
      },
    },
  ],
}
