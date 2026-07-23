import type { Payload } from 'payload'

const services = [
  {
    title: 'Blocked Drains',
    slug: 'blocked-drains',
    eyebrow: 'Drainage',
    icon: '🚰',
    subtext: 'Fast, reliable clearing for blocked and slow-running drains.',
    description:
      'Blocked drains can bring a household or business to a standstill. Our team uses CCTV drain cameras and high-pressure water jetting to find the cause of the blockage and clear it quickly, without unnecessary digging.',
    whatsIncluded: [
      { item: 'CCTV drain inspection' },
      { item: 'High-pressure water jetting' },
      { item: 'Root and debris removal' },
      { item: 'Follow-up drain camera report' },
    ],
  },
  {
    title: 'Hot Water Systems',
    slug: 'hot-water-systems',
    eyebrow: 'Hot Water',
    icon: '🔥',
    subtext: 'Installation, repair, and replacement for all hot water system types.',
    description:
      'From electric and gas storage tanks to continuous flow and heat pump systems, we install, service, and repair hot water systems of every type and brand, with same-day emergency callouts available.',
    whatsIncluded: [
      { item: 'System diagnosis and repair' },
      { item: 'Full replacement and installation' },
      { item: 'Gas, electric, solar, and heat pump systems' },
      { item: 'Same-day emergency service' },
    ],
  },
  {
    title: 'Leak Detection',
    slug: 'leak-detection',
    eyebrow: 'Leak Detection',
    icon: '💧',
    subtext: 'Non-invasive leak detection to find hidden leaks before they cause damage.',
    description:
      'Hidden leaks behind walls, under slabs, or underground can waste thousands of litres of water and cause serious damage. We use acoustic listening devices and thermal imaging to pinpoint leaks without unnecessary excavation.',
    whatsIncluded: [
      { item: 'Acoustic leak detection' },
      { item: 'Thermal imaging inspection' },
      { item: 'Underground and slab leak detection' },
      { item: 'Detailed findings report' },
    ],
  },
]

