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
      name: 'serviceAreaLabel',
      type: 'text',
      admin: {
        description:
          'Short area name for service-radius copy, e.g. "Auckland" — shown as "Servicing within {radius}km of {this}".',
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
      name: 'serviceAreaSuburbs',
      type: 'array',
      maxRows: 10,
      labels: {
        singular: 'Suburb',
        plural: 'Suburbs',
      },
      admin: {
        description:
          'Suburb/area names shown on the Contact page and homepage service-area section — max 10.',
      },
      fields: [{ name: 'name', type: 'text', required: true }],
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
      name: 'googleRating',
      type: 'number',
      admin: {
        description:
          'Aggregate Google star rating (e.g. 4.9), shown as a pill next to "What Our Customers Say". Entered manually — check your Google Business Profile for the current value.',
      },
    },
    {
      name: 'googleReviewCount',
      type: 'number',
      admin: {
        description: 'Total number of Google reviews, shown alongside the rating.',
      },
    },
    {
      name: 'googleReviewsUrl',
      type: 'text',
      admin: {
        description:
          'Link to the business\'s full Google reviews page, used by the "Read all our reviews" link.',
      },
    },
    {
      name: 'showReviewLink',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'Show the "Read all our reviews" link. Turn off if the review score/count shouldn\'t be publicly linked yet.',
      },
    },
  ],
}
