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
  ],
}
