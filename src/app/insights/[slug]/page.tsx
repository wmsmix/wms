"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Breadcrumbs from "~/components/commons/Breadcrumbs";
import type { InsightPost } from "~/types/cms";
import { getInsightPostBySlugFromSupabase, getInsightPostsFromSupabase } from "~/data/insight-posts-supabase";
import { getImageUrl } from "~/utils/supabase";
import { renderMarkdown } from "~/utils/markdown";
import "~/styles/markdown.css";

export default function InsightDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentUrl, setCurrentUrl] = useState("");
  const [_imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState<InsightPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<InsightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load post data from database
  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getInsightPostBySlugFromSupabase(slug);
        if (!postData) {
          notFound();
          return;
        }
        setPost(postData);

        // Load related posts (exclude current post)
        const allPosts = await getInsightPostsFromSupabase();
        const related = allPosts
          .filter(p => p.slug !== slug && p.is_published)
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error loading post:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    void loadPost();
  }, [slug]);

    useEffect(() => {
    // Set currentUrl dan imageUrl setelah komponen dimount di browser
    if (post) {
      setCurrentUrl(window.location.href);
      setImageUrl(`${window.location.origin}${post.image_url ?? ""}`);
    }
  }, [post]);

  // Helper functions to format data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const month = date.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  const formatPublishDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${dayName}, ${day} ${month} ${year} | ${hours}:${minutes} WIB`;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Show 404 if post not found
  if (!post) {
    notFound();
  }

  const { day, month } = formatDate(post.published_date ?? new Date().toISOString());

  // Fungsi untuk menangani berbagi ke media sosial
  const handleShare = (platform: string) => {
    if (!post) return;

    const shareData = {
      title: post.title,
      text: `${post.title}`,
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
    let useDirectOpen = false;

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareData.title} - ${shareData.url}`)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
        break;
      case "instagram":
        // Instagram tidak memiliki API berbagi langsung ke DM yang dapat diandalkan
        useDirectOpen = true;

        // Copy konten ke clipboard untuk memudahkan pengguna
        navigator.clipboard
          .writeText(`${shareData.title} - ${shareData.url}`)
          .then(() => {
            alert("Link artikel telah disalin!\n\nSilakan buka aplikasi Instagram Anda, masuk ke Direct Message, pilih teman yang ingin Anda bagikan artikel ini, dan paste link yang telah disalin.");
          })
          .catch((err) => {
            console.error("Gagal menyalin teks:", err);
            alert("Terjadi kesalahan saat menyalin link. Silakan salin link secara manual: " + shareData.url);
          });
        break;
      case "tiktok":
        // TikTok tidak memiliki API berbagi langsung ke DM yang dapat diandalkan
        useDirectOpen = true;

        // Copy konten ke clipboard untuk memudahkan pengguna
        navigator.clipboard
          .writeText(`${shareData.title} - ${shareData.url}`)
          .then(() => {
            alert("Link artikel telah disalin!\n\nSilakan buka aplikasi TikTok Anda, masuk ke Messages, pilih teman yang ingin Anda bagikan artikel ini, dan paste link yang telah disalin.");
          })
          .catch((err) => {
            console.error("Gagal menyalin teks:", err);
            alert("Terjadi kesalahan saat menyalin link. Silakan salin link secara manual: " + shareData.url);
          });
        break;
      case "twitter":
        // Twitter/X menyediakan API untuk direct message dengan teks yang sudah terisi
        shareUrl = `https://twitter.com/messages/compose?text=${encodeURIComponent(`${shareData.title} - ${shareData.url}`)}`;
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

    if (shareUrl && !useDirectOpen) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="relative pt-20">
        <Breadcrumbs items={[
          { label: "Insights", href: "/insights" },
          { label: post.title.length > 20 ? post.title.substring(0, 20) + "..." : post.title }
        ]} topPosition="top-24 md:top-20" leftPosition="left-2 md:left-12" textColor="text-black" hoverColor="hover:text-gray-700" />
      </div>

      {/* Article Content */}
      <div className="bg-white px-6 pt-24 text-black md:px-12 lg:px-48">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            {/* Hero Image */}
            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden">
              <Image
                src={post.image_url ? getImageUrl(post.image_url, 'cms-uploads') : '/images/default-insight.jpg'}
                alt={post.title}
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
                  <span className="text-2xl">{day}</span>
                </div>
                <span className="mt-2 text-lg font-medium uppercase text-black">
                  {month}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl">{post.title}</h1>
            </div>

            <div className="item flex justify-between">
              {/* Author and publish date */}
              <div className="mb-6 text-sm text-gray-500">
                {post.author ?? 'Tim WMS'} - {formatPublishDate(post.published_date ?? new Date().toISOString())}
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
                        className="object-contain opacity-60"
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
                        className="object-contain opacity-30"
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
                        className="object-contain opacity-30"
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
                        className="object-contain opacity-80"
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
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>

                        {/* Description */}
            {post.description && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {post.description}
                </p>
              </div>
            )}

                        {/* Article Text */}
            <div className="prose prose-lg max-w-none">
              {post.content ? (
                <div
                  className="markdown-content mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                />
              ) : (
                <p className="mb-6 leading-relaxed text-gray-500">
                  No content available for this post.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <h3 className="mb-6 text-xl uppercase">LIHAT INSIGHT LAIN</h3>

            <div className="space-y-6">
              {relatedPosts.map((item, index) => (
                <div
                  key={item.id ?? index}
                  className="flex gap-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-24 flex-shrink-0 overflow-hidden sm:w-24">
                    <Image
                      src={item.image_url ? getImageUrl(item.image_url, 'cms-uploads') : '/images/default-insight.jpg'}
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
                      {formatPublishDate(item.published_date ?? new Date().toISOString())}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mb-12 mt-8">
              <h4 className="mb-3 uppercase">TAG</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map((tag: string, index: number) => (
                    <Link
                      key={index}
                      href={`/insights?tag=${tag}`}
                      className="border border-gray-300 px-6 py-2 text-gray-600 hover:border-gray-500 hover:text-gray-800"
                    >
                      {tag}
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">No tags available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{height: '200px'}}></div>
      {/* <div className="flex w-full flex-col items-center bg-white-10">
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
      </div> */}

            <Footer />
    </div>
  );
}
