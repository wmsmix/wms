"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
// import CardProduct from "~/components/CardProduct";
import ProductHero from "~/components/Product/ProductHero";
import ClippedSection from "~/components/ClippedSection";
import type { BetonPageContent } from "~/types/cms";
import { getBetonContentFromSupabase } from "~/data/beton-supabase";

export default function BetonProductPage() {
  const [content, setContent] = useState<BetonPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load content on page load
  useEffect(() => {
    const loadContent = async () => {
      try {
        const betonContent = await getBetonContentFromSupabase();
        setContent(betonContent);
        setIsLoading(false);
      } catch (e) {
        console.error('Error loading beton content:', e);
        setIsLoading(false);
      }
    };

    void loadContent();
  }, []);

  const handleWhatsAppClick = (productName: string) => {
    const phoneNumber = "6282337900700"; // Nomor WhatsApp PT WMS
    const message = `Halo, saya tertarik dengan produk ${productName}. Boleh minta informasi lebih lanjut?`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading content</div>
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
          { label: "Beton", href: "/products/beton" }
        ]}
      />

      <div className="px-2 pt-12 md:px-4 md:pt-24">
        <section className="text-white clip-bottom-corners relative w-full overflow-hidden pb-48">
          <span className="block px-2 text-center font-noto text-3xl text-black sm:text-4xl md:text-5xl lg:text-[48px]">
            {content.nonStruktural.title}
          </span>

          {/* Render first non-structural product (Fc' 10) with special layout */}
          {content.nonStruktural.products?.[0] && (() => {
            const firstProduct = content.nonStruktural.products[0];
            return (
              <div className="flex w-full flex-col px-2 py-8 md:flex-row md:px-4 md:py-16">
                <div className="relative order-1 mb-8 h-[215px] w-full px-6 md:mb-0 md:h-[500px] md:w-1/2 md:px-0 md:ps-24">
                  <div className="relative h-full w-full">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={firstProduct.imageSrc}
                        alt={firstProduct.title}
                        fill
                        className="object-cover"
                        style={{
                          clipPath:
                            "polygon(4% 0%, 96% 0%, 100% 6%, 100% 94%, 96% 100%, 4% 100%, 0% 94%, 0% 6%)",
                        }}
                      />
                    </div>

                    <div
                      className="absolute bottom-[-20px] right-[-20px] z-10 h-[140px] w-[180px] md:bottom-[-30px] md:right-[-30px] md:h-[190px] md:w-[254px]"
                      style={{
                        clipPath:
                          "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
                        backgroundColor: "#ffffff",
                        padding: "2px",
                      }}
                    >
                      <div
                        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-blue-primary"
                        style={{
                          clipPath:
                            "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
                        }}
                      >
                        <span
                          className="text-[42px] md:text-[54px] font-semibold leading-none text-white-10 md:text-[64px]"
                        >
                          {firstProduct.strength}
                        </span>
                        <span className="-mt-2 text-sm md:text-lg text-white-10 md:text-2xl">
                          Kekuatan Tekan Fc&apos;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-2 flex w-full flex-col items-start justify-center px-6 md:w-1/2 md:px-16">
                  <span
                    className="mb-2 text-left font-semibold text-3xl text-black md:mb-4 md:text-5xl"
                  >
                    {firstProduct.title}
                  </span>
                  <span
                    className="mb-2 text-left font-semibold text-3xl text-black md:mb-4 md:text-5xl"
                  >
                    {firstProduct.subtitle}
                  </span>
                  <p
                    className="text-base font-normal leading-7 text-black md:text-base lg:text-base"
                  >
                    {firstProduct.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-8 md:mt-8">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center">
                      <div
                        className="custom-cta-button cursor-pointer"
                        onClick={() => handleWhatsAppClick(firstProduct.whatsappMessage)}
                      >
                        <div className="custom-cta-button-inner">
                          <span className="text-white-10 whitespace-normal text-center font-titillium text-sm xs:text-lg sm:text-2xl font-light uppercase tracking-wide">
                            {firstProduct.buttonText}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

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

            .custom-cta-button {
              position: relative;
              height: 52px;
              min-width: 160px;
              display: flex;
              align-items: center;
              justify-content: center;
              clip-path: polygon(
                4% 0%,
                96% 0%,
                100% 16%,
                100% 84%,
                96% 100%,
                4% 100%,
                0% 84%,
                0% 16%
              );
              background-color: #ffffff;
              transition: opacity 0.3s;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            @media (min-width: 375px) {
              .custom-cta-button {
                min-width: 180px;
              }
            }

            @media (min-width: 640px) {
              .custom-cta-button {
                min-width: 200px;
              }
            }

            .custom-cta-button:hover {
              opacity: 0.8;
            }

            .custom-cta-button-inner {
              position: relative;
              height: calc(52px - 2px);
              width: calc(100% - 2px);
              display: flex;
              align-items: center;
              justify-content: center;
              clip-path: polygon(
                4% 0%,
                96% 0%,
                100% 16%,
                100% 84%,
                96% 100%,
                4% 100%,
                0% 84%,
                0% 16%
              );
              background-color: #FF7028;
              margin: 1px;
            }

            .custom-cta-button-inner span {
              padding: 0 12px;
            }

            @media (min-width: 640px) {
              .custom-cta-button-inner span {
                padding: 0 24px;
              }
            }
          `}</style>
        </section>
      </div>
      <div
        className="beton-jalan flex w-screen max-w-full flex-col items-center bg-black py-24"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        <span className="block px-4 text-center font-noto text-3xl text-white-10 md:text-4xl lg:text-5xl">
          Beton Jalan
        </span>
        <style jsx>{`
          .beton-jalan {
            clip-path: polygon(4% 0%, 96% 0%, 100% 48%, 100% 100%, 96% 100%, 4% 100%, 0% 100%, 0% 48%);
          }

          @media (max-width: 768px) {
            .beton-jalan {
              clip-path: polygon(10% 0%, 90% 0%, 100% 30%, 100% 100%, 90% 100%, 10% 100%, 0% 100%, 0% 30%);
            }
          }
        `}</style>
      </div>
      <div>
        {/* Render remaining non-structural products (Fc' 15 and Fc' 20) */}
        {content.nonStruktural.products.slice(1).map((product, index) => (
          <div key={index} className={`flex w-full flex-col ${product.backgroundColor} md:flex-row ${index === 1 ? 'clip-bottom-corners' : ''}`}>
            <div className={`relative ${product.imagePosition === 'right' ? 'order-1 md:order-2' : 'order-1'} h-[250px] w-full md:h-[500px] md:w-1/2`}>
              <Image
                src={product.imageSrc}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className={`${product.imagePosition === 'right' ? 'order-2 md:order-1' : 'order-2'} flex w-full flex-col justify-center px-6 py-8 md:w-1/2 md:px-16`}>
              <h2 className={`mb-4 text-2xl font-semibold ${product.textColor} md:text-3xl md:text-4xl lg:text-5xl`}>
                {product.title} {product.subtitle}
              </h2>
              <p className={`text-sm ${product.textColor === 'text-white-10' ? 'text-white-20 opacity-70' : 'text-gray-500'} md:text-base md:text-lg lg:text-[20px]`}>
                {product.description}
              </p>
              <div className="flex justify-start pt-6 md:pt-8">
                <Button
                  text={product.buttonText}
                  height="40px"
                  textSize="xl"
                  className="text-sm md:text-lg"
                  onClick={() => handleWhatsAppClick(product.whatsappMessage)}
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
        ))}
        <style jsx>{`
          .clip-bottom-corners {
            clip-path: polygon(
             0% 0%, 100% 0%, 100% 76%, 96% 100%, 96% 100%, 0% 100%, 4% 100%, 0% 76%
            );
          }

          @media (max-width: 768px) {
            .clip-bottom-corners {
              clip-path: polygon(
                0% 0%,
                100% 0%,
                100% 100%,
                100% 100%,
                0% 100%,
                0% 100%
              );
            }
          }
        `}</style>
      </div>
      <span className="mt-24 block px-12 text-center font-noto text-3xl text-black sm:text-4xl md:text-5xl lg:text-[48px]">
        {content.struktural.title}
      </span>
      <div className="mt-24">
        {/* Render structural products */}
        {content.struktural.products.map((product, index) => (
          <div key={index} className={`flex w-full flex-col md:flex-row`}>
            <div className={`relative ${product.imagePosition === 'right' ? 'order-1 md:order-2' : 'order-1'} h-[300px] w-full md:h-[500px] md:w-1/2`}>
              <Image
                src={product.imageSrc}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className={`${product.imagePosition === 'right' ? 'order-2 md:order-1' : 'order-2'} flex w-full flex-col justify-center ${product.backgroundColor} px-6 py-8 md:w-1/2 md:px-16`}>
              <h2 className={`mb-4 text-3xl font-semibold ${product.textColor} md:text-4xl lg:text-5xl`}>
                {product.title} {product.subtitle}
              </h2>
              <p className={`text-base ${product.textColor === 'text-white-10' ? 'text-white-20 opacity-70' : 'text-gray-500'} md:text-lg lg:text-[20px]`}>
                {product.description}
              </p>
              <div className="flex justify-start pt-6 md:pt-8">
                <Button
                  text={product.buttonText}
                  height="40px"
                  textSize="xl"
                  className="text-sm md:text-lg"
                  onClick={() => handleWhatsAppClick(product.whatsappMessage)}
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
        ))}
      </div>

      <ClippedSection
        title={content.clippedSection.title}
        description={content.clippedSection.description}
        buttonText={content.clippedSection.buttonText}
        topBgColor="bg-white-10"
        bottomBgColor="bg-white-10"
        clipPathBgColor="bg-blue-primary"
        buttonHref={content.clippedSection.buttonHref}
        onButtonClick={() => handleWhatsAppClick("Beton (Ready-Mix)")}
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
    </div>
  );
}
