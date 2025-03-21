"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";

export default function InsightsPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  const mobileItemsPerPage = 3;
  const totalItems = 12;

  const [isMobile, setIsMobile] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(
    Math.ceil(totalItems / itemsPerPage),
  );

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setTotalPages(
        Math.ceil(totalItems / (mobile ? mobileItemsPerPage : itemsPerPage)),
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <section className="project-hero relative min-h-[320px] w-full overflow-hidden md:min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/img-insights.png"
            alt="Projects"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 flex w-full flex-col justify-end space-y-2 px-6 pb-16 md:flex-row md:items-end md:justify-between md:space-y-0 md:px-12 md:pb-16 lg:px-48">
          <div className="flex items-end gap-6">
            <span className="text-start font-noto text-4xl text-white-10 lg:text-6xl">
              Insights
            </span>
          </div>

          <div className="text-start text-sm text-white-10 opacity-75 md:text-base">
            {/* Mobile breadcrumb */}
            <span className="md:hidden">HOME / INSIGHTS</span>
            {/* Desktop breadcrumb */}
            <span className="hidden md:inline">HOME / INSIGHTS</span>
          </div>
        </div>

        <style jsx>{`
          .project-hero {
            clip-path: polygon(0 0, 100% 0, 100% 76%, 94% 100%, 6% 100%, 0 76%);
          }

          @media (max-width: 768px) {
            .project-hero {
              clip-path: polygon(
                0 0,
                100% 0,
                100% 94%,
                90% 100%,
                10% 100%,
                0 94%
              );
            }
          }
        `}</style>
      </section>

      <section className="news-section px-6 py-12 md:px-12 lg:px-48">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="news-main w-full md:col-span-2">
            <div className="block w-full overflow-hidden">
              <div className="relative">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/images/img-projects.png"
                    alt="Jalan Lingkar Selatan Tuban"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-col">
                <div className="flex">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-[70px] w-[60px] flex-shrink-0 items-end justify-center bg-blue-primary pb-2 text-white-10"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 12% 100%, 0 88%)",
                      }}
                    >
                      <span className="text-3xl font-semibold">20</span>
                    </div>

                    <span className="mt-4 text-2xl font-medium uppercase text-black">
                      MEI
                    </span>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-titilium mb-4 text-xl text-black">
                      Jalan Lingkar Selatan Tuban Mulai Diaktifkan Terbatas:
                      Kendaraan Berat Boleh Lewat, tapi Tak Wajib
                    </h3>
                    <p className="mb-4 text-gray-500">
                      Radar Tuban - Kamis, 30 Mei 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-px flex-grow bg-gray-300"></div>
                  <Link href="/insights/jalan-lingkar-selatan-tuban-mulai-diaktifkan-terbatas">
                    <Button text="BACA LEBIH LANJUT" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="news-list space-y-6 md:col-span-1">
            <Link href="/insights/ring-road-tuban-19-km-diuji-coba" className="block hover:text-blue-primary transition-colors">
              <div className="flex flex-col gap-1 border-b pb-4">
                <div>
                  <span className="text-2xl text-black">
                    Ring Road Tuban 19 Km Diuji Coba, Kendaraan Besar Dialihkan
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-base text-gray-500">
                    Kamis, 30 Mei 2024
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/insights/gubernur-resmikan-tiga-nama" className="block hover:text-blue-primary transition-colors">
              <div className="flex flex-col gap-1 border-b pb-4">
                <div>
                  <span className="text-2xl text-black">
                    Gubernur Resmikan Tiga Nama Jalan di Lingkar Tuban
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-base text-gray-500">
                    Senin, 20 Maret 2024
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/insights/gubernur-jatim-resmikan" className="block hover:text-blue-primary transition-colors">
              <div className="flex flex-col gap-1 border-b pb-4">
                <div>
                  <span className="text-2xl text-black">
                    Gubernur Jawa Timur Resmikan Penamaan Jalan Lingkar Selatan
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-base text-gray-500">
                    Senin, 20 Maret 2024
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/insights/perkembangan-pembangunan-capai-90" className="block hover:text-blue-primary transition-colors">
              <div className="flex flex-col gap-1 border-b pb-4">
                <div>
                  <span className="text-2xl text-black">
                    Perkembangan Pembangunan Jalan Lingkar Tuban Capai 90%
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-base text-gray-500">
                    Selasa, 25 April 2024
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Grid News */}
      <section className="grid-news-section bg-white-10 px-6 py-12 md:px-12 lg:px-48">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: isMobile ? 3 : 6 }).map((_, index) => {
            const newsIndex = (currentPage - 1) * (isMobile ? 3 : 6) + index;
            const newsItems = [
              {
                title:
                  "Pembangunan Jalan Lingkar Tuban: Dorong Pertumbuhan Ekonomi",
                date: "20",
                month: "MEI",
                imageSrc: "/images/img-kabar-proyek-1.png",
                description:
                  "Setelah dilaporkan tuntas, jalan lingkar selatan (JLS) Tuban mulai diaktifkan secara...",
                url: "/insights/pembangunan-jalan-lingkar",
              },
              {
                title: "Ring Road Tuban Jadi Opsi Pengendara Kena Macet",
                date: "16",
                month: "JUNI",
                imageSrc: "/images/img-kabar-proyek-2.png",
                description:
                  "KBRN, Tuban: Setelah diresmikan, Ring Road/Jalur Lingkar Selatan Tuban yang berjalan...",
                url: "/insights/ring-road-tuban-jadi-opsi",
              },
              {
                title:
                  "Ring Road Tuban 19 Km Diuji Coba, Kendaraan Besar Dialihkan",
                date: "15",
                month: "FEB",
                imageSrc: "/images/img-kabar-proyek-3.png",
                description:
                  "KBRN, Tuban: Kapolres Tuban AKBP Suryono mengatakan bahwa dirinya sempat...",
                url: "/insights/ring-road-tuban-diuji-coba",
              },
              {
                title: "Gubernur Resmikan Tiga Nama Jalan di Lingkar Tuban",
                date: "20",
                month: "MAR",
                imageSrc: "/images/img-kabar-proyek-1.png",
                description:
                  "Setelah dilaporkan tuntas, jalan lingkar selatan (JLS) Tuban mulai diaktifkan secara...",
                url: "/insights/gubernur-resmikan-tiga-nama",
              },
              {
                title:
                  "Gubernur Jawa Timur Resmikan Penamaan Jalan Lingkar Selatan",
                date: "20",
                month: "MAR",
                imageSrc: "/images/img-kabar-proyek-2.png",
                description:
                  "KBRN, Tuban: Setelah diresmikan, Ring Road/Jalur Lingkar Selatan Tuban yang berjalan...",
                url: "/insights/gubernur-jatim-resmikan",
              },
              {
                title: "Jalan Lingkar Selatan Tuban Mulai Diaktifkan Terbatas",
                date: "30",
                month: "MEI",
                imageSrc: "/images/img-kabar-proyek-3.png",
                description:
                  "KBRN, Tuban: Kapolres Tuban AKBP Suryono mengatakan bahwa dirinya sempat...",
                url: "/insights/jalan-lingkar-selatan-tuban-mulai-diaktifkan-terbatas",
              },
              {
                title: "Perkembangan Pembangunan Jalan Lingkar Tuban Capai 90%",
                date: "25",
                month: "APR",
                imageSrc: "/images/img-kabar-proyek-1.png",
                description:
                  "KBRN, Tuban: Progres pembangunan jalan lingkar selatan Tuban telah mencapai...",
                url: "/insights/perkembangan-pembangunan-capai-90",
              },
              {
                title: "Pembangunan Jalan Lingkar Berpengaruh pada Nilai Tanah",
                date: "10",
                month: "JAN",
                imageSrc: "/images/img-kabar-proyek-2.png",
                description:
                  "Pembangunan jalan lingkar selatan (JLS) di Tuban memberikan dampak positif...",
                url: "/insights/pengaruh-nilai-tanah",
              },
              {
                title:
                  "Alih Fungsi Lahan untuk Pembangunan Jalan Lingkar Tuban",
                date: "05",
                month: "DES",
                imageSrc: "/images/img-kabar-proyek-3.png",
                description:
                  "Proses alih fungsi lahan pertanian menjadi jalan lingkar selatan Tuban...",
                url: "/insights/alih-fungsi-lahan",
              },
              {
                title: "Kemajuan Konstruksi Jalan Lingkar Tuban Periode 2023",
                date: "12",
                month: "JAN",
                imageSrc: "/images/img-kabar-proyek-1.png",
                description:
                  "Laporan perkembangan konstruksi jalan lingkar Tuban pada periode tahun 2023...",
                url: "/insights/kemajuan-konstruksi-2023",
              },
              {
                title: "Dampak Ekonomi Pembangunan Jalan Lingkar Selatan",
                date: "22",
                month: "FEB",
                imageSrc: "/images/img-kabar-proyek-2.png",
                description:
                  "Analisis dampak ekonomi dari pembangunan jalan lingkar selatan di Tuban...",
                url: "/insights/dampak-ekonomi",
              },
              {
                title:
                  "Sosialisasi Penggunaan Jalan Lingkar Tuban kepada Masyarakat",
                date: "17",
                month: "APR",
                imageSrc: "/images/img-kabar-proyek-3.png",
                description:
                  "Dinas Perhubungan mengadakan sosialisasi mengenai penggunaan jalan lingkar Tuban...",
                url: "/insights/sosialisasi-penggunaan",
              },
            ];

            if (newsIndex >= newsItems.length) return null;

            const news = newsItems[newsIndex] ?? {
              title: "",
              date: "",
              month: "",
              imageSrc: "",
              description: "",
              url: "",
            };

            return (
              <div key={newsIndex} className="flex flex-col">
                <Link href={`/insights/${news.url.split('/').pop()}`}>
                  <div
                    className="block h-full w-full overflow-hidden shadow-lg"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 5% 100%, 0 90%)",
                    }}
                  >
                    <div className="relative">
                      <div className="relative h-[200px] w-full">
                        <Image
                          src={news.imageSrc}
                          alt={news.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col items-center">
                        <div
                          className="flex h-[60px] w-[50px] flex-shrink-0 items-end justify-center bg-blue-primary pb-2 text-white-10"
                          style={{
                            clipPath:
                              "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 12% 100%, 0 88%)",
                          }}
                        >
                          <span className="text-2xl font-semibold">
                            {news.date}
                          </span>
                        </div>

                        <span className="mt-3 text-lg font-medium uppercase text-black">
                          {news.month}
                        </span>
                      </div>

                      <div className="flex-1 p-4">
                        <h3 className="font-titilium mb-2 text-base text-black">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {news.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center md:mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`mx-1 md:mx-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <div className="relative h-[16px] w-[16px] md:h-[48px] md:w-[48px]">
              <Image
                src="/svgs/icon-arrow.svg"
                alt="Previous"
                fill
                className="object-contain"
              />
            </div>
          </button>

          <div className="mx-3 flex items-center md:mx-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-[3px] h-[6px] w-[6px] ${
                  currentPage === index + 1 ? "bg-blue-primary" : "bg-gray-300"
                } md:mx-1 md:h-[8px] md:w-[8px]`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`mx-1 md:mx-2 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <div className="relative h-[16px] w-[16px] md:h-[48px] md:w-[48px]">
              <Image
                src="/svgs/icon-arrow.svg"
                alt="Next"
                fill
                className="rotate-180 transform object-contain"
              />
            </div>
          </button>
        </div>
      </section>

      <section className="video-section relative w-full">
        <div className="relative aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/zSA-gsM7n-I?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=zSA-gsM7n-I&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&vq=hd1080"
            title="Pembangunan Jalan Lingkar Tuban"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="h-full w-full"
            frameBorder="0"
            loading="lazy"
          ></iframe>

          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-6 text-center"
            style={{ zIndex: 10 }}
          >
            <h2 className="font-titilium text-white text-4xl md:text-5xl lg:text-7xl">
              PEMBANGUNAN JALAN LINGKAR TUBAN
            </h2>
            <p className="text-white mt-4 text-xl font-medium lg:text-2xl">
              #infobinamarga
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
