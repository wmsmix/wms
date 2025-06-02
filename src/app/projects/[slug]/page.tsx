"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
import NewsGrid from "~/components/NewsGrid";
import Breadcrumbs from "~/components/commons/Breadcrumbs";
import RunningText from "~/components/Product/precast-concrete/RunningText";

interface ProjectData {
  title: string;
  period: string;
  location: string;
  client: string;
  value: string;
  length: string;
  description: string;
  detailedDescription: string[];
  specifications: {
    title: string;
    value: string;
  }[];
  challenges: string[];
  images: string[];
}

const DEFAULT_IMAGE = "/images/img-jejak.png";

const projectsData: Record<string, ProjectData> = {
  "jalan-lingkar-tuban": {
    title: "Jalan Lingkar Tuban",
    period: "2022-2024",
    location: "Desa Prunggahan Kulon, Tuban",
    client: "Pemerintah Kabupaten Tuban",
    value: "103M",
    length: "7.98 KM",
    description:
      "Pembangunan Jalan Lingkar Tuban yang berlokasi di Desa Prunggahan Kulon, Tuban, sepanjang 7,98 km. Ruang lingkup WMS berada pada penyediaan dan aplikasi material konstruksi Aspal Hot-mix, Beton Ready-mix, dan Beton Precast.",
    detailedDescription: [
      "Proyek ini dirancang untuk mengurangi kemacetan di pusat kota Tuban dan meningkatkan konektivitas antar wilayah.",
      "Menggunakan teknologi aspal Hot-mix terbaru yang memiliki daya tahan lebih tinggi dan ramah lingkungan.",
      "Dilengkapi dengan sistem drainase modern untuk mencegah genangan air dan memperpanjang umur jalan.",
      "Pembangunan dilakukan dengan memperhatikan dampak lingkungan dan sosial, melibatkan masyarakat sekitar dalam proses pembangunan.",
    ],
    specifications: [
      {
        title: "Material Utama",
        value: "Aspal Hot-mix, Beton Ready-mix, Beton Precast",
      },
      {
        title: "Lebar Jalan",
        value: "12 meter",
      },
      {
        title: "Tebal Perkerasan",
        value: "50 cm",
      },
      {
        title: "Jumlah Lajur",
        value: "2 x 2 lajur",
      },
    ],
    challenges: [
      "Medan yang berkontur dan memerlukan pekerjaan tanah yang ekstensif",
      "Koordinasi dengan berbagai pemangku kepentingan dan komunitas lokal",
      "Pengaturan lalu lintas selama konstruksi untuk meminimalkan gangguan",
    ],
    images: [
      "/images/img-detail-jlt-1.png",
      "/images/img-detail-jlt-2.png",
      "/images/img-detail-jlt-3.png",
    ],
  },
  "jalan-tol-pandaan": {
    title: "Jalan Tol Pandaan",
    period: "2020-2022",
    location: "Pandaan, Jawa Timur",
    client: "PT Jasa Marga",
    value: "85M",
    length: "5.2 KM",
    description:
      "Pembangunan jalan tol penghubung utama area Pandaan dengan akses yang lebih cepat dan efisien.",
    detailedDescription: [
      "Proyek ini merupakan bagian dari pengembangan infrastruktur transportasi di Jawa Timur.",
      "Menggunakan teknologi konstruksi terbaru untuk menjamin kualitas dan ketahanan jalan.",
      "Didesain untuk mengurangi waktu tempuh dan meningkatkan konektivitas antar wilayah.",
    ],
    specifications: [
      {
        title: "Material Utama",
        value: "Aspal Hot-mix, Beton Bertulang",
      },
      {
        title: "Lebar Jalan",
        value: "14 meter",
      },
      {
        title: "Tebal Perkerasan",
        value: "60 cm",
      },
      {
        title: "Jumlah Lajur",
        value: "2 x 2 lajur",
      },
    ],
    challenges: [
      "Kondisi tanah yang beragam dan memerlukan teknik stabilisasi khusus",
      "Manajemen proyek yang kompleks dengan banyak subkontraktor",
      "Cuaca ekstrem yang sering menghambat progres konstruksi",
    ],
    images: [
      "/images/img-detail-jlt-1.png",
      "/images/img-detail-jlt-2.png",
      "/images/img-detail-jlt-3.png",
    ],
  },
};

