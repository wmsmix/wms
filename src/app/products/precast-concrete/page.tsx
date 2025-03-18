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
        imageSrc="/images/img-aspal.png"
        buttonText="TANYA LEBIH LANJUT"
      />

      <PrecastFeatures features={precastFeatures} bgColor="bg-white-10" />

      <span className="block pb-12 pt-24 text-center font-noto text-4xl text-black md:text-[64px]">
        Tipe Tipe Precast Concrete
      </span>
      <div className="mt-16 flex w-full flex-wrap justify-center gap-8 px-6 pb-24 sm:px-0">
        <CardProduct
          imageSrc="/images/img-box-culvert.png"
          title="BOX CULVERT"
          description="Beton pracetak berbentuk kotak yang digunakan untuk saluran drainase besar, gorong-gorong, atau jembatan kecil. Berfungsi untuk memastikan aliran air agar lancar."
          fullImage={false}
        />
        <CardProduct
          imageSrc="/images/img-double-u-box.png"
          title="DOUBLE U-BOX"
          description="Beton pracetak yang dirancang untuk saluran air dengan kapasitas besar, seperti irigasi dan drainase perkotaan. Bentuk gandanya memungkinkan pengaliran air lebih optimal."
          fullImage={false}
        />
        <CardProduct
          imageSrc="/images/img-u-ditch.png"
          title="U-DITCH"
          description="Beton pracetak yang digunakan untuk mengelola aliran air di saluran terbuka. Produk ini ideal untuk kawasan perumahan, komersial, dan jalan. Tersedia dengan opsi penutup (U-ditch cover)."
          fullImage={false}
        />
        <CardProduct
          imageSrc="/images/img-u-ditch.png"
          title="U-DITCH COVER"
          description="Penutup yang digunakan untuk menutupi bagian atas saluran drainase U-ditch untuk menjaga saluran drainase tetap bersih dari benda asing yang dapat menyumbat aliran air."
          fullImage={false}
        />
        <CardProduct
          imageSrc="/images/img-kansteen.png"
          title="KANSTEEN"
          description="Beton pracetak yang digunakan sebagai pembatas jalan, taman, atau trotoar. Produk ini tersedia dalam berbagai ukuran dan bentuk untuk memenuhi kebutuhan desain infrastruktur anda."
          fullImage={false}
        />
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
      <div className="flex w-full flex-col items-center bg-blue-primary px-4 pb-12 md:px-8 md:pb-24">
        <span className="mb-8 block text-center font-noto text-3xl text-white-10 sm:text-4xl md:mb-16 md:text-5xl lg:text-[64px]">
          Lihat Insight Proyek
        </span>

        <NewsGrid bgColor="bg-white-10" textColor="text-white" textBadgeColor="text-black" />
      </div>
      <Footer />
    </div>
  );
}
