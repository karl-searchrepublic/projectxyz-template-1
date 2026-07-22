/** Picks black or white text for readable contrast against a given hex background color. */
export function getContrastColor(hex: string): string {
  const parsed = hex.replace('#', '')
  const full =
    parsed.length === 3
      ? parsed
          .split('')
          .map((char) => char + char)
          .join('')
      : parsed

  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)

  if ([r, g, b].some((value) => Number.isNaN(value))) {
    return '#ffffff'
  }

  // Relative luminance (WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.6 ? '#000000' : '#ffffff'
}
