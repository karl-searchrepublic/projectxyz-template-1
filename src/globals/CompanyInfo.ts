import type { GlobalConfig } from 'payload'

import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  label: 'Company Info',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFrontend],
  },
  admin: {
    group: 'Site Settings',
    description:
      'Shared business contact details, used across the Footer and Contact page (including the emergency callout phone number).',
  },
  fields: [
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'hours', type: 'textarea' },
  ],
}
