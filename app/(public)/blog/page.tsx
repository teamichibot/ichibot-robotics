import { createClient } from '@/lib/supabase/server'
import BlogClient from './BlogClient'

export const revalidate = false
export const metadata = { title: 'Blog & Pencapaian' }

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('posts').select('*').order('date', { ascending: false })
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Blog & <span style={{ color: 'var(--accent-red)' }}>Pencapaian</span></h1>
          <p>Kemenangan, ekspor, komunitas, dan berita terbaru dari Ichibot Robotics.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <BlogClient posts={posts || []} />
        </div>
      </section>
    </>
  )
}
