export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatDateShort(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr)
  return {
    day:   d.toLocaleDateString('id-ID', { day: '2-digit' }),
    month: d.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase(),
  }
}

export type Settings = Record<string, string>
