import ProductForm from '../ProductForm'

export default function NewProductPage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Tambah Produk</h1>
      <ProductForm />
    </div>
  )
}