export const seed = async (payload: Payload): Promise<void> => {
  const { totalDocs: serviceCount } = await payload.count({ collection: 'services' })

  if (serviceCount === 0) {
    payload.logger.info('Seeding services collection...')
    for (const service of services) {
      await payload.create({ collection: 'services', data: service })
    }
  }

  const { docs: allServices } = await payload.find({ collection: 'services', limit: 100 })

  const header = await payload.findGlobal({ slug: 'header' })
  if (!header.siteName) {
    payload.logger.info('Seeding header global...')
    await payload.updateGlobal({
      slug: 'header',
      data: {
        siteName: 'ProjectXYZ Plumbing',
        metaDescription:
          'Fast, reliable plumbing services for homes and businesses. Licensed, insured, and available for emergency callouts.',
        navLinks: [
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' },
        ],
        ctaLabel: 'Get a Quote',
        ctaHref: '/contact',
        callButtonLabel: 'Call Now',
      },
    })
  } else if (!header.metaDescription) {
    // Backfill: metaDescription was added after header was first seeded elsewhere
    payload.logger.info('Backfilling header.metaDescription...')
    await payload.updateGlobal({
      slug: 'header',
      data: {
        metaDescription:
          'Fast, reliable plumbing services for homes and businesses. Licensed, insured, and available for emergency callouts.',
      },
    })
  }

  const footer = await payload.findGlobal({ slug: 'footer' })
  if (!footer.copyrightText) {
    payload.logger.info('Seeding footer global...')
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        copyrightText: `© ${new Date().getFullYear()} ProjectXYZ Plumbing. All rights reserved.`,
        navLinks: [
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    })
  }

  const homePage = await payload.findGlobal({ slug: 'home-page' })
  if (!homePage.hero?.headline) {
    payload.logger.info('Seeding home-page global...')
    await payload.updateGlobal({
      slug: 'home-page',
      data: {
        hero: {
          headline: 'Fast, reliable plumbing when you need it most',
          subtext:
            'From blocked drains to full hot water system installs, our licensed team gets the job done right the first time.',
          primaryCta: { label: 'Get a Quote', href: '/contact' },
        },
        servicesPreview: {
          heading: 'Our Services',
          subtext: 'A few of the ways we help keep your home or business running smoothly.',
          featuredServices: allServices.map((service) => service.id),
          viewAllLabel: 'View All Services',
          readMoreLabel: 'Read more',
        },
        trustStripHeading: 'Why Choose Us',
        serviceAreaHeading: 'Where We Service',
        finalCta: {
          heading: 'Ready to get started?',
          subtext: 'Get in touch for a fast, free quote on your next job.',
          buttonLabel: 'Get a Quote',
          buttonHref: '/contact',
        },
      },
    })
  } else if (!homePage.finalCta?.heading || !homePage.servicesPreview?.featuredServices?.length) {
    // Backfill: unlike heading/viewAllLabel/trustStripHeading (which have a
    // defaultValue and get backfilled automatically when the migration adds
    // the column), featuredServices and finalCta have no default, so a
    // home-page doc that existed before these fields were added needs this.
    payload.logger.info('Backfilling home-page featuredServices/finalCta...')
    await payload.updateGlobal({
      slug: 'home-page',
      data: {
        servicesPreview: {
          ...homePage.servicesPreview,
          subtext:
            homePage.servicesPreview?.subtext ??
            'A few of the ways we help keep your home or business running smoothly.',
          featuredServices: allServices.map((service) => service.id),
        },
        finalCta: {
          heading: 'Ready to get started?',
          subtext: 'Get in touch for a fast, free quote on your next job.',
          buttonLabel: 'Get a Quote',
          buttonHref: '/contact',
        },
      },
    })
  }

  const aboutPage = await payload.findGlobal({ slug: 'about-page' })
  if (!aboutPage.pageIntro?.headline) {
    payload.logger.info('Seeding about-page global...')
    await payload.updateGlobal({
      slug: 'about-page',
      data: {
        pageIntro: {
          eyebrow: 'About Us',
          headline: 'Local plumbers, doing things properly',
          subtext:
            "We've been keeping local homes and businesses running smoothly for years, one job at a time.",
        },
        ourStory: {
          heading: 'Our Story',
          body: 'Founded by tradespeople who were tired of rushed jobs and callback fees, we built a plumbing company around doing the job right the first time. Today our licensed team handles everything from blocked drains to full hot water system installs.',
        },
        teamGrid: [],
        finalCta: {
          heading: 'Ready to get started?',
          subtext: 'Get in touch for a fast, free quote on your next job.',
          buttonLabel: 'Contact Us',
          buttonHref: '/contact',
        },
      },
    })
  }

  const companyStats = await payload.findGlobal({ slug: 'company-stats' })
  if (!companyStats.stats || companyStats.stats.length === 0) {
    payload.logger.info('Seeding company-stats global...')
    await payload.updateGlobal({
      slug: 'company-stats',
      data: {
        stats: [
          { label: 'Years in business', value: '15+' },
          { label: 'Licensed & insured', value: '100%' },
          { label: 'Jobs completed', value: '10,000+' },
          { label: 'Average response time', value: '< 2 hrs' },
        ],
      },
    })
  }

  const companyInfo = await payload.findGlobal({ slug: 'company-info' })
  if (!companyInfo.phone) {
    payload.logger.info('Seeding company-info global...')
    await payload.updateGlobal({
      slug: 'company-info',
      data: {
        phone: '(555) 123-4567',
        email: 'hello@projectxyz.example',
        address: '123 Example Street, Your Town',
        hours: 'Mon-Fri: 7am-5pm\nSat: 8am-1pm\nSun: Emergency callouts only',
        serviceAreaSuburbs: [
          { name: 'Downtown' },
          { name: 'Riverside' },
          { name: 'Northgate' },
          { name: 'Eastwood' },
          { name: 'Fairview' },
          { name: 'Lakeside' },
        ],
      },
    })
  } else if (!companyInfo.serviceAreaSuburbs || companyInfo.serviceAreaSuburbs.length === 0) {
    // Backfill: serviceAreaSuburbs moved here from contact-page (whose old table gets
    // dropped in the same deploy), so a pre-existing company-info doc — one that already
    // has phone set and therefore skips the block above — would otherwise lose its
    // suburbs entirely instead of carrying them over to the new field location.
    payload.logger.info('Backfilling company-info.serviceAreaSuburbs...')
    await payload.updateGlobal({
      slug: 'company-info',
      data: {
        serviceAreaSuburbs: [
          { name: 'Downtown' },
          { name: 'Riverside' },
          { name: 'Northgate' },
          { name: 'Eastwood' },
          { name: 'Fairview' },
          { name: 'Lakeside' },
        ],
      },
    })
  }

  const servicesPage = await payload.findGlobal({ slug: 'services-page' })
  if (!servicesPage.pageIntro?.headline) {
    payload.logger.info('Seeding services-page global...')
    await payload.updateGlobal({
      slug: 'services-page',
      data: {
        pageIntro: {
          eyebrow: 'Services',
          headline: 'Plumbing services you can rely on',
          subtext: 'From urgent repairs to full installations, we cover it all.',
        },
        howItWorksHeading: 'How It Works',
        howItWorks: [
          {
            title: '1. Get in touch',
            description: 'Call, email, or fill out our contact form to describe the job.',
          },
          {
            title: '2. We assess the job',
            description: 'We confirm scope and provide an upfront, no-obligation quote.',
          },
          {
            title: '3. We get it done',
            description: 'Our licensed team completes the work and cleans up after themselves.',
          },
        ],
        faqHeading: 'Frequently Asked Questions',
        faq: [
          {
            question: 'Do you offer emergency callouts?',
            answer: 'Yes, we offer same-day emergency service for urgent plumbing issues.',
          },
          {
            question: 'Are your plumbers licensed?',
            answer: 'All of our plumbers are fully licensed and insured.',
          },
          {
            question: 'Do you provide upfront pricing?',
            answer: 'Yes, we always confirm pricing with you before starting any work.',
          },
        ],
        whatsIncludedHeading: "What's Included",
        relatedServicesHeading: 'Related Services',
        finalCta: {
          heading: 'Need a hand with a plumbing job?',
          subtext: 'Reach out today and we will get back to you fast.',
          buttonLabel: 'Get a Quote',
          buttonHref: '/contact',
        },
      },
    })
  }
  // No backfill needed for howItWorksHeading/faqHeading/whatsIncludedHeading/
  // relatedServicesHeading: each has a defaultValue, so Postgres backfills
  // the column itself when the migration adds it — even on a pre-existing doc.

  const contactPage = await payload.findGlobal({ slug: 'contact-page' })
  if (!contactPage.pageIntro?.headline) {
    payload.logger.info('Seeding contact-page global...')
    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        emergencyCallout: {
          show: true,
          message: 'Got a plumbing emergency? Call us now, we are available 24/7.',
        },
        pageIntro: {
          eyebrow: 'Contact',
          headline: "Let's talk about your job",
          subtext: 'Send us a message or reach out directly, we typically reply within the hour.',
        },
        contactDetails: {
          phoneLabel: 'Phone',
          emailLabel: 'Email',
          addressLabel: 'Address',
          hoursLabel: 'Hours',
        },
        mapPlaceholder: {
          placeholderLabel: 'Map coming soon',
        },
        serviceAreaHeading: 'Areas We Service',
      },
    })
  }
  // No backfill needed for contactDetails.*Label or serviceAreaHeading: each
  // has a defaultValue, so Postgres backfills the column itself when the
  // migration adds it — even on a pre-existing doc.
}
