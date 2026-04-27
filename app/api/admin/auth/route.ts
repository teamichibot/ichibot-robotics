import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const supabase = await createServiceClient()
  await supabase.auth.signOut()
  return NextResponse.json({ success: true })
}
