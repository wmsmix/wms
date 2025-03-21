"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
import Hero from "~/components/Hero";
import ProjectsGrid from "~/components/ProjectsGrid";
import ContactForm from "~/components/ContactForm";
import NewsGrid from "~/components/NewsGrid";
import ProjectShowcase from "~/components/ProjectShowcase";
import CardProduct from "~/components/CardProduct";
import ServiceCard from "~/components/ServiceCard";
import ProductHero from "~/components/Product/ProductHero";
import ClippedSection from "~/components/ClippedSection";

export default function AspalProductPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <ProductHero
        title="Aspal (Hot-Mix)"
        description="Campuran material agregat (batu-batuan) dengan aspal dalam keadaan panas. Campuran ini kemudian dipadatkan menjadi lapisan jalan yang kuat dan tahan lama."
        imageSrc="/images/img-aspal.png"
        buttonText="TANYA LEBIH LANJUT"
      />

      <div className="pt-12 md:pt-24 px-4 md:px-8">
        <span className="block text-center font-noto text-3xl text-black md:text-4xl lg:text-[64px]">
          Laston Lapis Permukaan
        </span>
        <span className="font-titilium block px-4 md:px-16 lg:px-96 pt-6 md:pt-12 text-center text-base md:text-xl text-black text-gray-500">
          Lapisan paling atas dari struktur jalan yang berperan sebagai
          penghalang pertama terhadap berbagai tekanan dan gesekan yang terjadi
          selama penggunaan jalan
        </span>
        <div className="mt-8 md:mt-16 flex w-full flex-col md:flex-row flex-wrap justify-center items-center gap-8 px-4 md:px-6">
          <CardProduct
            imageSrc="/images/img-product-aspal.png"
            subtitle="Laston Lapis Permukaan"
            title="(AC-WC)"
            description="Lapisan aspal permukaan yang cocok untuk jalan raya dengan lalu lintas tinggi, jalan tol, dan jalan perkotaan. Permukaan mulus untuk kenyamanan berkendara."
          />
          <CardProduct
            imageSrc="/images/img-product-beton.png"
            title="(HRS-AC)"
            subtitle="Laston Lapis Permukaan"
            description="Lapisan aspal permukaan yang menjadi pilihan utama untuk wilayah tropis dan proyek dengan kebutuhan performa permukaan yang lebih halus dan mulus."
          />
          <CardProduct
            imageSrc="/images/img-product-precast.png"
            title="(AC-WC MOD)"
            subtitle="Laston Lapis Permukaan"
            description="Lapisan aspal permukaan yang dimodifikasi dengan aditif polimer untuk meningkatkan elastisitas dan ketahanan deformasi. Ideal untuk jalan dengan beban berat dan iklim ekstrem."
          />
        </div>
      </div>
      <div
        className="mt-8 md:mt-12 flex w-screen max-w-full flex-col items-center bg-black py-16 md:py-32"
        style={{
          clipPath:
            "polygon(4% 0%, 96% 0%, 100% 6%, 100% 100%, 96% 100%, 4% 100%, 0% 100%, 0% 6%)",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        <span className="block px-4 text-center font-noto text-3xl text-white-10 md:text-4xl lg:text-5xl">
          Laston Lapis Antara
        </span>
        <p className="flex justify-start px-4 md:px-16 lg:px-96 pt-4 text-center text-sm text-gray-500 md:pt-8 md:text-base lg:text-[20px]">
          Lapisan ini terbuat dari campuran aspal dan agregat, dan memiliki
          peran penting dalam memberikan daya dukung tambahan, mencegah
          deformasi, serta melindungi lapisan di bawahnya
        </p>
      </div>
      <div>
        <div className="flex w-full flex-col bg-black md:flex-row">
          <div className="order-2 flex w-full flex-col justify-center px-6 py-8 md:order-1 md:w-1/2 md:px-16">
            <h2 className="mb-4 text-2xl md:text-3xl font-semibold text-white-10 md:text-4xl lg:text-5xl">
              Laston Lapis Antara (AC-BC)
            </h2>
            <p className="text-sm md:text-base text-gray-500 md:text-lg lg:text-[20px]">
              Lapisan aspal antara untuk mendukung distribusi beban dan kekuatan
              struktur jalan
            </p>
            <div className="flex justify-start pt-6 md:pt-8">
              <Button
                text="PILIH LASTON INI"
                height="40px"
                textSize="base"
                className="text-sm md:text-lg"
              />
            </div>
          </div>
          <div className="relative order-1 h-[250px] w-full md:order-2 md:h-[500px] md:w-1/2">
            <Image
              src="/images/img-sertifikasi.png"
              alt="Sertifikasi"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="bg-white-20 clip-bottom-corners flex w-full flex-col md:flex-row">
          <div className="relative order-1 h-[250px] w-full md:h-[500px] md:w-1/2">
            <Image
              src="/images/img-harga-bersaing.png"
              alt="Harga Bersaing"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-2 flex w-full flex-col justify-center px-6 py-8 md:w-1/2 md:px-16">
            <h2 className="mb-4 text-2xl md:text-3xl font-semibold text-black md:text-4xl lg:text-5xl">
              Laston Lapis Antara Modifikasi (AC-BC Mod)
            </h2>
            <p className="text-sm md:text-base text-gray-500 md:text-lg lg:text-[20px]">
              Lapisan aspal antara yang diperkuat dengan aditif polimer untuk
              aplikasi berat, memberikan ketahanan ekstra terhadap kelelahan dan
              deformasi
            </p>
            <div className="flex justify-start pt-6 md:pt-8">
              <Button
                text="PILIH LASTON INI"
                height="40px"
                textSize="base"
                className="text-sm md:text-lg"
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          .clip-bottom-corners {
            clip-path: polygon(
              0% 0%,
              100% 0%,
              100% 85%,
              90% 100%,
              10% 100%,
              0% 85%
            );
          }

          @media (max-width: 768px) {
            .clip-bottom-corners {
              clip-path: polygon(
                0% 0%,
                100% 0%,
                100% 94%,
                85% 100%,
                15% 100%,
                0% 94%
              );
            }
          }
        `}</style>
      </div>
      <div className="pt-12 md:pt-24 px-4 md:px-8">
        <span className="block text-center font-noto text-3xl text-black md:text-4xl lg:text-[64px]">
          Laston Lapis Pondasi
        </span>
        <span className="font-titilium block px-4 md:px-16 lg:px-96 pt-6 md:pt-12 text-center text-base md:text-xl text-black text-gray-500">
          Lapisan yang memiliki peran yang sangat penting dalam mendistribusikan
          beban lalu lintas secara merata ke tanah dasar, sehingga mencegah
          terjadinya penurunan tanah yang tidak merata
        </span>
        <div className="mt-8 md:mt-16 flex w-full flex-col md:flex-row flex-wrap justify-center items-center gap-8 px-4 md:px-6">
          <CardProduct
            imageSrc="/images/img-product-aspal.png"
            subtitle="Laston Lapis Pondasi"
            title="(AC-BASE)"
            description="Lapisan Aspal Pondasi dengan gradasi agregat yang presisi dan kandungan bitumen optimal, memastikan daya tahan jangka panjang."
          />
          <CardProduct
            imageSrc="/images/img-product-beton.png"
            title="(AC-BASE MOD)"
            subtitle="Laston Lapis Pondasi Modifikasi"
            description="Lapisan Aspal Pondasi pilihan terbaik untuk proyek infrastruktur yang membutuhkan kekuatan pondasi luar biasa kuat"
          />
        </div>
      </div>
      <ClippedSection
        title="Proyek Impian Anda,<br>Realisasikan Bersama Kami"
        description="Dengan pengalaman bertahun-tahun, kami telah berhasil menyelesaikan berbagai proyek dengan hasil<br>yang memuaskan. Percayakan proyek Anda pada kami dan rasakan perbedaannya."
        buttonText="MULAI SEKARANG"
        topBgColor="bg-white-10"
        bottomBgColor="bg-white-10"
        clipPathBgColor="bg-blue-primary"
      />
     <div className="flex w-full flex-col items-center bg-white-10">
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
