import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './styles.css'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const header = await payload.findGlobal({ slug: 'header' })

  return {
    description: header.metaDescription,
    title: header.siteName,
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])

  return (
    <html lang="en">
      <body>
        <Header data={header} />
        <main>{children}</main>
        <Footer data={footer} />
      </body>
    </html>
  )
}
