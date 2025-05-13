"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import NewsGrid from "~/components/NewsGrid";
import Button from "~/components/commons/Button";
import Breadcrumbs from "~/components/commons/Breadcrumbs";

// Data berita untuk simulasi database
const newsData = [
  {
    slug: "jalan-lingkar-selatan-tuban-mulai-diaktifkan-terbatas",
    title:
      "Jalan Lingkar Selatan Tuban Mulai Diaktifkan Terbatas: Kendaraan Berat Boleh Lewat, tapi Tak Wajib",
    date: "15",
    month: "FEB",
    author: "Muhammad Azlan Syah",
    publishDate: "Kamis, 30 Mei 2024 | 10:00 WIB",
    image: "/images/img-detail-jlt-1.png",
    content: [
      "Setelah dilaporkan tuntas, Jalan Lingkar Selatan (JLS) Tuban mulai diaktifkan secara terbatas. Kendaraan berat bisa melintas ke jalan baru tersebut karena sudah dibuka sistem dua lajur. Keputusan tersebut, berdasarkan hasil rapat forum lalu lintas angkutan jalan (LLAJ) Tuban. Demi keamanan, sejumlah rambu arus lalu lintas mulai dipasang di sejumlah titik. Selain rambu pengarah jalan, terlihat juga papan peringatan titik rawan pengendara lawan arus.",
      "Pembukaan Dua Jalur Untuk Mengurangi Kerawanan Kecelakaan",
      "Kepala Bidang LLAJ Dinas Lingkungan Hidup dan Perhubungan (DLHP) Tuban Imam Isdarmawan mengatakan, kesepakatan dibukanya dua jalur berdasarkan keluhan masyarakat. Banyak yang protes maraknya pengendara melawan arus di sepanjang JLS.",
      "Untuk meminimalisir potensi bahaya pengguna jalan sekaligus mengurangi kerawanan kecelakaan, ungkap Beliau.",
      "DLHP Tuban bersama Satlantas Polres Tuban, kata Imam, hingga kemarin masih masif melakukan sosialisasi kepada pengendara agar mematuhi rambu lalu lintas. Salah satunya melalui banner peringatan yang dibentang di sejumlah titik.",
      '"Saat ini pengoperasian masih terbatas karena masih tahap melengkapi kelengkapan di sepanjang JLS," ujar dia. Lulusan Sekolah Tinggi Transportasi Darat (STTD) Bekasi ini menegatakan, saat ini kendaraan berat dari arah Surabaya maupun Semarang belum diwajibkan melewati JLS. Sebab, prasarana penunjang lalu lintas seperti penerangan jalan umum (PJU), rambu, dan perlengkapan lainnya masih dalam tahap penyelesaian.',
      "Pengoperasian Masih Terbatas",
      '"Pengoperasian untuk saat ini masih terbatas, nantinya jika perlengkapan penunjang telah tuntas seluruhnya maka jalur JLS akan menjadi jalur kendaraan berat dari arah Surabaya maupun Semarang," jelas Imam.',
      'Harapannya setelah pengaktifan JLS secara terbatas ini, kata Imam, dapat mengurangi kasus kecelakaan yang ada di JLS Tuban. "Semoga pengendara dapat tertib berlalu lintas dan mematuhi peraturan yang ada," pungkasnya.',
    ],
    tags: ["Tuban", "JLS", "Jalan Lingkar Selatan"],
  },
  {
    slug: "pembangunan-jalan-lingkar-tuban-dorong-pertumbuhan-ekonomi",
    title: "Pembangunan Jalan Lingkar Tuban: Dorong Pertumbuhan Ekonomi",
    date: "20",
    month: "MEI",
    author: "Muhammad Azlan",
    publishDate: "Kamis, 30 Mei 2024",
    image: "/images/img-kabar-proyek-1.png",
    content: [
      "Setelah dilaporkan tuntas, jalan lingkar selatan (JLS) Tuban mulai diaktifkan secara...",
    ],
    tags: ["Tuban", "JLS", "Ekonomi"],
  },
  {
    slug: "ring-road-tuban-jadi-opsi-pengendara-kena-macet",
    title: "Ring Road Tuban Jadi Opsi Pengendara Kena Macet",
    date: "16",
    month: "JUNI",
    author: "Muhammad Azlan",
    publishDate: "Senin, 16 Juni 2024",
    image: "/images/img-kabar-proyek-2.png",
    content: [
      "KBRN, Tuban: Setelah diresmikan, Ring Road/Jalur Lingkar Selatan Tuban yang berjalan...",
    ],
    tags: ["Tuban", "Ring Road", "Macet"],
  },
  {
    slug: "ring-road-tuban-19-km-diuji-coba",
    title: "Ring Road Tuban 19 Km Diuji Coba, Kendaraan Besar Dialihkan",
    date: "15",
    month: "FEB",
    author: "Muhammad Azlan",
    publishDate: "Rabu, 15 Feb 2024",
    image: "/images/img-kabar-proyek-3.png",
    content: [
      "KBRN, Tuban: Kapolres Tuban AKBP Suryono mengatakan bahwa dirinya sempat...",
    ],
    tags: ["Tuban", "Ring Road", "Uji Coba"],
  },
];

