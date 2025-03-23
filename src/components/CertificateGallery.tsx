import React, { useState } from "react";
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
}

// Data default jika tidak ada props yang diberikan
const defaultCertificates: Certificate[] = [
  {
    id: 1,
    title: "Sertifikat PC 12 Mpa",
    image: "/images/img-certificate.png",
    fullImage: "/images/img-certificate.png",
  },
  {
    id: 2,
    title: "Sertifikat AC-Base",
    image: "/images/img-certificate.png",
    fullImage: "/images/img-certificate.png",
  },
  {
    id: 3,
    title: "Sertifikat Lapis Pondasi Agregat CTB",
    image: "/images/img-certificate.png",
    fullImage: "/images/img-certificate.png",
  },
];

const CertificateGallery: React.FC<CertificateGalleryProps> = ({
  certificates = defaultCertificates,
  title = "Sertifikat Tingkat Komponen Dalam Negeri",
}) => {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

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

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div
          className={`mx-auto grid max-w-5xl grid-cols-1 place-items-center gap-8 ${
            certificates.length === 2
              ? "md:grid-cols-2"
              : certificates.length === 1
                ? "md:grid-cols-1"
                : "md:grid-cols-3"
          }`}
        >
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="flex cursor-pointer flex-col items-center"
              onClick={() => openModal(certificate)}
            >
              <div className="border-yellow-100 bg-yellow-50 overflow-hidden border-4 p-1 shadow-md transition-transform duration-300 hover:scale-105">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  width={700}
                  height={1000}
                  className="h-auto w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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
                <h2 className="text-white text-2xl font-bold">
                  {title}
                </h2>
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
              {/* Left arrow navigation - smaller size with hover effect */}
              <div
                className="relative h-10 w-10 flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110"
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
                  className="text-white absolute inset-[1px] flex items-center justify-center bg-blue-primary text-xl"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                >
                  &lt;
                </div>
              </div>

              <div className="mx-4 flex max-h-[90vh] flex-1 justify-center">
                <div
                  className="flex items-center justify-center"
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

              {/* Right arrow navigation - smaller size with hover effect */}
              <div
                className="relative h-10 w-10 flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110"
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
                  className="text-white absolute inset-[1px] flex items-center justify-center bg-blue-primary text-xl"
                  style={{
                    clipPath:
                      "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
                  }}
                >
                  &gt;
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
