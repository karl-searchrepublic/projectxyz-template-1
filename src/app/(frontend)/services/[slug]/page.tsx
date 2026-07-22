import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { PageIntro } from '@/components/PageIntro'
import type { Media, Service } from '@/payload-types'

async function getService(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const result = await payload.find({ collection: 'services', limit: 100 })

  return result.docs.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)

  return { title: service?.title ?? 'Service' }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const heroImage =
    service.heroImage && typeof service.heroImage === 'object'
      ? (service.heroImage as Media)
      : null

  const relatedServices = (service.relatedServices ?? []).filter(
    (related): related is Service => typeof related === 'object',
  )

  return (
    <>
      <PageIntro eyebrow={service.eyebrow} headline={service.title} subtext={service.subtext} />

      {heroImage?.url && (
        <div className="service-detail__hero-image">
          <Image
            alt={heroImage.alt}
            height={heroImage.height ?? 480}
            src={heroImage.url}
            width={heroImage.width ?? 960}
          />
        </div>
      )}

      <section className="service-detail__description">
        <p>{service.description}</p>
      </section>

      {service.whatsIncluded && service.whatsIncluded.length > 0 && (
        <section className="service-detail__whats-included">
          <h2>What&apos;s Included</h2>
          <ul>
            {service.whatsIncluded.map((entry) => (
              <li key={entry.id ?? entry.item}>{entry.item}</li>
            ))}
          </ul>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="service-detail__related">
          <h2>Related Services</h2>
          <div className="service-detail__related-list">
            {relatedServices.map((related) => (
              <Link href={`/services/${related.slug}`} key={related.id}>
                {related.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
