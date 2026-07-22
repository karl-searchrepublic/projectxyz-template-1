import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { PageIntro } from '@/components/PageIntro'
import { CTABanner } from '@/components/CTABanner'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const about = await payload.findGlobal({ slug: 'about-page' })

  return { title: about.pageIntro?.headline ?? 'About' }
}

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const about = await payload.findGlobal({ slug: 'about-page' })

  const storyImage =
    about.ourStory?.image && typeof about.ourStory.image === 'object'
      ? (about.ourStory.image as Media)
      : null

  return (
    <>
      <PageIntro
        eyebrow={about.pageIntro?.eyebrow}
        headline={about.pageIntro?.headline ?? 'About Us'}
        subtext={about.pageIntro?.subtext}
      />

      <section className="our-story">
        <div className="our-story__text">
          {about.ourStory?.heading && <h2>{about.ourStory.heading}</h2>}
          {about.ourStory?.body && <p>{about.ourStory.body}</p>}
        </div>
        {storyImage?.url && (
          <div className="our-story__image-frame">
            <Image
              alt={storyImage.alt}
              height={storyImage.height ?? 480}
              src={storyImage.url}
              width={storyImage.width ?? 640}
            />
          </div>
        )}
      </section>

      {about.credentialsStrip && about.credentialsStrip.length > 0 && (
        <section className="credentials-strip">
          {about.credentialsStrip.map((credential) => (
            <div className="credentials-strip__item" key={credential.id ?? credential.label}>
              <span className="credentials-strip__value">{credential.value}</span>
              <span className="credentials-strip__label">{credential.label}</span>
            </div>
          ))}
        </section>
      )}

      {about.teamGrid && about.teamGrid.length > 0 && (
        <section className="team-grid">
          {about.teamGrid.map((member) => {
            const photo =
              member.photo && typeof member.photo === 'object' ? (member.photo as Media) : null

            return (
              <div className="team-grid__member" key={member.id ?? member.name}>
                {photo?.url && (
                  <Image
                    alt={photo.alt}
                    height={photo.height ?? 200}
                    src={photo.url}
                    width={photo.width ?? 200}
                  />
                )}
                <h3>{member.name}</h3>
                {member.role && <p>{member.role}</p>}
              </div>
            )
          })}
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
