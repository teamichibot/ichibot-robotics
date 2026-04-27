import { createClient } from '@/lib/supabase/server'

export const revalidate = false
export const metadata = { title: 'Komunitas Ichibot' }

export default async function CommunityPage() {
  const supabase = await createClient()
  const { data: settingsData } = await supabase.from('settings').select('key, value')
  const settings = Object.fromEntries((settingsData || []).map(r => [r.key, r.value]))
  const wa = settings.whatsapp_number || '6281234567890'

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Komunitas <span style={{ color: 'var(--accent-red)' }}>Ichibot</span></h1>
          <p>Bergabung dengan ribuan robotiker dari seluruh Indonesia dan dunia.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <div className="glass-card-lg" style={{ padding: '56px 64px', background: 'linear-gradient(135deg, rgba(220,30,30,0.08) 0%, transparent 60%)' }}>
            <i className="fa-brands fa-whatsapp" style={{ fontSize: '3rem', color: 'var(--accent-red)', marginBottom: 24, display: 'block' }}></i>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Gabung Grup WhatsApp</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
              Diskusi, berbagi pengalaman, dan dapatkan info terbaru seputar kompetisi robot bersama komunitas Ichibot.
            </p>
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent('Halo Ichibot, saya ingin bergabung komunitas')}`}
              target="_blank" rel="noopener"
              className="btn btn-red btn-lg"
            >
              <i className="fa-brands fa-whatsapp"></i> Bergabung Sekarang
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
