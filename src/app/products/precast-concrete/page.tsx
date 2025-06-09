"use client";

import React, { useEffect, useState } from "react";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import CardProduct from "~/components/CardProduct";
import ClippedSection from "~/components/ClippedSection";
import ProductHero from "~/components/Product/ProductHero";
import PrecastFeatures from "~/components/PrecastFeatures";
import { getPrecastContentFromSupabase, getPublishedPrecastProductsForDisplay } from "~/data/precast-supabase";

import type { PrecastPageContent } from "~/types/cms";

export default function PrecastConcreteProductPage() {
  const [content, setContent] = useState<PrecastPageContent | null>(null);
  const [products, setProducts] = useState<Array<{
    href: string;
    title: string;
    imageSrc: string;
    description: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pageContent, publishedProducts] = await Promise.all([
          getPrecastContentFromSupabase(),
          getPublishedPrecastProductsForDisplay()
        ]);

        setContent(pageContent);
        setProducts(publishedProducts);
      } catch (error) {
        console.error('Error loading precast data:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-700">Content not found</h1>
          <p className="mt-2 text-gray-500">Please check the CMS configuration.</p>
        </div>
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
          { label: "Precast Concrete", href: "/products/precast-concrete" }
        ]}
      />

      <PrecastFeatures features={content.features} bgColor="bg-white-10" />

      <span className="block pb-12 pt-24 text-center font-noto text-4xl text-black md:text-[64px]">
        {content.productsSection.title}
      </span>

      {products.length > 0 ? (
        <div className="container mx-auto mt-16 px-4 pb-24">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {products.map((product, index) => (
              <div key={index} className="w-full max-w-[350px]">
                <CardProduct
                  imageSrc={product.imageSrc}
                  title={product.title}
                  description={product.description}
                  fullImage={false}
                  href={product.href}
                  borderColor="#CCCCCC"
                  borderWidth="0.5px"
                  backgroundColor="white"
                  height="500px"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-16 px-4 pb-24">
          <div className="text-center text-gray-500">
            <p className="text-lg">No products available at the moment.</p>
            <p className="text-sm">Please check back later.</p>
          </div>
        </div>
      )}

      <ClippedSection
        title={content.clippedSection.title}
        description={content.clippedSection.description}
        buttonText={content.clippedSection.buttonText}
        topBgColor="bg-white-10"
        bottomBgColor="bg-blue-primary"
        clipPathBgColor="bg-black"
      />
      <Footer />
    </div>
  );
}
