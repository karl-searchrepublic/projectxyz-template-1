import Link from 'next/link'

export function CTABanner({
  heading,
  subtext,
  buttonLabel,
  buttonHref,
}: {
  heading?: string | null
  subtext?: string | null
  buttonLabel?: string | null
  buttonHref?: string | null
}) {
  if (!heading && !buttonLabel) return null

  return (
    <section className="cta-banner">
      {heading && <h2 className="cta-banner__heading">{heading}</h2>}
      {subtext && <p className="cta-banner__subtext">{subtext}</p>}
      {buttonLabel && buttonHref && (
        <Link className="cta-banner__button" href={buttonHref}>
          {buttonLabel}
        </Link>
      )}
    </section>
  )
}
