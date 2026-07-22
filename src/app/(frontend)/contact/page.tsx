import { getPayload } from 'payload'
import { Phone } from 'lucide-react'

import config from '@/payload.config'
import { PageIntro } from '@/components/PageIntro'
import { ContactForm } from '@/components/ContactForm'
import { Chip } from '@/components/Chip'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const contact = await payload.findGlobal({ slug: 'contact-page' })

  return { title: contact.pageIntro?.headline ?? 'Contact' }
}

export default async function ContactPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const contact = await payload.findGlobal({ slug: 'contact-page' })

  return (
    <>
      {contact.emergencyCallout?.show && (
        <section className="border-b border-border bg-destructive/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6 py-3 text-center">
            <p className="font-medium">{contact.emergencyCallout.message}</p>
            {contact.emergencyCallout.phone && (
              <a
                className="flex items-center gap-1.5 font-semibold text-destructive hover:underline"
                href={`tel:${contact.emergencyCallout.phone.replace(/[^\d+]/g, '')}`}
              >
                <Phone className="size-4" />
                {contact.emergencyCallout.phone}
              </a>
            )}
          </div>
        </section>
      )}

      <PageIntro
        eyebrow={contact.pageIntro?.eyebrow}
        headline={contact.pageIntro?.headline ?? 'Contact Us'}
        subtext={contact.pageIntro?.subtext}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-3">
        <ContactForm />

        <div className="flex flex-col gap-6">
          {contact.contactDetails?.phone && (
            <div>
              <h3 className="font-semibold">{contact.contactDetails.phoneLabel}</h3>
              <p className="text-muted-foreground">{contact.contactDetails.phone}</p>
            </div>
          )}
          {contact.contactDetails?.email && (
            <div>
              <h3 className="font-semibold">{contact.contactDetails.emailLabel}</h3>
              <p className="text-muted-foreground">{contact.contactDetails.email}</p>
            </div>
          )}
          {contact.contactDetails?.address && (
            <div>
              <h3 className="font-semibold">{contact.contactDetails.addressLabel}</h3>
              <p className="text-muted-foreground">{contact.contactDetails.address}</p>
            </div>
          )}
          {contact.contactDetails?.hours && (
            <div>
              <h3 className="font-semibold">{contact.contactDetails.hoursLabel}</h3>
              <p className="whitespace-pre-line text-muted-foreground">
                {contact.contactDetails.hours}
              </p>
            </div>
          )}
        </div>

        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border text-center text-muted-foreground">
          {contact.mapPlaceholder?.embedUrl ? (
            <iframe
              className="h-full w-full rounded-xl"
              height={320}
              loading="lazy"
              src={contact.mapPlaceholder.embedUrl}
              title="Map"
              width="100%"
            />
          ) : (
            <p>{contact.mapPlaceholder?.placeholderLabel ?? 'Map coming soon'}</p>
          )}
        </div>
      </section>

      {contact.serviceAreaSuburbs && contact.serviceAreaSuburbs.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {contact.serviceAreaHeading}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {contact.serviceAreaSuburbs.map((suburb) => (
              <Chip key={suburb.id ?? suburb.name} label={suburb.name} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
