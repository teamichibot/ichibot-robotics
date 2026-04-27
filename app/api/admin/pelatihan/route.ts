import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const supabase = await createServiceClient()
  const { data, error } = await supabase.from('pelatihan').select('*').order('sort_order')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const supabase = await createServiceClient()
  const body = await req.json()
  const { data, error } = await supabase.from('pelatihan').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/pelatihan')
  revalidatePath('/')
  return NextResponse.json(data)
}
