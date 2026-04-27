import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServiceClient()
  const { data, error } = await supabase.from('pelatihan').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServiceClient()
  const body = await req.json()
  const { data, error } = await supabase.from('pelatihan').update(body).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/pelatihan')
  revalidatePath(`/pelatihan/${body.slug}`)
  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServiceClient()
  const { data: p } = await supabase.from('pelatihan').select('slug').eq('id', id).single()
  const { error } = await supabase.from('pelatihan').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (p?.slug) revalidatePath(`/pelatihan/${p.slug}`)
  revalidatePath('/pelatihan')
  return NextResponse.json({ success: true })
}
