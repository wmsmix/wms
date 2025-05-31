import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SupabaseImage from "~/components/SupabaseImage";

interface Certificate {
  id: number;
  title: string;
  image: string;
  fullImage: string;
}

interface CertificateGalleryProps {
  certificates?: Certificate[];
  title?: string;
  isDefault?: boolean; // Flag untuk menandai apakah ini gallery default (TKDN)
  large?: boolean; // Untuk memperbesar sertifikat pada gallery non-default
  landscape?: boolean; // Untuk sertifikat landscape (aspect ratio lebih lebar)
}

// Sertifikat dari folder img-sertifikat
const sertifikatImages: Certificate[] = [
  {
    id: 1,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-1.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-1.png",
  },
  {
    id: 2,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-2.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-2.png",
  },
  {
    id: 3,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-3.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-3.png",
  },
  {
    id: 4,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-4.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-4.png",
  },
  {
    id: 5,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-5.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-5.png",
  },
  {
    id: 6,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-6.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-6.png",
  },
  {
    id: 7,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-7.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-7.png",
  },
  {
    id: 8,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-8.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-8.png",
  },
  {
    id: 9,
    title: "Sertifikat Tingkat Komponen Dalam Negeri",
    image: "/images/img-sertifikat/img-sertifikat-9.png",
    fullImage: "/images/img-sertifikat/img-sertifikat-9.png",
  },
];

// Data default jika tidak ada props yang diberikan
const defaultCertificates: Certificate[] = sertifikatImages;

