"use client";

import React from "react";
import Image from "next/image";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
import NewsGrid from "~/components/NewsGrid";
import ProjectShowcase from "~/components/ProjectShowcase";
import ProductHero from "~/components/Product/ProductHero";
import ClippedSection from "~/components/ClippedSection";
import PrecastFeatures from "~/components/PrecastFeatures";
import CardProduct from "~/components/CardProduct";

export default function AspalProductPage() {
  const precastFeatures = [
    {
      icon: "/svgs/icon-saluran-air.svg",
      title: "Saluran Air",
      description:
        "Produk box culvert dan dinding penahan dapat mempercepat proses pembangunan saluran irigasi.",
    },
    {
      icon: "/svgs/icon-pembatas-jalan.svg",
      title: "Pembatas Jalan",
      description:
        "Beton pracetak memiliki kualitas yang lebih konsisten, sehingga meningkatkan daya tahan jalan.",
    },
    {
      icon: "/svgs/icon-trotoar.svg",
      title: "Trotoar",
      description:
        "Trotoar beton pracetak memiliki kemampuan tinggi dalam menahan beban kendaraan berat.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <ProductHero
        title="Precast Concrete"
        description="Hemat biaya, hemat waktu
Solusi cerdas untuk bangunan modern"
        imageSrc="/images/img-hero-precast.png"
        buttonText="TANYA LEBIH LANJUT"
        onButtonClick={() => {
          window.location.href = "/contact";
        }}
      />

      <PrecastFeatures features={precastFeatures} bgColor="bg-white-10" />

      <span className="block pb-12 pt-24 text-center font-noto text-4xl text-black md:text-[64px]">
        Tipe Tipe Precast Concrete
      </span>
      <div className="container mx-auto mt-16 px-4 pb-24">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="w-full max-w-[350px]">
            <CardProduct
              imageSrc="/images/img-box-culvert.png"
              title="BOX CULVERT"
              description="Beton pracetak berbentuk kotak yang digunakan untuk saluran drainase besar, gorong-gorong, atau jembatan kecil. Berfungsi untuk memastikan aliran air agar lancar."
              fullImage={false}
              href="/products/precast-concrete/box-culvert"
              borderColor="#CCCCCC"
              borderWidth="0.5px"
              backgroundColor="white"
              height="500px"
              buttonText="LIHAT DETAIL"
            />
          </div>

          <div className="w-full max-w-[350px]">
            <CardProduct
              imageSrc="/images/img-double-u-box.png"
              title="DOUBLE U-BOX"
              description="Beton pracetak yang dirancang untuk saluran air dengan kapasitas besar, seperti irigasi dan drainase perkotaan. Bentuk gandanya memungkinkan pengaliran air lebih optimal."
              fullImage={false}
              href="/products/precast-concrete/double-u-box"
              borderColor="#CCCCCC"
              borderWidth="0.5px"
              backgroundColor="white"
              height="500px"
            />
          </div>

          <div className="w-full max-w-[350px]">
            <CardProduct
              imageSrc="/images/img-u-ditch.png"
              title="U-DITCH"
              description="Beton pracetak yang digunakan untuk mengelola aliran air di saluran terbuka. Produk ini ideal untuk kawasan perumahan, komersial, dan jalan. Tersedia dengan opsi penutup (U-ditch cover)."
              fullImage={false}
              href="/products/precast-concrete/u-ditch"
              borderColor="#CCCCCC"
              borderWidth="0.5px"
              backgroundColor="white"
              height="500px"
            />
          </div>

          <div className="w-full max-w-[350px]">
            <CardProduct
              imageSrc="/images/img-u-ditch.png"
              title="U-DITCH COVER"
              description="Penutup yang digunakan untuk menutupi bagian atas saluran drainase U-ditch untuk menjaga saluran drainase tetap bersih dari benda asing yang dapat menyumbat aliran air."
              fullImage={false}
              href="/products/precast-concrete/u-ditch-cover"
              borderColor="#CCCCCC"
              borderWidth="0.5px"
              backgroundColor="white"
              height="500px"
            />
          </div>

          <div className="w-full max-w-[350px]">
            <CardProduct
              imageSrc="/images/img-kansteen.png"
              title="KANSTEEN"
              description="Beton pracetak yang digunakan sebagai pembatas jalan, taman, atau trotoar. Produk ini tersedia dalam berbagai ukuran dan bentuk untuk memenuhi kebutuhan desain infrastruktur anda."
              fullImage={false}
              href="/products/precast-concrete/kansteen"
              borderColor="#CCCCCC"
              borderWidth="0.5px"
              backgroundColor="white"
              height="500px"
            />
          </div>
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
        title="Bangunan kokoh tahan lama
Hemat Waktu dan Biaya"
        description="Solusi sempurna untuk proyek Anda. Dengan desain fleksibel, kualitas terjamin, dan proses instalasi yang cepat, beton pracetak akan membantu Anda mewujudkan bangunan impian dengan lebih efisien"
        buttonText="COBA SEKARANG"
        topBgColor="bg-white-10"
        bottomBgColor="bg-blue-primary"
        clipPathBgColor="bg-black"
      />

      <div className="flex w-full flex-col items-center bg-blue-primary px-4 pb-6 md:px-8">
        <span className="mb-8 block text-center font-noto text-3xl text-white-10 sm:text-4xl md:mb-16 md:text-5xl lg:text-[64px]">
          Lihat Insight Proyek
        </span>

        <NewsGrid
          bgColor="bg-white-10"
          textColor="text-white"
          textBadgeColor="text-black"
        />
      </div>
      <div className="flex justify-center bg-blue-primary pb-6 md:pb-12">
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
          margin="1px"
        />
      </div>
      <Footer />
    </div>
  );
}
