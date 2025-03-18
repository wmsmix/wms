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
import ClippedSection from "~/components/ClippedSection";
import ProductSection from "~/components/ProductSection";

export default function ProductsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black font-titillium text-white-10">
      <Navbar />

      <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gray-base pt-20">
        <div className="hero-container w-full overflow-hidden">
          <Hero
            backgroundImage="/images/product-background.png"
            headline="Dari Pasokan hingga Pemeliharaan, Kami Ada untuk Anda"
            subheadline="Mulai dari pengadaan material berkualitas seperti aspal dan beton hingga pelaksanaan proyek konstruksi secara profesional, kami siap menjadi mitra terpercaya Anda."
            ctaText="KONSULTASI SEKARANG"
          />
        </div>
        <div
          className="flex w-screen max-w-full flex-col items-center bg-white-10 py-8 md:py-16"
          style={{
            clipPath:
              "polygon(4% 0%, 96% 0%, 100% 6%, 100% 100%, 96% 100%, 4% 100%, 0% 100%, 0% 6%)",
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            width: '100vw',
          }}
        >
          <span className="block text-center font-noto text-3xl md:text-4xl lg:text-5xl text-black px-4">
            Dari lapisan aspal hingga infrastrukur berat,
            <br className="hidden md:block" />
            Kustomisasi Produk Sesuai Kebutuhanmu
          </span>
          <p className="pt-4 md:pt-8 text-center text-sm md:text-base lg:text-[20px] text-gray-500 px-4">
            Pilih dan kustomisasi produk sesuai dengan kebutuhan proyek anda,
            <br className="hidden md:block" />
            tim ahli siap membantu anda menemukan solusi yang tepat
          </p>
          <div className="flex justify-start pt-6 md:pt-8">
            <Button text="KONSULTASI SEKARANG" height="40px" textSize="base" className="text-sm md:text-lg" />
          </div>
        </div>

        <style jsx>{`
          .hero-container {
            position: relative;
            height: calc(700px * 0.95); /* 95% dari tinggi asli untuk mobile */
            overflow: hidden;
          }

          .hero-container :global(section) {
            position: absolute;
            top: -5%; /* Geser ke atas sebesar 5% */
            left: 0;
            width: 100%;
          }

          @media (min-width: 640px) {
            .hero-container {
              height: calc(
                964px * 0.95
              ); /* 95% dari tinggi asli untuk desktop */
            }
          }
        `}</style>
      </section>
      <section className="bg-blue-primary">
        <ProductSection
          title="Aspal (Hot-Mix)"
          description="Produk laston yang dirancang untuk memberikan daya tahan, fleksibilitas, dan performa maksimal pada berbagai infrastruktrur"
          imageSrc="/images/img-product-aspal.png"
          imageAlt="Aspal Hot-Mix"
          imagePosition="left"
        />
        
        <ProductSection
          title="Beton (Ready-Mix)"
          description="Memiliki tipe dengan kekuatan tekan 10 MPa hingga 30 MPa, dimana tiap tipe dirancang untuk kebutuhan konstruksi ringan hingga proyek infrastruktur berat."
          imageSrc="/images/img-product-beton.png"
          imageAlt="Beton Ready-Mix"
          imagePosition="right"
        />
        
        <ProductSection
          title="Precast Concrete"
          description="Produk beton pracetak dengan berbagai bentuk dan ukuran. Dirancang untuk saluran air, pembatas jalan, taman, trotoar, dll."
          imageSrc="/images/img-product-precast.png"
          imageAlt="Precast Concrete"
          imagePosition="left"
          isLastItem={true}
        />
      </section>
      <section className="bg-blue-primary">
        <div
          className="flex w-screen max-w-full flex-col items-center py-8 md:py-16"
          style={{
            clipPath:
              "polygon(4% 0%, 96% 0%, 100% 6%, 100% 100%, 96% 100%, 4% 100%, 0% 100%, 0% 6%)",
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            width: '100vw',
          }}
        >
          <span className="text-white-base block text-center font-noto text-3xl md:text-4xl lg:text-5xl px-4">
            Servis Satu Atap
          </span>
          <p className="text-white-base pt-4 md:pt-8 text-center text-sm md:text-base lg:text-[20px] px-4">
            Dari Konsep hingga Realisasi,
            <br className="hidden md:block" />
            Kami membantu dari perencanaan hingga pelaksanaan
          </p>
          <div className="grid grid-cols-1 px-4 md:px-8 lg:px-48 py-8 md:py-16 md:grid-cols-2 lg:md:grid-cols-4">
            <ServiceCard
              imageSrc="/images/img-product-aspal.png"
              title="JASA GELAR ASPAL"
              description="Jasa pengaspalan hot-mix dengan tim profesional dan peralatan modern."
              imagePosition="top"
            />
            <ServiceCard
              imageSrc="/images/img-product-beton.png"
              title="PENGECORAN BETON"
              description="Layanan pengecoran beton langsung di lokasi proyek menggunakan campuran beton berkualitas tinggi."
              imagePosition="bottom"
            />
            <ServiceCard
              imageSrc="/images/img-product-precast.png"
              title="SOLUSI KHUSUS"
              description="Semua kebutuhan dan solusi masalah infrastruktur Proyek Anda."
              imagePosition="top"
            />
            <ServiceCard
              imageSrc="/images/img-product-aspal.png"
              title="SUPPORT LETTER"
              description="Surat dukungan resmi untuk memenuhi persyaratan tender dan memastikan kelancaran pengadaan material konstruksi."
              imagePosition="bottom"
            />
          </div>
        </div>
      </section>
      <ClippedSection 
        title="Proyek Impian Anda,<br>Realisasikan Bersama Kami"
        description="Dengan pengalaman bertahun-tahun, kami telah berhasil menyelesaikan berbagai proyek dengan hasil<br>yang memuaskan. Percayakan proyek Anda pada kami dan rasakan perbedaannya."
        buttonText="MULAI SEKARANG"
        topBgColor="bg-blue-primary"
        bottomBgColor="bg-white-10"
        clipPathBgColor="bg-black"
      />
      <div className="flex w-full flex-col items-center bg-white-10 pb-24">
        <span className="mb-16 block text-center font-noto text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px]">
          Lihat Insight Proyek
        </span>

        <NewsGrid bgColor="bg-blue-primary" textColor="text-black" textBadgeColor="text-white-10" />
      </div>
      <Footer />
    </div>
  );
}