const CertificateGallery: React.FC<CertificateGalleryProps> = ({
  certificates = defaultCertificates,
  title = "Sertifikat Tingkat Komponen Dalam Negeri",
  isDefault = false, // Default adalah false, harus di-set true untuk TKDN
  large = false,
  landscape = false,
}) => {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Jumlah item yang ditampilkan pada slider berdasarkan lebar layar
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch event handlers untuk mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches?.[0]?.clientX ?? null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches?.[0]?.clientX ?? null);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && sliderIndex < certificates.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && sliderIndex > 0) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const openModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    const index = certificates.findIndex((cert) => cert.id === certificate.id);
    setCurrentIndex(index);
    setZoomLevel(1);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    setZoomLevel(1);
  };

  const nextCertificate = () => {
    const newIndex = (currentIndex + 1) % certificates.length;
    setCurrentIndex(newIndex);
    setSelectedCertificate(certificates[newIndex] ?? null);
    setZoomLevel(1);
  };

  const prevCertificate = () => {
    const newIndex =
      (currentIndex - 1 + certificates.length) % certificates.length;
    setCurrentIndex(newIndex);
    setSelectedCertificate(certificates[newIndex] ?? null);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    if (zoomLevel < 2.5) {
      setZoomLevel(zoomLevel + 0.25);
    }
  };

  const zoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.25);
    }
  };

  const nextSlide = () => {
    const newIndex = Math.min(sliderIndex + 1, certificates.length - 1);
    setSliderIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(sliderIndex - 1, 0);
    setSliderIndex(newIndex);
  };

  // Fungsi untuk menentukan opacity item berdasarkan posisi (untuk semua gallery)
  const getItemOpacity = (index: number) => {
    const activeIndex = sliderIndex;
    const distance = Math.abs(index - activeIndex);

    // Pada tampilan mobile gunakan opacity 1 untuk semua item
    if (itemsPerView === 1) return 1;

    // Untuk desktop, semua item memiliki opacity yang sama
    return 1;
  };

  // Fungsi untuk menentukan scale item berdasarkan posisi (untuk semua gallery)
  const getItemScale = (index: number) => {
    const activeIndex = sliderIndex;
    const distance = Math.abs(index - activeIndex);

    // Pada tampilan mobile, gunakan skala yang berbeda (lebih besar)
    if (itemsPerView === 1) {
      return index === activeIndex ? 1 : 0.95;
    }

    // Untuk desktop, semua sertifikat memiliki skala yang sama
    return 1;
  };

  // Render gallery menggunakan style yang konsisten
  const renderGallery = () => {
    // Pendekatan baru: Untuk mobile (itemsPerView === 1), gunakan scroll snapping
    // yang selalu mencentering item

    if (itemsPerView === 1) {
      // Mobile view dengan scroll snapping
      return (
        <div className="relative mx-auto max-w-6xl">
          <div className="relative w-full overflow-hidden py-6">
            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory overflow-x-auto hide-scrollbar px-4"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
                paddingRight: '15%', // Mengurangi padding kanan agar item utama lebih besar
              }}
            >
              {certificates.map((certificate, index) => (
                <div
                  key={certificate.id}
                  className="flex-shrink-0 cursor-pointer px-4 snap-center"
                  style={{
                    width: '100%', // Memperbesar lebar item untuk tampilan yang lebih besar
                    scrollSnapAlign: 'center',
                    // Hanya kurangi scale untuk item non-aktif, tetapi tetap opacity 1
                    opacity: 1,
                    transform: `scale(${index === sliderIndex ? 1 : 0.95})`,
                    zIndex: index === sliderIndex ? 10 : 5,
                  }}
                  onClick={() => {
                    openModal(certificate);
                    setSliderIndex(index);
                  }}
                >
                  <div
                    className={`overflow-hidden transition-transform duration-300 hover:shadow-lg ${isDefault ? "shadow-md" : ""}`}
                  >
                    <div
                      className={`relative ${
                        landscape
                          ? "aspect-[4/3] w-full"
                          : large || isDefault
                            ? "aspect-[3/4] w-full"
                            : "aspect-[3/4] w-full"
                      }`}
                    >
                      {/* Use SupabaseImage for certificate images from CMS, regular Image for default certificates */}
                      {isDefault ? (
                        <Image
                          src={certificate.image}
                          alt={certificate.title}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <SupabaseImage
                          src={certificate.image}
                          alt={certificate.title}
                          fill
                          className="object-contain"
                          bucket="cms-uploads"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Desktop view dengan slider normal
    // Menghitung offset untuk memastikan item aktif selalu di tengah
    const centerOffset = Math.floor(itemsPerView / 2);

    // Tentukan berapa banyak item yang tersisa di kanan dan kiri
    const maxStartPosition = Math.max(0, certificates.length - itemsPerView);

    // Hitung posisi slide yang ideal (sertifikat aktif di tengah)
    let idealPosition = sliderIndex - centerOffset;

    // Batasi ideal position agar tidak keluar batas
    idealPosition = Math.max(0, Math.min(idealPosition, maxStartPosition));

    // Hitung translateX berdasarkan posisi yang sudah dibatasi
    const translateX = -(idealPosition * 100) / itemsPerView;

    // Cek apakah perlu menampilkan navigasi arrow (hanya jika sertifikat > 3)
    const showNavigation = certificates.length > 3;

    return (
      <div className="relative mx-auto max-w-6xl">
        <div className="relative w-full overflow-hidden py-6">
          {/* Left Navigation Arrow - Hidden pada mobile atau jika sertifikat <= 3 */}
          {showNavigation && (
            <div className="absolute inset-y-0 left-0 z-20 ml-3 hidden items-center md:flex">
              <div
                className={`relative h-12 w-12 flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110 ${
                  sliderIndex === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={sliderIndex === 0 ? undefined : prevSlide}
              >
                <div
                  className="absolute inset-0 bg-white-10"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                ></div>

                <div
                  className="text-white absolute inset-[1px] flex items-center justify-center bg-blue-primary p-4"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                >
                  <Image
                    src="/images/img-arrow-left.png"
                    alt="Previous"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}

          <div
            ref={sliderRef}
            className={`flex px-4 transition-transform duration-500 ease-in-out md:px-16 ${certificates.length <= 3 ? 'justify-center' : ''}`}
            style={{
              transform: certificates.length <= 3 ? 'none' : `translateX(${translateX}%)`,
            }}
          >
            {certificates.map((certificate, index) => (
              <div
                key={certificate.id}
                className="flex-shrink-0 cursor-pointer px-3 transition-all duration-300 md:px-4"
                style={{
                  width: certificates.length <= 3
                    ? '100%'
                    : `${120 / itemsPerView}%`, // Ukuran lebih besar untuk <= 3 sertifikat
                  opacity: getItemOpacity(index),
                  transform: `scale(${getItemScale(index)})`,
                  zIndex: index === sliderIndex ? 10 : 5,
                  // Ukuran khusus berdasarkan tipe sertifikat
                  maxWidth: certificates.length <= 3
                    ? landscape ? '560px' : '400px' // Ukuran lebih besar untuk kedua tipe
                    : 'none',
                }}
                onClick={() => {
                  openModal(certificate);
                  setSliderIndex(index); // Fokus pada sertifikat yang diklik
                }}
              >
                <div
                  className={`overflow-hidden transition-transform duration-300 hover:shadow-lg ${isDefault ? "shadow-md" : ""}`}
                >
                  <div
                    className={`relative ${
                      landscape
                        ? "aspect-[4/3] w-full"
                        : large || isDefault
                          ? "aspect-[3/4] w-full"
                          : "aspect-[3/4] w-full"
                    }`}
                    style={{
                      maxHeight: landscape ? '70vh' : '80vh', // Memastikan tinggi tidak melebihi viewport
                    }}
                  >
                    {/* Use SupabaseImage for certificate images from CMS, regular Image for default certificates */}
                    {isDefault ? (
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <SupabaseImage
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        className="object-contain"
                        bucket="cms-uploads"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow - Hidden pada mobile atau jika sertifikat <= 3 */}
          {showNavigation && (
            <div className="absolute inset-y-0 right-0 z-20 mr-3 hidden items-center md:flex">
              <div
                className={`relative h-12 w-12 flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110 ${
                  sliderIndex >= certificates.length - 1
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={
                  sliderIndex >= certificates.length - 1 ? undefined : nextSlide
                }
              >
                <div
                  className="absolute inset-0 bg-white-10"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                ></div>

                <div
                  className="text-white absolute inset-[1px] flex items-center justify-center bg-blue-primary p-4"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                >
                  <Image
                    src="/images/img-arrow-right.png"
                    alt="Next"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Tambahkan style khusus untuk menghilangkan scrollbar
  useEffect(() => {
    // Hanya tambahkan style jika itemsPerView adalah 1 (mobile)
    if (itemsPerView === 1) {
      const style = document.createElement('style');
      style.textContent = `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [itemsPerView]);

  // Update event handler untuk mobile
  useEffect(() => {
    if (itemsPerView === 1 && sliderRef.current) {
      const handleScroll = () => {
        if (!sliderRef.current) return;

        const scrollLeft = sliderRef.current.scrollLeft;
        const itemWidth = sliderRef.current.clientWidth;
        const newIndex = Math.round(scrollLeft / itemWidth);

        if (newIndex !== sliderIndex) {
          setSliderIndex(newIndex);
        }
      };

      const currentRef = sliderRef.current;
      currentRef.addEventListener('scroll', handleScroll);

      return () => {
        currentRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, [itemsPerView, sliderIndex]);

  return (
    <div>
      {renderGallery()}

      {/* Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-primary bg-opacity-80">
          <div className="relative flex h-screen w-screen flex-col items-center px-4 py-6">
            <div className="mb-2 w-full text-center">
              <div className="flex items-center justify-between">
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-300"
                >
                  <span className="text-3xl">✕</span>
                </button>
                <h2 className="text-white text-2xl font-bold">{title}</h2>
                <div className="w-8"></div>
              </div>

              <h3 className="text-white mt-2 text-xl">
                {selectedCertificate.title}
              </h3>
            </div>

            <div className="mb-4 flex justify-center">
              <div className="flex items-center justify-center gap-4 px-2">
                <button
                  onClick={zoomOut}
                  className="hover:bg-white hover:text-white h-10 w-10 bg-white-20 text-2xl text-black hover:bg-opacity-10"
                  disabled={zoomLevel <= 0.5}
                >
                  −
                </button>
                <button
                  onClick={zoomIn}
                  className="hover:bg-white hover:text-white h-10 w-10 bg-white-20 text-2xl text-black hover:bg-opacity-10"
                  disabled={zoomLevel >= 2.5}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-12 flex w-full flex-1 items-center justify-between px-4">
              {/* Left arrow navigation */}
              <div
                className="relative h-12 w-12 flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={prevCertificate}
              >
                <div
                  className="absolute inset-0 bg-white-10"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                ></div>

                <div
                  className="text-white absolute inset-[1px] flex items-center justify-center bg-blue-primary p-4"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                >
                  <Image
                    src="/images/img-arrow-left.png"
                    alt="Previous"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mx-4 flex max-h-[90vh] flex-1 justify-center">
                <div
                  className={`flex items-center justify-center overflow-hidden ${
                    isDefault
                      ? "rounded-md border-8 border-[#d1d68d] bg-[#ffffea]"
                      : ""
                  }`}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                    transition: "transform 0.2s ease",
                  }}
                >
                  {/* Use SupabaseImage for certificate images from CMS, regular Image for default certificates */}
                  {isDefault ? (
                    <Image
                      src={selectedCertificate.fullImage}
                      alt={selectedCertificate.title}
                      width={1200}
                      height={1700}
                      className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
                      quality={95}
                    />
                  ) : (
                    <SupabaseImage
                      src={selectedCertificate.fullImage}
                      alt={selectedCertificate.title}
                      width={1200}
                      height={1700}
                      className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
                      quality={95}
                      bucket="cms-uploads"
                    />
                  )}
                </div>
              </div>

              {/* Right arrow navigation */}
              <div
                className="relative h-12 w-12 flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={nextCertificate}
              >
                <div
                  className="absolute inset-0 bg-white-10"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                ></div>

                <div
                  className="text-white absolute inset-[1px] flex items-center justify-center bg-blue-primary p-4"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                >
                  <Image
                    src="/images/img-arrow-right.png"
                    alt="Next"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGallery;
