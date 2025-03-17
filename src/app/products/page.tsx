"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Button from "~/components/Button";
import Hero from "~/components/Hero";
import ProjectsGrid from "~/components/ProjectsGrid";
import ContactForm from "~/components/ContactForm";
import NewsGrid from "~/components/NewsGrid";
import ProjectShowcase from "~/components/ProjectShowcase";
import CardProduct from "~/components/CardProduct";
import ServiceCard from "~/components/ServiceCard";

// Data produk (bisa dipindahkan ke file terpisah nanti)
const products = [
  {
    id: 1,
    slug: "aspal-hotmix",
    title: "Aspal Hot-Mix",
    shortDescription:
      "Produk laston yang dirancang untuk memberikan daya tahan, fleksibilitas, dan performa maksimal.",
    fullDescription:
      "Produk laston yang dirancang untuk memberikan daya tahan, fleksibilitas, dan performa maksimal pada berbagai infrastruktrur. Aspal hot-mix kami diproduksi dengan teknologi modern dan bahan berkualitas tinggi.",
    image: "/images/products/img-product-aspal.png",
    specifications: [
      "Tipe AC-WC (Asphalt Concrete - Wearing Course)",
      "Tipe AC-BC (Asphalt Concrete - Binder Course)",
      "Tipe AC-Base (Asphalt Concrete - Base)",
      "Tipe HRS-WC (Hot Rolled Sheet - Wearing Course)",
      "Tipe HRS-Base (Hot Rolled Sheet - Base)",
    ],
    applications: [
      "Jalan raya",
      "Jalan tol",
      "Bandara",
      "Area parkir",
      "Jalan lingkungan",
    ],
  },
  {
    id: 2,
    slug: "beton-readymix",
    title: "Beton Ready-Mix",
    shortDescription:
      "Memiliki tipe dengan kekuatan tekan 10 MPa hingga 30 MPa untuk berbagai kebutuhan konstruksi.",
    fullDescription:
      "Memiliki tipe dengan kekuatan tekan 10 MPa hingga 30 MPa, dimana tiap tipe dirancang untuk kebutuhan konstruksi ringan hingga proyek infrastruktur berat. Beton ready-mix kami diproduksi dengan formula khusus untuk memastikan kualitas terbaik.",
    image: "/images/products/img-product-beton.png",
    specifications: [
      "Mutu K-100 (fc' 8.3 MPa)",
      "Mutu K-175 (fc' 14.5 MPa)",
      "Mutu K-225 (fc' 18.7 MPa)",
      "Mutu K-250 (fc' 20.7 MPa)",
      "Mutu K-300 (fc' 24.9 MPa)",
      "Mutu K-350 (fc' 29.0 MPa)",
    ],
    applications: [
      "Fondasi bangunan",
      "Struktur kolom dan balok",
      "Jalan beton",
      "Jembatan",
      "Saluran drainase",
    ],
  },
  {
    id: 3,
    slug: "paving-block",
    title: "Paving Block",
    shortDescription:
      "Produk beton pracetak dengan berbagai bentuk dan ukuran untuk berbagai aplikasi.",
    fullDescription:
      "Produk beton pracetak dengan berbagai bentuk dan ukuran. Dirancang untuk saluran air, pembatas jalan, taman, trotoar, dan berbagai aplikasi lainnya. Paving block kami memiliki kekuatan dan ketahanan yang tinggi.",
    image: "/images/products/img-product-precast.png",
    specifications: [
      "Tipe Bata (Rectangular)",
      "Tipe Tri-Hexagonal",
      "Tipe Unipave",
      "Tipe Grassblock",
      "Kekuatan tekan 20-40 MPa",
    ],
    applications: [
      "Trotoar",
      "Area parkir",
      "Taman",
      "Jalan lingkungan",
      "Area komersial",
    ],
  },
];

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
        <div className="flex w-full flex-col bg-white-10 md:flex-row">
          <div className="relative order-1 h-[250px] w-full md:h-[500px] md:w-1/3">
            <Image
              src="/images/img-product-aspal.png"
              alt="Harga Bersaing"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-2 flex w-full flex-col justify-center px-4 py-6 md:px-12 md:py-8 md:w-2/3 md:px-16">
            <h2 className="mb-2 md:mb-4 ps-4 md:ps-24 text-2xl md:text-3xl font-semibold text-black lg:text-5xl">
              Aspal (Hot-Mix)
            </h2>
            <p className="ps-4 md:ps-24 pe-4 md:pe-96 pt-2 md:pt-4 text-sm md:text-base text-gray-500 lg:text-[20px]">
              Produk laston yang dirancang untuk memberikan daya tahan,
              fleksibilitas, dan performa maksimal pada berbagai infrastruktrur
            </p>
            <div className="flex justify-start ps-4 md:ps-24 pt-4 md:pt-8">
              <Button text="PELAJARI PRODUK" height="40px" textSize="base" className="text-sm md:text-lg" />
            </div>
          </div>
        </div>
        
        <div className="flex w-full flex-col bg-white-10 md:flex-row">
          <div className="relative order-1 h-[250px] w-full md:order-2 md:h-[500px] md:w-1/3">
            <Image
              src="/images/img-product-beton.png"
              alt="Peralatan"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-2 flex w-full flex-col justify-center px-4 py-6 md:order-1 md:px-12 md:py-8 md:w-2/3 md:px-16">
            <h2 className="mb-2 md:mb-4 ps-4 md:ps-24 text-2xl md:text-3xl font-semibold text-black lg:text-5xl">
              Beton (Ready-Mix)
            </h2>
            <p className="ps-4 md:ps-24 pe-4 md:pe-96 pt-2 md:pt-4 text-sm md:text-base text-gray-500 lg:text-[20px]">
              Memiliki tipe dengan kekuatan tekan 10 MPa hingga 30 MPa, dimana
              tiap tipe dirancang untuk kebutuhan konstruksi ringan hingga
              proyek infrastruktur berat.
            </p>
            <div className="flex justify-start ps-4 md:ps-24 pt-4 md:pt-8">
              <Button text="PELAJARI PRODUK" height="40px" textSize="base" className="text-sm md:text-lg" />
            </div>
          </div>
        </div>
        
        <div className="clip-bottom-corners flex w-full flex-col bg-white-10 md:flex-row">
          <div className="relative order-1 h-[250px] w-full md:h-[500px] md:w-1/3">
            <Image
              src="/images/img-product-precast.png"
              alt="Harga Bersaing"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-2 flex w-full flex-col justify-center px-4 py-6 md:px-12 md:py-8 md:w-2/3 md:px-16">
            <h2 className="mb-2 md:mb-4 ps-4 md:ps-24 text-2xl md:text-3xl font-semibold text-black lg:text-5xl">
              Precast Concrete
            </h2>
            <p className="ps-4 md:ps-24 pe-4 md:pe-96 pt-2 md:pt-4 text-sm md:text-base text-gray-500 lg:text-[20px]">
              Produk beton pracetak dengan berbagai bentuk dan ukuran. Dirancang
              untuk saluran air, pembatas jalan, taman, trotoar, dll.
            </p>
            <div className="flex justify-start ps-4 md:ps-24 pt-4 md:pt-8">
              <Button text="PELAJARI PRODUK" height="40px" textSize="base" className="text-sm md:text-lg" />
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
          <div className="grid grid-cols-1 gap-6 px-4 md:px-8 lg:px-48 py-8 md:py-16 lg:py-24 md:grid-cols-2 lg:md:grid-cols-4">
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
              imagePosition="top"
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
              imagePosition="top"
            />
          </div>
        </div>
      </section>
      <section className="relative w-full overflow-hidden py-12 md:py-24">
        <div className="absolute inset-0 z-0 w-full">
          <div className="h-1/2 w-full bg-blue-primary"></div>
          <div className="h-1/2 w-full bg-white-10"></div>
        </div>

        <div className="w-full">
          <div className="contact-form-container">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/img-bg-form.png"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>

            <div
              className="flex w-full flex-col items-center py-8 md:py-16"
              style={{
                clipPath:
                  "polygon(8% 0%, 92% 0%, 100% 12%, 100% 100%, 92% 100%, 8% 100%, 0% 100%, 0% 12%)",
              }}
            >
              <span className="text-white block text-center font-noto text-2xl md:text-3xl lg:text-5xl px-4">
                Dari lapisan aspal hingga infrastrukur berat,
                <br className="hidden md:block" />
                Kustomisasi Produk Sesuai Kebutuhanmu
              </span>
              <p className="text-white pt-4 md:pt-8 text-center text-sm md:text-base lg:text-[20px] px-4">
                Pilih dan kustomisasi produk sesuai dengan kebutuhan proyek
                anda,
                <br className="hidden md:block" />
                tim ahli siap membantu anda menemukan solusi yang tepat
              </p>
              <div className="flex justify-start pt-6 md:pt-8">
                <Button
                  text="KONSULTASI SEKARANG"
                  height="40px"
                  textSize="base"
                  className="text-sm md:text-lg"
                />
              </div>
            </div>

            <style jsx global>{`
              .contact-form-container {
                position: relative;
                width: 100vw;
                left: 50%;
                right: 50%;
                margin-left: -50vw;
                margin-right: -50vw;
                clip-path: polygon(
                  8% 0%,
                  94% 0%,
                  100% 12%,
                  100% 88%,
                  94% 100%,
                  8% 100%,
                  0% 88%,
                  0% 12%
                );
                overflow: hidden;
              }

              @media (max-width: 768px) {
                .contact-form-container {
                  clip-path: polygon(
                    4% 0%,
                    96% 0%,
                    100% 4%,
                    100% 96%,
                    96% 100%,
                    4% 100%,
                    0% 96%,
                    0% 4%
                  );
                }
              }

              @media (max-width: 640px) {
                .contact-form-container {
                  clip-path: polygon(
                    6% 0%,
                    94% 0%,
                    100% 8%,
                    100% 92%,
                    94% 100%,
                    8% 100%,
                    0% 94%,
                    0% 8%
                  );
                }
                
                .flex.w-screen {
                  clip-path: polygon(
                    2% 0%, 
                    98% 0%, 
                    100% 3%, 
                    100% 100%, 
                    98% 100%, 
                    2% 100%, 
                    0% 100%, 
                    0% 3%
                  );
                }
              }

              body {
                overflow-x: hidden;
              }
            `}</style>
          </div>
        </div>
      </section>
      <div className="flex w-full flex-col items-center bg-white-10 pb-24">
        <span className="mb-16 block text-center font-noto text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px]">
          Kabar Proyek WMS
        </span>

        <NewsGrid />
      </div>
      <Footer />
    </div>
  );
}
