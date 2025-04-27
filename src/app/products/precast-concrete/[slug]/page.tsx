"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import ProductHeader from "~/components/Product/precast-concrete/ProductHeader";
import ProductTypeVariants from "~/components/Product/precast-concrete/ProductTypeVariants";
import ProductSpecTable from "~/components/Product/precast-concrete/ProductSpecTable";
import RunningText from "~/components/Product/precast-concrete/RunningText";
import Button from "~/components/commons/Button";
import PrecastFeatures from "~/components/PrecastFeatures";
import ClippedSection from "~/components/ClippedSection";
import NewsGrid from "~/components/NewsGrid";
import precastProductsData from "~/data/precast-products.json";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Variant {
  image: string;
  label: string;
}

interface TableColumn {
  header: string;
  key: string;
  unit?: string;
}

type TableRow = Record<string, number | string>;

interface Specification {
  title: string;
  columns: TableColumn[];
  rows: TableRow[];
}

interface ProductData {
  title: string;
  description?: string;
  images: string[];
  features?: Feature[];
  variants?: {
    title: string;
    types: Variant[];
  };
  specifications?: Specification[];
  runningText?: string;
  schematicImage?: string;
}

export default function PrecastConcreteProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    try {
      const slug =
        typeof params.slug === "string"
          ? params.slug
          : Array.isArray(params.slug)
            ? params.slug[0]
            : "";

      // Ambil data dari precast-products.json berdasarkan slug
      if (
        slug &&
        Object.prototype.hasOwnProperty.call(precastProductsData, slug)
      ) {
        setProduct(
          precastProductsData[slug as keyof typeof precastProductsData] ?? null,
        );
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white-10">
        <Navbar />
        <div className="py-20">
          <h1 className="text-center text-2xl text-gray-700">
            Produk tidak ditemukan
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

      <div className="container mx-auto px-4 pt-36">
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
          runningText={product.runningText}
          isPrimaryBackground={
            index === (product.specifications?.length ?? 0) - 1
          }
        />
      ))}
      <ClippedSection
        title="Bangunan kokoh tahan lama
Hemat Waktu dan Biaya"
        description="Solusi sempurna untuk proyek Anda. Dengan desain fleksibel, kualitas terjamin, dan proses instalasi yang cepat, beton pracetak akan membantu Anda mewujudkan bangunan impian dengan lebih efisien"
        buttonText="COBA SEKARANG"
        topBgColor="bg-blue-primary"
        bottomBgColor="bg-blue-primary"
        clipPathBgColor="bg-black"
      />
      <div className="flex w-full flex-col items-center bg-blue-primary px-4 pb-6 md:px-8">
        <span className="mb-8 block text-center font-noto text-3xl text-white-10 sm:text-4xl md:mb-16 md:text-5xl lg:text-[64px]">
          Lihat Insight Proyek
        </span>

        <NewsGrid
          bgColor="bg-white-10"
          textColor="text-white"
          textBadgeColor="text-black"
        />
      </div>
      <div className="flex justify-center bg-blue-primary pb-6 md:pb-12">
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
