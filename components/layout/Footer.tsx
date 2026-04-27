import Link from 'next/link'
import type { Settings } from '@/lib/utils'

export default function Footer({ settings }: { settings: Settings }) {
  const wa   = settings.whatsapp_number || '6281234567890'
  const year = new Date().getFullYear()

  const socialLinks = [
    { key: 'instagram_url', icon: 'fa-brands fa-instagram', label: 'Instagram' },
    { key: 'youtube_url',   icon: 'fa-brands fa-youtube',   label: 'YouTube' },
    { key: 'facebook_url',  icon: 'fa-brands fa-facebook',  label: 'Facebook' },
    { key: 'tiktok_url',    icon: 'fa-brands fa-tiktok',    label: 'TikTok' },
  ]

  const marketLinks = [
    { key: 'shopee_url',     icon: 'fa-solid fa-bag-shopping', label: 'Shopee' },
    { key: 'tokopedia_url',  icon: 'fa-solid fa-store',        label: 'Tokopedia' },
    { key: 'tiktokshop_url', icon: 'fa-brands fa-tiktok',      label: 'TikTok Shop' },
  ]

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border-subtle)', paddingTop: 64, paddingBottom: 32 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.06em', marginBottom: 12 }}>
              <span style={{ color: 'var(--accent-red)' }}>I</span>CHIBOT
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 240 }}>
              Mendemokratisasi robotika kompetitif di Indonesia. Dari Yogyakarta ke seluruh dunia.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Navigasi</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['/', 'Beranda'], ['/products', 'Produk'], ['/pelatihan', 'Pelatihan'], ['/blog', 'Blog'], ['/events', 'Events'], ['/community', 'Komunitas'], ['/about', 'Tentang Kami']].map(([href, label]) => (
                <Link key={href} href={href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Kategori Produk */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Kategori Produk</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Line Follower', 'Sumo', 'Transporter', 'MyRIO'].map(cat => (
                <Link key={cat} href="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                >{cat}</Link>
              ))}
            </div>
          </div>

          {/* Official Store */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Official Store</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {marketLinks.map(m => settings[m.key] ? (
                <a key={m.key} href={settings[m.key]} target="_blank" rel="noopener"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                >
                  <i className={m.icon} style={{ width: 14, textAlign: 'center' }}></i> {m.label}
                </a>
              ) : (
                <span key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.88rem', opacity: 0.4 }}>
                  <i className={m.icon} style={{ width: 14, textAlign: 'center' }}></i> {m.label}
                </span>
              ))}
              <a href={`https://wa.me/${wa}?text=${encodeURIComponent('Halo Ichibot, saya ingin memesan produk')}`} target="_blank" rel="noopener"
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
              >
                <i className="fa-brands fa-whatsapp" style={{ width: 14, textAlign: 'center' }}></i> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--glass-border-subtle)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            &copy; {year} Ichibot Robotics. Yogyakarta, Indonesia.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {socialLinks.map(s => (
              <a key={s.key}
                href={settings[s.key] || '#'}
                aria-label={s.label}
                target={settings[s.key] ? '_blank' : undefined}
                rel="noopener"
                style={{ color: 'var(--text-muted)', fontSize: '1rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