interface ClippedContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ClippedContainer: React.FC<ClippedContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className="relative">
      <div
        className="absolute -bottom-[1px] -left-[1px] -right-[1px] -top-[1px] bg-gray-300"
        style={{
          clipPath: "var(--clip-path-shadow)",
        }}
      ></div>

      <div
        className={`relative border border-gray-200 bg-white-10 p-8 ${className}`}
        style={{
          clipPath: "var(--clip-path-main)",
        }}
      >
        {children}
      </div>

      <style jsx>{`
        .relative {
          --clip-path-main: polygon(
            0 5%,
            6% 0,
            94% 0,
            100% 5%,
            100% 95%,
            94% 100%,
            6% 100%,
            0 95%
          );
          --clip-path-shadow: polygon(
            0 5%,
            6% 0,
            94% 0,
            100% 5%,
            100% 95%,
            94% 100%,
            6% 100%,
            0 95%
          );
        }

        @media (min-width: 768px) {
          .relative {
            --clip-path-main: polygon(
              0 4%,
              5% 0,
              95% 0,
              100% 4%,
              100% 96%,
              95% 100%,
              5% 100%,
              0 96%
            );
            --clip-path-shadow: polygon(
              0 4%,
              5% 0,
              95% 0,
              100% 4%,
              100% 96%,
              95% 100%,
              5% 100%,
              0 96%
            );
          }
        }
      `}</style>
    </div>
  );
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [projectImage, setProjectImage] = useState<string>(DEFAULT_IMAGE);

  useEffect(() => {
    const slugFromParams = params?.slug;
    const slug =
      typeof slugFromParams === "string"
        ? slugFromParams
        : "jalan-lingkar-tuban";

    const projectData =
      projectsData[slug] ?? projectsData["jalan-lingkar-tuban"];

    if (projectData) {
      setCurrentProject(projectData);
      if (projectData.images && projectData.images.length > 0) {
        setProjectImage(projectData.images[0] ?? DEFAULT_IMAGE);
      }
    }

    setIsLoading(false);
  }, [params]);

  if (isLoading || !currentProject) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white-10">
        <p className="text-xl text-black">Memuat data proyek...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />
      <RunningText text="TERJAMIN TERPERCAYA" backgroundColor="#0C1F5A" textColor="text-white" />

      <section className="project-hero relative min-h-[320px] w-full overflow-hidden md:min-h-[400px]">
        {/* Breadcrumbs */}
        <div className="absolute top-0 left-0 z-50 w-full pt-10">
          <Breadcrumbs
            items={[
              { label: "Proyek", href: "/projects" },
              { label: currentProject.title },
            ]}
            topPosition="top-6"
            leftPosition="left-2 md:left-12"
          />
        </div>
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/img-detail-project.png"
            alt="Projects"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 flex w-full flex-col justify-end space-y-2 px-6 pb-16 md:flex-row md:items-center md:justify-between md:space-y-0 md:px-12 md:pb-16 lg:px-48">
          <div className="flex items-center gap-6">
            <span className="text-start font-noto text-4xl text-white-10 lg:text-6xl">
              Proyek WMS
            </span>
            <span className="hidden max-w-xs text-start text-sm text-white-10 md:block md:text-lg lg:text-xl">
              {currentProject.title}
            </span>
          </div>
        </div>

        <style jsx>{`
          .project-hero {
            clip-path: polygon(0 0, 100% 0, 100% 76%, 90% 100%, 8% 100%, 0 78%);
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

      {/* Section Detail Proyek */}
      <section className="container relative z-20 max-w-full rounded-3xl bg-white-10 px-6 py-12 md:px-8 md:py-24 lg:px-40" style={{
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        marginBottom: "-24px"
      }}>
        <div className="flex flex-col md:flex-row md:gap-12">
          <div className="mb-10 md:mb-0 md:w-2/3">
            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden">
              <Image
                src={projectImage || DEFAULT_IMAGE}
                alt={currentProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mb-2 flex items-end justify-between">
              <p className="text-sm text-gray-500 md:text-base">
                Source : {"Ahmad Adirin/Liputan6.com"}
              </p>
            </div>

            <h2 className="mb-6 mt-16 font-noto text-2xl text-black md:text-[32px]">
              Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi
            </h2>

            <div className="text-base text-black/70">
              <p className="mb-4">
                Wilayah Pantai Utara Jawa Timur (Pantura) terus berkembang
                sebagai pusat pengembangan kawasan industri strategis.
              </p>
              <p className="mb-4">
                Daerah seperti Surabaya, Gresik, Mojokerto, Pasuruan, Tuban, dan
                Lamongan memainkan peran penting dalam mendukung sektor industri
                seperti semen, farmasi, petrokimia, serta makanan dan minuman.
              </p>
              <p className="mb-4">
                Salah satu infrastruktur penting yang mendorong pertumbuhan
                ekonomi kawasan ini adalah pembangunan Jalan Lingkar Tuban,
                sebuah proyek strategis sepanjang 7,98 km yang selesai
                dikerjakan pada tahun anggaran 2022-2024. Proyek ini dirancang
                untuk meningkatkan konektivitas antar daerah, mempermudah
                logistik, dan membuka peluang pengembangan kawasan industri
                baru.
              </p>
            </div>
            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden md:mt-12">
              <Image
                src={currentProject.images[1] ?? DEFAULT_IMAGE}
                alt={currentProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mb-2 flex items-end justify-between">
              <p className="text-sm text-gray-500 md:text-base">
                Source : {"Ahmad Adirin/Liputan6.com"}
              </p>
            </div>
            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden md:mt-12">
              <Image
                src={currentProject.images[2] ?? DEFAULT_IMAGE}
                alt={currentProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mb-2 flex items-end justify-between">
              <p className="text-sm text-gray-500 md:text-base">
                Source : {"Ahmad Adirin/Liputan6.com"}
              </p>
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="mb-8">
              <p className="font-noto text-base text-gray-500 md:text-xl">
                103M nilai proyek
              </p>
              <h1 className="mb-6 font-noto text-3xl text-black md:text-4xl">
                {currentProject.title}
              </h1>

              <ClippedContainer>
                <div className="grid grid-cols-2 gap-6 text-gray-700">
                  <div className="text-base font-medium uppercase text-gray-500">
                    LOKASI
                  </div>
                  <div className="text-base text-gray-800">
                    Desa Prunggahan Kulon, Kecamatan Semanding, Tuban
                  </div>

                  <div className="text-base font-medium uppercase text-gray-500">
                    PANJANG JALAN
                  </div>
                  <div className="text-base text-gray-800">7,98 km</div>

                  <div className="text-base font-medium uppercase text-gray-500">
                    LEBAR BAHU JALAN
                  </div>
                  <div className="text-base text-gray-800">1,5 meter</div>

                  <div className="text-base font-medium uppercase text-gray-500">
                    PERIODE
                  </div>
                  <div className="text-base text-gray-800">2022-2024</div>

                  <div className="text-base font-medium uppercase text-gray-500">
                    PENDANAAN
                  </div>
                  <div className="text-base text-gray-800">
                    Surat Berharga Syariah Negara (SBSN)
                  </div>

                  <div className="text-base font-medium uppercase text-gray-500">
                    WAKTU PELAKSANAAN
                  </div>
                  <div className="text-base text-gray-800">
                    480 hari kalender
                  </div>

                  <div className="text-base font-medium uppercase text-gray-500">
                    MASA PEMELIHARAAN
                  </div>
                  <div className="text-base text-gray-800">
                    365 hari kalender
                  </div>

                  <div className="text-base font-medium uppercase text-gray-500">
                    KONTRAKTOR
                  </div>
                  <div className="text-base text-gray-800">
                    PT. Mina Fajar Abadi
                  </div>
                </div>
              </ClippedContainer>
            </div>

            <div className="mt-16">
              <h3 className="mb-6 font-noto text-3xl text-black">
                Rincian <br /> Pemakaian Produk
              </h3>

              <div className="mb-6">
                <h4 className="tex-xl mb-2 font-noto text-black">
                  Aspal Hot-mix
                </h4>
                <ul className="font-titilium list-disc pl-5 text-base text-black/75">
                  <li className="mb-1">Aspal Emulsi: 57.000 liter</li>
                  <li className="mb-1">AC WC Modifikasi: 8.000 ton</li>
                  <li className="mb-1">AC BC Modifikasi: 14.000 ton</li>
                  <li className="mb-1">AC Base Modifikasi: 10.000 ton</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="tex-xl mb-2 font-noto text-black">
                  Beton Precast
                </h4>
                <ul className="font-titilium list-disc pl-5 text-base text-black/75">
                  <li className="mb-1">Kansteen (Curb): 1.900 buah</li>
                </ul>
              </div>

              <div>
                <h4 className="tex-xl mb-2 font-noto text-black">
                  Beton Ready-mix
                </h4>
                <ul className="font-titilium list-disc pl-5 text-base text-black/75">
                  <li className="mb-1">fc&apos; 35 MPa: 55 m³</li>
                  <li className="mb-1">fc&apos; 30 MPa: 1.800 m³</li>
                  <li className="mb-1">fc&apos; 15 MPa: 2.000 m³</li>
                  <li className="mb-1">fc&apos; 10 MPa: 350 m³</li>
                  <li className="mb-1">Cement Treated Base: 14.000 m³</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="flex w-full flex-col items-center bg-white-10">
        {/* Running text section */}
        <div className="relative w-full overflow-hidden z-10">          
          <div className="w-full bg-orange-secondary"
            style={{
              clipPath: typeof window !== "undefined" && window.innerWidth <= 768
                ? "polygon(0 0, 100% 0, 100% 65%, 88% 100%, 12% 100%, 0 65%)"
                : "polygon(0 0, 100% 0, 100% 55%, 97% 100%, 3% 100%, 0 55%)",
            }}
          >
            <div className="marquee-container flex h-full items-center pb-6 pt-10">
              <div className="marquee-wrapper">
                <div className="marquee-content">
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Terjamin</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Terpercaya</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Tersertifikasi</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Terjamin</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Terpercaya</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Tersertifikasi</span>
                </div>
                <div className="marquee-content" aria-hidden="true">
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Terjamin</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Terpercaya</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Tersertifikasi</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Terjamin</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Terpercaya</span>
                  <span className="marquee-item px-12 font-noto text-4xl text-white-10 md:text-6xl">Tersertifikasi</span>
                </div>
              </div>
            </div>
            <style jsx>{`
              .marquee-container {
                width: 100%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .marquee-wrapper {
                width: 100%;
                overflow: hidden;
                display: flex;
                mask-image: linear-gradient(
                  to right,
                  transparent 0%,
                  black 10%,
                  black 90%,
                  transparent 100%
                );
                -webkit-mask-image: linear-gradient(
                  to right,
                  transparent 0%,
                  black 10%,
                  black 90%,
                  transparent 100%
                );
              }

              .marquee-content {
                display: flex;
                animation: marquee 30s linear infinite;
                white-space: nowrap;
              }

              .marquee-item {
                flex-shrink: 0;
                line-height: 1.3;
         
              }

              @keyframes marquee {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(-100%);
                }
              }

              /* Mobile styles */
              @media (max-width: 640px) {
                .marquee-content {
                  animation-duration: 60s !important;
                }
                .marquee-item {
                  padding-left: 12px !important;
                  padding-right: 12px !important;
                }
              }
            `}</style>
          </div>
        </div>
        <span className="my-16 block text-center font-noto text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px]">
          Lihat Insight Proyek
        </span>

        <NewsGrid
          bgColor="bg-blue-primary"
          textColor="text-black"
          textBadgeColor="text-white-10"
        />
      </div>
      <div className="flex justify-center pb-6 md:pb-12">
        <Button
          text="LIHAT SEMUA"
          height="48px"
          textSize="xl"
          className="text-sm md:text-lg"
          clipPath={{
            outer:
              "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
            inner:
              "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
          }}
          margin="1px"
        />
      </div>
      <Footer />
    </div>
  );
}
