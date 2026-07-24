import type { GlobalConfig } from 'payload'

import { geocodeAddress } from '../hooks/geocodeAddress'
import { revalidateFrontend } from '../hooks/revalidateFrontend'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  label: 'Company Info',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [geocodeAddress],
    afterChange: [revalidateFrontend],
  },
  admin: {
    group: 'Site Settings',
    description:
      'Shared business contact details, used across the Footer and Contact page (including the emergency callout phone number).',
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Shown in the header in place of the business name text, if uploaded',
      },
    },
    {
      name: 'footerTagline',
      type: 'text',
      admin: {
        description: 'Short one-line tagline shown under the logo in the footer',
      },
    },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'hours', type: 'textarea' },
    {
      name: 'serviceRadiusKm',
      type: 'number',
      defaultValue: 15,
      admin: {
        description:
          'Radius (in km) drawn as a circle on the Contact page map, centered on the geocoded business address.',
      },
    },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Auto-geocoded from Address — do not edit directly.',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Auto-geocoded from Address — do not edit directly.',
      },
    },
    {
      name: 'googlePlaceId',
      type: 'text',
      admin: {
        description:
          "Google Place ID for this business, used to fetch the live review carousel on the homepage. Find it via Google's Place ID Finder (developers.google.com/maps/documentation/places/web-service/place-id) or your Google Business Profile.",
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Links',
      admin: {
        description:
          'Shown in the footer, below the phone and email. Leave any blank to hide that icon.',
      },
      fields: [
        { name: 'facebook', type: 'text', admin: { description: 'Full Facebook page URL' } },
        { name: 'instagram', type: 'text', admin: { description: 'Full Instagram profile URL' } },
        { name: 'x', type: 'text', label: 'X (Twitter)', admin: { description: 'Full X/Twitter profile URL' } },
        { name: 'linkedin', type: 'text', admin: { description: 'Full LinkedIn page URL' } },
      ],
    },
    {
      name: 'legalLinks',
      type: 'group',
      label: 'Legal Links',
      admin: {
        description: 'Shown in the footer bottom bar. Leave either blank to hide that link.',
      },
      fields: [
        {
          name: 'privacyPolicyUrl',
          type: 'text',
          label: 'Privacy Policy URL',
        },
        {
          name: 'termsUrl',
          type: 'text',
          label: 'Terms URL',
        },
      ],
    },
  ],
}
