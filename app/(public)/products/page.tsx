import { createClient } from '@/lib/supabase/server'
import ProductsClient from './ProductsClient'

export const revalidate = false

export const metadata = { title: 'Produk Robot Edukasi' }

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').order('sort_order')
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Robot <span style={{ color: 'var(--accent-red)' }}>Edukasi</span></h1>
          <p>Pilihan robot kompetitif berkualitas tinggi untuk berbagai kategori lomba. Tersedia dalam kit maupun dirakit.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <ProductsClient products={products || []} />
        </div>
      </section>
    </>
  )
}
