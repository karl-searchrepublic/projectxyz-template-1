import { getPayload } from 'payload'

import config from '@/payload.config'
import { Hero } from '@/components/Hero'
import { ServicesPreview } from '@/components/ServicesPreview'
import { CredentialsStrip } from '@/components/CredentialsStrip'
import { ServiceAreaSection } from '@/components/ServiceAreaSection'
import { CTABanner } from '@/components/CTABanner'
import { getGoogleRating } from '@/lib/googleRating'
import type { Service } from '@/payload-types'
import './styles.css'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const homePage = await payload.findGlobal({ slug: 'home-page' })

  return { title: homePage.hero?.headline }
}

export default async function Page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [homePage, companyStats, companyInfo] = await Promise.all([
    payload.findGlobal({ slug: 'home-page' }),
    payload.findGlobal({ slug: 'company-stats' }),
    payload.findGlobal({ slug: 'company-info' }),
  ])

  const featuredServices = (homePage.servicesPreview?.featuredServices ?? []).filter(
    (service): service is Service => typeof service === 'object',
  )

  const googleRating = companyInfo.googlePlaceId
    ? await getGoogleRating(companyInfo.googlePlaceId)
    : null

  return (
    <>
      <Hero data={homePage.hero} phone={companyInfo.phone} />

      <ServicesPreview
        heading={homePage.servicesPreview?.heading}
        readMoreLabel={homePage.servicesPreview?.readMoreLabel}
        services={featuredServices}
        subtext={homePage.servicesPreview?.subtext}
        viewAllLabel={homePage.servicesPreview?.viewAllLabel}
      />

      <CredentialsStrip
        googleRating={googleRating}
        heading={homePage.trustStripHeading}
        items={companyStats.stats ?? []}
      />

      <ServiceAreaSection
        areaLabel={companyInfo.serviceAreaLabel}
        heading={homePage.serviceAreaHeading}
        latitude={companyInfo.latitude}
        longitude={companyInfo.longitude}
        radiusKm={companyInfo.serviceRadiusKm}
        suburbs={companyInfo.serviceAreaSuburbs ?? []}
      />

      <CTABanner
        buttonHref={homePage.finalCta?.buttonHref}
        buttonLabel={homePage.finalCta?.buttonLabel}
        heading={homePage.finalCta?.heading}
        subtext={homePage.finalCta?.subtext}
      />
    </>
  )
}
