import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem, 15vw, 10rem)', fontWeight: 900, lineHeight: 1, color: 'var(--accent-red)', marginBottom: '1rem' }}>
          404
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Halaman Tidak Ditemukan
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <Link href="/" className="btn btn-red btn-lg">
          <i className="fa-solid fa-house"></i> Kembali ke Beranda
        </Link>
      </div>
    </main>
  )
}
