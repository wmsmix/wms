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
  const handleWhatsAppClick = (productName: string) => {
    const phoneNumber = "6282337900700"; // Nomor WhatsApp PT WMS
    const message = `Halo, saya tertarik dengan produk ${productName}. Boleh minta informasi lebih lanjut?`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    // VVV INI PEMBUNGKUS LUAR (FRAGMENT) VVV
    <>
      {/* Ini adalah div utama Anda */}
      <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
        <Navbar />

        <ProductHero
          title="Aspal (Hot-Mix)"
          description="Produk laston yang dirancang untuk memberikan daya tahan, fleksibilitas, dan performa maksimal pada berbagai infrastruktur jalan."
          imageSrc="/images/img-aspal.png"
          buttonText="TANYA LEBIBIH LANJUT"
          onButtonClick={() => {
            window.location.href = "/contact";
          }}
          breadcrumbItems={[
            { label: "Produk & Layanan", href: "/products" },
            { label: "Aspal", href: "/products/aspal" },
          ]}
        />
        
        {/* ... (SEMUA KONTEN HALAMAN ANDA ADA DI DALAM DIV INI) ... */}
        
        <div
          className="relative w-full bg-orange-secondary px-4 py-8 md:py-10 overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 75%, 95% 100%, 4% 100%, 0 75%)",
          }}
        >
          <div className="marquee-container py-4 flex items-center h-full">
            {/* ... (isi marquee) ... */}
          </div>
          
          {/* STYLE 1 DIPINDAH KE SINI: Di dalam div-nya tapi di luar div lain */}
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

        {/* ... (sisa konten halaman) ... */}

        <Footer />
      </div>
      {/* ^^^ INI ADALAH TAG PENUTUP UNTUK DIV UTAMA ANDA </DIV> ^^^ */}


      {/* VVV STYLE GLOBAL HARUS DI SINI VVV
        Di luar <div> utama, tapi di dalam Fragment <> 
      */}
      <style jsx global>{`
        .clip-black-section {
          clip-path: polygon(4% 0%, 96% 0%, 100% 24%, 100% 100%, 96% 100%, 4% 100%, 0% 100%, 0% 24%);
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .clip-black-section {
            clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 100%, 90% 100%, 10% 100%, 0% 100%, 0% 10%);
          }
        }
        
        .clip-bottom-corners {
          clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 95% 100%, 5% 100%, 0% 85%);
        }

        @media (max-width: 768px) {
          .clip-bottom-corners {
            clip-path: polygon(0% 0%, 100% 0%, 100% 92%, 95% 100%, 5% 100%, 0% 92%);
          }
        }
      `}</style>
      
    </>
    // ^^^ INI PENUTUP FRAGMENT </> ^^^
  );
}
