import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'
import type { Settings } from '@/lib/utils'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('key, value')
  const settings: Settings = Object.fromEntries((data || []).map(r => [r.key, r.value]))

  return (
    <>
      <Nav
        waNumber={settings.whatsapp_number}
        userPortalUrl={settings.user_portal_url}
        docsUrl={settings.docs_url}
      />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
