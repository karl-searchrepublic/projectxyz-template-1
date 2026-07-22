import { getPayload } from 'payload'

import config from '@/payload.config'
import { PageIntro } from '@/components/PageIntro'
import { CTABanner } from '@/components/CTABanner'
import { ServiceCard } from '@/components/ServiceCard'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const servicesPage = await payload.findGlobal({ slug: 'services-page' })

  return { title: servicesPage.pageIntro?.headline ?? 'Services' }
}

export default async function ServicesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [servicesPage, services] = await Promise.all([
    payload.findGlobal({ slug: 'services-page' }),
    payload.find({ collection: 'services', limit: 100, sort: 'title' }),
  ])

  return (
    <>
      <PageIntro
        eyebrow={servicesPage.pageIntro?.eyebrow}
        headline={servicesPage.pageIntro?.headline ?? 'Services'}
        subtext={servicesPage.pageIntro?.subtext}
      />

      <section className="services-grid">
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
        <section className="how-it-works">
          <h2>{servicesPage.howItWorksHeading}</h2>
          <div className="how-it-works__steps">
            {servicesPage.howItWorks.map((step) => (
              <div className="how-it-works__step" key={step.id ?? step.title}>
                <h3>{step.title}</h3>
                {step.description && <p>{step.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {servicesPage.faq && servicesPage.faq.length > 0 && (
        <section className="faq">
          <h2>{servicesPage.faqHeading}</h2>
          {servicesPage.faq.map((entry) => (
            <div className="faq__item" key={entry.id ?? entry.question}>
              <h3>{entry.question}</h3>
              <p>{entry.answer}</p>
            </div>
          ))}
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
