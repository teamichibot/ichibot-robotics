'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setError('Email atau password salah.'); return }
    router.push(searchParams.get('redirect') || '/admin')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#dc1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#fff' }}>I</div>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#f0f0f0', letterSpacing: '0.04em' }}>ICHIBOT Admin</h1>
          <p style={{ color: '#555', fontSize: '0.85rem', marginTop: 4 }}>Masuk ke panel administrasi</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#999', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '10px 14px', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f0f0f0', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#999', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '10px 14px', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f0f0f0', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
          {error && <p style={{ color: '#ff5555', fontSize: '0.82rem' }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ padding: '11px', background: '#dc1e1e', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>
}
