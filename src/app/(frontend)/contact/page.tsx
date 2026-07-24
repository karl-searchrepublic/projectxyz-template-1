import { getPayload } from 'payload'
import { Phone } from 'lucide-react'

import config from '@/payload.config'
import { PageIntro } from '@/components/PageIntro'
import { ContactForm } from '@/components/ContactForm'
import { Chip } from '@/components/Chip'
import { ServiceAreaMap } from '@/components/ServiceAreaMap'

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

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-section-y-lg lg:grid-cols-3">
        <ContactForm />

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
          {companyInfo.address && (
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

        <div className="flex flex-col gap-3">
          {companyInfo.serviceRadiusKm && serviceArea.label && (
            <p className="text-sm font-medium text-muted-foreground">
              Servicing within {companyInfo.serviceRadiusKm}km of {serviceArea.label}
            </p>
          )}

          {companyInfo.latitude && companyInfo.longitude ? (
            <div className="min-h-[320px] overflow-hidden rounded-xl border border-border">
              <ServiceAreaMap
                latitude={companyInfo.latitude}
                longitude={companyInfo.longitude}
                radiusKm={companyInfo.serviceRadiusKm}
              />
            </div>
          ) : contact.mapPlaceholder?.embedUrl ? (
            <div className="min-h-[320px] overflow-hidden rounded-xl border border-border">
              <iframe
                className="h-full w-full"
                height={320}
                loading="lazy"
                src={contact.mapPlaceholder.embedUrl}
                title="Map"
                width="100%"
              />
            </div>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border text-center text-muted-foreground">
              <p>{contact.mapPlaceholder?.placeholderLabel ?? 'Map coming soon'}</p>
            </div>
          )}
        </div>
      </section>

      {serviceArea.suburbs && serviceArea.suburbs.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-section-y-lg">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {contact.serviceAreaHeading}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {serviceArea.suburbs.map((suburb) => (
              <Chip key={suburb.id ?? suburb.name} label={suburb.name} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
