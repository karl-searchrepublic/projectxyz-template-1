'use client'

import { useActionState } from 'react'

import { submitContactForm, type ContactFormState } from '@/app/(frontend)/contact/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const initialState: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required type="text" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" required type="email" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required rows={5} />
      </div>

      <Button className="mt-2 self-start" disabled={isPending} type="submit">
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>

      {state.status !== 'idle' && (
        <p
          className={cn(
            'text-sm',
            state.status === 'success' ? 'text-green-600' : 'text-destructive',
          )}
        >
          {state.message}
        </p>
      )}
    </form>
  )
}
