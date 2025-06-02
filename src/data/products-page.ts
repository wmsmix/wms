import type { ProductsPageContent } from "~/types/cms";

// Default products page content (matching the existing products page)
export const defaultProductsPageContent: ProductsPageContent = {
  hero: {
    backgroundImage: "/images/product-background.png",
    mobileBackgroundImage: "/images/product-background-mobile.png",
    headline: "Dari Pasokan hingga Pemeliharaan, Kami Ada untuk Anda",
    subheadline: "Mulai dari pengadaan material berkualitas seperti aspal dan beton hingga pelaksanaan proyek konstruksi secara profesional, kami siap menjadi mitra terpercaya Anda.",
    ctaText: "KONSULTASI SEKARANG",
    ctaHref: "/contact",
    breadcrumbsTopPosition: "top-12 md:top-12",
    breadcrumbsLeftPosition: "left-2 md:left-12"
  },
  introduction: {
    title: "Dari lapisan aspal hingga infrastrukur berat, Kustomisasi Produk Sesuai Kebutuhanmu",
    description: "Pilih dan kustomisasi produk sesuai dengan kebutuhan proyek anda, tim ahli siap membantu anda menemukan solusi yang tepat",
    buttonText: "KONSULTASI SEKARANG",
    buttonHref: "/contact"
  },
  services: {
    title: "Servis Satu Atap",
    description: "Dari Konsep hingga Realisasi, Kami membantu dari perencanaan hingga pelaksanaan",
    services: [
      {
        imageSrc: "/images/img-jasa-gelar-aspal.png",
        title: "JASA GELAR ASPAL",
        description: "Jasa pengaspalan hot-mix dengan tim profesional dan peralatan modern.",
        italicWords: ["hot-mix"],
        imagePosition: "top"
      },
      {
        imageSrc: "/images/img-pengecoran-beton.png",
        title: "PENGECORAN BETON",
        description: "Layanan pengecoran beton langsung di lokasi proyek menggunakan campuran beton berkualitas tinggi.",
        imagePosition: "bottom"
      },
      {
        imageSrc: "/images/img-support-letter.png",
        title: "SURAT DUKUNGAN",
        italicTitle: true,
        description: "Surat dukungan resmi untuk memenuhi persyaratan tender dan memastikan kelancaran pengadaan material konstruksi.",
        italicWords: ["tender"],
        imagePosition: "top"
      },
      {
        imageSrc: "/images/img-solusi-khusus.png",
        title: "SOLUSI KHUSUS",
        description: "Semua kebutuhan dan solusi masalah infrastruktur Proyek Anda.",
        imagePosition: "bottom"
      }
    ]
  },
  supportLetter: {
    title: "Proyek Makin Lancar",
    subtitle: "dengan Surat Dukungan",
    description: "Surat dukungan resmi ini akan membantu Anda memenuhi persyaratan tender, memberikan keyakinan kepada panitia pengadaan, dan memastikan kelancaran pasokan material konstruksi dari perusahaan kami untuk proyek Anda",
    imageSrc: "/images/img-support-letter.png",
    buttonText: "HUBUNGI KAMI",
    buttonHref: "/contact"
  },
  clippedSection: {
    title: "Proyek Impian Anda, Realisasikan Bersama Kami",
    description: "Dengan pengalaman bertahun-tahun, kami telah berhasil menyelesaikan berbagai proyek dengan hasil yang memuaskan. Percayakan proyek Anda pada kami dan rasakan perbedaannya.",
    buttonText: "MULAI SEKARANG",
    buttonHref: "/contact"
  },
  insightsSectionTitle: "Lihat Insight Proyek"
};

// Get products page content (in a real app, this would fetch from a database)
export const getProductsPageContent = (): ProductsPageContent => {
  // Check if there's stored content in localStorage (browser only)
  if (typeof window !== 'undefined') {
    const storedContent = localStorage.getItem('productsPageContent');
    if (storedContent) {
      try {
        // Parse stored content and ensure it's of the correct type
        const parsedContent = JSON.parse(storedContent) as ProductsPageContent;
        return parsedContent;
      } catch (e) {
        console.error('Failed to parse stored products page content:', e);
      }
    }
  }

  // Return default content if nothing is stored or we're on the server
  return defaultProductsPageContent;
};

// Save products page content (in a real app, this would save to a database)
export const saveProductsPageContent = (content: ProductsPageContent): boolean => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('productsPageContent', JSON.stringify(content));
    }
    return true;
  } catch (e) {
    console.error('Failed to save products page content:', e);
    return false;
  }
};
