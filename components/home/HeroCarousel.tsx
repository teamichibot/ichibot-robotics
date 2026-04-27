'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export type Slide = {
  id: string
  type: 'product' | 'training' | 'stat' | 'event'
  badge?: string
  title: string
  subtitle?: string
  price?: string
  cta_label?: string
  cta_href?: string
  cta_wa?: string
  image_url?: string
  stat_number?: string
  stat_label?: string
  event_day?: string
  event_month?: string
  event_location?: string
  wa_number?: string
}

const INTERVAL = 5000
const FPS = 60
const STEP = 100 / (INTERVAL / (1000 / FPS))

export default function HeroCarousel({ slides, waNumber = '6281234567890' }: { slides: Slide[]; waNumber?: string }) {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const progressRef = useRef(0)

  const goTo = useCallback((idx: number) => {
    setCurrent(idx)
    progressRef.current = 0
    setProgress(0)
  }, [])

  useEffect(() => {
    if (slides.length < 2) return
    const tick = () => {
      progressRef.current += STEP
      setProgress(progressRef.current)
      if (progressRef.current >= 100) {
        progressRef.current = 0
        setCurrent(c => (c + 1) % slides.length)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [slides.length])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo((current - 1 + slides.length) % slides.length)
      if (e.key === 'ArrowRight') goTo((current + 1) % slides.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, slides.length, goTo])

  // Touch swipe
  const touchStartX = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx < -50) goTo((current + 1) % slides.length)
    if (dx >  50) goTo((current - 1 + slides.length) % slides.length)
  }

  if (!slides.length) return null
  const slide = slides[current]

  return (
    <section
      style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background grain */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4, pointerEvents: 'none', zIndex: 0 }} />

      {/* Slides */}
      {slides.map((s, i) => (
        <div key={s.id} style={{ position: 'absolute', inset: 0, opacity: i === current ? 1 : 0, transition: 'opacity 0.7s ease', zIndex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            {/* Copy */}
            <div style={{ zIndex: 2 }}>
              {s.badge && <span className="badge badge-red" style={{ marginBottom: 20, display: 'inline-flex' }}>{s.badge}</span>}

              {s.type === 'stat' ? (
                <>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem,13vw,10rem)', fontWeight: 800, lineHeight: 1, color: 'var(--accent-red)', textShadow: '0 0 80px rgba(220,30,30,0.35)', marginBottom: 16 }}>{s.stat_number}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{s.title}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>{s.subtitle}</p>
                </>
              ) : (
                <>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16, color: 'var(--text-primary)' }}>{s.title}</h2>
                  {s.subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: 24, maxWidth: 480 }}>{s.subtitle}</p>}
                  {s.price && <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700, color: 'var(--accent-red-light)', marginBottom: 28 }}>{s.price}</div>}

                  {s.type === 'event' && s.event_day && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                      <div style={{ textAlign: 'center', background: 'rgba(220,30,30,0.12)', border: '1px solid rgba(220,30,30,0.25)', borderRadius: 12, padding: '12px 20px' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: 'var(--accent-red)' }}>{s.event_day}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent-red-light)' }}>{s.event_month}</div>
                      </div>
                      {s.event_location && <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{s.event_location}</p>}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {s.cta_href && (
                      <Link href={s.cta_href} className="btn btn-red btn-lg">
                        {s.cta_label || 'Lihat Detail'} <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    )}
                    {s.cta_wa && (
                      <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(s.cta_wa)}`} target="_blank" rel="noopener" className="btn btn-ghost btn-lg">
                        <i className="fa-brands fa-whatsapp"></i> Pesan
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Visual */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {s.image_url ? (
                <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 'var(--radius-card-lg)', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.55)', border: '1px solid var(--glass-border)' }}>
                  <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(ellipse at center, rgba(220,30,30,0.15) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
                  <Image src={s.image_url} alt={s.title} fill style={{ objectFit: 'cover' }} priority={i === 0} />
                </div>
              ) : s.type === 'stat' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[['🏆', '1000+ Juara nasional & internasional'], ['🌍', '17+ Negara ekspor'], ['⚡', 'Teknologi kompetitif terdepan']].map(([icon, text]) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '16px 20px' }}>
                      <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{text}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.06)', zIndex: 10 }}>
        <div style={{ height: '100%', background: 'var(--accent-red)', width: `${progress}%`, transition: 'width 0.016s linear' }} />
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
            style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all 0.3s', background: i === current ? 'var(--accent-red)' : 'rgba(255,255,255,0.25)', padding: 0 }}
          />
        ))}
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button onClick={() => goTo((current - 1 + slides.length) % slides.length)}
            style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
            aria-label="Previous"
          ><i className="fa-solid fa-chevron-left"></i></button>
          <button onClick={() => goTo((current + 1) % slides.length)}
            style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
            aria-label="Next"
          ><i className="fa-solid fa-chevron-right"></i></button>
        </>
      )}

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding-top: 80px; }
          .hero-visual { display: none; }
        }
      `}</style>
    </section>
  )
}
