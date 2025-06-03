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
import { getDetailedProjectBySlugFromSupabase, getSupabaseStorageUrl } from "~/data/detailed-projects-supabase";
import type { DetailedProject } from "~/types/cms";

const DEFAULT_IMAGE = "/images/img-jejak.png";

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
  const _router = useRouter();
  const params = useParams();
  const [currentProject, setCurrentProject] = useState<DetailedProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projectImage, setProjectImage] = useState<string>(DEFAULT_IMAGE);

  useEffect(() => {
    const loadProject = async () => {
      const slugFromParams = params?.slug;
      const slug = typeof slugFromParams === "string" ? slugFromParams : "";

      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const projectData = await getDetailedProjectBySlugFromSupabase(slug);

        if (projectData) {
          setCurrentProject(projectData);
          // Set main project image
          if (projectData.image_url) {
            setProjectImage(getSupabaseStorageUrl(projectData.image_url));
          } else if (projectData.images && projectData.images.length > 0) {
            setProjectImage(projectData.images[0] ?? DEFAULT_IMAGE);
          }
        }
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProject();
  }, [params]);

  // Helper function to get image URL with fallback
  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) return DEFAULT_IMAGE;

    // If it's already a full URL or starts with /images/, use as is
    if (imagePath.startsWith('http') || imagePath.startsWith('/images/')) {
      return imagePath;
    }

    // Otherwise, treat as Supabase storage path
    return getSupabaseStorageUrl(imagePath);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white-10">
        <p className="text-xl text-black">Memuat data proyek...</p>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white-10">
        <div className="text-center">
          <p className="text-xl text-black mb-4">Proyek tidak ditemukan</p>
          <Button
            text="Kembali ke Proyek"
            href="/projects"
            textSize="lg"
            clipPath={{
              outer: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
              inner: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
            }}
            margin="1px"
          />
        </div>
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
                Source : {currentProject.image_source ?? "Ahmad Adirin/Liputan6.com"}
              </p>
            </div>

            <h2 className="mb-6 mt-16 font-noto text-2xl text-black md:text-[32px]">
              {currentProject.description_title ?? "Menghubungkan Infrastruktur dengan Pertumbuhan Ekonomi"}
            </h2>

            <div className="text-base text-black/70">
              {currentProject.detailed_description && currentProject.detailed_description.length > 0 ? (
                currentProject.detailed_description.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
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
                    ekonomi kawasan ini adalah pembangunan {currentProject.title},
                    sebuah proyek strategis yang selesai dikerjakan pada periode {currentProject.period}.
                  </p>
                </>
              )}
            </div>

            {/* Additional project images */}
            {currentProject.images && currentProject.images.length > 1 && (
              <>
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden md:mt-12">
                  <Image
                    src={getImageUrl(currentProject.images[1])}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mb-2 flex items-end justify-between">
                  <p className="text-sm text-gray-500 md:text-base">
                    Source : {currentProject.image_source ?? "Ahmad Adirin/Liputan6.com"}
                  </p>
                </div>
              </>
            )}

            {currentProject.images && currentProject.images.length > 2 && (
              <>
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden md:mt-12">
                  <Image
                    src={getImageUrl(currentProject.images[2])}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mb-2 flex items-end justify-between">
                  <p className="text-sm text-gray-500 md:text-base">
                    Source : {currentProject.image_source ?? "Ahmad Adirin/Liputan6.com"}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="md:w-1/3">
            <div className="mb-8">
              <p className="font-noto text-base text-gray-500 md:text-xl">
                {currentProject.value ?? "103M"} nilai proyek
              </p>
              <h1 className="mb-6 font-noto text-3xl text-black md:text-4xl">
                {currentProject.title}
              </h1>

              <ClippedContainer>
                <div className="grid grid-cols-2 gap-6 text-gray-700">
                  {/* Render project_info if available, otherwise show default fields */}
                  {currentProject.project_info && currentProject.project_info.length > 0 ? (
                    currentProject.project_info.map((info, index) => (
                      <React.Fragment key={index}>
                        <div className="text-base font-medium uppercase text-gray-500">
                          {info.key}
                        </div>
                        <div className="text-base text-gray-800">
                          {info.value ?? 'N/A'}
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <>
                      <div className="text-base font-medium uppercase text-gray-500">
                        LOKASI
                      </div>
                      <div className="text-base text-gray-800">
                        {currentProject.location ?? "N/A"}
                      </div>

                      <div className="text-base font-medium uppercase text-gray-500">
                        PANJANG JALAN
                      </div>
                      <div className="text-base text-gray-800">
                        {currentProject.length ?? "N/A"}
                      </div>

                      <div className="text-base font-medium uppercase text-gray-500">
                        LEBAR BAHU JALAN
                      </div>
                      <div className="text-base text-gray-800">
                        {currentProject.road_width ?? "1,5 meter"}
                      </div>

                      <div className="text-base font-medium uppercase text-gray-500">
                        PERIODE
                      </div>
                      <div className="text-base text-gray-800">
                        {currentProject.period ?? "N/A"}
                      </div>

                      <div className="text-base font-medium uppercase text-gray-500">
                        PENDANAAN
                      </div>
                      <div className="text-base text-gray-800">
                        {currentProject.funding_source ?? "Surat Berharga Syariah Negara (SBSN)"}
                      </div>

                      <div className="text-base font-medium uppercase text-gray-500">
                        WAKTU PELAKSANAAN
                      </div>
                      <div className="text-base text-gray-800">
                        {currentProject.execution_time ?? "480 hari kalender"}
                      </div>

                      <div className="text-base font-medium uppercase text-gray-500">
                        MASA PEMELIHARAAN
                      </div>
                      <div className="text-base text-gray-800">
                        {currentProject.maintenance_period ?? "365 hari kalender"}
                      </div>

                      <div className="text-base font-medium uppercase text-gray-500">
                        KONTRAKTOR
                      </div>
                      <div className="text-base text-gray-800">
                        {currentProject.contractor ?? "PT. Mina Fajar Abadi"}
                      </div>
                    </>
                  )}
                </div>
              </ClippedContainer>
            </div>

            <div className="mt-16">
              <h3 className="mb-6 font-noto text-3xl text-black">
                {currentProject.specifications_title ?? "Rincian Pemakaian Produk"}
              </h3>

              {/* Render specifications from database */}
              {currentProject.specifications && currentProject.specifications.length > 0 ? (
                currentProject.specifications.map((spec, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="tex-xl mb-2 font-noto text-black">
                      {spec.title}
                    </h4>
                    <div className="font-titilium text-base text-black/75">
                      {spec.value}
                    </div>
                  </div>
                ))
              ) : (
                <>
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
                </>
              )}
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
          {currentProject.insights_title ?? "Lihat Insight Proyek"}
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
