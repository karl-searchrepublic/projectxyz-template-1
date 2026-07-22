import { getPayload } from 'payload'

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
        <section className="emergency-callout">
          <p>{contact.emergencyCallout.message}</p>
          {contact.emergencyCallout.phone && (
            <a href={`tel:${contact.emergencyCallout.phone.replace(/[^\d+]/g, '')}`}>
              {contact.emergencyCallout.phone}
            </a>
          )}
        </section>
      )}

      <PageIntro
        eyebrow={contact.pageIntro?.eyebrow}
        headline={contact.pageIntro?.headline ?? 'Contact Us'}
        subtext={contact.pageIntro?.subtext}
      />

      <section className="contact-content">
        <ContactForm />

        <div className="contact-details">
          {contact.contactDetails?.phone && (
            <div>
              <h3>{contact.contactDetails.phoneLabel}</h3>
              <p>{contact.contactDetails.phone}</p>
            </div>
          )}
          {contact.contactDetails?.email && (
            <div>
              <h3>{contact.contactDetails.emailLabel}</h3>
              <p>{contact.contactDetails.email}</p>
            </div>
          )}
          {contact.contactDetails?.address && (
            <div>
              <h3>{contact.contactDetails.addressLabel}</h3>
              <p>{contact.contactDetails.address}</p>
            </div>
          )}
          {contact.contactDetails?.hours && (
            <div>
              <h3>{contact.contactDetails.hoursLabel}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{contact.contactDetails.hours}</p>
            </div>
          )}
        </div>

        <div className="contact-map-placeholder">
          {contact.mapPlaceholder?.embedUrl ? (
            <iframe
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
        <section className="service-area">
          <h2>{contact.serviceAreaHeading}</h2>
          <div className="service-area__chips">
            {contact.serviceAreaSuburbs.map((suburb) => (
              <Chip key={suburb.id ?? suburb.name} label={suburb.name} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
