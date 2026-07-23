import { getPayload } from 'payload'

import config from '@/payload.config'
import { Hero } from '@/components/Hero'
import { ServicesPreview } from '@/components/ServicesPreview'
import { CredentialsStrip } from '@/components/CredentialsStrip'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { ServiceAreaSection } from '@/components/ServiceAreaSection'
import { CTABanner } from '@/components/CTABanner'
import { getGooglePlaceDetails } from '@/lib/googleRating'
import type { Service } from '@/payload-types'
import './styles.css'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const homePage = await payload.findGlobal({ slug: 'home-page' })

  return { description: homePage.metaDescription, title: homePage.hero?.headline }
}

export default async function Page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [homePage, companyStats, companyInfo, testimonials, serviceArea] = await Promise.all([
    payload.findGlobal({ slug: 'home-page' }),
    payload.findGlobal({ slug: 'company-stats' }),
    payload.findGlobal({ slug: 'company-info' }),
    payload.findGlobal({ slug: 'testimonials' }),
    payload.findGlobal({ slug: 'service-area' }),
  ])

  const featuredServices = (homePage.servicesPreview?.featuredServices ?? []).filter(
    (service): service is Service => typeof service === 'object',
  )

  const googlePlaceDetails = companyInfo.googlePlaceId
    ? await getGooglePlaceDetails(companyInfo.googlePlaceId)
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

      <CredentialsStrip heading={homePage.trustStripHeading} items={companyStats.stats ?? []} />

      <TestimonialsCarousel
        heading={testimonials.heading}
        placeDetails={googlePlaceDetails}
        reviews={googlePlaceDetails?.reviews ?? []}
        showReviewsPill={testimonials.showGoogleReviewsPill}
      />

      <ServiceAreaSection
        areaLabel={serviceArea.label}
        heading={serviceArea.heading}
        latitude={companyInfo.latitude}
        longitude={companyInfo.longitude}
        radiusKm={companyInfo.serviceRadiusKm}
        suburbs={serviceArea.suburbs ?? []}
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
