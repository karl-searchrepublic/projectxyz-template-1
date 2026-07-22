import { getPayload } from 'payload'

import config from '@/payload.config'
import { Hero } from '@/components/Hero'
import './styles.css'

export default async function Page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const homePage = await payload.findGlobal({ slug: 'home-page' })

  return <Hero data={homePage.hero} />
}
