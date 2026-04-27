import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServiceClient()
  const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServiceClient()
  const body = await req.json()
  const { data, error } = await supabase.from('posts').update(body).eq('slug', slug).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServiceClient()
  const { error } = await supabase.from('posts').delete().eq('slug', slug)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ success: true })
}
