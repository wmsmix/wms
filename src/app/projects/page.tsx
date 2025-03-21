"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
import GallerySection from "~/components/GallerySection";
import NewsGrid from "~/components/NewsGrid";

export default function AspalProductPage() {
  const router = useRouter();

  const navigateToProjectDetail = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <section className="project-hero relative min-h-[500px] w-full overflow-hidden md:min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/img-projects.png"
            alt="Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-start justify-start gap-4 px-6 py-12 pt-36 text-left md:flex-row md:items-center md:justify-center md:gap-32 md:px-12 md:pt-56 lg:px-24">
          <div className="mb-6 flex flex-col items-start md:mb-0 md:items-center">
            <span className="m-0 font-noto text-[120px] leading-tight md:text-[180px]">
              20
            </span>
            <span className="m-0 -mt-2 text-sm md:translate-y-[-12px] md:text-base">
              TAHUN PENGALAMAN
            </span>
          </div>

          <h1 className="text-white mb-4 max-w-xs text-start font-noto text-lg md:mb-0 md:text-2xl lg:text-3xl">
            Menghubungkan, membangun, dan menyuburkan negeri
          </h1>

          <p className="text-white-base mb-8 max-w-sm text-start text-sm opacity-75 md:mb-0 md:text-base md:text-xl">
            Sukses membangun berbagai infrastruktur, termasuk jalan, dermaga,
            dan sistem irigasi, WMS berkomitmen untuk memberikan solusi proyek
            yang tidak hanya fungsional, tetapi juga bermanfaat dan
            berkelanjutan.
          </p>
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

      <div className="flex w-full flex-col px-4 py-16 md:flex-row md:px-16 md:py-32">
        <div className="relative order-1 mb-8 h-[350px] w-full px-6 md:mb-0 md:h-[500px] md:w-1/2 md:px-0 md:ps-24">
          <div className="relative h-full w-full">
            <div
              className="relative h-full w-full cursor-pointer overflow-hidden"
              onClick={() => navigateToProjectDetail("jalan-lingkar-tuban")}
            >
              <Image
                src="/images/img-jejak.png"
                alt="Jalan Lingkar Tuban"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                style={{
                  clipPath:
                    "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
                }}
              />
            </div>

            <div
              className={`absolute bottom-[-20px] right-[-20px] z-10 h-[140px] w-[180px] bg-blue-primary md:bottom-[-30px] md:right-[-30px] md:h-[190px] md:w-[254px]`}
              style={{
                clipPath:
                  "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <span
                  className={`text-white text-[54px] font-semibold leading-none md:text-[64px]`}
                >
                  103M
                </span>
                <span className={`text-white -mt-2 text-lg md:text-2xl`}>
                  NILAI PROYEK
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-2 flex w-full flex-col items-start justify-center px-6 md:w-1/2 md:px-16">
          <span
            className={`mb-2 text-left text-3xl text-black md:mb-4 md:text-5xl`}
          >
            (2022-2024)
          </span>
          <span
            className={`mb-2 text-left text-3xl text-black md:mb-4 md:text-5xl`}
          >
            Jalan Lingkar Tuban
          </span>
          <p
            className={`text-left text-sm text-gray-base md:pe-48 md:text-base`}
          >
            Pembangunan Jalan Lingkar Tuban yang berlokasi di Desa Prunggahan
            Kulon, Tuban, sepanjang 7,98 km. Ruang lingkup WMS berada pada
            penyediaan dan aplikasi material konstruksi Aspal Hot-mix, Beton
            Ready-mix, dan Beton Precast.
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-center md:gap-10">
            <div className="order-1 mt-6 flex md:order-2 md:mt-8">
              <Image
                className="relative z-10 h-[40px] w-[40px] filter md:h-[50px] md:w-[50px]"
                width={50}
                height={50}
                alt="Icon Jalan"
                src={"/svgs/icon-road.svg"}
                style={{ filter: "brightness(0)" }}
              />
              <div className="ms-2 flex flex-col">
                <span className={`text-[8px] text-black md:text-[10px]`}>
                  TOTAL PANJANG JALAN
                </span>
                <span className={`text-xl text-black md:text-2xl`}>
                  7.98 KM
                </span>
              </div>
            </div>

            <div className="order-2 mt-8 md:order-1 md:mt-12">
              <Button
                text="LIHAT LEBIH LENGKAP"
                className="text-lg font-normal md:text-2xl"
                onClick={() => navigateToProjectDetail("jalan-lingkar-tuban")}
              />
            </div>
          </div>
        </div>
      </div>
      <GallerySection />
      <div className="flex w-full flex-col items-center gap-6 bg-orange-secondary px-4 py-8 md:flex-row md:justify-between md:gap-0 md:px-24">
        <span className="px-4 text-center font-noto text-xl text-white-10 md:text-left md:text-3xl">
          Yuk, Bangun Infrastruktur Negeri Bersama Kami!
        </span>
        <Button
          text="DISKUSI PROYEK BERSAMA"
          className="bg-blue-primary text-lg font-normal md:text-2xl"
          bgColor="#0C1F5A"
        />
      </div>
      <div className="flex w-full flex-col items-center bg-white-10 pt-32">
        <span className="mb-16 block text-center font-noto text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px]">
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
          height="56px"
          textSize="base"
          className="text-sm md:text-lg"
        />
      </div>
      <Footer />
    </div>
  );
}
