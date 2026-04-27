'use client'

import { useEffect, useState } from 'react'

type Settings = Record<string, string>

const GROUPS: { label: string; keys: string[] }[] = [
  {
    label: 'Kontak',
    keys: ['whatsapp_number'],
  },
  {
    label: 'Marketplace',
    keys: ['shopee_url', 'tokopedia_url', 'tiktokshop_url'],
  },
  {
    label: 'Media Sosial',
    keys: ['instagram_url', 'youtube_url', 'facebook_url', 'tiktok_url'],
  },
  {
    label: 'Statistik',
    keys: ['stat_countries', 'stat_users', 'stat_wins', 'stat_years'],
  },
  {
    label: 'Lokasi',
    keys: ['address', 'maps_embed_url'],
  },
  {
    label: 'URL Eksternal',
    keys: ['user_portal_url', 'docs_url'],
  },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => { setSettings(d); setLoading(false) })
  }, [])

  function set(key: string, val: string) {
    setSettings(s => ({ ...s, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    if (res.ok) {
      setToast('Pengaturan tersimpan!')
      setTimeout(() => setToast(''), 3000)
    } else {
      const d = await res.json()
      setToast(d.error || 'Terjadi kesalahan')
    }
  }

  const inputStyle = { border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 12px', fontSize: 14, outline: 'none', color: '#1a202c', width: '100%', background: '#fff' }
  const labelStyle = { display: 'block' as const, fontSize: 13, fontWeight: 500 as const, color: '#6b7280', marginBottom: 4 }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Memuat pengaturan...</div>

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 text-sm mt-1">Konfigurasi global website Ichibot.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {GROUPS.map(group => (
          <div key={group.label} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">{group.label}</h2>
            {group.keys.map(key => (
              <div key={key}>
                <label style={labelStyle}>{key}</label>
                {key === 'address' || key === 'maps_embed_url' ? (
                  <textarea
                    rows={key === 'maps_embed_url' ? 3 : 2}
                    value={settings[key] || ''}
                    onChange={e => set(key, e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: key === 'maps_embed_url' ? 'monospace' : 'inherit', fontSize: key === 'maps_embed_url' ? 12 : 14 }}
                  />
                ) : (
                  <input
                    value={settings[key] || ''}
                    onChange={e => set(key, e.target.value)}
                    style={inputStyle}
                  />
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} style={{ background: '#dc1e1e', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 28px', fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
          {toast && (
            <span style={{ fontSize: 14, color: toast.includes('kesalahan') || toast.includes('error') ? '#dc2626' : '#16a34a', fontWeight: 500 }}>
              {toast}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
