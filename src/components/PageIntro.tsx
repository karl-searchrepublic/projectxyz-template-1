export function PageIntro({
  eyebrow,
  headline,
  subtext,
}: {
  eyebrow?: string | null
  headline: string
  subtext?: string | null
}) {
  return (
    <section className="page-intro">
      {eyebrow && <p className="page-intro__eyebrow">{eyebrow}</p>}
      <h1 className="page-intro__headline">{headline}</h1>
      {subtext && <p className="page-intro__subtext">{subtext}</p>}
    </section>
  )
}
