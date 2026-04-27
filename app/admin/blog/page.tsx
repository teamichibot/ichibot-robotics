'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Post = {
  slug: string
  title: string
  category: string
  date: string
  badge?: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/blog')
      .then(r => r.json())
      .then(d => { setPosts(d); setLoading(false) })
  }, [])

  async function handleDelete(slug: string) {
    if (!confirm('Hapus post ini?')) return
    setDeleting(slug)
    const res = await fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' })
    if (res.ok) {
      setPosts(prev => prev.filter(p => p.slug !== slug))
    }
    setDeleting(null)
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} post tersimpan.</p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors" style={{ background: '#dc1e1e', textDecoration: 'none' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {loading && <p className="px-6 py-10 text-center text-gray-400 text-sm">Memuat...</p>}
          {!loading && !posts.length && <p className="px-6 py-10 text-center text-gray-400 text-sm">Belum ada post.</p>}
          {posts.map(p => (
            <div key={p.slug} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{p.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {p.category && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#fef2f2', color: '#dc2626' }}>{p.category}</span>}
                  {p.badge && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f0fdf4', color: '#16a34a' }}>{p.badge}</span>}
                  {p.date && <span className="text-xs text-gray-400">{p.date}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/blog/${p.slug}`} className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100" style={{ textDecoration: 'none' }}>Edit</Link>
                <a href={`/blog/${p.slug}`} target="_blank" rel="noopener" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100" style={{ textDecoration: 'none' }}>Preview</a>
                <button onClick={() => handleDelete(p.slug)} disabled={deleting === p.slug} className="text-sm font-medium text-red-400 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50" style={{ border: 'none', background: 'none', cursor: deleting === p.slug ? 'not-allowed' : 'pointer', opacity: deleting === p.slug ? 0.5 : 1 }}>
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
