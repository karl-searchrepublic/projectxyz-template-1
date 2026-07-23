import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileCtaBar } from '@/components/MobileCtaBar'
import { getContrastColor } from '@/lib/theme'
import './styles.css'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [header, companyInfo] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'company-info' }),
  ])

  return {
    description: header.metaDescription,
    title: companyInfo.businessName,
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [header, footer, theme, companyInfo] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.findGlobal({ slug: 'theme' }),
    payload.findGlobal({ slug: 'company-info' }),
  ])

  const themeStyle = {
    '--background': theme.backgroundColor,
    '--foreground': theme.foregroundColor,
    '--primary': theme.primaryColor,
    '--primary-foreground': theme.primaryTextColor || getContrastColor(theme.primaryColor),
    '--accent': theme.accentColor,
    '--accent-foreground': getContrastColor(theme.accentColor),
    '--header-background': theme.headerBackgroundColor,
    '--header-foreground': getContrastColor(theme.headerBackgroundColor),
  } as React.CSSProperties

  return (
    <html lang="en" style={themeStyle}>
      <body className="pb-20 md:pb-0">
        <Header companyInfo={companyInfo} data={header} />
        <main>{children}</main>
        <Footer companyInfo={companyInfo} data={footer} />
        <MobileCtaBar
          callLabel={header.callButtonLabel}
          phone={companyInfo.phone}
          quoteHref={header.ctaHref}
          quoteLabel={header.ctaLabel}
        />
      </body>
    </html>
  )
}
