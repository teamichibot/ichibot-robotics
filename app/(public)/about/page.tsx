import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import RevealWrapper from '@/components/ui/RevealWrapper'

export const revalidate = false
export const metadata = { title: 'Tentang Kami' }

export default async function AboutPage() {
  const supabase = await createClient()
  const [{ data: team }, { data: settingsData }] = await Promise.all([
    supabase.from('team').select('*').order('sort_order'),
    supabase.from('settings').select('key, value'),
  ])
  const settings = Object.fromEntries((settingsData || []).map(r => [r.key, r.value]))

  const pillars = [
    { icon: 'fa-solid fa-microchip', title: 'Inovasi Teknologi', desc: 'Mengembangkan teknologi robotika terdepan yang dapat diakses oleh semua kalangan.' },
    { icon: 'fa-solid fa-users', title: 'Komunitas Kuat', desc: 'Membangun ekosistem robotiker yang saling mendukung dan berkembang bersama.' },
    { icon: 'fa-solid fa-globe', title: 'Jangkauan Global', desc: 'Membawa teknologi robotika Indonesia ke panggung internasional.' },
  ]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Tentang <span style={{ color: 'var(--accent-red)' }}>Ichibot</span></h1>
          <p>Brand robotika kompetitif dari Yogyakarta yang telah menjangkau 17+ negara.</p>
        </div>
      </div>

      {/* Brand Story */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <RevealWrapper>
            <h2 className="section-title" style={{ marginBottom: 24 }}>Cerita <span>Kami</span></h2>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              <p style={{ marginBottom: 18 }}>Ichibot Robotics berdiri dari passion terhadap robotika kompetitif di Yogyakarta. Selama 10+ tahun, kami telah mengembangkan produk robot edukasi yang tidak hanya digunakan untuk belajar, tapi juga untuk menang di kompetisi tingkat nasional dan internasional.</p>
              <p>Dari workshop sederhana di Sleman, kini produk Ichibot telah diekspor ke 17+ negara dan dipercaya oleh 500+ pengguna aktif di seluruh dunia.</p>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border-subtle)', borderBottom: '1px solid var(--glass-border-subtle)' }}>
        <div className="container">
          <RevealWrapper>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>Pilar <span>Kami</span></h2>
          </RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {pillars.map((p, i) => (
              <RevealWrapper key={p.title} delay={i * 0.1}>
                <div className="glass-card" style={{ padding: '32px 28px', textAlign: 'center' }}>
                  <i className={p.icon} style={{ fontSize: '1.8rem', color: 'var(--accent-red)', marginBottom: 18, display: 'block' }}></i>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team && team.length > 0 && (
        <section className="section">
          <div className="container">
            <RevealWrapper>
              <h2 className="section-title" style={{ marginBottom: 48 }}>Tim <span>Kami</span></h2>
            </RevealWrapper>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
              {team.map((member, i) => (
                <RevealWrapper key={member.id} delay={i * 0.08}>
                  <div className="glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', border: '2px solid var(--glass-border)', background: 'var(--bg-elevated)', position: 'relative' }}>
                      {member.avatar_url
                        ? <Image src={member.avatar_url} alt={member.name} fill style={{ objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-red)' }}>{member.name[0]}</div>
                      }
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 4 }}>{member.name}</h3>
                    {member.role && <p style={{ fontSize: '0.8rem', color: 'var(--accent-red-light)', marginBottom: 10 }}>{member.role}</p>}
                    {member.bio && <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6 }}>{member.bio}</p>}
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border-subtle)' }}>
        <div className="container">
          <RevealWrapper>
            <h2 className="section-title" style={{ marginBottom: 32 }}>Workshop & <span>Store</span></h2>
          </RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <RevealWrapper delay={0.1}>
              <div className="glass-card" style={{ padding: '28px 32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Alamat</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{settings.address || 'Yogyakarta, Indonesia'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[['fa-brands fa-whatsapp', `+${settings.whatsapp_number || '6281234567890'}`]].map(([icon, val]) => (
                    <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <i className={icon} style={{ color: 'var(--accent-red)', width: 16, textAlign: 'center' }}></i>
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </RevealWrapper>
            <RevealWrapper delay={0.2}>
              <div className="glass-card" style={{ padding: '28px 32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                {settings.maps_embed_url
                  ? <iframe src={settings.maps_embed_url} width="100%" height="200" style={{ border: 0, borderRadius: 8 }} loading="lazy" />
                  : <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      <i className="fa-solid fa-map-location-dot" style={{ fontSize: '2rem', marginBottom: 10, display: 'block' }}></i>
                      <p style={{ fontSize: '0.85rem' }}>Google Maps belum dikonfigurasi</p>
                    </div>
                }
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>
    </>
  )
}
