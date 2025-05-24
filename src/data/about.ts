import type { AboutPageContent } from "~/types/cms";

// Default about page content (matching the existing about page)
export const defaultAboutPageContent: AboutPageContent = {
  hero: {
    headline: "20 Tahun membangun, Mengintegrasikan keahlian, kepercayaan, dan inovasi",
    subheadline: "Bertahun-tahun berkarya, mengukir Jejak Kualitas dalam Setiap Proyek. Dari proyek kecil hingga berskala besar, kami telah membuktikan komitmen kami terhadap kualitas dan kepuasan pelanggan.",
    backgroundImage: "/images/img-hero-about.png",
    mobileBackgroundImage: "/images/img-hero-about.png",
    ctaText: "BANGUN DENGAN WMS",
    breadcrumbsLeftPosition: "left-2 md:left-12",
    breadcrumbsTopPosition: "top-12 md:top-12"
  },
  mainTitle: "Keunggulan Utama Kami",
  features: [
    {
      icon: "/svgs/icon-certified.svg",
      title: "Keberpihakan Pada Lokal",
      description: "Dengan TKDN tinggi dan waktu kerja fleksibel (24/7) sesuai kebutuhan proyek, kami berkomitmen mendukung ekonomi lokal dan memberikan hasil terbaik."
    },
    {
      icon: "/svgs/icon-certified.svg",
      title: "Standar Nasional",
      description: "Teknologi modern dan sistem produksi kami telah disesuaikan dengan spesifikasi teknis Kementrian PUPR, memenuhi standar nasional untuk mendukung proyek besar."
    },
    {
      icon: "/svgs/icon-trophy.svg",
      title: "Kualitas Terjamin",
      description: "Produk diproses menggunakan peralatan modern terkalibrasi dengan pengujian laboratorium internal untuk memastikan konsistensi di setiap produksi."
    },
    {
      icon: "/svgs/icon-truck.svg",
      title: "Kapasitas Produksi Besar",
      description: "Kapasitas produksi Aspal Hot-Mix mencapai 60 ton/jam, dan produksi Beton Ready-Mix mencapai 60 m³/jam."
    }
  ],
  processSteps: [
    {
      number: 1,
      title: "Konsultasi & Perencanaan",
      description: "Perencanaan awal untuk kebutuhan proyek dan penyusunan jadwal produksi",
      image: "/images/img-alur-produksi-1.png"
    },
    {
      number: 2,
      title: "Mix Design & Uji Bahan Baku",
      description: "Pemilihan dan Pengujian Material di Laboratorium sesuai dengan kekuatan, daya tahan, dan standar proyek",
      image: "/images/img-alur-produksi-2.png"
    },
    {
      number: 3,
      title: "Produksi",
      description: "Pembuatan Hot-mix, Ready-mix, atau Pre-cast di pabrik menggunakan peralatan modern yang telah dikalibrasi",
      image: "/images/img-alur-produksi-3.png"
    },
    {
      number: 4,
      title: "Quality Control",
      description: "Pemeriksaan mutu pada setiap tahap produksi untuk memastikan kualitas terbaik",
      image: "/images/img-alur-produksi-4.png"
    },
    {
      number: 5,
      title: "Pengiriman",
      description: "Distribusi material ke lokasi proyek dengan armada transportasi modern",
      image: "/images/img-alur-produksi-5.png"
    },
    {
      number: 6,
      title: "Implementasi",
      description: "Penerapan material di lokasi proyek sesuai dengan standar dan spesifikasi yang ditetapkan",
      image: "/images/img-alur-produksi-6.png"
    }
  ],
  profiles: {
    visi: {
      title: "VISI",
      description: "Mendorong pembangunan infrastruktur melalui produk aspal dan beton berkualitas tinggi yang inovatif serta proses yang ramah lingkungan",
      imageSrc: "/images/img-visi.png",
      imageAlt: "Visi WMS",
      variant: "primary"
    },
    misi: {
      title: "MISI",
      description: "<ol class=\"text-white/60 list-decimal space-y-3 pl-5\"><li>Menggunakan bahan baku pilihan untuk mendukung upaya mengurangi dampak lingkungan.</li><li>Menerapkan teknologi modern untuk memastikan efisiensi produk dan mutu produk.</li><li>Memberikan solusi material; konstruksi berdaya tahan tinggi yang sesuai dengan standar nasional.</li><li>Menjalin kerjasama strategis dengan mitra proyek untuk menciptakan pembangunan infrastruktur yang kokoh dan tangguh</li></ol>",
      imageSrc: "/images/img-misi.png",
      imageAlt: "Misi WMS",
      variant: "secondary"
    }
  },
  certificateSections: [
    {
      title: "Sertifikat Tingkat Komponen Dalam Negeri",
      certificates: [],
      isDefault: true
    },
    {
      title: "Surat Keterangan Kelaikan Operasi",
      certificates: [
        {
          id: 1,
          title: "Surat Keterangan Kelaikan Operasi 1",
          image: "/images/img-laik-1.jpg",
          fullImage: "/images/img-laik-1.jpg"
        },
        {
          id: 2,
          title: "Surat Keterangan Kelaikan Operasi 2",
          image: "/images/img-laik-2.jpg",
          fullImage: "/images/img-laik-2.jpg"
        }
      ],
      large: true,
      landscape: true
    },
    {
      title: "Sertifikat ISO",
      certificates: [
        {
          id: 1,
          title: "Sertifikat ISO 9001",
          image: "/images/img-iso-1.jpg",
          fullImage: "/images/img-iso-1.jpg"
        },
        {
          id: 2,
          title: "Sertifikat ISO 14001",
          image: "/images/img-iso-2.jpg",
          fullImage: "/images/img-iso-2.jpg"
        },
        {
          id: 3,
          title: "Sertifikat ISO 45001",
          image: "/images/img-iso-3.jpg",
          fullImage: "/images/img-iso-3.jpg"
        }
      ]
    },
    {
      title: "Sertifikat SNI",
      certificates: [
        {
          id: 1,
          title: "Sertifikat SNI",
          image: "/images/img-sni-1.jpg",
          fullImage: "/images/img-sni-1.jpg"
        },
        {
          id: 2,
          title: "Sertifikat SNI",
          image: "/images/img-sni-2.jpg",
          fullImage: "/images/img-sni-2.jpg"
        }
      ]
    }
  ]
};

// Get about page content (in a real app, this would fetch from a database)
export const getAboutPageContent = (): AboutPageContent => {
  // Check if there's stored content in localStorage (browser only)
  if (typeof window !== 'undefined') {
    const storedContent = localStorage.getItem('aboutPageContent');
    if (storedContent) {
      try {
        // Parse stored content and ensure it's of the correct type
        const parsedContent = JSON.parse(storedContent) as AboutPageContent;
        return parsedContent;
      } catch (e) {
        console.error('Failed to parse stored about page content:', e);
      }
    }
  }

  // Return default content if nothing is stored or we're on the server
  return defaultAboutPageContent;
};

// Save about page content (in a real app, this would save to a database)
export const saveAboutPageContent = (content: AboutPageContent): boolean => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aboutPageContent', JSON.stringify(content));
    }
    return true;
  } catch (e) {
    console.error('Failed to save about page content:', e);
    return false;
  }
};
