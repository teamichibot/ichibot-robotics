import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const supabase = await createServiceClient()
  const { data, error } = await supabase.from('settings').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const result: Record<string, string> = {}
  for (const row of data ?? []) {
    result[row.key] = row.value
  }
  return NextResponse.json(result)
}

export async function PUT(req: Request) {
  const supabase = await createServiceClient()
  const body: Record<string, string> = await req.json()
  const rows = Object.entries(body).map(([key, value]) => ({ key, value }))
  for (const row of rows) {
    const { error } = await supabase.from('settings').upsert(row, { onConflict: 'key' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }
  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/pelatihan')
  revalidatePath('/events')
  revalidatePath('/blog')
  revalidatePath('/products')
  return NextResponse.json({ success: true })
}
