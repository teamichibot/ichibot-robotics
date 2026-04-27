import { createClient, createStaticClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import RevealWrapper from '@/components/ui/RevealWrapper'

export const revalidate = false

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return []
  const supabase = createStaticClient()
  const { data } = await supabase.from('products').select('slug')
  return (data || []).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('name, description').eq('slug', slug).single()
  if (!data) return {}
  return { title: data.name, description: data.description }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const [{ data: product }, { data: settingsData }] = await Promise.all([
    supabase.from('products').select('*').eq('slug', slug).single(),
    supabase.from('settings').select('key, value'),
  ])
  if (!product) notFound()

  const settings = Object.fromEntries((settingsData || []).map(r => [r.key, r.value]))
  const wa = settings.whatsapp_number || '6281234567890'

  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 40, borderBottom: '1px solid var(--glass-border-subtle)' }}>
        <div className="container">
          <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Produk
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64 }}>
            <RevealWrapper className="reveal-d1">
              <div style={{ borderRadius: 'var(--radius-card-lg)', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', boxShadow: 'var(--shadow-card)', position: 'relative', aspectRatio: '1' }}>
                {product.badge && <span className="badge badge-white" style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>{product.badge}</span>}
                {product.image_url
                  ? <Image src={product.image_url} alt={product.name} fill style={{ objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>{product.name}</div>
                }
              </div>
            </RevealWrapper>

            <RevealWrapper className="reveal-d2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginBottom: 16 }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                {product.price && <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-red-light)' }}>{product.price}</span>}
                {product.price_original && <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{product.price_original}</span>}
              </div>

              <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: 10 }}>Deskripsi Singkat</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{product.description}</p>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${wa}?text=${encodeURIComponent(product.whatsapp_text || `Halo Ichibot, saya ingin memesan ${product.name}`)}`}
                  target="_blank" rel="noopener"
                  className="btn btn-red btn-lg"
                  style={{ flex: 1, minWidth: 180 }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Pesan Sekarang
                </a>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Specs */}
      {(product.specs_col1?.length > 0 || product.specs_col2?.length > 0) && (
        <section className="section">
          <div className="container">
            <RevealWrapper>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: 32 }}>Spesifikasi Lengkap</h2>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <div className="glass-card" style={{ padding: '32px 48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  {[product.specs_col1, product.specs_col2].map((col, ci) => (
                    <ul key={ci} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {(col || []).map((spec: string, si: number) => (
                        <li key={si} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.95rem' }}>
                          <i className="fa-solid fa-check" style={{ color: 'var(--accent-red)', marginTop: 2, flexShrink: 0 }}></i>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          </div>
        </section>
      )}
    </>
  )
}
