'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const TABS = [
  { key: 'semua',        label: 'Semua' },
  { key: 'line-follower',label: 'Line Follower' },
  { key: 'sumo',         label: 'Sumo' },
  { key: 'transporter',  label: 'Transporter' },
  { key: 'myrio',        label: 'MyRIO' },
]

type Product = {
  id: string; slug: string; name: string; category: string; badge?: string
  price?: string; price_original?: string; description?: string; image_url?: string
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const [active, setActive] = useState('semua')

  const filtered = active === 'semua' ? products : products.filter(p => p.category === active)

  return (
    <>
      <div className="filter-tabs" style={{ marginBottom: 40 }}>
        {TABS.map(t => (
          <button key={t.key} className={`filter-tab ${active === t.key ? 'active' : ''}`} onClick={() => setActive(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {filtered.map(p => (
          <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{ overflow: 'hidden', height: '100%', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >
              <div style={{ aspectRatio: '4/3', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
                {p.badge && <span className="badge badge-white" style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>{p.badge}</span>}
                {p.image_url
                  ? <Image src={p.image_url} alt={p.name} fill style={{ objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: 16, textAlign: 'center' }}>{p.name}</div>
                }
              </div>
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{p.name}</h3>
                {p.description && <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: 14 }}>{p.description.slice(0, 90)}…</p>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {p.price && <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-red-light)' }}>{p.price}</span>}
                  {p.price_original && <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{p.price_original}</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
