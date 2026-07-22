import { revalidatePath } from 'next/cache'

/**
 * Runs on save for any global/collection that feeds the frontend. Revalidating the
 * root layout invalidates every page below it, since they all share it.
 *
 * Wrapped in try/catch because this also fires during onInit seeding at build time,
 * outside a live request context, where revalidatePath has nothing to invalidate yet.
 */
export const revalidateFrontend = () => {
  try {
    revalidatePath('/', 'layout')
  } catch (err) {
    console.warn('[revalidateFrontend] skipped:', err instanceof Error ? err.message : err)
  }
}
