'use client'

import { useActionState } from 'react'

import { submitContactForm, type ContactFormState } from '@/app/(frontend)/contact/actions'

const initialState: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    <form action={formAction} className="contact-form">
      <label htmlFor="name">Name</label>
      <input id="name" name="name" required type="text" />

      <label htmlFor="phone">Phone</label>
      <input id="phone" name="phone" type="tel" />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" required type="email" />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required rows={5} />

      <button disabled={isPending} type="submit">
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {state.status !== 'idle' && (
        <p className={`contact-form__status contact-form__status--${state.status}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}
