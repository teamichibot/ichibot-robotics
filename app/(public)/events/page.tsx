import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { formatDateShort } from '@/lib/utils'

export const revalidate = false
export const metadata = { title: 'Event Update' }

export default async function EventsPage() {
  const supabase = await createClient()
  const { data: events } = await supabase.from('events').select('*').order('event_date')

  const today = new Date().toISOString().split('T')[0]
  const upcoming = (events || []).filter(e => e.event_date >= today)
  const past     = (events || []).filter(e => e.event_date <  today)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Event <span style={{ color: 'var(--accent-red)' }}>Update</span></h1>
          <p>Kompetisi, workshop, dan rilis produk terbaru dari Ichibot Robotics.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {upcoming.length > 0 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>Mendatang</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 56 }}>
                {upcoming.map(ev => <EventCard key={ev.id} ev={ev} />)}
              </div>
            </>
          )}
          {past.length > 0 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>Selesai</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {past.map(ev => <EventCard key={ev.id} ev={ev} muted />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

function EventCard({ ev, muted = false }: { ev: Record<string, unknown>; muted?: boolean }) {
  const d = formatDateShort(ev.event_date as string)
  return (
    <Link href={`/events/${ev.slug}`} style={{ textDecoration: 'none', display: 'block', opacity: muted ? 0.6 : 1 }}>
      <div className="glass-card" style={{ overflow: 'hidden', transition: 'transform 0.3s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
      >
        <div style={{ aspectRatio: '16/9', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
          {(ev.badge as string) && <span className="badge badge-white" style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>{ev.badge as string}</span>}
          {(ev.image_url as string) && <Image src={ev.image_url as string} alt={ev.title as string} fill style={{ objectFit: 'cover' }} />}
        </div>
        <div style={{ padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ background: muted ? 'var(--glass-bg)' : 'rgba(220,30,30,0.1)', border: `1px solid ${muted ? 'var(--glass-border-subtle)' : 'rgba(220,30,30,0.2)'}`, borderRadius: 8, padding: '8px 12px', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, lineHeight: 1, color: muted ? 'var(--text-muted)' : 'var(--accent-red)' }}>{d.day}</div>
            <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', color: muted ? 'var(--text-muted)' : 'var(--accent-red-light)' }}>{d.month}</div>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{ev.title as string}</h3>
            {(ev.location as string) && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{ev.location as string}</p>}
          </div>
        </div>
      </div>
    </Link>
  )
}
