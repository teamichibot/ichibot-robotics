import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import RevealWrapper from '@/components/ui/RevealWrapper'

export const revalidate = false
export const metadata = { title: 'Program Pelatihan Robot' }

export default async function PelatihanPage() {
  const supabase = await createClient()
  const [{ data: programs }, { data: settingsData }] = await Promise.all([
    supabase.from('pelatihan').select('*').order('sort_order'),
    supabase.from('settings').select('key, value'),
  ])
  const settings = Object.fromEntries((settingsData || []).map(r => [r.key, r.value]))
  const wa = settings.whatsapp_number || '6281234567890'

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Program <span style={{ color: 'var(--accent-red)' }}>Pelatihan</span></h1>
          <p>Belajar langsung dari tim Ichibot. Program intensif dari dasar hingga tingkat kompetisi internasional.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
            {(programs || []).map((p, i) => (
              <RevealWrapper key={p.id} delay={i * 0.1}>
                <div className="glass-card" style={{ overflow: 'hidden', height: '100%', transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
                >
                  <div style={{ aspectRatio: '16/9', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
                    {p.badge && <span className="badge badge-red" style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>{p.badge}</span>}
                    {p.image_url
                      ? <Image src={p.image_url} alt={p.name} fill style={{ objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}><i className="fa-solid fa-graduation-cap" style={{ fontSize: '2rem', opacity: 0.3 }}></i></div>
                    }
                  </div>
                  <div style={{ padding: '24px 26px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 10 }}>{p.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.65, marginBottom: 20 }}>{p.description}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                      {[['Lokasi Ichibot', p.price_ichibot], ['In-House', p.price_inhouse], ['Durasi', p.duration], ['Kapasitas', p.capacity]].map(([label, val]) => val && (
                        <div key={label} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border-subtle)', borderRadius: 8, padding: '10px 12px' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{label}</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600 }}>{val}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <Link href={`/pelatihan/${p.slug}`} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Detail</Link>
                      <a href={`https://wa.me/${wa}?text=${encodeURIComponent(p.whatsapp_text || `Halo Ichibot, saya ingin daftar pelatihan ${p.name}`)}`} target="_blank" rel="noopener" className="btn btn-red btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                        <i className="fa-brands fa-whatsapp"></i> Daftar
                      </a>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
