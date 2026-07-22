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
        description:
          'Main brand color — solid buttons (Get a Quote, Call Now, etc.), text links, and icon accents like service checkmarks. Text shown on top of it is calculated automatically for contrast.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      required: true,
      defaultValue: '#ffffff',
      admin: {
        description:
          'Page and card background color. Also blended with the text color to produce the derived border, input outline, and focus ring tones.',
      },
    },
    {
      name: 'headerBackgroundColor',
      type: 'text',
      required: true,
      defaultValue: '#ffffff',
      admin: {
        description:
          'Header/nav bar background color (desktop bar and mobile dropdown menu). Set this per client to match the background baked into their logo file, so the logo sits cleanly on the header — independent of the general page background. Nav text color is calculated automatically for contrast against it.',
      },
    },
    {
      name: 'foregroundColor',
      type: 'text',
      required: true,
      defaultValue: '#1a1a1a',
      admin: {
        description:
          'Main text color. Also blended with the background color to produce derived tones — muted/secondary text, borders, input outlines, and focus rings.',
      },
    },
    {
      name: 'accentColor',
      type: 'text',
      required: true,
      defaultValue: '#f5f5f5',
      admin: {
        description:
          'Secondary background — badges/chips, hover backgrounds on nav links and outline buttons, and muted section backgrounds like the final CTA banner.',
      },
    },
  ],
}
