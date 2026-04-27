import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminTeamPage() {
  const supabase = await createClient()
  const { data: members } = await supabase.from('team').select('id, name, role, avatar_url').order('sort_order')

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tim</h1>
          <p className="text-gray-500 text-sm mt-1">{members?.length ?? 0} anggota tersimpan.</p>
        </div>
        <Link href="/admin/team/new" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors" style={{ background: '#dc1e1e', textDecoration: 'none' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Anggota
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {!members?.length && <p className="px-6 py-10 text-center text-gray-400 text-sm">Belum ada anggota tim.</p>}
          {members?.map(m => (
            <div key={m.id} className="flex items-center gap-4 px-6 py-4">
              {m.avatar_url
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={m.avatar_url} alt={m.name} className="w-11 h-11 object-cover rounded-full shrink-0" />
                : <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white" style={{ background: '#dc1e1e' }}>{m.name?.[0]}</div>
              }
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{m.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.role}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/team/${m.id}`} className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100" style={{ textDecoration: 'none' }}>Edit</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
