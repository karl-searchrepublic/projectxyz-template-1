import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { Hero } from '@/components/Hero'
import { CTABanner } from '@/components/CTABanner'
import { CredentialsStrip } from '@/components/CredentialsStrip'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const about = await payload.findGlobal({ slug: 'about-page' })

  return { description: about.metaDescription, title: about.hero?.headline ?? 'About' }
}

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [about, trustStrip, companyInfo] = await Promise.all([
    payload.findGlobal({ slug: 'about-page' }),
    payload.findGlobal({ slug: 'trust-strip' }),
    payload.findGlobal({ slug: 'company-info' }),
  ])

  const storyImage =
    about.ourStory?.image && typeof about.ourStory.image === 'object'
      ? (about.ourStory.image as Media)
      : null

  return (
    <>
      <Hero data={about.hero} phone={companyInfo.phone} />

      <section className="mx-auto max-w-6xl px-6 py-section-y-lg">
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          <div className="flex-1">
            {about.ourStory?.heading && (
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                {about.ourStory.heading}
              </h2>
            )}
            {about.ourStory?.body && (
              <p className="text-lg text-muted-foreground">{about.ourStory.body}</p>
            )}
          </div>
          {storyImage?.url && (
            <div className="flex-1 overflow-hidden rounded-xl border border-border">
              <Image
                alt={storyImage.alt}
                height={storyImage.height ?? 480}
                src={storyImage.url}
                width={storyImage.width ?? 640}
              />
            </div>
          )}
        </div>
      </section>

      <CredentialsStrip items={trustStrip.stats ?? []} />

      {about.teamGrid && about.teamGrid.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-section-y-lg">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {about.teamGrid.map((member) => {
              const photo =
                member.photo && typeof member.photo === 'object' ? (member.photo as Media) : null

              return (
                <div
                  className="flex flex-col items-center gap-3 text-center"
                  key={member.id ?? member.name}
                >
                  {photo?.url && (
                    <Image
                      alt={photo.alt}
                      className="rounded-full"
                      height={photo.height ?? 200}
                      src={photo.url}
                      width={photo.width ?? 200}
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    {member.role && <p className="text-sm text-muted-foreground">{member.role}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <CTABanner
        buttonHref={about.finalCta?.buttonHref}
        buttonLabel={about.finalCta?.buttonLabel}
        heading={about.finalCta?.heading}
        subtext={about.finalCta?.subtext}
      />
    </>
  )
}
