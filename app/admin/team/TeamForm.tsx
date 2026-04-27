'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type TeamData = {
  id?: string; name: string; role: string; bio: string
  avatar_url: string; sort_order: number
}

const empty: TeamData = {
  name: '', role: '', bio: '', avatar_url: '', sort_order: 0,
}

export default function TeamForm({ initial }: { initial?: Partial<TeamData> & { id?: string } }) {
  const isNew = !initial?.id
  const [form, setForm] = useState<TeamData>({ ...empty, ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function set<K extends keyof TeamData>(key: K, val: TeamData[K]) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSaving(true)
    const url = isNew ? '/api/admin/team' : `/api/admin/team/${initial!.id}`
    const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    if (res.ok) { router.push('/admin/team'); router.refresh() }
    else { const d = await res.json(); setError(d.error || 'Terjadi kesalahan') }
  }

  async function handleDelete() {
    if (!confirm('Hapus anggota ini?')) return
    const res = await fetch(`/api/admin/team/${initial!.id}`, { method: 'DELETE' })
    if (res.ok) { router.push('/admin/team'); router.refresh() }
  }

  const inputStyle = { border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 12px', fontSize: 14, outline: 'none', color: '#1a202c', width: '100%', background: '#fff' }
  const labelStyle = { display: 'block' as const, fontSize: 14, fontWeight: 500 as const, color: '#374151', marginBottom: 6 }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Info Anggota</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Nama</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Role / Jabatan</label>
            <input value={form.role} onChange={e => set('role', e.target.value)} placeholder="Co-Founder" style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Bio</label>
          <textarea rows={4} value={form.bio} onChange={e => set('bio', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>URL Avatar</label>
            <input value={form.avatar_url} onChange={e => set('avatar_url', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Sort Order</label>
            <input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} style={inputStyle} />
          </div>
        </div>
        {form.avatar_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.avatar_url} alt="preview" className="w-20 h-20 object-cover rounded-full" />
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} style={{ background: '#dc1e1e', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button type="button" onClick={() => router.push('/admin/team')} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 10, padding: '10px 24px', fontWeight: 500, fontSize: 14, cursor: 'pointer', color: '#374151' }}>
          Batal
        </button>
        {!isNew && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: 'auto', border: '1px solid #fecaca', background: '#fff', borderRadius: 10, padding: '10px 24px', fontWeight: 500, fontSize: 14, cursor: 'pointer', color: '#dc2626' }}>
            Hapus
          </button>
        )}
      </div>
    </form>
  )
}
