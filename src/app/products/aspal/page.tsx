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
        description="Campuran material agregat dengan aspal dalam keadaan panas. Campuran ini kemudian dipadatkan menjadi lapisan jalan yang kuat dan tahan lama."
        imageSrc="/images/img-aspal.png"
        buttonText="TANYA LEBIH LANJUT"
        onButtonClick={() => {
          window.location.href = "/contact";
        }}
      />

      <div className="px-4 pt-12 md:px-8 md:pt-24">
        <span className="block text-center font-noto text-3xl text-black md:text-4xl lg:text-[64px]">
          Laston Lapis Permukaan
        </span>
        <span className="font-titilium block px-4 pt-6 text-center text-base text-black text-gray-500 md:px-16 md:pt-12 md:text-xl lg:px-96">
          Lapisan paling atas dari struktur jalan yang berperan sebagai
          penghalang pertama terhadap berbagai tekanan dan gesekan yang terjadi
          selama penggunaan jalan
        </span>
        <div className="mt-8 flex w-full flex-col flex-wrap items-center justify-center gap-8 px-4 md:mt-16 md:flex-row md:px-6">
          <CardProduct
            imageSrc="/images/img-laston-ac.png"
            subtitle="Laston Lapis Permukaan"
            title="(AC-WC)"
            description="Lapisan aspal permukaan yang cocok untuk jalan raya dengan lalu lintas tinggi, jalan tol, dan jalan perkotaan. Permukaan mulus untuk kenyamanan berkendara."
            borderColor="#CCCCCC"
            borderWidth="0.5px"
            backgroundColor="white"
            height="560px"
            whatsappOnClick={true}
          />
          <CardProduct
            imageSrc="/images/img-laston-hrs.png"
            title="(HRS-AC)"
            subtitle="Laston Lapis Permukaan"
            description="Lapisan aspal permukaan yang menjadi pilihan utama untuk wilayah tropis dan proyek dengan kebutuhan performa permukaan yang lebih halus dan mulus."
            borderColor="#CCCCCC"
            borderWidth="0.5px"
            backgroundColor="white"
            height="560px"
            whatsappOnClick={true}
          />
          <CardProduct
            imageSrc="/images/img-laston-ac-wc.png"
            title="(AC-WC MOD)"
            subtitle="Laston Lapis Permukaan"
            description="Lapisan aspal permukaan yang dimodifikasi dengan aditif polimer untuk meningkatkan elastisitas dan ketahanan deformasi. Ideal untuk jalan dengan beban berat dan iklim ekstrem."
            borderColor="#CCCCCC"
            borderWidth="0.5px"
            backgroundColor="white"
            height="560px"
            whatsappOnClick={true}
          />
        </div>
      </div>
      <div
        className="mt-8 flex w-screen max-w-full flex-col items-center bg-black py-16 md:mt-12 md:py-32"
        style={{
          clipPath:
            "polygon(4% 0%, 96% 0%, 100% 24%, 100% 100%, 96% 100%, 4% 100%, 0% 100%, 0% 24%)",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        <span className="block px-4 text-center font-noto text-4xl text-white-10  lg:text-4xl">
          Laston Lapis Antara
        </span>
        <p className="flex justify-start px-4 pt-4 text-center text-2xl text-gray-500 md:px-16 md:pt-8 md:text-base lg:px-96 lg:text-2xl leading-loose">
          Lapisan ini terbuat dari campuran aspal dan agregat, dan memiliki
          peran penting dalam memberikan daya dukung tambahan, mencegah
          deformasi, serta melindungi lapisan di bawahnya
        </p>
      </div>
      <div>
        <div className="flex w-full flex-col bg-black md:flex-row">
          <div className="order-2 flex w-full flex-col justify-center px-6 py-8 md:order-1 md:w-1/2 md:px-16">
            <h2 className="mb-4 text-2xl font-semibold text-white-10 md:text-3xl md:text-4xl lg:text-5xl">
              Laston Lapis Antara (AC-BC)
            </h2>
            <p className="text-sm text-gray-500 md:text-base md:text-lg lg:text-[20px]">
              Lapisan aspal antara untuk mendukung distribusi beban dan kekuatan
              struktur jalan
            </p>
            <div className="flex justify-start pt-6 md:pt-8">
              <Button
                text="PILIH LASTON INI"
                height="40px"
                textSize="2xl"
                className="text-sm md:text-lg"
                clipPath={{
                  outer:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                  inner:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                }}
                margin="1px"
              />
            </div>
          </div>
          <div className="relative order-1 h-[250px] w-full md:order-2 md:h-[500px] md:w-1/2">
            <Image
              src="/images/img-laston-lapis-antara.png"
              alt="Sertifikasi"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="clip-bottom-corners flex w-full flex-col bg-white-20 md:flex-row">
          <div className="relative order-1 h-[250px] w-full md:h-[500px] md:w-1/2">
            <Image
              src="/images/img-laston-lapis-antara-modifikasi.png"
              alt="Harga Bersaing"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-2 flex w-full flex-col justify-center px-6 py-8 md:w-1/2 md:px-16">
            <h2 className="mb-4 text-2xl font-semibold text-black md:text-3xl md:text-4xl lg:text-5xl">
              Laston Lapis Antara Modifikasi (AC-BC Mod)
            </h2>
            <p className="text-sm text-gray-500 md:text-base md:text-lg lg:text-[20px]">
              Lapisan aspal antara yang diperkuat dengan aditif polimer untuk
              aplikasi berat, memberikan ketahanan ekstra terhadap kelelahan dan
              deformasi
            </p>
            <div className="flex justify-start pt-6 md:pt-8">
              <Button
                text="PILIH LASTON INI"
                height="40px"
                textSize="2xl"
                className="text-sm md:text-lg"
                clipPath={{
                  outer:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                  inner:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                }}
                margin="1px"
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
      <div className="px-4 pt-12 md:px-8 md:pt-24">
        <span className="block text-center font-noto text-3xl text-black md:text-4xl lg:text-[64px]">
          Laston Lapis Pondasi
        </span>
        <span className="font-titilium block px-4 pt-6 text-center text-base text-black text-gray-500 md:px-16 md:pt-12 md:text-xl lg:px-96">
          Lapisan yang memiliki peran yang sangat penting dalam mendistribusikan
          beban lalu lintas secara merata ke tanah dasar, sehingga mencegah
          terjadinya penurunan tanah yang tidak merata
        </span>
        <div className="mt-8 flex w-full flex-col flex-wrap items-center justify-center gap-8 px-4 md:mt-16 md:flex-row md:px-6">
          <CardProduct
            imageSrc="/images/img-laston-ac-base.png"
            subtitle="Laston Lapis Pondasi"
            title="(AC-BASE)"
            description="Lapisan Aspal Pondasi dengan gradasi agregat yang presisi dan kandungan bitumen optimal, memastikan daya tahan jangka panjang."
            backgroundColor="white"
            borderColor="#CCCCCC"
            borderWidth="0.5px"
            height="560px"
            whatsappOnClick={true}
          />
          <CardProduct
            imageSrc="/images/img-laston-ac-base-mod.png"
            title="(AC-BASE MOD)"
            subtitle="Laston Lapis Pondasi Modifikasi"
            description="Lapisan Aspal Pondasi pilihan terbaik untuk proyek infrastruktur yang membutuhkan kekuatan pondasi luar biasa kuat"
            backgroundColor="white"
            borderColor="#CCCCCC"
            borderWidth="0.5px"
            height="560px"
            whatsappOnClick={true}
          />
        </div>
      </div>
      
      <div
        className="relative w-full bg-orange-secondary px-4 py-8 md:py-10 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 75%, 95% 100%, 4% 100%, 0 75%)",
        }}
      >
        <div className="marquee-container py-4 flex items-center h-full">
          <div className="marquee-content">
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Terjamin
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Terpercaya
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Tersertifikat
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Terjamin
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Terpercaya
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Tersertifikat
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Terjamin
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Terpercaya
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Tersertifikat
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Terjamin
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Terpercaya
            </span>
            <span className="marquee-item font-noto text-4xl text-white-10 md:text-6xl px-12">
              Tersertifikat
            </span>
          </div>
        </div>
        <style jsx>{`
          .marquee-container {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            align-items: center;
            min-height: 80px;
          }
          
          .marquee-content {
            display: inline-block;
            animation: marquee 40s linear infinite;
            padding-right: 50px;
          }
          
          .marquee-item {
            display: inline-block;
            line-height: 1;
          }
          
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-75%);
            }
          }
        `}</style>
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
          height="48px"
          textSize="xl"
          className="text-sm md:text-lg"
          clipPath={{
            outer:
              "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
            inner:
              "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
          }}
        />
      </div>
      <Footer />
    </div>
  );
}
