import type { HomepageContent } from "~/types/cms";

// Default homepage content (matching the existing homepage)
export const defaultHomepageContent: HomepageContent = {
  hero: {
    headline: "Aspal & Beton Terbaik, Dirancang oleh Ahli Konstruksi",
    subheadline: "PT Wahana Makmur Sentosa (WMS) adalah pabrik aspal dan beton di Jawa Timur yang telah bersertifikasi SLO dan diakui Kementerian PUPR. Dengan teknologi modern, WMS siap menyajikan produk dengan kualitas tertinggi.",
    backgroundImage: "/images/home-background.png",
    mobileBackgroundImage: "/images/home-background-mobile.png",
    ctaText: "Lihat Produk",
    ctaHref: "/products",
  },
  tagline: "Berpengalaman, Terpercaya, dan Ahli di Bidangnya",
  certifications: [
    {
      title: "Sertifikat ISO",
      subtitle: "Mandala Certification",
      image: "/images/img-mandala.png",
    },
    {
      title: "Sertifikat Tingkat\nKomponen Dalam negeri",
      subtitle: "Kementerian Perindustrian",
      image: "/images/img-kemendustri.png",
    },
    {
      title: "Surat Keterangan\nKelaikan Operasi",
      subtitle: "Kementerian PUPR",
      image: "/images/img-kemenpupr.png",
    },
    {
      title: "Standar Nasional Indonesia",
      subtitle: "PT. Global Inspeksi Sertifikasi",
      image: "/images/img-sni.png",
    },
  ],
  products: [
    {
      title: "ASPAL",
      italicText: "(HOT-MIX)",
      description: "Produk laston yang dirancang untuk memberikan daya tahan, fleksibilitas, dan performa maksimal pada berbagai infrastruktrur",
      imageSrc: "/images/img-product-aspal.png",
      href: "/products/aspal",
    },
    {
      title: "BETON",
      italicText: "(READY-MIX)",
      description: "Memiliki tipe dengan kekuatan tekan 10 MPa hingga 30 MPa, dimana tiap tipe dirancang untuk kebutuhan konstruksi ringan hingga proyek infrastruktur berat.",
      imageSrc: "/images/img-product-beton.png",
      href: "/products/beton",
    },
    {
      title: "",
      italicText: "PRECAST CONCRETE",
      description: "Produk beton pracetak dengan berbagai bentuk dan ukuran. Dirancang untuk saluran air, pembatas jalan, taman, trotoar, dll.",
      imageSrc: "/images/img-product-precast.png",
      href: "/products/precast-concrete",
    },
  ],
  features: [
    {
      title: "Sertifikasi Lengkap dan Berpengalaman",
      description: "Seluruh produk dan layanan memenuhi standar tertinggi melalui sertifikasi oleh Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR), Kementerian Perindustrian dan Lembaga Lainnya.",
      imageSrc: "/images/img-sertifikasi.png",
      buttonText: "PELAJARI SELENGKAPNYA",
      buttonHref: "/about",
      isInverted: false,
      bgColor: "bg-white-10",
      textColor: "text-black",
    },
    {
      title: "Harga Bersaing, Mutu Terjamin",
      description: "Produk aspal dan beton kami telah teruji kualitasnya dan mampu memberikan hasil akhir yang kokoh dan tahan lama. Investasikan pada produk berkualitas untuk proyek Anda.",
      imageSrc: "/images/img-harga-bersaing.png",
      isInverted: true,
      bgColor: "bg-white-10",
      textColor: "text-black",
    },
    {
      title: "Peralatan dan Pelayanan Lengkap, Order Kapanpun",
      description: "Dari berbagai macam pilihan produk aspal dan beton, penyediaan jasa gelar aspal, pengecoran beton, hingga penyediaan support letter. WMS siap melayani dari awal hingga akhir proses proyek Anda.",
      imageSrc: "/images/img-peralatan.png",
      isInverted: false,
      bgColor: "bg-blue-primary",
      textColor: "text-white-10",
    },
  ],
  showcase: {
    period: "(2022-2024)",
    title: "Jalan Lingkar Tuban",
    description: "Pembangunan Jalan Lingkar Tuban yang berlokasi di Desa Prunggahan Kulon, Tuban, sepanjang 7,98 km. Ruang lingkup WMS berada pada penyediaan dan aplikasi material konstruksi Hot-mix, Ready-mix, dan Precast.",
    imageSrc: "/images/img-jejak.png",
    projectValue: "103M",
    projectLength: "7.98 KM",
    projectSlug: "jalan-lingkar-tuban",
  },
};

// Get homepage content (in a real app, this would fetch from a database)
export const getHomepageContent = (): HomepageContent => {
  // Check if there's stored content in localStorage (browser only)
  if (typeof window !== 'undefined') {
    const storedContent = localStorage.getItem('homepageContent');
    if (storedContent) {
      try {
        // Parse stored content and ensure it's of the correct type
        const parsedContent = JSON.parse(storedContent) as HomepageContent;
        return parsedContent;
      } catch (e) {
        console.error('Failed to parse stored homepage content:', e);
      }
    }
  }

  // Return default content if nothing is stored or we're on the server
  return defaultHomepageContent;
};

// Save homepage content (in a real app, this would save to a database)
export const saveHomepageContent = (content: HomepageContent): boolean => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('homepageContent', JSON.stringify(content));
    }
    return true;
  } catch (e) {
    console.error('Failed to save homepage content:', e);
    return false;
  }
};
