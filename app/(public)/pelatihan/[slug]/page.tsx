import { createClient, createStaticClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = false

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return []
  const supabase = createStaticClient()
  const { data } = await supabase.from('pelatihan').select('slug')
  return (data || []).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('pelatihan').select('name, description').eq('slug', slug).single()
  if (!data) return {}
  return { title: data.name }
}

export default async function PelatihanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const [{ data: p }, { data: settingsData }] = await Promise.all([
    supabase.from('pelatihan').select('*').eq('slug', slug).single(),
    supabase.from('settings').select('key, value'),
  ])
  if (!p) notFound()

  const settings = Object.fromEntries((settingsData || []).map(r => [r.key, r.value]))
  const wa = settings.whatsapp_number || '6281234567890'

  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 40, borderBottom: '1px solid var(--glass-border-subtle)' }}>
        <div className="container">
          <Link href="/pelatihan" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Pelatihan
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div style={{ borderRadius: 'var(--radius-card-lg)', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', aspectRatio: '4/3', position: 'relative' }}>
              {p.badge && <span className="badge badge-red" style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>{p.badge}</span>}
              {p.image_url
                ? <Image src={p.image_url} alt={p.name} fill style={{ objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-graduation-cap" style={{ fontSize: '3rem', color: 'var(--text-muted)', opacity: 0.3 }}></i></div>
              }
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginBottom: 20 }}>{p.name}</h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
                {[['Lokasi Ichibot', p.price_ichibot], ['In-House', p.price_inhouse], ['Durasi', p.duration], ['Kapasitas', p.capacity]].map(([label, val]) => val && (
                  <div key={label} className="glass-card" style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card" style={{ padding: 22, marginBottom: 28 }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{p.description}</p>
              </div>

              <a href={`https://wa.me/${wa}?text=${encodeURIComponent(p.whatsapp_text || `Halo Ichibot, saya ingin daftar pelatihan ${p.name}`)}`} target="_blank" rel="noopener" className="btn btn-red btn-lg">
                <i className="fa-brands fa-whatsapp"></i> Daftar Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {(p.specs_col1?.length > 0 || p.specs_col2?.length > 0) && (
        <section className="section">
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: 32 }}>Detail Program</h2>
            <div className="glass-card" style={{ padding: '32px 48px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {[p.specs_col1, p.specs_col2].map((col, ci) => (
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
