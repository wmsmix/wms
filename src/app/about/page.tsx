"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
import Hero from "~/components/Hero";
import NewsGrid from "~/components/NewsGrid";
import ClippedSection from "~/components/ClippedSection";
import ProductSection from "~/components/ProductSection";
import FeatureCard from "~/components/FeatureCard";
import ProcessStep from "~/components/ProcessStep";
import Image from "next/image";
import ProfileCard from "~/components/ProfileCard";
import CertificateGallery from "~/components/CertificateGallery";

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const processContainerRef = useRef<HTMLDivElement>(null);

  const processSteps = [
    {
      number: 1,
      title: "Konsultasi & Perencanaan",
      description:
        "Perencanaan awal untuk kebutuhan proyek dan penyusunan jadwal produksi",
      image: "/images/img-alur-produksi-1.png",
    },
    {
      number: 2,
      title: "Mix Design & Uji Bahan Baku",
      description:
        "Pemilihan dan Pengujian Material di Laboratorium sesuai dengan kekuatan, daya tahan, dan standar proyek",
      image: "/images/img-alur-produksi-2.png",
    },
    {
      number: 3,
      title: "Produksi",
      description:
        "Pembuatan Hot-mix, Ready-mix, atau Pre-cast di pabrik menggunakan peralatan modern yang telah dikalibrasi",
      image: "/images/img-alur-produksi-3.png",
    },
    {
      number: 4,
      title: "Quality Control",
      description:
        "Pemeriksaan mutu pada setiap tahap produksi untuk memastikan kualitas terbaik",
      image: "/images/img-alur-produksi-4.png",
    },
    {
      number: 5,
      title: "Pengiriman",
      description:
        "Distribusi material ke lokasi proyek dengan armada transportasi modern",
      image: "/images/img-alur-produksi-5.png",
    },
    {
      number: 6,
      title: "Implementasi",
      description:
        "Penerapan material di lokasi proyek sesuai dengan standar dan spesifikasi yang ditetapkan",
      image: "/images/img-alur-produksi-6.png",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!processContainerRef.current) return;

      const container = processContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = container.offsetHeight;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

      if (containerTop < viewportHeight && containerTop + containerHeight > 0) {
        const stepsTotal = processSteps.length;
        const scrolledAmount = Math.abs(containerTop);
        const totalScrollableAmount = containerHeight - viewportHeight;
        const scrollProportion = scrolledAmount / totalScrollableAmount;

        const activeStepIndex = Math.min(
          stepsTotal - 1,
          Math.floor(scrollProportion * stepsTotal),
        );

        const newActiveStep = activeStepIndex + 1;

        if (newActiveStep !== activeStep) {
          setActiveStep(newActiveStep);
        }
      } else if (containerTop >= viewportHeight) {
        setActiveStep(1);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [activeStep, processSteps.length]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gray-base pt-20">
        <div className="hero-container w-full overflow-hidden">
          <Hero
            backgroundImage="/images/img-hero-about.png"
            mobileBackgroundImage="/images/img-hero-about.png"
            headline="20 Tahun membangun, Mengintegrasikan keahlian, kepercayaan, dan inovasi"
            subheadline="Bertahun-tahun berkarya, mengukir Jejak Kualitas dalam Setiap Proyek. Dari proyek kecil hingga berskala besar, kami telah membuktikan komitmen kami terhadap kualitas dan kepuasan pelanggan."
            ctaText="BANGUN DENGAN WMS"
            breadcrumbsLeftPosition="left-2 md:left-12"
            breadcrumbsTopPosition="top-12 md:top-12"
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
            height: calc(700px * 0.95);
            overflow: hidden;
          }

          .hero-container :global(section) {
            position: absolute;
            top: -5%;
            left: 0;
            width: 100%;
          }

          @media (min-width: 640px) {
            .hero-container {
              height: calc(964px * 0.95);
            }
          }
        `}</style>
      </section>

      <div
        className="relative bg-blue-primary py-24"
        style={{
          clipPath: typeof window !== 'undefined' && window.innerWidth <= 768
              ? "polygon(0 3%, 8% 0, 92% 0, 100% 3%, 100% 100%, 0 100%)"
              : "polygon(0 5%, 5% 0, 95% 0, 100% 5%, 100% 100%, 0 100%)",
        }}
      >
        {/* Logo W di bagian kanan */}
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 translate-x-[80%] scale-[4.5] md:block">
          <Image
            src="/images/img-w-2.png"
            alt="WMS Logo"
            fill
            className="object-contain object-right"
            priority
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <span className="font-noto text-4xl md:text-5xl">
              Alur Proses produksi
            </span>
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* Process Steps Column */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                {/* Position the line exactly in the middle - only between the first and last dots */}
                <div
                  style={{
                    position: "absolute",
                    left: "76px",
                    top: "27px",
                    height: "calc(100% - 54px)",
                    width: "1px",
                    backgroundColor: "#ffffff",
                    opacity: 0.6,
                    zIndex: 5,
                  }}
                ></div>

                {processSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`relative mb-8 flex cursor-pointer transition-all duration-300`}
                    onMouseEnter={() => setActiveStep(step.number)}
                  >
                    <div className="flex items-center">
                      {/* Numbered button */}
                      <div className="relative mr-14">
                        <div
                          className={`relative flex h-[42px] w-[42px] items-center justify-center`}
                          style={{
                            zIndex: 10,
                            opacity: activeStep === step.number ? 1 : 0.6,
                          }}
                        >
                          {/* Outer octagon border - using inline style for reliable color */}
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundColor: "#ffffff",
                              clipPath:
                                "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                            }}
                          ></div>

                          {/* Inner octagon */}
                          <div
                            className={`absolute inset-[1px] flex items-center justify-center`}
                            style={{
                              backgroundColor:
                                step.number === 1 ? "#F36A2B" : "#A75A42",
                              clipPath:
                                "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                            }}
                          >
                            <span
                              className="font-titillium text-2xl font-bold"
                              style={{ color: "#ffffff" }}
                            >
                              {step.number}
                            </span>
                          </div>
                        </div>

                        {/* Set white dot to exactly match the line position - always full opacity */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 transform rounded-full"
                          style={{
                            backgroundColor: "#ffffff",
                            width: "6px",
                            height: "6px",
                            zIndex: 20,
                            border: "1px solid rgba(10, 37, 112, 0.3)",
                            right: "-37px",
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Content with controlled opacity */}
                    <div
                      className="flex-1 pl-5 pt-1.5"
                      style={{ opacity: activeStep === step.number ? 1 : 0.6 }}
                    >
                      <h3 className="mb-1 font-titillium text-lg font-semibold text-white-10">
                        {step.title}
                      </h3>
                      <p className="font-titillium text-sm text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Column */}
            <div className="flex w-full items-center justify-center md:w-1/2">
              <div className="relative h-[480px] w-full overflow-hidden rounded bg-gray-800">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      activeStep === step.number ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={step.image || "/images/img-alur-produksi-1.png"}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full rounded-b-[40px] bg-black py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-3">
            <div className="text-white pt-12 lg:col-span-1">
              <p className="mb-5 text-base font-normal leading-relaxed text-gray-300 opacity-50">
                Berdiri di bawah naungan
                <br />
                PT Restu Mulya Cipta Mandiri,
              </p>
              <h2 className="font-noto text-3xl leading-tight md:text-4xl">
                PT. WMS telah 20 tahun menyuguhkan produk dan layanan dengan
                standar tertinggi
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:col-span-2">
              <ProfileCard
                title="VISI"
                description="Mendorong pembangunan infrastruktur melalui produk aspal dan beton berkualitas tinggi yang inovatif serta proses yang ramah lingkungan"
                imageSrc="/images/img-visi.png"
                imageAlt="Visi WMS"
                variant="primary"
              />

              <ProfileCard
                title="MISI"
                description={
                  <ol className="text-white/60 list-decimal space-y-3 pl-5">
                    <li>
                      Menggunakan bahan baku pilihan untuk mendukung upaya
                      mengurangi dampak lingkungan.
                    </li>
                    <li>
                      Menerapkan teknologi modern untuk memastikan efisiensi
                      produk dan mutu produk.
                    </li>
                    <li>
                      Memberikan solusi material; konstruksi berdaya tahan
                      tinggi yang sesuai dengan standar nasional.
                    </li>
                    <li>
                      Menjalin kerjasama strategis dengan mitra proyek untuk
                      menciptakan pembangunan infrastruktur yang kokoh dan
                      tangguh
                    </li>
                  </ol>
                }
                imageSrc="/images/img-misi.png"
                imageAlt="Misi WMS"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative mt-[-40px] w-full bg-orange-secondary px-4 py-8 md:py-10 overflow-hidden"
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

      <div className="bg-white-10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-titilium mb-12 block text-center text-xl text-black md:text-3xl">
            Sertifikat Tingkat Komponen Dalam Negeri
          </h2>

          <div>
            <CertificateGallery
              title="Sertifikat Tingkat Komponen Dalam Negeri"
              isDefault={true}
            />
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-2">
          <h2 className="font-titilium mb-12 block text-center text-xl text-black md:text-3xl">
            Surat Keterangan Kelaikan Operasi
          </h2>

          <div>
            <CertificateGallery
              title="Surat Keterangan Kelaikan Operasi"
              certificates={[
                {
                  id: 1,
                  title: "Surat Keterangan Kelaikan Operasi 1",
                  image: "/images/img-laik-1.jpg",
                  fullImage: "/images/img-laik-1.jpg",
                },
                {
                  id: 2,
                  title: "Surat Keterangan Kelaikan Operasi 2",
                  image: "/images/img-laik-2.jpg",
                  fullImage: "/images/img-laik-2.jpg",
                },
              ]}
              large={true}
              landscape={true}
            />
          </div>
        </div>
      </div>

      <div className="bg-white-10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-titilium mb-12 block text-center text-xl text-black md:text-3xl">
            Sertifikat ISO
          </h2>

          <div>
            <CertificateGallery
              title="Sertifikat ISO"
              certificates={[
                {
                  id: 1,
                  title: "Sertifikat ISO 9001",
                  image: "/images/img-iso-1.jpg",
                  fullImage: "/images/img-iso-1.jpg",
                },
                {
                  id: 2,
                  title: "Sertifikat ISO 14001",
                  image: "/images/img-iso-2.jpg",
                  fullImage: "/images/img-iso-2.jpg",
                },
                {
                  id: 3,
                  title: "Sertifikat ISO 45001",
                  image: "/images/img-iso-3.jpg",
                  fullImage: "/images/img-iso-3.jpg",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-titilium mb-12 block text-center text-xl text-black md:text-3xl">
            Sertifikat SNI
          </h2>

          <div>
            <CertificateGallery
              title="Sertifikat SNI"
              certificates={[
                {
                  id: 1,
                  title: "Sertifikat SNI",
                  image: "/images/img-sni-1.jpg",
                  fullImage: "/images/img-sni-1.jpg",
                },
                {
                  id: 2,
                  title: "Sertifikat SNI",
                  image: "/images/img-sni-2.jpg",
                  fullImage: "/images/img-sni-2.jpg",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <ClippedSection
        title="Tunggu Apa lagi?<br>Jadilah bagian dari kisah sukses kami!"
        description=""
        buttonText="HUBUNGI WMS"
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
