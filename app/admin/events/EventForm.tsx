'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type EventData = {
  id?: string; slug: string; title: string; badge: string
  event_date: string; location: string; description: string
  specs_col1: string; specs_col2: string
  image_url: string; is_featured: boolean
}

const empty: EventData = {
  slug: '', title: '', badge: '',
  event_date: '', location: '', description: '',
  specs_col1: '', specs_col2: '',
  image_url: '', is_featured: false,
}

export default function EventForm({ initial }: { initial?: Partial<EventData> & { id?: string; specs_col1?: string[] | string; specs_col2?: string[] | string } }) {
  const isNew = !initial?.id
  const [form, setForm] = useState<EventData>({
    ...empty,
    ...initial,
    specs_col1: Array.isArray(initial?.specs_col1) ? initial.specs_col1.join('\n') : (initial?.specs_col1 || ''),
    specs_col2: Array.isArray(initial?.specs_col2) ? initial.specs_col2.join('\n') : (initial?.specs_col2 || ''),
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function set<K extends keyof EventData>(key: K, val: EventData[K]) {
    setForm(f => ({
      ...f, [key]: val,
      ...(key === 'title' && isNew ? { slug: (val as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') } : {}),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSaving(true)
    const payload = {
      ...form,
      specs_col1: form.specs_col1.split('\n').map(s => s.trim()).filter(Boolean),
      specs_col2: form.specs_col2.split('\n').map(s => s.trim()).filter(Boolean),
      updated_at: new Date().toISOString(),
    }
    const url = isNew ? '/api/admin/events' : `/api/admin/events/${initial!.id}`
    const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setSaving(false)
    if (res.ok) { router.push('/admin/events'); router.refresh() }
    else { const d = await res.json(); setError(d.error || 'Terjadi kesalahan') }
  }

  const inputStyle = { border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 12px', fontSize: 14, outline: 'none', color: '#1a202c', width: '100%', background: '#fff' }
  const labelStyle = { display: 'block' as const, fontSize: 14, fontWeight: 500 as const, color: '#374151', marginBottom: 6 }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Info Utama</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Slug</label>
            <input value={form.slug} onChange={e => set('slug', e.target.value)} required disabled={!isNew} style={{ ...inputStyle, ...(isNew ? {} : { background: '#f9fafb', color: '#9ca3af' }) }} />
          </div>
          <div>
            <label style={labelStyle}>Badge / Label</label>
            <input value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="Kompetisi" style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Judul Event</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} required style={inputStyle} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Tanggal Event</label>
            <input type="date" value={form.event_date} onChange={e => set('event_date', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Lokasi</label>
            <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Jakarta, Indonesia" style={inputStyle} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>URL Gambar</label>
            <input value={form.image_url} onChange={e => set('image_url', e.target.value)} style={inputStyle} />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" id="is_featured" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
            <label htmlFor="is_featured" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>Featured Event</label>
          </div>
        </div>
        {form.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image_url} alt="preview" className="w-full h-40 object-cover rounded-xl" />
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Deskripsi</h2>
        <div>
          <label style={labelStyle}>Deskripsi</label>
          <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Detail / Spesifikasi</h2>
        <p className="text-xs text-gray-400">Satu item per baris.</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Kolom Kiri</label>
            <textarea rows={8} value={form.specs_col1} onChange={e => set('specs_col1', e.target.value)} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
          </div>
          <div>
            <label style={labelStyle}>Kolom Kanan</label>
            <textarea rows={8} value={form.specs_col2} onChange={e => set('specs_col2', e.target.value)} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} style={{ background: '#dc1e1e', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button type="button" onClick={() => router.push('/admin/events')} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 10, padding: '10px 24px', fontWeight: 500, fontSize: 14, cursor: 'pointer', color: '#374151' }}>
          Batal
        </button>
      </div>
    </form>
  )
}
