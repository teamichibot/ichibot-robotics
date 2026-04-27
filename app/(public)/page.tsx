import { createClient } from '@/lib/supabase/server'
import HeroCarousel, { type Slide } from '@/components/home/HeroCarousel'
import WorldMap from '@/components/home/WorldMap'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import RevealWrapper from '@/components/ui/RevealWrapper'
import Link from 'next/link'
import Image from 'next/image'
import { formatDateShort } from '@/lib/utils'

export const revalidate = false

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: products }, { data: posts }, { data: events }, { data: destinations }, { data: settingsData }] = await Promise.all([
    supabase.from('products').select('*').order('sort_order').limit(3),
    supabase.from('posts').select('*').eq('is_featured', true).order('date', { ascending: false }).limit(3),
    supabase.from('events').select('*').gte('event_date', new Date().toISOString().split('T')[0]).order('event_date').limit(4),
    supabase.from('export_destinations').select('*'),
    supabase.from('settings').select('key, value'),
  ])

  const settings = Object.fromEntries((settingsData || []).map(r => [r.key, r.value]))
  const wa = settings.whatsapp_number || '6281234567890'

  // Build hero slides from DB content
  const slides: Slide[] = [
    // Slide 1: Brand identity
    {
      id: 'brand',
      type: 'stat',
      badge: 'Ichibot Robotics',
      title: 'Robot Kompetitif Kelas Dunia',
      subtitle: 'Dari Yogyakarta, diekspor ke 17+ negara. Teknologi robotika yang memenangkan ribuan kompetisi nasional dan internasional.',
      stat_number: settings.stat_wins || '1000+',
      stat_label: 'Total Kemenangan',
      cta_href: '/products',
      cta_label: 'Lihat Produk',
    },
  ]

  // Add featured product slide
  if (products?.[0]) {
    const p = products[0]
    slides.push({
      id: `product-${p.id}`,
      type: 'product',
      badge: p.badge || p.category,
      title: p.name,
      subtitle: p.description?.slice(0, 120),
      price: p.price,
      image_url: p.image_url,
      cta_href: `/products/${p.slug}`,
      cta_label: 'Detail Produk',
      cta_wa: p.whatsapp_text,
    })
  }

  // Add featured post slide
  if (posts?.[0]) {
    const post = posts[0]
    slides.push({
      id: `post-${post.id}`,
      type: 'stat',
      badge: post.badge || post.category,
      title: post.title,
      subtitle: post.excerpt,
      stat_number: settings.stat_countries || '17+',
      stat_label: 'Negara Ekspor',
      image_url: post.image_url,
      cta_href: `/blog/${post.slug}`,
      cta_label: 'Baca Selengkapnya',
    })
  }

  // Add next event slide
  if (events?.[0]) {
    const ev = events[0]
    const d = formatDateShort(ev.event_date)
    slides.push({
      id: `event-${ev.id}`,
      type: 'event',
      badge: ev.badge || 'Event Mendatang',
      title: ev.title,
      subtitle: ev.description,
      event_day: d.day,
      event_month: d.month,
      event_location: ev.location,
      image_url: ev.image_url,
      cta_href: `/events/${ev.slug}`,
      cta_label: 'Info Lengkap',
    })
  }

  const statCards = [
    { num: parseInt(settings.stat_countries || '17'), suffix: '+', label: 'Negara Ekspor', icon: 'fa-solid fa-globe' },
    { num: parseInt(settings.stat_users || '500'), suffix: '+', label: 'Pengguna Aktif', icon: 'fa-solid fa-users' },
    { num: parseInt(settings.stat_wins || '1000'), suffix: '+', label: 'Total Kemenangan', icon: 'fa-solid fa-trophy' },
    { num: parseInt(settings.stat_years || '10'), suffix: '+', label: 'Tahun Berpengalaman', icon: 'fa-solid fa-calendar' },
  ]

  return (
    <>
      <HeroCarousel slides={slides} waNumber={wa} />

      {/* Stats bar */}
      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--glass-border-subtle)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {statCards.map((s, i) => (
              <RevealWrapper key={s.label} delay={i * 0.08}>
                <div style={{ textAlign: 'center', padding: '0 24px', borderRight: i < 3 ? '1px solid var(--glass-border-subtle)' : 'none' }}>
                  <i className={s.icon} style={{ fontSize: '1.2rem', color: 'var(--accent-red)', marginBottom: 10, display: 'block' }}></i>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, lineHeight: 1, marginBottom: 6, color: 'var(--text-primary)' }}>
                    <AnimatedCounter value={s.num} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{s.label}</div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {products && products.length > 0 && (
        <section className="section">
          <div className="container">
            <RevealWrapper>
              <div className="section-header">
                <h2 className="section-title">Produk <span>Unggulan</span></h2>
                <Link href="/products" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Lihat semua <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8em' }}></i>
                </Link>
              </div>
            </RevealWrapper>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {products.map((p, i) => (
                <RevealWrapper key={p.id} delay={i * 0.1}>
                  <Link href={`/products/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div className="glass-card" style={{ overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                    >
                      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg-elevated)', position: 'relative' }}>
                        {p.badge && <span className="badge badge-white" style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>{p.badge}</span>}
                        {p.image_url
                          ? <Image src={p.image_url} alt={p.name} fill style={{ objectFit: 'cover' }} />
                          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{p.name}</div>
                        }
                      </div>
                      <div style={{ padding: '20px 22px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{p.name}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 14, lineHeight: 1.6 }}>{p.description?.slice(0, 80)}…</p>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-red-light)' }}>{p.price}</div>
                      </div>
                    </div>
                  </Link>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* World Map */}
      {destinations && destinations.length > 0 && (
        <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border-subtle)', borderBottom: '1px solid var(--glass-border-subtle)' }}>
          <div className="container">
            <RevealWrapper>
              <div className="section-header">
                <h2 className="section-title">Ekspor ke <span>{settings.stat_countries || '17+'} Negara</span></h2>
              </div>
            </RevealWrapper>
            <RevealWrapper delay={0.2}>
              <WorldMap destinations={destinations} />
            </RevealWrapper>
          </div>
        </section>
      )}

      {/* Featured Posts */}
      {posts && posts.length > 0 && (
        <section className="section">
          <div className="container">
            <RevealWrapper>
              <div className="section-header">
                <h2 className="section-title">Pencapaian & <span>Berita</span></h2>
                <Link href="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Lihat semua <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8em' }}></i>
                </Link>
              </div>
            </RevealWrapper>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {posts.map((post, i) => (
                <RevealWrapper key={post.id} delay={i * 0.1}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div className="glass-card" style={{ overflow: 'hidden', height: '100%', transition: 'transform 0.3s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
                    >
                      <div style={{ aspectRatio: '16/9', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
                        {post.badge && <span className="badge badge-red" style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>{post.badge}</span>}
                        {post.image_url && <Image src={post.image_url} alt={post.title} fill style={{ objectFit: 'cover' }} />}
                      </div>
                      <div style={{ padding: '18px 22px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)', lineHeight: 1.4 }}>{post.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events && events.length > 0 && (
        <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border-subtle)' }}>
          <div className="container">
            <RevealWrapper>
              <div className="section-header">
                <h2 className="section-title">Event <span>Mendatang</span></h2>
                <Link href="/events" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Semua event <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8em' }}></i>
                </Link>
              </div>
            </RevealWrapper>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {events.map((ev, i) => {
                const d = formatDateShort(ev.event_date)
                return (
                  <RevealWrapper key={ev.id} delay={i * 0.08}>
                    <Link href={`/events/${ev.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: 18, alignItems: 'flex-start', transition: 'transform 0.3s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
                      >
                        <div style={{ background: 'rgba(220,30,30,0.1)', border: '1px solid rgba(220,30,30,0.2)', borderRadius: 10, padding: '10px 14px', textAlign: 'center', flexShrink: 0 }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, lineHeight: 1, color: 'var(--accent-red)' }}>{d.day}</div>
                          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-red-light)' }}>{d.month}</div>
                        </div>
                        <div>
                          {ev.badge && <span className="badge badge-glass" style={{ marginBottom: 6, display: 'inline-flex', fontSize: '0.65rem' }}>{ev.badge}</span>}
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 4 }}>{ev.title}</h3>
                          {ev.location && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{ev.location}</p>}
                        </div>
                      </div>
                    </Link>
                  </RevealWrapper>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Pelatihan */}
      <section className="section">
        <div className="container">
          <RevealWrapper>
            <div className="glass-card-lg" style={{ padding: '56px 64px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(220,30,30,0.08) 0%, transparent 60%)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: 16 }}>
                Siap Menangkan Kompetisi?
              </div>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.7 }}>
                Program pelatihan intensif langsung dari tim Ichibot — mulai dari dasar hingga tingkat kompetisi internasional.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/pelatihan" className="btn btn-red btn-lg">
                  <i className="fa-solid fa-graduation-cap"></i> Lihat Program
                </Link>
                <a href={`https://wa.me/${wa}?text=${encodeURIComponent('Halo Ichibot, saya ingin info pelatihan robot')}`} target="_blank" rel="noopener" className="btn btn-ghost btn-lg">
                  <i className="fa-brands fa-whatsapp"></i> Konsultasi
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  )
}
