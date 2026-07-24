import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { CheckCircle2 } from 'lucide-react'

import config from '@/payload.config'
import { Hero } from '@/components/Hero'
import type { Service } from '@/payload-types'

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

  return { description: service?.metaDescription, title: service?.title ?? 'Service' }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [service, servicesPage, companyInfo] = await Promise.all([
    getService(slug),
    payload.findGlobal({ slug: 'services-page' }),
    payload.findGlobal({ slug: 'company-info' }),
  ])

  if (!service) {
    notFound()
  }

  const relatedServices = (service.relatedServices ?? []).filter(
    (related): related is Service => typeof related === 'object',
  )

  return (
    <>
      <Hero
        data={{
          headline: service.title,
          subtext: service.subtext,
          image: service.heroImage,
          primaryCta: service.primaryCta,
        }}
        phone={companyInfo.phone}
      />

      <section className="mx-auto max-w-3xl px-6 py-section-y">
        <p className="text-lg text-muted-foreground">{service.description}</p>
      </section>

      {service.whatsIncluded && service.whatsIncluded.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 pb-section-y">
          <h2 className="text-2xl font-bold tracking-tight">{servicesPage.whatsIncludedHeading}</h2>
          <ul className="mt-6 flex flex-col gap-3">
            {service.whatsIncluded.map((entry) => (
              <li className="flex items-center gap-3" key={entry.id ?? entry.item}>
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                {entry.item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 pb-section-y-lg">
          <h2 className="text-2xl font-bold tracking-tight">
            {servicesPage.relatedServicesHeading}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {relatedServices.map((related) => (
              <Link
                className="rounded-full border border-input px-4 py-2 text-sm font-medium no-underline transition-colors hover:bg-accent"
                href={`/services/${related.slug}`}
                key={related.id}
              >
                {related.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