export default function InsightDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentUrl, setCurrentUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Set currentUrl dan imageUrl setelah komponen dimount di browser
    if (news) {
      setCurrentUrl(window.location.href);
      setImageUrl(`${window.location.origin}${news.image ?? ""}`);
    }
  }, []);

  // Fungsi untuk menangani berbagi ke media sosial
  const handleShare = (platform: string) => {
    if (!news) return;

    const shareData = {
      title: news.title,
      text: `${news.title}`,
      url: currentUrl,
    };

    // Cek jika Web Share API tersedia
    if (navigator.share && platform === "native") {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
      return;
    }

    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareData.title} - ${shareData.url}`)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
        break;
      case "instagram":
        // Instagram tidak memiliki API berbagi langsung yang resmi
        // Gunakan deep link untuk mengarahkan ke DM Instagram
        shareUrl = `https://instagram.com/direct/inbox`;
        alert("Buka Instagram dan paste link untuk dibagikan");
        navigator.clipboard
          .writeText(`${shareData.title} - ${shareData.url}`)
          .catch((err) => console.error("Gagal menyalin teks:", err));
        break;
      case "tiktok":
        // TikTok tidak memiliki API berbagi langsung
        // Gunakan deep link ke halaman pesan TikTok
        shareUrl = `https://www.tiktok.com/messages`;
        alert("Buka TikTok dan paste link untuk dibagikan");
        navigator.clipboard
          .writeText(`${shareData.title} - ${shareData.url}`)
          .catch((err) => console.error("Gagal menyalin teks:", err));
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}&hashtags=${news.tags.join(",")}`;
        break;
      case "copy":
        navigator.clipboard
          .writeText(shareData.url)
          .then(() => {
            alert("Link berhasil disalin!");
          })
          .catch((err) => {
            console.error("Gagal menyalin teks: ", err);
            alert("Gagal menyalin link.");
          });
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Cari berita berdasarkan slug
  const news = newsData.find((item) => item.slug === slug);

  // Jika berita tidak ditemukan, tampilkan halaman not found
  if (!news) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black">
            Artikel Tidak Ditemukan
          </h1>
          <p className="mb-8 text-gray-600">
            Maaf, artikel yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/insights"
            className="text-white rounded-md bg-blue-primary px-6 py-2 hover:bg-blue-700"
          >
            Kembali ke Insights
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Berita terkait (exclude berita yang sedang dibuka)
  const relatedNews = newsData.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="relative pt-20">
        <Breadcrumbs items={[
          { label: "Insights", href: "/insights" },
          { label: news.title.length > 20 ? news.title.substring(0, 20) + "..." : news.title }
        ]} textColor="text-black" hoverColor="hover:text-gray-700" />
      </div>

      {/* Article Content */}
      <div className="bg-white px-6 pt-48 text-black md:px-12 lg:px-48">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            {/* Hero Image */}
            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Date Block */}
            <div className="mb-6 flex items-center">
              <div className="mr-4 flex flex-col items-center">
                <div
                  className="flex h-[60px] w-[50px] items-end justify-center bg-blue-primary pb-2 text-white-10"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 12% 100%, 0 88%)",
                  }}
                >
                  <span className="text-2xl">{news.date}</span>
                </div>
                <span className="mt-2 text-lg font-medium uppercase text-black">
                  {news.month}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl">{news.title}</h1>
            </div>

            <div className="item flex justify-between">
              {/* Author and publish date */}
              <div className="mb-6 text-sm text-gray-500">
                {news.author} - {news.publishDate}
              </div>

              {/* Social Sharing */}
              <div className="mb-8 flex space-x-4">
                <span className="text-sm text-gray-600">Share:</span>
                <div className="flex space-x-3">
                  {/* WhatsApp */}
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="hover:text-green-600 text-gray-700"
                    aria-label="Share to WhatsApp"
                  >
                    <div className="relative h-5 w-5">
                      <Image
                        src="/svgs/icon-whatsapp.svg"
                        alt="Share on WhatsApp"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => handleShare("facebook")}
                    className="text-gray-700 hover:text-blue-600"
                    aria-label="Share to Facebook"
                  >
                    <div className="relative h-5 w-5">
                      <Image
                        src="/svgs/icon-facebook.svg"
                        alt="Share on Facebook"
                        width={20}
                        height={20}
                        className="object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(40%) contrast(100%)",
                        }}
                      />
                    </div>
                  </button>

                  {/* Instagram - Share to Instagram Direct Message */}
                  <button
                    onClick={() => handleShare("instagram")}
                    className="text-gray-700 hover:text-pink-600"
                    aria-label="Share to Instagram"
                  >
                    <div className="relative h-5 w-5">
                      <Image
                        src="/svgs/icon-instagram.svg"
                        alt="Share on Instagram"
                        width={20}
                        height={20}
                        className="object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(40%) contrast(100%)",
                        }}
                      />
                    </div>
                  </button>

                  {/* TikTok - Share to TikTok Direct Message */}
                  <button
                    onClick={() => handleShare("tiktok")}
                    className="text-gray-700 hover:text-black"
                    aria-label="Share to TikTok"
                  >
                    <div className="relative h-5 w-5">
                      <Image
                        src="/svgs/icon-tiktok.svg"
                        alt="Share on TikTok"
                        width={20}
                        height={20}
                        className="object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(40%) contrast(100%)",
                        }}
                      />
                    </div>
                  </button>

                  {/* X (Twitter) */}
                  <button
                    onClick={() => handleShare("twitter")}
                    className="text-gray-700 hover:text-gray-900"
                    aria-label="Share to X (Twitter)"
                  >
                    <div className="relative h-5 w-5">
                      <Image
                        src="/svgs/icon-x.svg"
                        alt="Share on X"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={() => handleShare("copy")}
                    className="text-gray-700 hover:text-blue-500"
                    aria-label="Copy Link"
                  >
                    <div className="relative h-5 w-5">
                      <Image
                        src="/svgs/icon-copylink.svg"
                        alt="Copy Link"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Article Text */}
            <div className="prose max-w-none">
              {news.content.map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph.includes("Pembukaan Dua Jalur") ||
                  paragraph.includes("Pengoperasian Masih Terbatas") ? (
                    <h2 className="mb-4 mt-8 text-2xl">{paragraph}</h2>
                  ) : paragraph.includes("Untuk meminimalisir") ? (
                    <blockquote className="relative my-6 border-l-4 border-blue-primary py-4 pl-8">
                      <span className="absolute left-2 top-0 font-serif text-5xl text-blue-primary">
                        &ldquo;
                      </span>
                      <p className="text-lg">{paragraph}</p>
                    </blockquote>
                  ) : (
                    <p className="mb-6 leading-relaxed">{paragraph}</p>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <h3 className="mb-6 text-xl uppercase">LIHAT INSIGHT LAIN</h3>

            <div className="space-y-6">
              {relatedNews.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-24 flex-shrink-0 overflow-hidden sm:w-24">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-2 flex-1 sm:mt-0">
                    <Link
                      href={`/insights/${item.slug}`}
                      className="line-clamp-2 block text-base font-medium hover:text-blue-primary"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.publishDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mb-12 mt-8">
              <h4 className="mb-3 uppercase">TAG</h4>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/insights?tag=${tag}`}
                    className="border border-gray-300 px-6 py-2 text-gray-600 hover:border-gray-500 hover:text-gray-800"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
