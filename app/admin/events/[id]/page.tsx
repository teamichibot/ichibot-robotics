import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EventForm from '../EventForm'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('events').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Event</h1>
      <EventForm initial={data} />
    </div>
  )
}
