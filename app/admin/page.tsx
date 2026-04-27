import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [
    { count: cProducts },
    { count: cPelatihan },
    { count: cPosts },
    { count: cEvents },
    { count: cTeam },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('pelatihan').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('team').select('*', { count: 'exact', head: true }),
  ])

  const sections = [
    { href: '/admin/products',  label: 'Produk',           count: cProducts,  desc: 'Kelola robot edukasi beserta harga, spesifikasi, dan badge kategori.',     color: 'bg-purple-50 text-purple-600' },
    { href: '/admin/pelatihan', label: 'Pelatihan',         count: cPelatihan, desc: 'Kelola program pelatihan beserta harga dan detail program.',               color: 'bg-blue-50 text-blue-600' },
    { href: '/admin/blog',      label: 'Blog & Pencapaian', count: cPosts,     desc: 'Tulis dan kelola artikel pencapaian, berita, dan konten komunitas.',       color: 'bg-green-50 text-green-600' },
    { href: '/admin/events',    label: 'Events',            count: cEvents,    desc: 'Kelola kompetisi, workshop, dan rilis produk mendatang.',                  color: 'bg-amber-50 text-amber-600' },
    { href: '/admin/team',      label: 'Tim',               count: cTeam,      desc: 'Kelola profil anggota tim yang ditampilkan di halaman Tentang Kami.',      color: 'bg-rose-50 text-rose-600' },
    { href: '/admin/settings',  label: 'Pengaturan',        count: null,       desc: 'Nomor WA, marketplace, social media, statistik, dan Google Maps.',        color: 'bg-slate-100 text-slate-600' },
  ]

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Pilih bagian yang ingin dikelola.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map(s => (
          <Link key={s.href} href={s.href} className="group flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200" style={{ textDecoration: 'none' }}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg ${s.color}`}>
              {s.count !== null ? s.count ?? '…' : '⚙'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{s.label}</p>
              <p className="text-gray-500 text-sm leading-relaxed mt-1">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
