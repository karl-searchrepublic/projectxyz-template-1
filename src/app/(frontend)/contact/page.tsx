import { getPayload } from 'payload'
import { Phone } from 'lucide-react'

import config from '@/payload.config'
import { PageIntro } from '@/components/PageIntro'
import { ContactForm } from '@/components/ContactForm'
import { ServiceAreaSection } from '@/components/ServiceAreaSection'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const contact = await payload.findGlobal({ slug: 'contact-page' })

  return { description: contact.metaDescription, title: contact.pageIntro?.headline ?? 'Contact' }
}

export default async function ContactPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [contact, companyInfo, serviceArea] = await Promise.all([
    payload.findGlobal({ slug: 'contact-page' }),
    payload.findGlobal({ slug: 'company-info' }),
    payload.findGlobal({ slug: 'service-area' }),
  ])

  return (
    <>
      {contact.emergencyCallout?.show && (
        <section className="border-b border-border bg-destructive/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6 py-3 text-center">
            <p className="font-medium">{contact.emergencyCallout.message}</p>
            {companyInfo.phone && (
              <a
                className="flex items-center gap-1.5 font-semibold text-destructive"
                href={`tel:${companyInfo.phone.replace(/[^\d+]/g, '')}`}
              >
                <Phone className="size-4" />
                {companyInfo.phone}
              </a>
            )}
          </div>
        </section>
      )}

      <PageIntro
        headline={contact.pageIntro?.headline ?? 'Contact Us'}
        subtext={contact.pageIntro?.subtext}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-section-y-lg lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          {companyInfo.phone && (
            <div>
              <h3 className="font-semibold">{contact.contactDetails?.phoneLabel}</h3>
              <a
                className="text-muted-foreground hover:text-foreground"
                href={`tel:${companyInfo.phone.replace(/[^\d+]/g, '')}`}
              >
                {companyInfo.phone}
              </a>
            </div>
          )}
          {companyInfo.email && (
            <div>
              <h3 className="font-semibold">{contact.contactDetails?.emailLabel}</h3>
              <a
                className="text-muted-foreground hover:text-foreground"
                href={`mailto:${companyInfo.email}`}
              >
                {companyInfo.email}
              </a>
            </div>
          )}
          {companyInfo.showAddress && companyInfo.address && (
            <div>
              <h3 className="font-semibold">{contact.contactDetails?.addressLabel}</h3>
              <p className="text-muted-foreground">{companyInfo.address}</p>
            </div>
          )}
          {companyInfo.hours && (
            <div>
              <h3 className="font-semibold">{contact.contactDetails?.hoursLabel}</h3>
              <p className="whitespace-pre-line text-muted-foreground">{companyInfo.hours}</p>
            </div>
          )}
        </div>

        <ContactForm />
      </section>

      <ServiceAreaSection
        areaLabel={serviceArea.label}
        background="accent"
        heading={serviceArea.heading}
        latitude={companyInfo.latitude}
        longitude={companyInfo.longitude}
        radiusKm={companyInfo.serviceRadiusKm}
        suburbs={serviceArea.suburbs ?? []}
      />
    </>
  )
}
