'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CATS = [
  { key: 'semua', label: 'Semua' },
  { key: 'juara', label: 'Juara' },
  { key: 'ekspor', label: 'Ekspor' },
  { key: 'komunitas', label: 'Komunitas' },
  { key: 'milestone', label: 'Milestone' },
  { key: 'berita', label: 'Berita' },
  { key: 'tutorial', label: 'Tutorial' },
]

type Post = { id: string; slug: string; title: string; category?: string; badge?: string; date?: string; excerpt?: string; image_url?: string }

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState('semua')
  const filtered = active === 'semua' ? posts : posts.filter(p => p.category === active)

  return (
    <>
      <div className="filter-tabs" style={{ marginBottom: 40 }}>
        {CATS.map(c => (
          <button key={c.key} className={`filter-tab ${active === c.key ? 'active' : ''}`} onClick={() => setActive(c.key)}>{c.label}</button>
        ))}
      </div>
      <div style={{ columns: '300px 3', gap: 24 }}>
        {filtered.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', breakInside: 'avoid', marginBottom: 24 }}>
            <div className="glass-card" style={{ overflow: 'hidden', transition: 'transform 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
            >
              <div style={{ aspectRatio: '16/9', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
                {post.badge && <span className="badge badge-red" style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>{post.badge}</span>}
                {post.image_url && <Image src={post.image_url} alt={post.title} fill style={{ objectFit: 'cover' }} />}
              </div>
              <div style={{ padding: '18px 20px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{post.title}</h3>
                {post.excerpt && <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.6 }}>{post.excerpt}</p>}
                {post.date && <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 10 }}>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
