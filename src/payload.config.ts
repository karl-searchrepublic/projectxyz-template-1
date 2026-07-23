import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { ServicesPage } from './globals/ServicesPage'
import { ContactPage } from './globals/ContactPage'
import { Theme } from './globals/Theme'
import { CompanyInfo } from './globals/CompanyInfo'
import { Testimonials } from './globals/Testimonials'
import { ServiceArea } from './globals/ServiceArea'
import { TrustStrip } from './globals/TrustStrip'
import { seed } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, ContactSubmissions],
  globals: [
    CompanyInfo,
    Theme,
    Header,
    Footer,
    HomePage,
    AboutPage,
    ServicesPage,
    ContactPage,
    TrustStrip,
    Testimonials,
    ServiceArea,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  onInit: seed,
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
