import { getPayload } from 'payload'

import config from '@/payload.config'
import { Hero } from '@/components/Hero'
import { CTABanner } from '@/components/CTABanner'
import { ServiceCard } from '@/components/ServiceCard'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const servicesPage = await payload.findGlobal({ slug: 'services-page' })

  return {
    description: servicesPage.metaDescription,
    title: servicesPage.hero?.headline ?? 'Services',
  }
}

export default async function ServicesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [servicesPage, services, companyInfo] = await Promise.all([
    payload.findGlobal({ slug: 'services-page' }),
    payload.find({ collection: 'services', limit: 100, sort: 'title' }),
    payload.findGlobal({ slug: 'company-info' }),
  ])

  return (
    <>
      <Hero data={servicesPage.hero} phone={companyInfo.phone} />

      <section className="mx-auto max-w-6xl px-6 py-section-y-lg">
        {(servicesPage.introHeading || servicesPage.introText) && (
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
            {servicesPage.introHeading && (
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {servicesPage.introHeading}
              </h2>
            )}
            {servicesPage.introText && (
              <p className="text-lg text-muted-foreground">{servicesPage.introText}</p>
            )}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.docs.map((service) => (
            <ServiceCard
              description={service.subtext}
              href={`/services/${service.slug}`}
              icon={service.icon}
              key={service.id}
              title={service.title}
            />
          ))}
        </div>
      </section>

      <CTABanner
        buttonHref={servicesPage.finalCta?.buttonHref}
        buttonLabel={servicesPage.finalCta?.buttonLabel}
        heading={servicesPage.finalCta?.heading}
        subtext={servicesPage.finalCta?.subtext}
      />
    </>
  )
}
