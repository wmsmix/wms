"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "~/components/commons/Button";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Breadcrumbs from "~/components/commons/Breadcrumbs";
import type { InsightsPageContent } from "~/types/cms";
import { getInsightsPageContent } from "~/data/insights";
import { getInsightsPageContentFromSupabase } from "~/data/insights-supabase";

export default function InsightsPage() {
  const [content, setContent] = useState<InsightsPageContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  const mobileItemsPerPage = 3;

  const [isMobile, setIsMobile] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(1);

  // Load content from CMS
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Try to load from Supabase first, then fall back to localStorage
        let insightsContent: InsightsPageContent;
        try {
          insightsContent = await getInsightsPageContentFromSupabase();
        } catch (e) {
          console.error(
            "Failed to load from Supabase, falling back to localStorage:",
            e,
          );
          insightsContent = getInsightsPageContent();
        }

        setContent(insightsContent);
      } catch (e) {
        console.error("Error loading insights page content:", e);
      } finally {
        setIsLoading(false);
      }
    };

    void loadContent();
  }, []);

  React.useEffect(() => {
    if (!content) return;

    const totalItems = content.newsGrid.length;
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setTotalPages(
        Math.ceil(totalItems / (mobile ? mobileItemsPerPage : itemsPerPage)),
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [content]);

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

      <section className="project-hero relative min-h-[320px] w-full overflow-hidden md:min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={content.hero.backgroundImage}
            alt="Insights"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute left-0 top-0 z-50 w-full pt-20">
          <Breadcrumbs
            items={[{ label: content.hero.title, href: "/insights" }]}
            topPosition={content.hero.breadcrumbsTopPosition}
            leftPosition={content.hero.breadcrumbsLeftPosition}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 flex w-full flex-col justify-end space-y-2 px-6 pb-16 md:flex-row md:items-end md:justify-between md:space-y-0 md:px-12 md:pb-16 lg:px-48">
          <div className="flex items-end gap-6">
            <span className="text-start font-noto text-4xl text-white-10 lg:text-6xl">
              {content.hero.title}
            </span>
          </div>
        </div>

        <style jsx>{`
          .project-hero {
            clip-path: polygon(0 0, 100% 0, 100% 76%, 90% 100%, 8% 100%, 0 78%);
          }

          @media (max-width: 768px) {
            .project-hero {
              clip-path: polygon(
                0 0,
                100% 0,
                100% 84%,
                90% 100%,
                10% 100%,
                0 84%
              );
            }
          }
        `}</style>
      </section>

      <section className="news-section px-6 py-12 md:px-12 lg:px-48">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="news-main w-full md:col-span-2">
            <Link
              href={content.featuredArticle.url}
              className="group block w-full overflow-hidden"
            >
              <div className="relative">
                <div className="relative h-[400px] w-full">
                  <Image
                    src={content.featuredArticle.imageSrc}
                    alt={content.featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-col">
                <div className="flex">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-[70px] w-[60px] flex-shrink-0 items-end justify-center bg-blue-primary pb-2 text-white-10"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 12% 100%, 0 88%)",
                      }}
                    >
                      <span className="text-3xl font-semibold">
                        {content.featuredArticle.date}
                      </span>
                    </div>

                    <span className="mt-4 text-2xl font-medium uppercase text-black">
                      {content.featuredArticle.month}
                    </span>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-titilium mb-4 text-xl text-black group-hover:text-blue-primary">
                      {content.featuredArticle.title}
                    </h3>
                    <p className="mb-4 text-gray-500">
                      {content.featuredArticle.description}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none flex items-center">
                  <div className="h-px flex-grow bg-gray-300"></div>
                  <div className="pointer-events-auto">
                    <Link href={content.featuredArticle.url}>
                      <Button
                        text="BACA LEBIH LANJUT"
                        clipPath={{
                          outer:
                            "polygon(5% 0%, 95% 0%, 100% 16%, 100% 84%, 95% 100%, 5% 100%, 0% 84%, 0% 16%)",
                          inner:
                            "polygon(5% 0%, 95% 0%, 100% 16%, 100% 84%, 95% 100%, 5% 100%, 0% 84%, 0% 16%)",
                        }}
                        margin="1px"
                        textSize="xl"
                        bgColor="#FF7028"
                        height="48px"
                        className="text-base md:text-lg"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="news-list space-y-6 md:col-span-1">
            {content.sideArticles.map((article, index) => (
              <Link
                key={index}
                href={article.url}
                className="block transition-colors hover:text-blue-primary"
              >
                <div className="flex flex-col gap-1 border-b pb-4">
                  <div>
                    <span className="text-2xl text-black">{article.title}</span>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-base text-gray-500">
                      {article.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Grid News */}
      <section className="grid-news-section hidden bg-white-10 px-6 py-12 md:px-12 lg:px-48">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: isMobile ? 3 : 6 }).map((_, index) => {
            const newsIndex = (currentPage - 1) * (isMobile ? 3 : 6) + index;

            if (newsIndex >= content.newsGrid.length) return null;

            const news = content.newsGrid[newsIndex];

            if (!news) return null;

            return (
              <div key={newsIndex} className="flex flex-col">
                <Link href={news.url}>
                  <div
                    className="block h-full w-full overflow-hidden shadow-lg"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 5% 100%, 0 90%)",
                    }}
                  >
                    <div className="relative">
                      <div className="relative h-[200px] w-full">
                        <Image
                          src={news.imageSrc}
                          alt={news.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col items-center">
                        <div
                          className="flex h-[60px] w-[50px] flex-shrink-0 items-end justify-center bg-blue-primary pb-2 text-white-10"
                          style={{
                            clipPath:
                              "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 12% 100%, 0 88%)",
                          }}
                        >
                          <span className="text-2xl font-semibold">
                            {news.date}
                          </span>
                        </div>

                        <span className="mt-3 text-lg font-medium uppercase text-black">
                          {news.month}
                        </span>
                      </div>

                      <div className="flex-1 p-4">
                        <h3 className="font-titilium mb-2 text-base text-black">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {news.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center md:mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`mx-1 md:mx-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <div className="relative h-[16px] w-[16px] md:h-[48px] md:w-[48px]">
              <Image
                src="/svgs/icon-arrow.svg"
                alt="Previous"
                fill
                className="object-contain"
              />
            </div>
          </button>

          <div className="mx-3 flex items-center md:mx-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-[3px] h-[6px] w-[6px] ${
                  currentPage === index + 1 ? "bg-blue-primary" : "bg-gray-300"
                } md:mx-1 md:h-[8px] md:w-[8px]`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`mx-1 md:mx-2 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <div className="relative h-[16px] w-[16px] md:h-[48px] md:w-[48px]">
              <Image
                src="/svgs/icon-arrow.svg"
                alt="Next"
                fill
                className="rotate-180 transform object-contain"
              />
            </div>
          </button>
        </div>
      </section>

      <section className="video-section relative w-full">
        <div className="relative aspect-video w-full">
          <iframe
            src={content.videoSection.videoUrl}
            title={content.videoSection.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="h-full w-full"
            frameBorder="0"
            loading="lazy"
          ></iframe>

          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-6 text-center"
            style={{ zIndex: 10 }}
          >
            <h2 className="font-titilium text-white text-4xl md:text-5xl lg:text-7xl">
              {content.videoSection.title}
            </h2>
            <p className="text-white mt-4 text-xl font-medium lg:text-2xl">
              {content.videoSection.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center pb-6 md:pb-12">
        <Button
          text="LIHAT SEMUA"
          height="48px"
          textSize="xl"
          className="text-base md:text-lg"
          href="/insights"
          bgColor="#FF7028"
          clipPath={{
            outer:
              "polygon(5% 0%, 95% 0%, 100% 16%, 100% 84%, 95% 100%, 5% 100%, 0% 84%, 0% 16%)",
            inner:
              "polygon(5% 0%, 95% 0%, 100% 16%, 100% 84%, 95% 100%, 5% 100%, 0% 84%, 0% 16%)",
          }}
          margin="1px"
        />
      </div>

      <Footer />
    </div>
  );
}
