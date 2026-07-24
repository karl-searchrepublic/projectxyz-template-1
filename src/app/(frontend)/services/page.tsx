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

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-section-y-lg sm:grid-cols-2 lg:grid-cols-3">
        {services.docs.map((service) => (
          <ServiceCard
            description={service.subtext}
            href={`/services/${service.slug}`}
            icon={service.icon}
            key={service.id}
            title={service.title}
          />
        ))}
      </section>

      {servicesPage.howItWorks && servicesPage.howItWorks.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-section-y-lg">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {servicesPage.howItWorksHeading}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {servicesPage.howItWorks.map((step) => (
              <div className="text-center" key={step.id ?? step.title}>
                <h3 className="font-semibold">{step.title}</h3>
                {step.description && (
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {servicesPage.faq && servicesPage.faq.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-section-y-lg">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {servicesPage.faqHeading}
          </h2>
          <div className="mt-10 divide-y divide-border">
            {servicesPage.faq.map((entry) => (
              <div className="py-6" key={entry.id ?? entry.question}>
                <h3 className="font-semibold">{entry.question}</h3>
                <p className="mt-2 text-muted-foreground">{entry.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <CTABanner
        buttonHref={servicesPage.finalCta?.buttonHref}
        buttonLabel={servicesPage.finalCta?.buttonLabel}
        heading={servicesPage.finalCta?.heading}
        subtext={servicesPage.finalCta?.subtext}
      />
    </>
  )
}
