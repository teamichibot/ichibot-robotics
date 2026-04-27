import { createClient, createStaticClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import MarkdownContent from './MarkdownContent'

export const revalidate = false

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return []
  const supabase = createStaticClient()
  const { data } = await supabase.from('posts').select('slug')
  return (data || []).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('posts').select('title, excerpt').eq('slug', slug).single()
  if (!data) return {}
  return { title: data.title, description: data.excerpt }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('posts').select('*').eq('slug', slug).single()
  if (!post) notFound()

  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 48 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <i className="fa-solid fa-arrow-left"></i> Kembali
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {post.badge && <span className="badge badge-red">{post.badge}</span>}
            {post.category && <span className="badge badge-glass">{post.category}</span>}
            {post.date && <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, marginBottom: 20, lineHeight: 1.2 }}>{post.title}</h1>

          {post.excerpt && <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 36, borderLeft: '3px solid var(--accent-red)', paddingLeft: 20 }}>{post.excerpt}</p>}

          {post.image_url && (
            <div style={{ aspectRatio: '16/9', borderRadius: 'var(--radius-card-lg)', overflow: 'hidden', marginBottom: 48, position: 'relative' }}>
              <Image src={post.image_url} alt={post.title} fill style={{ objectFit: 'cover' }} />
            </div>
          )}

          {post.content && <MarkdownContent content={post.content} />}
        </div>
      </section>
    </>
  )
}
