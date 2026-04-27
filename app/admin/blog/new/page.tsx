'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const CATEGORIES = ['juara', 'ekspor', 'komunitas', 'milestone', 'berita', 'tutorial']

type PostData = {
  slug: string; title: string; date: string; category: string
  badge: string; excerpt: string; image_url: string; content: string
}

const empty: PostData = {
  slug: '', title: '', date: new Date().toISOString().slice(0, 10),
  category: 'berita', badge: '', excerpt: '', image_url: '', content: '',
}

export default function NewBlogPage() {
  const [form, setForm] = useState<PostData>({ ...empty })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function set<K extends keyof PostData>(key: K, val: PostData[K]) {
    setForm(f => ({
      ...f, [key]: val,
      ...(key === 'title' ? { slug: (val as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') } : {}),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (res.ok) { router.push('/admin/blog'); router.refresh() }
    else { const d = await res.json(); setError(d.error || 'Terjadi kesalahan') }
  }

  const inputStyle = { border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 12px', fontSize: 14, outline: 'none', color: '#1a202c', width: '100%', background: '#fff' }
  const labelStyle = { display: 'block' as const, fontSize: 14, fontWeight: 500 as const, color: '#374151', marginBottom: 6 }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Tambah Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Info Utama</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Slug</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Tanggal</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Judul</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} required style={inputStyle} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Kategori</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...inputStyle, background: '#fff' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Badge</label>
              <input value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="Juara 1" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>URL Gambar</label>
            <input value={form.image_url} onChange={e => set('image_url', e.target.value)} style={inputStyle} />
          </div>
          {form.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.image_url} alt="preview" className="w-full h-40 object-cover rounded-xl" />
          )}
          <div>
            <label style={labelStyle}>Excerpt / Ringkasan</label>
            <textarea rows={3} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Konten</h2>
          <div data-color-mode="light">
            <MDEditor
              value={form.content}
              onChange={v => set('content', v || '')}
              height={500}
              preview="edit"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} style={{ background: '#dc1e1e', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={() => router.push('/admin/blog')} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 10, padding: '10px 24px', fontWeight: 500, fontSize: 14, cursor: 'pointer', color: '#374151' }}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
