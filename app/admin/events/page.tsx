import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminEventsPage() {
  const supabase = await createClient()
  const { data: events } = await supabase.from('events').select('id, title, badge, event_date, location, image_url, slug').order('event_date', { ascending: false })

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 text-sm mt-1">{events?.length ?? 0} event tersimpan.</p>
        </div>
        <Link href="/admin/events/new" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors" style={{ background: '#dc1e1e', textDecoration: 'none' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Event
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {!events?.length && <p className="px-6 py-10 text-center text-gray-400 text-sm">Belum ada event.</p>}
          {events?.map(e => (
            <div key={e.id} className="flex items-center gap-4 px-6 py-4">
              {e.image_url
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={e.image_url} alt={e.title} className="w-16 h-11 object-cover rounded-lg shrink-0" />
                : <div className="w-16 h-11 rounded-lg shrink-0 flex items-center justify-center text-xs text-gray-400" style={{ background: '#f3f4f6' }}>No img</div>
              }
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{e.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {e.badge && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#fef2f2', color: '#dc2626' }}>{e.badge}</span>}
                  {e.event_date && <span className="text-xs text-gray-400">{e.event_date}</span>}
                  {e.location && <span className="text-xs text-gray-400">{e.location}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/events/${e.id}`} className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100" style={{ textDecoration: 'none' }}>Edit</Link>
                <a href={`/events/${e.slug}`} target="_blank" rel="noopener" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100" style={{ textDecoration: 'none' }}>Preview</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
