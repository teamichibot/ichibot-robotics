'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type PelatihanData = {
  id?: string; slug: string; name: string; badge: string
  price_ichibot: string; price_inhouse: string; duration: string
  capacity: string; description: string
  specs_col1: string; specs_col2: string; whatsapp_text: string
  image_url: string; sort_order: number
}

const empty: PelatihanData = {
  slug: '', name: '', badge: '',
  price_ichibot: '', price_inhouse: '', duration: '', capacity: '',
  description: '', specs_col1: '', specs_col2: '', whatsapp_text: '',
  image_url: '', sort_order: 0,
}

export default function PelatihanForm({ initial }: { initial?: Partial<PelatihanData> & { id?: string; specs_col1?: string[] | string; specs_col2?: string[] | string } }) {
  const isNew = !initial?.id
  const [form, setForm] = useState<PelatihanData>({
    ...empty,
    ...initial,
    specs_col1: Array.isArray(initial?.specs_col1) ? initial.specs_col1.join('\n') : (initial?.specs_col1 || ''),
    specs_col2: Array.isArray(initial?.specs_col2) ? initial.specs_col2.join('\n') : (initial?.specs_col2 || ''),
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function set<K extends keyof PelatihanData>(key: K, val: PelatihanData[K]) {
    setForm(f => ({
      ...f, [key]: val,
      ...(key === 'name' && isNew ? { slug: (val as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') } : {}),
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
    const url = isNew ? '/api/admin/pelatihan' : `/api/admin/pelatihan/${initial!.id}`
    const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setSaving(false)
    if (res.ok) { router.push('/admin/pelatihan'); router.refresh() }
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
            <input value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="Workshop" style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Nama Pelatihan</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} required style={inputStyle} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>URL Gambar</label>
            <input value={form.image_url} onChange={e => set('image_url', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Sort Order</label>
            <input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} style={inputStyle} />
          </div>
        </div>
        {form.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image_url} alt="preview" className="w-full h-40 object-cover rounded-xl" />
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Harga & Detail</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Harga Ichibot</label>
            <input value={form.price_ichibot} onChange={e => set('price_ichibot', e.target.value)} placeholder="Rp 0" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Harga In-House</label>
            <input value={form.price_inhouse} onChange={e => set('price_inhouse', e.target.value)} placeholder="Rp 0" style={inputStyle} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Durasi</label>
            <input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="2 hari" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Kapasitas</label>
            <input value={form.capacity} onChange={e => set('capacity', e.target.value)} placeholder="20 peserta" style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Deskripsi</label>
          <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div>
          <label style={labelStyle}>Teks WhatsApp Pre-fill</label>
          <input value={form.whatsapp_text} onChange={e => set('whatsapp_text', e.target.value)} placeholder="Halo Ichibot, saya ingin mendaftar pelatihan..." style={inputStyle} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Spesifikasi / Kurikulum</h2>
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
        <button type="button" onClick={() => router.push('/admin/pelatihan')} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 10, padding: '10px 24px', fontWeight: 500, fontSize: 14, cursor: 'pointer', color: '#374151' }}>
          Batal
        </button>
      </div>
    </form>
  )
}
