"use client";

import React, { useEffect, useState } from "react";
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
import Breadcrumbs from "~/components/commons/Breadcrumbs";
import type { ProductsPageContent } from "~/types/cms";
import { getProductsPageContent } from "~/data/products-page";
import { getProductsPageContentFromSupabase } from "~/data/products-page-supabase";

export default function ProductsPage() {
  const [content, setContent] = useState<ProductsPageContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load content from CMS
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Try to load from Supabase first, then fall back to localStorage
        let productsContent: ProductsPageContent;
        try {
          productsContent = await getProductsPageContentFromSupabase();
        } catch (e) {
          console.error("Failed to load from Supabase, falling back to localStorage:", e);
          productsContent = getProductsPageContent();
        }

        setContent(productsContent);
      } catch (e) {
        console.error("Error loading products page content:", e);
      } finally {
        setIsLoading(false);
      }
    };

    void loadContent();
  }, []);

  if (isLoading || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <section className="flex w-full flex-col items-center justify-center overflow-x-hidden bg-gray-base pt-20">
        <div className="hero-container w-full overflow-hidden">
          <Hero
            backgroundImage={content.hero.backgroundImage}
            mobileBackgroundImage={content.hero.mobileBackgroundImage}
            headline={content.hero.headline}
            subheadline={content.hero.subheadline}
            ctaText={content.hero.ctaText}
            ctaHref={content.hero.ctaHref}
            breadcrumbItems={[
              { label: "Produk & Layanan", href: "/products" }
            ]}
            breadcrumbsTopPosition={content.hero.breadcrumbsTopPosition}
            breadcrumbsLeftPosition={content.hero.breadcrumbsLeftPosition}
          />
        </div>
        <div
          className="custom-clip-path flex w-screen max-w-full flex-col items-center bg-white-10 py-8 text-gray-base md:py-24"
          style={{
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
            width: "100vw",
          }}
        >
          <span className="block px-4 text-center font-noto text-3xl text-black md:text-4xl lg:text-5xl max-w-[1100px] mx-auto">
            {content.introduction.title}
          </span>
          <p className="px-4 pt-4 text-center text-sm text-gray-500 md:pt-8 md:text-base lg:text-[20px] max-w-[700px] mx-auto">
            {content.introduction.description}
          </p>
          <div className="flex justify-start pt-6 md:pt-8">
            <Button
              text={content.introduction.buttonText}
              height="40px"
              textSize="xl"
              className="text-sm md:text-2xl"
              href={content.introduction.buttonHref}
              clipPath={{
                outer:
                  "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                inner:
                  "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
              }}
            />
          </div>
        </div>

        <style jsx>{`
          .hero-container {
            position: relative;
            height: calc(700px * 0.95); /* 95% dari tinggi asli untuk mobile */
            overflow: hidden;
            margin-top: 0; /* Menghapus margin negatif untuk breadcrumbs */
          }

          .hero-container :global(section) {
            position: absolute;
            top: -5%; /* Geser ke atas sebesar 5% */
            left: 0;
            width: 100%;
          }

          .custom-clip-path {
            clip-path: polygon(
              6% 0%,
              94% 0%,
              100% 12%,
              100% 100%,
              94% 100%,
              6% 100%,
              0% 100%,
              0% 12%
            );
          }

          @media (min-width: 640px) {
            .hero-container {
              height: calc(
                964px * 0.95
              ); /* 95% dari tinggi asli untuk desktop */
              margin-top: 0; /* Menghapus margin negatif untuk breadcrumbs pada layar lebih besar */
            }

            .custom-clip-path {
              clip-path: polygon(
                4% 0%,
                96% 0%,
                100% 24%,
                100% 100%,
                96% 100%,
                4% 100%,
                0% 100%,
                0% 24%
              );
            }
          }
        `}</style>
      </section>
      <section className="bg-blue-primary">
        <ProductSection
          title="Aspal"
          italicText="(Hot-Mix)"
          description="Produk laston yang dirancang untuk memberikan daya tahan, fleksibilitas, dan performa maksimal pada berbagai infrastruktrur"
          imageSrc="/images/img-product-aspal.png"
          imageAlt="Aspal Hot-Mix"
          imagePosition="left"
          buttonHref="/products/aspal"
        />

        <ProductSection
          title="Beton"
          italicText="(Ready-Mix)"
          description="Memiliki tipe dengan kekuatan tekan 10 MPa hingga 30 MPa, dimana tiap tipe dirancang untuk kebutuhan konstruksi ringan hingga proyek infrastruktur berat."
          imageSrc="/images/img-product-beton.png"
          imageAlt="Beton Ready-Mix"
          imagePosition="right"
          buttonHref="/products/beton"
        />

        <ProductSection
          title=""
          italicText="Precast Concrete"
          description="Produk beton pracetak dengan berbagai bentuk dan ukuran. Dirancang untuk saluran air, pembatas jalan, taman, trotoar, dll."
          imageSrc="/images/img-product-precast.png"
          imageAlt="Precast Concrete"
          imagePosition="left"
          isLastItem={true}
          buttonHref="/products/precast-concrete"
        />
      </section>

      <section className="bg-blue-primary mt-[-2px]">

        <div
          className="services-clip-path flex w-screen max-w-full flex-col items-center py-8 md:py-16"
          style={{
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
            width: "100vw",
          }}
        >
          <span className="text-white-base block px-4 text-center font-noto text-3xl md:text-4xl lg:text-5xl">
            {content.services.title}
          </span>
          <p className="text-white-base px-4 pt-4 text-center text-sm md:pt-8 md:text-base lg:text-[20px]">
            {content.services.description}
          </p>
          <div className="grid grid-cols-1 px-4 py-8 md:grid-cols-2 md:px-8 md:py-16 lg:md:grid-cols-4 lg:px-24">
            {content.services.services.map((service, index) => (
              <ServiceCard
                key={index}
                imageSrc={service.imageSrc}
                title={service.title}
                description={service.description}
                italicWords={service.italicWords}
                italicTitle={service.italicTitle}
                imagePosition={service.imagePosition}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="support-letter" className="bg-blue-primary py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-4">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="font-noto text-3xl text-white-10 md:text-4xl lg:text-[40px]">
              {content.supportLetter.title}
            </h2>
            <h3 className="mt-2 font-noto text-3xl text-white-10 md:text-4xl lg:text-[40px]">
              {content.supportLetter.subtitle}
            </h3>
          </div>

          <div className="mt-24 flex flex-col gap-6 md:flex-row md:gap-[124px]">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="support-letter-image h-full w-full">
                  <Image
                    src={content.supportLetter.imageSrc}
                    alt="Support Letter"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="w-full text-white-10 md:w-1/2">
              <h3 className="font-titilium mb-4 text-3xl font-semibold md:text-5xl">
                Surat Dukungan Resmi
                <br />
                untuk Pengadaan Anda
              </h3>

              <p className="mt-4 text-base leading-relaxed md:text-base">
                {content.supportLetter.description}
              </p>

              <div className="mt-8">
                <Button
                  text={content.supportLetter.buttonText}
                  height="48px"
                  textSize="xl"
                  className="bg-orange-500 text-base md:text-lg"
                  href={content.supportLetter.buttonHref}
                  clipPath={{
                    outer:
                      "polygon(5% 0%, 95% 0%, 100% 16%, 100% 84%, 95% 100%, 5% 100%, 0% 84%, 0% 16%)",
                    inner:
                      "polygon(5% 0%, 95% 0%, 100% 16%, 100% 84%, 95% 100%, 5% 100%, 0% 84%, 0% 16%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .support-letter-image {
            clip-path: polygon(
              4% 0%,
              96% 0%,
              100% 6%,
              100% 94%,
              96% 100%,
              4% 100%,
              0% 94%,
              0% 6%
            );
          }

          @media (max-width: 768px) {
            .support-letter-image {
              clip-path: polygon(
                6% 0%,
                94% 0%,
                100% 6%,
                100% 94%,
                94% 100%,
                6% 100%,
                0% 94%,
                0% 6%
              );
            }
          }

          .services-clip-path {
            clip-path: polygon(
              6% 0%,
              94% 0%,
              100% 4%,
              100% 100%,
              96% 100%,
              4% 100%,
              0% 100%,
              0% 4%
            );
          }

          @media (min-width: 768px) {
            .services-clip-path {
              clip-path: polygon(
                4% 0%,
                96% 0%,
                100% 6%,
                100% 100%,
                96% 100%,
                4% 100%,
                0% 100%,
                0% 6%
              );
            }
          }
        `}</style>
      </section>
      <ClippedSection
        title={content.clippedSection.title}
        description={content.clippedSection.description}
        buttonText={content.clippedSection.buttonText}
        topBgColor="bg-blue-primary"
        bottomBgColor="bg-white-10"
        clipPathBgColor="bg-black"
        buttonHref={content.clippedSection.buttonHref}
      />
      <div className="flex w-full flex-col items-center bg-white-10">
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
          className="bg-orange-500 text-base md:text-lg"
          href="/insights"
          clipPath={{
            outer:
              "polygon(5% 0%, 95% 0%, 100% 16%, 100% 84%, 95% 100%, 5% 100%, 0% 84%, 0% 16%)",
            inner:
              "polygon(5% 0%, 95% 0%, 100% 16%, 100% 84%, 95% 100%, 5% 100%, 0% 84%, 0% 16%)",
          }}
        />
      </div>
      <Footer />
    </div>
  );
}
