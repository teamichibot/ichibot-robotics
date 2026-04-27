import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import TeamForm from '../TeamForm'

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('team').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Anggota Tim</h1>
      <TeamForm initial={data} />
    </div>
  )
}
