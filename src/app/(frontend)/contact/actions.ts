'use server'

import { getPayload } from 'payload'

import config from '@/payload.config'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in your name, email, and message.' }
  }

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    await payload.create({
      collection: 'contact-submissions',
      data: { name, phone, email, message },
    })

    return { status: 'success', message: 'Thanks! We will be in touch shortly.' }
  } catch {
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}
