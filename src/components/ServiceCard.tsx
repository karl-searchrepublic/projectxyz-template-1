import Link from 'next/link'

export function ServiceCard({
  icon,
  title,
  description,
  href,
}: {
  icon?: string | null
  title: string
  description?: string | null
  href: string
}) {
  return (
    <Link className="service-card" href={href}>
      {icon && <span className="service-card__icon">{icon}</span>}
      <h3 className="service-card__title">{title}</h3>
      {description && <p className="service-card__description">{description}</p>}
    </Link>
  )
}
