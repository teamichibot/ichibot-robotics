'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  {
    label: 'Produk & Layanan',
    children: [
      { label: 'Robot Edukasi', href: '/products' },
      { label: 'Pelatihan Robot', href: '/pelatihan' },
      { label: 'Servis Robot', href: null, wa: true },
    ],
  },
  {
    label: 'Komunitas',
    children: [
      { label: 'Blog & Berita', href: '/blog' },
      { label: 'Juara / Hall of Champions', href: '/blog' },
      { label: 'Komunitas Ichibot', href: '/community' },
      { label: 'Tentang Kami', href: '/about' },
    ],
  },
]

export default function Nav({ waNumber = '6281234567890', userPortalUrl = 'https://user.ichibot.id', docsUrl = 'https://docs.ichibot.id' }: { waNumber?: string; userPortalUrl?: string; docsUrl?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
      aria-label="Main navigation"
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 'auto' }}>
          <div style={{ width: 36, height: 36, background: 'var(--accent-red)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>I</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.06em', color: 'var(--text-primary)' }}>ICHIBOT</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="nav-item" style={{ position: 'relative' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: '4px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.parentElement!.querySelector('.nav-dropdown') as HTMLElement)?.style && ((e.currentTarget.parentElement!.querySelector('.nav-dropdown') as HTMLElement).style.opacity = '1', (e.currentTarget.parentElement!.querySelector('.nav-dropdown') as HTMLElement).style.pointerEvents = 'auto', (e.currentTarget.parentElement!.querySelector('.nav-dropdown') as HTMLElement).style.transform = 'translateY(0)')}
              >
                {item.label} <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.65em', opacity: 0.6 }}></i>
              </button>
              <div
                className="nav-dropdown"
                style={{
                  position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%) translateY(8px)',
                  background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 12,
                  padding: '8px', minWidth: 200, opacity: 0, pointerEvents: 'none',
                  transition: 'opacity 0.2s, transform 0.2s', zIndex: 200, boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0'; el.style.pointerEvents = 'none'; el.style.transform = 'translateX(-50%) translateY(8px)'; }}
              >
                {item.children.map((c) => c.wa ? (
                  <a key="servis" href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Halo Ichibot, saya ingin info tentang Servis Robot')}`} target="_blank" rel="noopener"
                    style={{ display: 'block', padding: '8px 14px', borderRadius: 8, fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >Servis Robot</a>
                ) : (
                  <Link key={c.label} href={c.href!}
                    style={{ display: 'block', padding: '8px 14px', borderRadius: 8, fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >{c.label}</Link>
                ))}
              </div>
            </div>
          ))}
          <Link href="/events" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
          >Event Update</Link>
          <a href={docsUrl} target="_blank" rel="noopener" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
          >Docs</a>
        </div>

        <a href={userPortalUrl} target="_blank" rel="noopener" className="btn btn-red btn-sm hidden md:inline-flex" style={{ marginLeft: 24 }}>
          <i className="fa-solid fa-user"></i> Login
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5, marginLeft: 16 }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 22, height: 2, background: 'var(--text-primary)', borderRadius: 2, transition: 'all 0.3s',
              transform: open ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)') : 'none',
              opacity: open && i===1 ? 0 : 1 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--glass-border-subtle)', padding: '16px 24px 24px' }}>
          {NAV_ITEMS.flatMap(g => g.children).map(c => c.wa ? (
            <a key="servis-mobile" href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Halo Ichibot, saya ingin info tentang Servis Robot')}`} target="_blank" rel="noopener"
              style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--glass-border-subtle)', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}
            >Servis Robot</a>
          ) : (
            <Link key={c.label} href={c.href!}
              style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--glass-border-subtle)', color: pathname === c.href ? 'var(--accent-red-light)' : 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}
            >{c.label}</Link>
          ))}
          <Link href="/events" style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--glass-border-subtle)', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Event Update</Link>
          <a href={docsUrl} target="_blank" rel="noopener" style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--glass-border-subtle)', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>Docs</a>
          <a href={userPortalUrl} target="_blank" rel="noopener" className="btn btn-red" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
            <i className="fa-solid fa-user"></i> Login
          </a>
        </div>
      )}
    </nav>
  )
}
