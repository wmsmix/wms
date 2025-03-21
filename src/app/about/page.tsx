"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
import Hero from "~/components/Hero";
import NewsGrid from "~/components/NewsGrid";
import ServiceCard from "~/components/ServiceCard";
import ClippedSection from "~/components/ClippedSection";
import ProductSection from "~/components/ProductSection";
import FeatureCard from "~/components/FeatureCard";
import ProcessStep from "~/components/ProcessStep";
import Image from "next/image";

export default function ProductsPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const processRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Data untuk 6 langkah proses
  const processSteps = [
    {
      number: 1,
      title: "Konsultasi & Perencanaan",
      description: "Perencanaan awal untuk kebutuhan proyek dan penyusunan jadwal produksi",
      image: "/images/process/konsultasi.jpg"
    },
    {
      number: 2,
      title: "Mix Design & Uji Bahan Baku",
      description: "Pemilihan dan Pengujian Material di Laboratorium sesuai dengan kekuatan, daya tahan, dan standar proyek",
      image: "/images/process/mix-design.jpg"
    },
    {
      number: 3,
      title: "Produksi",
      description: "Pembuatan Hot-mix, Ready-mix, atau Pre-cast di pabrik menggunakan peralatan modern yang telah dikalibrasi",
      image: "/images/process/produksi.jpg"
    },
    {
      number: 4,
      title: "Quality Control",
      description: "Pemeriksaan mutu pada setiap tahap produksi untuk memastikan kualitas terbaik",
      image: "/images/process/quality-control.jpg"
    },
    {
      number: 5,
      title: "Pengiriman",
      description: "Distribusi material ke lokasi proyek dengan armada transportasi modern",
      image: "/images/process/pengiriman.jpg"
    },
    {
      number: 6,
      title: "Implementasi",
      description: "Penerapan material di lokasi proyek sesuai dengan standar dan spesifikasi yang ditetapkan",
      image: "/images/process/implementasi.jpg"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length > 0 && entries[0]) {
          const entry = entries[0];
          if (entry.isIntersecting) {
            // Mulai dengan step 1 ketika section muncul di viewport
            setActiveStep(1);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Fungsi untuk scroll otomatis ketika mobile
  const scrollToStep = (stepIndex: number) => {
    setActiveStep(stepIndex + 1);
    
    if (processRef.current) {
      const stepElement = processRef.current.children[stepIndex] as HTMLElement;
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Efek untuk menangani scrolling (hanya berjalan di client-side)
  useEffect(() => {
    if (activeStep > 0 && processRef.current) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const stepIndex = activeStep - 1;
        const stepElement = processRef.current.children[stepIndex] as HTMLElement;
        if (stepElement) {
          stepElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [activeStep]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gray-base pt-20">
        <div className="hero-container w-full overflow-hidden">
          <Hero
            backgroundImage="/images/img-about.png"
            headline="20 Tahun membangun, Mengintegrasikan  keahlian, kepercayaan, dan inovasi"
            subheadline="Bertahun-tahun berkarya, mengukir Jejak Kualitas dalam Setiap Proyek. Dari proyek kecil hingga berskala besar, kami telah membuktikan komitmen kami terhadap kualitas dan kepuasan pelanggan."
            ctaText="BANGUN DENGAN WMS"
          />
        </div>
        <div className="flex w-screen max-w-full flex-col items-center bg-white-10 py-8 md:py-16 md:pt-32">
          <span className="block px-4 text-center font-noto text-3xl text-black md:text-4xl lg:text-5xl">
            Keunggulan Utama Kami
          </span>
          <div className="inline-flex w-full items-center justify-center gap-3.5 px-4 py-8 md:py-12">
            <div className="h-px max-w-[120px] flex-1 border-t border-neutral-400 border-opacity-30 md:max-w-[384px]"></div>
            <div className="origin-center-center bg-white h-1.5 w-1.5 rotate-180 border border-neutral-200"></div>
            <div className="h-px max-w-[120px] flex-1 border-t border-neutral-400 border-opacity-30 md:max-w-[384px]"></div>
          </div>

          <div className="container mx-auto mb-16 grid grid-cols-1 gap-2 px-4 md:grid-cols-2 md:gap-6">
            <FeatureCard
              icon="/svgs/icon-certified.svg"
              title="Keberpihakan Pada Lokal"
              description="Dengan TKDN tinggi dan waktu kerja fleksibel (24/7) sesuai kebutuhan proyek, kami berkomitmen mendukung ekonomi lokal dan memberikan hasil terbaik."
            />

            <FeatureCard
              icon="/svgs/icon-certified.svg"
              title="Standar Nasional"
              description="Teknologi modern dan sistem produksi kami telah disesuaikan dengan spesifikasi teknis Kementrian PUPR, memenuhi standar nasional untuk mendukung proyek besar."
            />

            <FeatureCard
              icon="/svgs/icon-trophy.svg"
              title="Kualitas Terjamin"
              description="Produk diproses menggunakan peralatan modern terkalibrasi dengan pengujian laboratorium internal untuk memastikan konsistensi di setiap produksi."
            />

            <FeatureCard
              icon="/svgs/icon-truck.svg"
              title="Kapasitas Produksi Besar"
              description="Kapasitas produksi Aspal Hot-Mix mencapai 60 ton/jam, dan produksi Beton Ready-Mix mencapai 60 m³/jam."
            />
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

      <section
        ref={sectionRef}
        className="relative overflow-hidden py-16 md:py-24 min-h-screen flex flex-col justify-center"
        style={{
          clipPath: "polygon(0 5%, 5% 0, 95% 0, 100% 5%, 100% 100%, 0 100%)",
          background: "linear-gradient(135deg, #0a2570 0%, #162f87 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-14 font-noto text-3xl text-white-10 md:mb-20 md:text-5xl">
            Alur Proses produksi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Timeline Steps - Scrollable pada desktop */}
            <div 
              className="order-2 md:order-1 md:h-[500px] md:overflow-y-auto md:pr-6 process-steps-container"
              ref={processRef}
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#ffffff30 transparent' }}
            >
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  isActive={activeStep >= step.number}
                  isLast={index === processSteps.length - 1}
                  onClick={() => scrollToStep(index)}
                />
              ))}
            </div>

            {/* Gambar yang berubah sesuai dengan step aktif */}
            <div className="order-1 md:order-2 mb-10 md:mb-0 flex justify-center items-center h-[300px] md:h-[500px] transition-all duration-500">
              {processSteps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`absolute w-full h-full transition-opacity duration-500 ${activeStep === step.number ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
                    <Image 
                      src={step.image}
                      alt={step.title}
                      fill
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 h-64 w-full rotate-45 bg-white-10 opacity-5"></div>
          <div className="absolute bottom-0 left-0 h-64 w-full -rotate-45 bg-white-10 opacity-5"></div>
        </div>
        
        {/* Custom styling untuk scrollbar */}
        <style jsx>{`
          .process-steps-container::-webkit-scrollbar {
            width: 4px;
          }
          
          .process-steps-container::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .process-steps-container::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}