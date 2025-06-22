"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import ProductHeader from "~/components/Product/precast-concrete/ProductHeader";
import ProductTypeVariants from "~/components/Product/precast-concrete/ProductTypeVariants";
import ProductSpecTable from "~/components/Product/precast-concrete/ProductSpecTable";
import Button from "~/components/commons/Button";
import PrecastFeatures from "~/components/PrecastFeatures";
import ClippedSection from "~/components/ClippedSection";
import NewsGrid from "~/components/NewsGrid";
import Breadcrumbs from "~/components/commons/Breadcrumbs";
import { getPrecastProductBySlugFromSupabase } from "~/data/precast-supabase";

import type { PrecastProduct } from "~/types/cms";

export default function PrecastConcreteProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<PrecastProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isKansteen, setIsKansteen] = useState(false);
  const [_currentSlug, setCurrentSlug] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const slug =
          typeof params.slug === "string"
            ? params.slug
            : Array.isArray(params.slug)
              ? params.slug[0]
              : "";

        // Set current slug for breadcrumbs
        if (slug) {
          setCurrentSlug(slug);
        }

        // Set isKansteen flag
        setIsKansteen(slug === "kansteen");

        // Load product data from Supabase
        if (slug) {
          const productData = await getPrecastProductBySlugFromSupabase(slug);
          if (productData?.is_published) {
            setProduct(productData);
          } else {
            setProduct(null);
            setError("Product not found or not published");
          }
        } else {
          setProduct(null);
          setError("Invalid product slug");
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product data");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white-10">
        <Navbar />
        <div className="py-20">
          <h1 className="text-center text-2xl text-gray-700">
            {error ?? "Produk tidak ditemukan"}
          </h1>
          <div className="mt-8 flex justify-center">
            <Button
              text="KEMBALI KE DAFTAR PRODUK"
              href="/products/precast-concrete"
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="relative z-50 w-full">
        <div className="w-full bg-white-10 pt-24 pb-4">
          <div className="w-full px-[-6] md:container md:mx-auto">
            <Breadcrumbs
              items={[
                { label: "Produk & Layanan", href: "/products" },
                { label: "Precast Concrete", href: "/products/precast-concrete" },
                { label: product.title }
              ]}
              textColor="text-black"
              hoverColor="hover:text-gray-700"
              topPosition="top-0"
              leftPosition="left-0"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        <h1 className="block text-center font-noto text-4xl italic text-black md:text-[64px]">
          {product.title}
        </h1>

        {product.description && (
          <div className="mx-auto mt-4 max-w-5xl">
            <p className="text-center font-titillium text-lg text-black md:text-xl">
              {product.description}
            </p>
          </div>
        )}
      </div>

      <ProductHeader
        title=""
        images={product.images}
        features={product.features}
      />

      {product.features && (
        <PrecastFeatures features={product.features} bgColor="bg-white-10" />
      )}

      {product.variants && (
        <ProductTypeVariants
          title={product.variants.title}
          variants={product.variants.types}
        />
      )}

      {product.specifications?.map((spec, index) => (
        <ProductSpecTable
          key={index}
          title={spec.title}
          columns={spec.columns}
          rows={spec.rows}
          runningText={product.running_text}
          isPrimaryBackground={
            index === (product.specifications?.length ?? 0) - 1
          }
          className={index === (product.specifications?.length ?? 0) - 1 ?  "mb-[-1px]" : ""}
        />
      ))}

      {isKansteen ? (
        <div className="relative ">
          <ClippedSection
            title="Butuh Kanstin Kustom Untuk Proyek Anda?"
            description="Kami menyediakan layanan pemesanan khusus, di mana bentuk dan ukuran kanstin dapat disesuaikan dengan kebutuhan spesifik proyek Anda."
            buttonText="PESAN SEKARANG"
            topBgColor="bg-white-10"
            bottomBgColor="bg-blue-primary"
            clipPathBgColor="bg-black"
          />
        </div>
      ) : (
        <ClippedSection
          title="Bangunan kokoh tahan lama
Hemat Waktu dan Biaya"
          description="Solusi sempurna untuk proyek Anda. Dengan desain fleksibel, kualitas terjamin, dan proses instalasi yang cepat, beton pracetak akan membantu Anda mewujudkan bangunan impian dengan lebih efisien"
          buttonText="COBA SEKARANG"
          topBgColor="bg-blue-primary"
          bottomBgColor="bg-blue-primary"
          clipPathBgColor="bg-black"
        />
      )}

      <div className="flex w-full flex-col items-center bg-blue-primary px-4 pb-6 md:px-8 mt-[-1px]">
        <span className="mb-8 block text-center font-noto text-3xl text-white-10 sm:text-4xl md:mb-16 md:text-5xl lg:text-[64px]">
          Lihat Insight Proyek
        </span>

        <NewsGrid
          bgColor="bg-white-10"
          textColor="text-white"
          textBadgeColor="text-black"
        />
      </div>
      <div className="flex justify-center bg-blue-primary pb-6 md:pb-12 mt-[-1px]">
        <Button
          text="LIHAT SEMUA"
          height="48px"
          textSize="xl"
          href="/insights"
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
