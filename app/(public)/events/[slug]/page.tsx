import { createClient, createStaticClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const revalidate = false

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return []
  const supabase = createStaticClient()
  const { data } = await supabase.from('events').select('slug')
  return (data || []).map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('events').select('title, description').eq('slug', slug).single()
  if (!data) return {}
  return { title: data.title, description: data.description }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const [{ data: ev }, { data: settingsData }] = await Promise.all([
    supabase.from('events').select('*').eq('slug', slug).single(),
    supabase.from('settings').select('key, value'),
  ])
  if (!ev) notFound()

  const settings = Object.fromEntries((settingsData || []).map(r => [r.key, r.value]))
  const wa = settings.whatsapp_number || '6281234567890'

  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 40, borderBottom: '1px solid var(--glass-border-subtle)' }}>
        <div className="container">
          <Link href="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Events
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div style={{ borderRadius: 'var(--radius-card-lg)', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', aspectRatio: '4/3', position: 'relative' }}>
              {ev.badge && <span className="badge badge-white" style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>{ev.badge}</span>}
              {ev.image_url
                ? <Image src={ev.image_url} alt={ev.title} fill style={{ objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-calendar-days" style={{ fontSize: '3rem', color: 'var(--text-muted)', opacity: 0.3 }}></i></div>
              }
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginBottom: 20 }}>{ev.title}</h1>

              {ev.event_date && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <i className="fa-regular fa-calendar" style={{ color: 'var(--accent-red)' }}></i>
                  {formatDate(ev.event_date)}
                </div>
              )}
              {ev.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--accent-red)' }}></i>
                  {ev.location}
                </div>
              )}

              {ev.description && (
                <div className="glass-card" style={{ padding: 22, marginBottom: 28 }}>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{ev.description}</p>
                </div>
              )}

              <a href={`https://wa.me/${wa}?text=${encodeURIComponent(`Halo Ichibot, saya ingin info tentang event ${ev.title}`)}`} target="_blank" rel="noopener" className="btn btn-red btn-lg">
                <i className="fa-brands fa-whatsapp"></i> Info Lengkap
              </a>
            </div>
          </div>
        </div>
      </section>

      {(ev.specs_col1?.length > 0 || ev.specs_col2?.length > 0) && (
        <section className="section">
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: 32 }}>Detail & Informasi</h2>
            <div className="glass-card" style={{ padding: '32px 48px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {[ev.specs_col1, ev.specs_col2].map((col, ci) => (
                  <ul key={ci} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(col || []).map((item: string, si: number) => (
                      <li key={si} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.95rem' }}>
                        <i className="fa-solid fa-check" style={{ color: 'var(--accent-red)', marginTop: 2, flexShrink: 0 }}></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
