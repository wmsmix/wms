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
  images: string[];
  features?: Feature[];
  variants?: {
    title: string;
    types: Variant[];
  };
  specifications?: Specification[];
  runningText?: string;
}

const productData: Record<string, ProductData> = {
  "u-ditch-cover": {
    title: "U-Ditch Cover",
    images: ["/images/img-u-ditch-cover-01.png"],
    features: [
      {
        icon: "/svgs/icon-saluran-air.svg",
        title: "Fungsi",
        description:
          "Menutupi saluran U-ditch dan mencegah sampah atau benda asing masuk ke saluran air.",
      },
      {
        icon: "/svgs/icon-pembatas-jalan.svg",
        title: "Lokasi",
        description: "Kawasan perumahan, komersial, dan jalan.",
      },
      {
        icon: "/svgs/icon-trotoar.svg",
        title: "Perawatan Mudah",
        description: "Bisa dibongkar untuk keperluan pembersihan saluran.",
      },
    ],
    variants: {
      title: "Tipe-Tipe U-Ditch Cover",
      types: [
        { image: "/images/img-u-ditch-cover-02.png", label: "Tipe A" },
        { image: "/images/img-u-ditch-cover-03.png", label: "Tipe B" },
        { image: "/images/img-u-ditch-cover-04.png", label: "Tipe C" },
        { image: "/images/img-u-ditch-cover-05.png", label: "Tipe D" },
      ],
    },
    specifications: [
      {
        title: "Spesifikasi Cover Light Duty (P 2,5 T)",
        columns: [
          { header: "Tipe", key: "type" },
          { header: "W", key: "w", unit: "mm" },
          { header: "T", key: "t", unit: "mm" },
          { header: "Ta", key: "ta", unit: "mm" },
          { header: "S1", key: "s1", unit: "mm" },
          { header: "S2", key: "s2", unit: "mm" },
        ],
        rows: [
          { type: "CU 30", w: 400, t: 80, ta: 65, s1: 50, s2: 65 },
          { type: "CU 40", w: 400, t: 80, ta: 65, s1: 50, s2: 65 },
        ],
      },
      {
        title: "Spesifikasi Cover Light Duty (P 5 T)",
        columns: [
          { header: "Tipe", key: "type" },
          { header: "W", key: "w", unit: "mm" },
          { header: "T", key: "t", unit: "mm" },
          { header: "Ta", key: "ta", unit: "mm" },
          { header: "S1", key: "s1", unit: "mm" },
          { header: "S2", key: "s2", unit: "mm" },
          { header: "L", key: "l", unit: "mm" },
        ],
        rows: [
          { type: "CU 30", w: 400, t: 80, ta: 65, s1: 50, s2: 65, l: 600 },
          { type: "CU 40", w: 400, t: 80, ta: 65, s1: 50, s2: 65, l: 600 },
        ],
      },
    ],
    runningText:
      "Mutu beton karakteristik 350 kg/cm² • Mutu baja tulangan (fy = 240 MPa) dan (fy = 390 MPa) • Tersedia custom ready to order untuk kebutuhan minimal order 50 unit • Mutu beton karakteristik 350 kg/cm²",
  },
  "box-culvert": {
    title: "Box Culvert",
    images: [
      "/images/img-box-culvert-01.png",
      "/images/img-box-culvert-02.png",
    ],
  },
  "u-ditch": {
    title: "U-Ditch",
    images: ["/images/img-u-ditch.png"],
  },
  kansteen: {
    title: "Kansteen",
    images: ["/images/img-kansteen.png"],
  },
  "double-u-box": {
    title: "Double U-Box",
    images: ["/images/img-double-u-box.png"],
  },
};

const precastFeatures = [
  {
    icon: "/svgs/icon-saluran-air.svg",
    title: "Saluran Air",
    description:
      "Produk box culvert dan dinding penahan dapat mempercepat proses pembangunan saluran irigasi.",
  },
  {
    icon: "/svgs/icon-pembatas-jalan.svg",
    title: "Pembatas Jalan",
    description:
      "Beton pracetak memiliki kualitas yang lebih konsisten, sehingga meningkatkan daya tahan jalan.",
  },
  {
    icon: "/svgs/icon-trotoar.svg",
    title: "Trotoar",
    description:
      "Trotoar beton pracetak memiliki kemampuan tinggi dalam menahan beban kendaraan berat.",
  },
];

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

      if (slug && Object.prototype.hasOwnProperty.call(productData, slug)) {
        setProduct(productData[slug] ?? null);
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

      <ProductHeader
        title={product.title}
        images={product.images}
        features={product.features}
      />

      <PrecastFeatures features={precastFeatures} bgColor="bg-white-10" />

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
          height="56px"
          textSize="base"
          className="text-sm md:text-lg"
        />
      </div>

      <Footer />
    </div>
  );
}
