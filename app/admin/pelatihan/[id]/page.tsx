import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PelatihanForm from '../PelatihanForm'

export default async function EditPelatihanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('pelatihan').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Pelatihan</h1>
      <PelatihanForm initial={data} />
    </div>
  )
}
