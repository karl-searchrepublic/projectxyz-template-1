import type { Payload } from 'payload'

import { SERVICE_ICON_OPTIONS } from './lib/serviceIcons'
import type { Service } from './payload-types'

const services = [
  {
    title: 'Blocked Drains',
    slug: 'blocked-drains',
    icon: 'waves' as const,
    subtext: 'Fast, reliable clearing for blocked and slow-running drains.',
    metaDescription:
      'Fast, reliable blocked drain clearing using CCTV drain cameras and high-pressure water jetting. Licensed and available for emergency callouts.',
    descriptionHeading: 'Overview',
    description:
      'Blocked drains can bring a household or business to a standstill. Our team uses CCTV drain cameras and high-pressure water jetting to find the cause of the blockage and clear it quickly, without unnecessary digging.',
    whatsIncluded: [
      { item: 'CCTV drain inspection' },
      { item: 'High-pressure water jetting' },
      { item: 'Root and debris removal' },
      { item: 'Follow-up drain camera report' },
    ],
    faq: [
      {
        question: 'How do you find the cause of a blocked drain?',
        answer:
          'We start with a CCTV drain camera to see exactly where the blockage is and what is causing it before we recommend a fix.',
      },
      {
        question: 'Will you need to dig up my yard?',
        answer:
          'Usually not. High-pressure water jetting clears most blockages without any digging, so excavation is only used as a last resort.',
      },
      {
        question: 'How much does it cost to clear a blocked drain?',
        answer:
          'Costs vary depending on the location and severity of the blockage, but we always provide an upfront quote before starting any work.',
      },
      {
        question: 'Can tree roots cause a blocked drain?',
        answer:
          'Yes, tree roots are one of the most common causes of blocked drains, especially in older clay pipes. Our CCTV camera can confirm if roots are the issue.',
      },
      {
        question: 'How can I stop my drains from blocking again?',
        answer:
          'Avoid pouring fats, oils, and wipes down the drain, and consider a scheduled drain clean if blockages keep recurring.',
      },
    ],
  },
  {
    title: 'Hot Water Systems',
    slug: 'hot-water-systems',
    icon: 'flame' as const,
    subtext: 'Installation, repair, and replacement for all hot water system types.',
    metaDescription:
      'Hot water system installation, repair, and replacement for gas, electric, solar, and heat pump systems, with same-day emergency service.',
    descriptionHeading: 'Overview',
    description:
      'From electric and gas storage tanks to continuous flow and heat pump systems, we install, service, and repair hot water systems of every type and brand, with same-day emergency callouts available.',
    whatsIncluded: [
      { item: 'System diagnosis and repair' },
      { item: 'Full replacement and installation' },
      { item: 'Gas, electric, solar, and heat pump systems' },
      { item: 'Same-day emergency service' },
    ],
    faq: [
      {
        question: 'How long does a hot water system installation take?',
        answer:
          'Most replacements are completed in a single day, so you are rarely without hot water for long.',
      },
      {
        question: 'Which type of hot water system is right for me?',
        answer:
          'It depends on your household size, energy costs, and available space. We can talk you through the options during a quote.',
      },
      {
        question: 'How often should a hot water system be serviced?',
        answer:
          'Most systems benefit from an annual service to check the anode, pressure valve, and overall condition, which helps avoid breakdowns.',
      },
      {
        question: 'What size hot water system do I need?',
        answer:
          'This depends on your household size and hot water usage. We can recommend the right capacity when we quote your job.',
      },
      {
        question: 'Do you offer emergency hot water repairs?',
        answer: 'Yes, we offer same-day emergency callouts for hot water system failures.',
      },
    ],
  },
  {
    title: 'Leak Detection',
    slug: 'leak-detection',
    icon: 'droplets' as const,
    subtext: 'Non-invasive leak detection to find hidden leaks before they cause damage.',
    metaDescription:
      'Non-invasive leak detection using acoustic listening devices and thermal imaging to find hidden leaks before they cause serious damage.',
    descriptionHeading: 'Overview',
    description:
      'Hidden leaks behind walls, under slabs, or underground can waste thousands of litres of water and cause serious damage. We use acoustic listening devices and thermal imaging to pinpoint leaks without unnecessary excavation.',
    whatsIncluded: [
      { item: 'Acoustic leak detection' },
      { item: 'Thermal imaging inspection' },
      { item: 'Underground and slab leak detection' },
      { item: 'Detailed findings report' },
    ],
    faq: [
      {
        question: 'How can you find a leak without digging up my property?',
        answer:
          'Acoustic listening devices and thermal imaging let us pinpoint a leak\'s location accurately, so we only dig where we need to.',
      },
      {
        question: 'What are the signs I might have a hidden leak?',
        answer:
          'An unusually high water bill, damp patches on walls or floors, or the sound of running water when everything is turned off are all common signs.',
      },
      {
        question: 'How long does a leak detection inspection take?',
        answer:
          'Most inspections take between one and two hours, depending on the size of the property and how many areas need checking.',
      },
      {
        question: 'Can a hidden leak really increase my water bill that much?',
        answer:
          'Yes, even a small, continuous leak can waste thousands of litres of water over a few months, which shows up as a noticeably higher bill.',
      },
      {
        question: 'What happens after you find the leak?',
        answer:
          'We will explain exactly where the leak is and provide an upfront quote to repair it, so there are no surprises.',
      },
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

  // Backfill: icon switched from free-text emoji to a select field with a
  // fixed set of values, so pre-existing docs with the old emoji strings
  // would show up as unset in the admin dropdown until manually re-picked.
  const validIconValues = new Set(SERVICE_ICON_OPTIONS.map((option) => option.value))
  const iconBackfillBySlug: Record<string, Service['icon']> = {
    'blocked-drains': 'waves',
    'hot-water-systems': 'flame',
    'leak-detection': 'droplets',
  }
  for (const service of allServices) {
    const newIcon = iconBackfillBySlug[service.slug]
    if (newIcon && !validIconValues.has(service.icon ?? '')) {
      payload.logger.info(`Backfilling icon for service "${service.slug}"...`)
      await payload.update({ collection: 'services', id: service.id, data: { icon: newIcon } })
    }
  }

  const header = await payload.findGlobal({ slug: 'header' })
  if (!header.ctaLabel) {
    payload.logger.info('Seeding header global...')
    await payload.updateGlobal({
      slug: 'header',
      data: {
        ctaLabel: 'Get a Quote',
        ctaHref: '/contact',
        callButtonLabel: 'Call Now',
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
      },
    })
  }

  const siteNav = await payload.findGlobal({ slug: 'site-nav' })
  if (!siteNav.navLinks || siteNav.navLinks.length === 0) {
    payload.logger.info('Seeding site-nav global...')
    await payload.updateGlobal({
      slug: 'site-nav',
      data: {
        navLinks: [
          { label: 'About', page: '/about' },
          { label: 'Services', page: '/services' },
          { label: 'Contact', page: '/contact' },
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
        metaDescription:
          'Fast, reliable plumbing services for homes and businesses. Licensed, insured, and available for emergency callouts.',
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
        finalCta: {
          heading: 'Ready to get started?',
          subtext: 'Get in touch for a fast, free quote on your next job.',
          buttonLabel: 'Get a Quote',
          buttonHref: '/contact',
        },
      },
    })
  } else if (!homePage.finalCta?.heading || !homePage.servicesPreview?.featuredServices?.length) {
    // Backfill: unlike heading/viewAllLabel (which have a
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
  if (!aboutPage.hero?.headline) {
    payload.logger.info('Seeding about-page global...')
    await payload.updateGlobal({
      slug: 'about-page',
      data: {
        metaDescription:
          "Meet the licensed, insured team behind ProjectXYZ Plumbing and learn how we've been keeping local homes and businesses running smoothly for years.",
        hero: {
          headline: 'Local plumbers, doing things properly',
          subtext:
            "We've been keeping local homes and businesses running smoothly for years, one job at a time.",
          primaryCta: { label: 'Get a Quote', href: '/contact' },
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

  const trustStrip = await payload.findGlobal({ slug: 'trust-strip' })
  if (!trustStrip.stats || trustStrip.stats.length === 0) {
    payload.logger.info('Seeding trust-strip global...')
    await payload.updateGlobal({
      slug: 'trust-strip',
      data: {
        heading: 'Why Choose Us',
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
        businessName: 'ProjectXYZ Plumbing',
        phone: '(555) 123-4567',
        email: 'hello@projectxyz.example',
        address: '123 Example Street, Your Town',
        hours: 'Mon-Fri: 7am-5pm\nSat: 8am-1pm\nSun: Emergency callouts only',
      },
    })
  }

  const serviceArea = await payload.findGlobal({ slug: 'service-area' })
  if (!serviceArea.suburbs || serviceArea.suburbs.length === 0) {
    // The migration that introduced this global already copies any existing
    // suburbs across from Company Info, so this only fires on a genuinely
    // fresh install (or as a safety net if that copy somehow found nothing).
    payload.logger.info('Seeding service-area suburbs...')
    await payload.updateGlobal({
      slug: 'service-area',
      data: {
        suburbs: [
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
  if (!servicesPage.hero?.headline) {
    payload.logger.info('Seeding services-page global...')
    await payload.updateGlobal({
      slug: 'services-page',
      data: {
        metaDescription:
          'Browse our full range of plumbing services, from urgent repairs to full installations, backed by upfront pricing and a licensed, insured team.',
        hero: {
          headline: 'Plumbing services you can rely on',
          subtext: 'From urgent repairs to full installations, we cover it all.',
          primaryCta: { label: 'Get a Quote', href: '/contact' },
        },
        introHeading: 'Our Services',
        introText: 'See below for a full list of the services we provide.',
        whatsIncludedHeading: "What's Included",
        relatedServicesHeading: 'Related Services',
        faqHeading: 'Frequently Asked Questions',
        finalCta: {
          heading: 'Need a hand with a plumbing job?',
          subtext: 'Reach out today and we will get back to you fast.',
          buttonLabel: 'Get a Quote',
          buttonHref: '/contact',
        },
      },
    })
  }
  // No backfill needed for introHeading/introText/whatsIncludedHeading/relatedServicesHeading/faqHeading: each
  // has a defaultValue, so Postgres backfills the column itself when the
  // migration adds it — even on a pre-existing doc.

  const contactPage = await payload.findGlobal({ slug: 'contact-page' })
  if (!contactPage.pageIntro?.headline) {
    payload.logger.info('Seeding contact-page global...')
    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        metaDescription:
          "Get in touch for a fast, free quote. We're available for emergency callouts and typically reply within the hour.",
        emergencyCallout: {
          show: true,
          message: 'Got a plumbing emergency? Call us now, we are available 24/7.',
        },
        pageIntro: {
          headline: "Let's talk about your job",
          subtext: 'Send us a message or reach out directly, we typically reply within the hour.',
        },
        contactDetails: {
          phoneLabel: 'Phone',
          emailLabel: 'Email',
          addressLabel: 'Address',
          hoursLabel: 'Hours',
        },
      },
    })
  }
  // No backfill needed for contactDetails.*Label: each has a defaultValue,
  // so Postgres backfills the column itself when the migration adds it —
  // even on a pre-existing doc.
}
