import type { Metadata } from 'next'
import HomePageClient from './home-client' // Ini meng-import file yang baru Anda ganti nama

// VVV INI ADALAH METADATA BARU ANDA VVV
export const metadata: Metadata = {
  // 1. JUDUL HALAMAN (TITLE)
  // Fokus pada 3 Pilar Produk + Brand Anda.
  title: 'Supplier Aspal Hotmix, Readymix, & Beton Precast | WMS Mix',
  
  // 2. DESKRIPSI HALAMAN (DESCRIPTION)
  // Menjelaskan 3 pilar produk, 1 layanan, dan 5 area layanan utama.
  description: 'WMS Mix adalah supplier utama Aspal Hotmix, Beton Readymix, dan Beton Precast (U-Ditch, dll). Melayani juga sewa AMP & Batching Plant di Tuban, Bojonegoro, Gresik, Surabaya, dan Lamongan.',
  
  // 3. CANONICAL URL
  // Memberitahu Google bahwa ini adalah URL utama.
  alternates: {
    canonical: 'https://wmsmix.com',
  },
}
// ^^^ INI ADALAH METADATA BARU ANDA ^^^


// Ini adalah Server Component baru yang akan menampilkan halaman Anda
export default function Page() {
  return <HomePageClient />
}
