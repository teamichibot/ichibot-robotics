/**
 * Seed script — jalankan setelah Supabase project siap dan .env.local terisi.
 * Usage: npx tsx lib/seed.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('🌱 Seeding Ichibot Robotics database...\n')

  // ─── Products ────────────────────────────────────────────────
  console.log('📦 Seeding products...')
  const products = [
    { slug: 'ichiduino-basic-plus', name: 'Ichiduino Basic+', category: 'line-follower', badge: 'Line Follower', price: 'Rp 585.000 (Kit) / Rp 780.000 (Rakit)', price_original: '', description: 'Robot line follower edukasi untuk pemula. Menggunakan Arduino Nano Atmega328P, sangat mudah diprogram menggunakan Arduino IDE.', specs_col1: ['Arduino Nano Atmega328P', '8 Optic Line Sensor', 'OLED 0.96"', '2x 18650 Battery'], specs_col2: ['Tersedia dalam bentuk DIY Kit', 'Atau pilih opsi sudah dirakit', 'Cocok untuk belajar dasar robotika', 'Mudah diprogram'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Ichiduino Basic+', image_url: '', sort_order: 1 },
    { slug: 'ichiduino-pro', name: 'Ichiduino Pro', category: 'line-follower', badge: 'Line Follower', price: 'Rp 1.949.025', price_original: 'Rp 1.999.000', description: 'Robot line follower tingkat menengah dengan sensor lebih banyak dan mikrokontroler yang lebih powerful.', specs_col1: ['Atmega 2560', '12 Optic Line Sensor', 'OLED 0.96"', '2s 400mAh Lipo'], specs_col2: ['Motor encoder presisi', 'PID control ready', 'Cocok kompetisi tingkat kota', 'Firmware open-source'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Ichiduino Pro', image_url: '', sort_order: 2 },
    { slug: 'ultimate-5-max', name: 'Ultimate 5 Max', category: 'line-follower', badge: 'Line Follower', price: 'Rp 2.339.025', price_original: 'Rp 2.399.000', description: 'Robot line follower flagship Ichibot dengan performa tertinggi. Dirancang untuk kompetisi tingkat nasional dan internasional.', specs_col1: ['14 Optic Line Sensor', 'Gyro MPU-6050', 'WiFi + Bluetooth', '1.3" OLED Display'], specs_col2: ['25mm Motor 2500RPM', 'OTA Firmware Update', 'Kompetisi nasional & internasional', 'Telah memenangkan ratusan lomba'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Ultimate 5 Max', image_url: 'https://store.ichibot.id/wp-content/uploads/2025/08/ICHIBOT-ROBOTICS-5.png', sort_order: 3 },
    { slug: 'sumo-500g', name: 'Sumo 500g', category: 'sumo', badge: 'Sumo', price: 'Rp 1.755.000', price_original: 'Rp 1.800.000', description: 'Robot sumo kelas 500 gram. Kompak, kencang, dan agresif.', specs_col1: ['ESP32', 'WiFi + Bluetooth', '3s 1000mAh Lipo', '16mm Motor 500RPM'], specs_col2: ['Sensor jarak ultrasonik', 'Blade baja stainless', 'Kelas 500 gram', 'Siap lomba'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Sumo 500g', image_url: '', sort_order: 4 },
    { slug: 'sumo-1kg', name: 'Sumo 1 Kg', category: 'sumo', badge: 'Sumo', price: 'Rp 2.340.000', price_original: 'Rp 2.400.000', description: 'Robot sumo kelas 1 kilogram dengan torsi besar dan chassis kokoh.', specs_col1: ['ESP32', 'WiFi + Bluetooth', '3s 1200mAh Lipo', '25mm Motor DC'], specs_col2: ['Stall Torque 30 kg.cm', 'Sensor jarak & garis', 'Kelas 1 kilogram', 'Desain aerodinamis'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Sumo 1 Kg', image_url: '', sort_order: 5 },
    { slug: 'sumo-2kg', name: 'Sumo 2 Kg', category: 'sumo', badge: 'Sumo', price: 'Rp 3.315.000', price_original: 'Rp 3.400.000', description: 'Robot sumo paling besar dan paling kuat. Untuk kelas 2 kilogram.', specs_col1: ['ESP32', 'WiFi + Bluetooth', '3s 2000mAh Lipo', '37mm Motor 300RPM'], specs_col2: ['Stall Torque 65 kg.cm', 'Chassis baja tebal', 'Kelas 2 kilogram', 'Blade lebar max'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Sumo 2 Kg', image_url: '', sort_order: 6 },
    { slug: 'transporter-mecanum', name: 'Transporter Mecanum', category: 'transporter', badge: 'Transporter', price: 'Rp 3.022.500', price_original: 'Rp 3.100.000', description: 'Robot transporter dengan roda mecanum untuk manuver omnidireksional.', specs_col1: ['ESP32', 'Mecanum 60mm Wheel', 'PS3 Remote Control', 'Gripper + Elbow + Lifter'], specs_col2: ['Manuver 360 derajat', 'Kamera HD opsional', 'Kompetisi transporter', 'Open-source firmware'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Transporter Mecanum', image_url: '', sort_order: 7 },
    { slug: 'transporter-omni', name: 'Transporter Omni', category: 'transporter', badge: 'Transporter', price: 'Rp 3.510.000', price_original: 'Rp 3.600.000', description: 'Robot transporter dengan roda omni untuk kelincahan maksimal.', specs_col1: ['ESP32', 'Omni 58mm Wheel', 'PS3 Remote Control', 'Gripper + Elbow + Lifter'], specs_col2: ['Chassis aluminium', 'Manuver bebas arah', 'Kompetisi transporter', 'Torsi tinggi'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Transporter Omni', image_url: '', sort_order: 8 },
    { slug: 'transporter-mecanum-pro', name: 'Transporter Mecanum Pro', category: 'transporter', badge: 'Transporter', price: 'Rp 4.095.000', price_original: 'Rp 4.200.000', description: 'Versi pro dari Transporter Mecanum dengan roda lebih besar dan fitur rotator.', specs_col1: ['ESP32', 'Mecanum 80mm Wheel', 'PS3 Remote Control', 'Gripper + Elbow + Lifter + Rotator'], specs_col2: ['Payload lebih besar', 'Akurasi tinggi', 'Kompetisi advanced', 'Aluminium frame'], whatsapp_text: 'Halo Ichibot, saya ingin memesan Transporter Mecanum Pro', image_url: '', sort_order: 9 },
    { slug: 'myrio-1900', name: 'MyRIO 1900', category: 'myrio', badge: 'MyRIO', price: 'Rp 75.000.000', price_original: '', description: 'Robot berbasis National Instruments myRIO 1900 untuk kompetisi tingkat universitas.', specs_col1: ['NI myRIO 1900', '7 Sensor Jarak', '2 Sensor Garis', 'Kamera HD'], specs_col2: ['Lifter + Gripper', 'LabVIEW programming', 'Kompetisi universitas', 'Ekspor ke 17+ negara'], whatsapp_text: 'Halo Ichibot, saya ingin info MyRIO 1900', image_url: '', sort_order: 10 },
    { slug: 'myrio-1950', name: 'MyRIO 1950', category: 'myrio', badge: 'MyRIO', price: 'Rp 82.000.000', price_original: '', description: 'Versi terbaru robot myRIO dengan roda mecanum untuk manuver lebih luwes.', specs_col1: ['NI myRIO 1950', 'Mecanum 80mm Wheel', '7 Sensor Jarak', 'Kamera HD'], specs_col2: ['Lifter + Gripper', 'Omni movement', 'LabVIEW / C++', 'Siap kompetisi internasional'], whatsapp_text: 'Halo Ichibot, saya ingin info MyRIO 1950', image_url: '', sort_order: 11 },
  ]
  const { error: pErr } = await supabase.from('products').upsert(products, { onConflict: 'slug' })
  if (pErr) console.error('Products error:', pErr.message)
  else console.log(`  ✓ ${products.length} products`)

  // ─── Pelatihan ───────────────────────────────────────────────
  console.log('🎓 Seeding pelatihan...')
  const pelatihan = [
    { slug: 'line-follower-dasar', name: 'Line Follower Dasar', badge: 'Pemula', price_ichibot: 'Rp 1.000.000', price_inhouse: 'Rp 1.500.000', duration: '1 Hari', capacity: 'Maks 2 Tim (6 Orang)', description: 'Program pelatihan dasar robot line follower. Cocok untuk pelajar atau mahasiswa yang baru memulai belajar robotika.', specs_col1: ['Teori dasar robotika', 'Pengenalan Arduino & sensor', 'Praktek perakitan robot', 'Pemrograman dasar PID'], specs_col2: ['Sertifikat pelatihan', 'Modul belajar digital', 'Pendampingan langsung tim Ichibot', 'Diskusi & Q&A'], whatsapp_text: 'Halo Ichibot, saya ingin daftar pelatihan Line Follower Dasar', image_url: '', sort_order: 1 },
    { slug: 'line-follower-perlombaan', name: 'Line Follower Perlombaan', badge: 'Kompetisi', price_ichibot: 'Rp 1.500.000', price_inhouse: 'Rp 2.000.000', duration: '1 Hari', capacity: 'Maks 2 Tim', description: 'Program pelatihan intensif untuk persiapan kompetisi. Fokus pada tuning PID, strategi lomba, dan optimasi firmware.', specs_col1: ['Advanced PID tuning', 'Strategi kompetisi', 'Analisis lintasan & track', 'Optimasi kecepatan'], specs_col2: ['Simulasi lomba langsung', 'Review firmware mendalam', 'Tips & trick juara', 'Sertifikat pelatihan'], whatsapp_text: 'Halo Ichibot, saya ingin daftar pelatihan Line Follower Perlombaan', image_url: '', sort_order: 2 },
    { slug: 'myrio-pengoperasian', name: 'MyRIO 1900 Pengoperasian', badge: 'Advanced', price_ichibot: 'Rp 4.000.000', price_inhouse: 'Rp 4.500.000', duration: '2 Hari', capacity: 'Maks 3 Orang', description: 'Program pelatihan khusus pengoperasian robot berbasis National Instruments myRIO 1900 untuk kompetisi universitas.', specs_col1: ['Pengenalan NI myRIO 1900', 'Pemrograman LabVIEW', 'Konfigurasi sensor & aktuator', 'Integrasi kamera HD'], specs_col2: ['Praktek kompetisi', 'Tuning parameter robot', 'Strategi tim', 'Sertifikat resmi'], whatsapp_text: 'Halo Ichibot, saya ingin daftar pelatihan MyRIO 1900', image_url: '', sort_order: 3 },
  ]
  const { error: trErr } = await supabase.from('pelatihan').upsert(pelatihan, { onConflict: 'slug' })
  if (trErr) console.error('Pelatihan error:', trErr.message)
  else console.log(`  ✓ ${pelatihan.length} pelatihan`)

  // ─── Events ──────────────────────────────────────────────────
  console.log('📅 Seeding events...')
  const events = [
    { slug: 'line-follower-contest-its-2026', title: 'Line Follower Contest ITS Surabaya', badge: 'Kompetisi Nasional', event_date: '2026-06-14', location: 'ITS Surabaya, Jawa Timur', description: 'Kompetisi robot line follower tingkat nasional di Institut Teknologi Sepuluh Nopember Surabaya.', specs_col1: ['Kategori: Line Follower', 'Tingkat: Nasional', 'Penyelenggara: ITS Surabaya', 'Pendaftaran: April - Mei 2026'], specs_col2: ['Total Hadiah: Rp 30.000.000', 'Sistem: Turnamen & Sprint', 'Lintasan: Kompleks + Simple', 'Peserta: SMA, SMK, Universitas'], image_url: '', is_featured: true },
    { slug: 'workshop-pid-2026', title: 'Workshop Tuning PID', badge: 'Workshop', event_date: '2026-06-22', location: 'Ichibot Workshop, Yogyakarta', description: 'Workshop intensif 1 hari tentang teknik tuning PID untuk robot line follower dan sumo.', specs_col1: ['Materi: PID teori & praktek', 'Level: Menengah - Lanjut', 'Kapasitas: 20 peserta', 'Termasuk: Makan siang + kit'], specs_col2: ['Instruktur: Tim Ichibot', 'Sertifikat: Ya', 'Waktu: 08.00 - 17.00 WIB', 'Lokasi: Jl. Kaliurang KM 14'], image_url: '', is_featured: false },
    { slug: 'robot-contest-ub-2026', title: 'Robot Contest Universitas Brawijaya', badge: 'Kompetisi Nasional', event_date: '2026-07-05', location: 'Universitas Brawijaya, Malang', description: 'Kompetisi robot multi-kategori tahunan di Universitas Brawijaya, Malang.', specs_col1: ['Kategori: LF + Sumo + Transporter', 'Tingkat: Nasional', 'Penyelenggara: UB Malang', 'Pendaftaran: Mei - Juni 2026'], specs_col2: ['Total Hadiah: Rp 25.000.000', 'Peserta dari 20+ provinsi', 'Workshop pra-lomba tersedia', 'Live streaming YouTube'], image_url: '', is_featured: true },
  ]
  const { error: evErr } = await supabase.from('events').upsert(events, { onConflict: 'slug' })
  if (evErr) console.error('Events error:', evErr.message)
  else console.log(`  ✓ ${events.length} events`)

  // ─── Posts ───────────────────────────────────────────────────
  console.log('📝 Seeding posts...')
  const posts = [
    { slug: 'juara-umum-utm-malaysia', title: 'Juara Umum Line Follower UTM Malaysia', category: 'juara', badge: '🏆 Juara Umum', date: '2024-11-15', excerpt: 'Tim Ichibot berhasil meraih Juara Umum pada kompetisi Line Follower di Universiti Teknologi Malaysia (UTM).', content: '# Juara Umum Line Follower UTM Malaysia\n\nIchibot Robotics kembali mengharumkan nama Indonesia di kancah internasional. Pada kompetisi Line Follower tingkat internasional yang diselenggarakan di Universiti Teknologi Malaysia (UTM), tim kami berhasil meraih gelar **Juara Umum**.\n\n## Detail Kompetisi\n\n- **Event**: International Line Follower Contest UTM 2024\n- **Tanggal**: 15 November 2024\n- **Lokasi**: Universiti Teknologi Malaysia, Johor Bahru\n- **Peserta**: 47 tim dari 12 negara\n\nIni adalah pencapaian luar biasa yang membuktikan bahwa teknologi robotika Indonesia mampu bersaing di level internasional.', image_url: '', is_featured: true },
    { slug: '10-tahun-ichibot', title: '10 Tahun Ichibot Robotics', category: 'milestone', badge: '🎂 10 Tahun', date: '2024-06-01', excerpt: 'Ichibot Robotics merayakan 10 tahun perjalanan dari workshop kecil di Sleman hingga ekspor ke 17+ negara.', content: '# 10 Tahun Ichibot Robotics\n\nSepuluh tahun bukan waktu yang singkat. Dari garage kecil di kawasan Kaliurang, Sleman, Ichibot Robotics kini telah berkembang menjadi brand robotika kompetitif yang dikenal di 17+ negara.\n\n## Perjalanan Kami\n\nDimulai pada 2014 dengan satu produk sederhana, kami terus berinovasi dan berkembang bersama komunitas robotika Indonesia.', image_url: '', is_featured: true },
    { slug: 'ekspor-ke-jerman', title: 'Robot Ichibot Kini Ekspor ke Jerman', category: 'ekspor', badge: '🌍 Ekspor', date: '2024-09-20', excerpt: 'Ichibot Robotics berhasil mengekspor produk ke Jerman, menambah daftar negara ekspor menjadi 17+.', content: '# Robot Ichibot Kini Ekspor ke Jerman\n\nGermany adalah negara terbaru yang menerima produk robot dari Ichibot Robotics. Pengiriman perdana ke Jerman ini menandai milestone penting dalam perjalanan ekspor kami.\n\nJerman dikenal sebagai salah satu negara dengan komunitas robotika kompetitif yang aktif di Eropa.', image_url: '', is_featured: true },
    { slug: 'ekspor-ke-jepang', title: 'Kolaborasi dengan Tim Robotika Jepang', category: 'ekspor', badge: '🌏 Ekspor', date: '2024-07-10', excerpt: 'Ichibot Robotics menjalin kolaborasi dengan tim robotika dari Jepang untuk pengembangan firmware bersama.', content: '# Kolaborasi dengan Tim Robotika Jepang\n\nSalah satu pencapaian yang membanggakan adalah terjalinnya kolaborasi dengan tim robotika dari Jepang. Kolaborasi ini mencakup pengembangan firmware, berbagi pengetahuan teknis, dan rencana joint-competition di masa depan.', image_url: '', is_featured: false },
    { slug: 'komunitas-meetup-yogyakarta', title: 'Meetup Komunitas Ichibot Yogyakarta', category: 'komunitas', badge: '🤝 Komunitas', date: '2024-10-05', excerpt: '100+ robotiker berkumpul di Yogyakarta untuk sesi sharing, lomba exhibition, dan workshop mini.', content: '# Meetup Komunitas Ichibot Yogyakarta\n\nPada 5 Oktober 2024, lebih dari 100 robotiker dari berbagai kota berkumpul di Yogyakarta untuk acara meetup komunitas Ichibot terbesar yang pernah ada.\n\nAcara mencakup sesi sharing pengalaman kompetisi, lomba exhibition, dan workshop mini tuning PID.', image_url: '', is_featured: false },
    { slug: 'juara-1-robot-contest-ub', title: 'Juara 1 Robot Contest Universitas Brawijaya', category: 'juara', badge: '🥇 Juara 1', date: '2024-08-12', excerpt: 'Robot Ultimate 5 Max berhasil meraih Juara 1 kategori Line Follower di Robot Contest UB 2024.', content: '# Juara 1 Robot Contest UB 2024\n\nUltimate 5 Max kembali membuktikan kelasnya. Pada Robot Contest yang diselenggarakan di Universitas Brawijaya Malang, robot andalan kami berhasil meraih **Juara 1** kategori Line Follower.\n\nKemenangan ini makin memperkuat reputasi Ichibot sebagai produsen robot kompetitif terbaik di Indonesia.', image_url: '', is_featured: true },
    { slug: 'firmware-ultimate-5-max-v3', title: 'Rilis Firmware Ultimate 5 Max v3.2', category: 'milestone', badge: '⚡ Update', date: '2026-07-19', excerpt: 'Firmware terbaru v3.2 hadir dengan peningkatan PID otomatis dan koneksi OTA yang lebih stabil.', content: '# Firmware Ultimate 5 Max v3.2\n\nVersi firmware terbaru untuk Ultimate 5 Max kini tersedia. Update ini membawa sejumlah peningkatan signifikan:\n\n- **Auto PID**: Algoritma PID auto-tune yang lebih cerdas\n- **OTA Stability**: Koneksi update over-the-air lebih stabil\n- **Speed Mode**: Mode kecepatan baru untuk sprint\n- **Bug fixes**: Perbaikan 12 bug dari versi sebelumnya', image_url: '', is_featured: false },
  ]
  const { error: postErr } = await supabase.from('posts').upsert(posts, { onConflict: 'slug' })
  if (postErr) console.error('Posts error:', postErr.message)
  else console.log(`  ✓ ${posts.length} posts`)

  // ─── Team ────────────────────────────────────────────────────
  console.log('👥 Seeding team...')
  const team = [
    { name: 'Ahmad Rifqi', role: 'Founder & CEO', bio: 'Pendiri Ichibot Robotics dengan pengalaman 10+ tahun di dunia robotika kompetitif.', avatar_url: '', sort_order: 1 },
    { name: 'Budi Santoso', role: 'Hardware Engineer', bio: 'Ahli desain PCB dan mekanik robot. Bertanggung jawab atas kualitas hardware semua produk Ichibot.', avatar_url: '', sort_order: 2 },
    { name: 'Citra Kirana', role: 'Firmware Engineer', bio: 'Pengembang firmware utama untuk semua lini produk Ichibot. Spesialis PID dan embedded systems.', avatar_url: '', sort_order: 3 },
    { name: 'Dimas Aditya', role: 'Community Manager', bio: 'Membangun dan mengelola komunitas robotiker Ichibot di seluruh Indonesia dan mancanegara.', avatar_url: '', sort_order: 4 },
  ]
  const { error: teamErr } = await supabase.from('team').upsert(team, { onConflict: 'name' })
  if (teamErr) console.error('Team error:', teamErr.message)
  else console.log(`  ✓ ${team.length} team members`)

  // ─── Export Destinations ─────────────────────────────────────
  console.log('🌍 Seeding export destinations...')
  const destinations = [
    { country_name: 'Malaysia',      latitude:  3.14,  longitude: 101.69 },
    { country_name: 'Philippines',   latitude: 14.60,  longitude: 120.98 },
    { country_name: 'Thailand',      latitude: 13.75,  longitude: 100.49 },
    { country_name: 'Vietnam',       latitude: 21.03,  longitude: 105.83 },
    { country_name: 'Singapore',     latitude:  1.35,  longitude: 103.82 },
    { country_name: 'Myanmar',       latitude: 16.87,  longitude:  96.19 },
    { country_name: 'Australia',     latitude: -33.87, longitude: 151.21 },
    { country_name: 'Japan',         latitude: 35.68,  longitude: 139.69 },
    { country_name: 'South Korea',   latitude: 37.57,  longitude: 126.98 },
    { country_name: 'Taiwan',        latitude: 25.03,  longitude: 121.57 },
    { country_name: 'Saudi Arabia',  latitude: 24.69,  longitude:  46.72 },
    { country_name: 'UAE',           latitude: 25.20,  longitude:  55.27 },
    { country_name: 'Nigeria',       latitude:  6.45,  longitude:   3.40 },
    { country_name: 'United States', latitude: 37.77,  longitude: -122.42 },
    { country_name: 'United Kingdom',latitude: 51.51,  longitude:  -0.13 },
    { country_name: 'Germany',       latitude: 52.52,  longitude:  13.40 },
    { country_name: 'Netherlands',   latitude: 52.37,  longitude:   4.90 },
  ]
  const { error: destErr } = await supabase.from('export_destinations').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { error: destInsErr } = await supabase.from('export_destinations').insert(destinations)
  if (destErr || destInsErr) console.error('Destinations error:', destErr?.message || destInsErr?.message)
  else console.log(`  ✓ ${destinations.length} destinations`)

  console.log('\n✅ Seed selesai!')
}

seed().catch(console.error)
