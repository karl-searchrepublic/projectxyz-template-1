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
      label: 'Header and Footer Background Color',
      required: true,
      defaultValue: '#ffffff',
      admin: {
        description:
          'Header and footer background color (including the mobile dropdown menu). Set this per client to match the background baked into their logo file, so the logo sits cleanly on both — independent of the general page background. Text color on both is calculated automatically for contrast.',
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
      name: 'primaryTextColor',
      type: 'text',
      admin: {
        description:
          'Optional override for the text/icon color shown on top of the Primary color. Leave blank to auto-calculate a readable black or white based on Primary Color.',
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
