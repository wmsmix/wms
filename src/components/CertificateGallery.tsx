import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
    const newIndex = Math.min(
      sliderIndex + 1,
      certificates.length - itemsPerView,
    );
    setSliderIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(sliderIndex - 1, 0);
    setSliderIndex(newIndex);
  };

  // Fungsi untuk menentukan opacity item berdasarkan posisi (hanya untuk default gallery)
  const getItemOpacity = (index: number) => {
    if (!isDefault) return 1; // Full opacity untuk non-default gallery

    const position = index - sliderIndex;

    // Item tengah memiliki opacity penuh
    if (position >= 0 && position < itemsPerView) {
      // Untuk efek gradient opacity pada item pinggir dalam view
      if (itemsPerView > 1) {
        if (position === 0) return 0.7; // Item paling kiri
        if (position === itemsPerView - 1) return 0.7; // Item paling kanan
      }
      return 1; // Item tengah
    }

    // Item di luar view memiliki opacity rendah
    return 0.4;
  };

  // Fungsi untuk menentukan scale item berdasarkan posisi (hanya untuk default gallery)
  const getItemScale = (index: number) => {
    if (!isDefault) return 1; // Full scale untuk non-default gallery

    const position = index - sliderIndex;

    // Item tengah memiliki scale penuh
    if (position > 0 && position < itemsPerView - 1) return 1;

    // Item pinggir dalam view memiliki scale lebih kecil
    if (position === 0 || position === itemsPerView - 1) return 0.95;

    // Item di luar view
    return 0.9;
  };

  // Render gallery dalam dua mode berbeda
  const renderGallery = () => {
    if (isDefault) {
      // Gallery dengan background hijau dan arrow untuk TKDN
      return (
        <div className="relative mx-auto max-w-6xl">
          {/* Slider Container with Custom Navigation */}
          <div className="relative w-full overflow-hidden py-6">
            {/* Left Navigation Arrow - Using octagon shape like modal */}
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

            <div
              ref={sliderRef}
              className="flex px-4 transition-transform duration-500 ease-in-out md:px-16"
              style={{
                transform: `translateX(-${sliderIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {certificates.map((certificate, index) => (
                <div
                  key={certificate.id}
                  className="flex-shrink-0 cursor-pointer px-2 transition-all duration-300"
                  style={{
                    width: `${100 / itemsPerView}%`,
                    opacity: getItemOpacity(index),
                    transform: `scale(${getItemScale(index)})`,
                    zIndex:
                      index === sliderIndex + Math.floor(itemsPerView / 2)
                        ? 10
                        : 5,
                  }}
                  onClick={() => openModal(certificate)}
                >
                  <div className="overflow-hidden rounded-md border-8 border-[#d1d68d] bg-[#ffffea] p-1 shadow-md transition-transform duration-300 hover:shadow-lg">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Navigation Arrow - Using octagon shape like modal */}
            <div className="absolute inset-y-0 right-0 z-20 mr-3 hidden items-center md:flex">
              <div
                className={`relative h-12 w-12 flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110 ${
                  sliderIndex >= certificates.length - itemsPerView
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={
                  sliderIndex >= certificates.length - itemsPerView
                    ? undefined
                    : nextSlide
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
          </div>

          {/* Indicators/Pagination */}
          <div className="mt-2 flex justify-center space-x-2">
            {Array.from({
              length: Math.ceil(certificates.length / itemsPerView),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setSliderIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  sliderIndex === index ? "bg-blue-700" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      );
    } else {
      // Gallery standar untuk jenis sertifikat lainnya
      return (
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-center gap-8">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="cursor-pointer"
                onClick={() => openModal(certificate)}
              >
                <div className="overflow-hidden transition-all duration-300 hover:opacity-90">
                  <div
                    className={`${landscape ? "aspect-[4/3] w-[340px] md:w-[520px]" : large ? "aspect-[3/4] w-[340px] md:w-[480px]" : "aspect-[3/4] w-[340px]"} relative`}
                  >
                    <Image
                      src={certificate.image}
                      alt={certificate.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {renderGallery()}

      {/* Modal - sama untuk semua jenis gallery */}
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
                  className={`flex items-center justify-center overflow-hidden ${isDefault ? "rounded-md border-8 border-[#d1d68d] bg-[#ffffea]" : ""}`}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <Image
                    src={selectedCertificate.fullImage}
                    alt={selectedCertificate.title}
                    width={1200}
                    height={1700}
                    className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
                    quality={95}
                  />
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
