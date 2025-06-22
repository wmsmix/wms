"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
import CardProduct from "~/components/CardProduct";
import ProductHero from "~/components/Product/ProductHero";
import ClippedSection from "~/components/ClippedSection";
import { getAspalContentFromSupabase } from "~/data/aspal-supabase";
import type { AspalPageContent } from "~/types/cms";

export default function AspalProductPage() {
  const [content, setContent] = useState<AspalPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const aspalContent = await getAspalContentFromSupabase();
        setContent(aspalContent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading aspal content:', error);
        setIsLoading(false);
      }
    };

    void loadContent();
  }, []);
  const handleWhatsAppClick = (productName: string) => {
    const phoneNumber = "6282337900700"; // Nomor WhatsApp PT WMS
    const message = `Halo, saya tertarik dengan produk ${productName}. Boleh minta informasi lebih lanjut?`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <span className="ml-2 text-black">Loading...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="text-black">Error loading content</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <ProductHero
        title={content.hero.title}
        description={content.hero.description}
        imageSrc={content.hero.imageSrc}
        buttonText={content.hero.buttonText}
        onButtonClick={() => {
          window.location.href = content.hero.buttonHref;
        }}
        breadcrumbItems={[
          { label: "Produk & Layanan", href: "/products" },
          { label: "Aspal", href: "/products/aspal" }
        ]}
      />

      <div className="px-4 pt-12 md:px-8 md:pt-24">
        <span className="block text-center font-noto text-3xl text-black md:text-4xl lg:text-[64px]">
          {content.lapisPermukaan.title}
        </span>
        <span className="font-titilium block px-4 pt-6 text-center text-base text-black text-gray-500 md:px-16 md:pt-12 md:text-xl lg:px-96">
          {content.lapisPermukaan.description}
        </span>
        <div className="mt-8 flex w-full flex-col flex-wrap items-center justify-center gap-8 px-4 md:mt-16 md:flex-row md:px-6">
          {content.lapisPermukaan.products.map((product, index) => (
            <CardProduct
              key={index}
              imageSrc={product.imageSrc}
              subtitle={product.subtitle}
              title={product.title}
              description={product.description}
              borderColor="#CCCCCC"
              borderWidth="0.5px"
              backgroundColor="white"
              buttonText={product.buttonText}
              height="560px"
              whatsappOnClick={true}
              onWhatsAppClick={() => handleWhatsAppClick(product.whatsappMessage)}
            />
          ))}
        </div>
      </div>
      <div className="relative">
        <div
          className="mt-8 flex w-screen max-w-full flex-col items-center bg-black py-16 md:mt-12 md:py-32 clip-black-section"
          style={{
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
            width: "100vw",
          }}
        >
          <span className="block px-4 text-center font-noto text-4xl text-white-10 lg:text-4xl">
            {content.lapisAntara.title}
          </span>
          <p className="flex justify-start px-4 pt-4 text-center text-2xl leading-loose text-gray-500 md:px-16 md:pt-8 md:text-base lg:px-96 lg:text-2xl">
            {content.lapisAntara.description}
          </p>
        </div>
      </div>
      <div>
        {content.lapisAntara.features.map((feature, index) => (
          <div key={index} className={`${index === 1 ? 'clip-bottom-corners ' : ''}flex w-full flex-col ${feature.backgroundColor} md:flex-row`}>
            <div className={`${feature.imagePosition === 'right' ? 'order-2 md:order-1' : 'order-2'} flex w-full flex-col justify-center px-6 py-8 md:w-1/2 md:px-16`}>
              <h2 className={`mb-4 text-2xl font-semibold ${feature.textColor} md:text-3xl md:text-4xl lg:text-5xl`}>
                {feature.title}
              </h2>
              <p className="text-sm text-gray-500 md:text-base md:text-lg lg:text-[20px]">
                {feature.description}
              </p>
              <div className="flex justify-start pt-6 md:pt-8">
                <Button
                  text={feature.buttonText}
                  height="40px"
                  textSize="2xl"
                  className="text-sm md:text-lg"
                  onClick={() => handleWhatsAppClick(feature.whatsappMessage)}
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
            <div className={`relative ${feature.imagePosition === 'right' ? 'order-1 md:order-2' : 'order-1'} h-[250px] w-full md:h-[500px] md:w-1/2`}>
              <Image
                src={feature.imageSrc}
                alt={feature.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pt-12 md:px-8 md:pt-24">
        <span className="block text-center font-noto text-3xl text-black md:text-4xl lg:text-[64px]">
          {content.lapisPondasi.title}
        </span>
        <span className="font-titilium block px-4 pt-6 text-center text-base text-black text-gray-500 md:px-16 md:pt-12 md:text-xl lg:px-96">
          {content.lapisPondasi.description}
        </span>
        <div className="mt-8 flex w-full flex-col flex-wrap items-center justify-center gap-8 px-4 md:mt-16 md:flex-row md:px-6">
          {content.lapisPondasi.products.map((product, index) => (
            <CardProduct
              key={index}
              imageSrc={product.imageSrc}
              subtitle={product.subtitle}
              title={product.title}
              description={product.description}
              backgroundColor="white"
              borderColor="#CCCCCC"
              borderWidth="0.5px"
              height="560px"
              whatsappOnClick={true}
              onWhatsAppClick={() => handleWhatsAppClick(product.whatsappMessage)}
            />
          ))}
        </div>
      </div>



      <ClippedSection
        title={content.clippedSection.title}
        description={content.clippedSection.description}
        buttonText={content.clippedSection.buttonText}
        buttonHref={content.clippedSection.buttonHref}
        topBgColor="bg-white-10"
        bottomBgColor="bg-white-10"
        clipPathBgColor="bg-blue-primary"
      />
      {/* <div className="flex w-full flex-col items-center bg-white-10">
        <span className="mb-16 block text-center font-noto text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px]">
          {content.insightsSectionTitle}
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
      </div> */}
      <Footer />
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

        .marquee-container {
          width: 90%;
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          align-items: center;
          min-height: 80px;
          margin: 0 auto;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 2%,
            black 98%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 2%,
            black 98%,
            transparent 100%
          );
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
  );
}
