"use client";

import Image from "next/image";
import Button from "~/components/commons/Button";
import Footer from "~/components/commons/Footer";
import Hero from "~/components/Hero";
import Navbar from "~/components/commons/Navbar";
import Labels from "~/components/Label";
import CardProduct from "~/components/CardProduct";
import ProjectShowcase from "~/components/ProjectShowcase";
import ContactForm from "~/components/ContactForm";
import FloatingWhatsAppButton from "~/components/commons/FloatingWhatsAppButton";
import { useEffect, useState } from "react";
import type { HomepageContent } from "~/types/cms";
import { getHomepageContent } from "~/data/homepage";
import { getHomepageContentFromSupabase } from "~/data/homepage-supabase";

export default function HomePage() {
  const [content, setContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        // Try to get content from Supabase first
        const homepageContent = await getHomepageContentFromSupabase();
        setContent(homepageContent);
      } catch (e) {
        console.error('Error loading homepage content from Supabase:', e);
        // Fallback to localStorage if Supabase fails
        try {
          const localContent = getHomepageContent();
          setContent(localContent);
        } catch (localError) {
          console.error('Error loading homepage content from localStorage:', localError);
        }
      }
    }

    void loadContent();
  }, []);

  // Fall back to loading state if content not loaded
  if (!content) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-black font-titillium text-white-10">
        <Navbar />
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Loading...</h1>
            <p className="mt-4">Please wait while we prepare the website.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black font-titillium text-white-10">
      <Navbar />

      <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden pt-8">
        <div className="hero-container w-full overflow-hidden">
          <Hero
            backgroundImage={content.hero.backgroundImage}
            mobileBackgroundImage={content.hero.mobileBackgroundImage}
            headline={content.hero.headline}
            subheadline={content.hero.subheadline}
            ctaText={content.hero.ctaText}
            ctaHref={content.hero.ctaHref}
            showBreadcrumbs={false}
          />
        </div>

        <span className="mx-auto block max-w-[90vw] py-24 text-center font-noto text-[40px] text-white-10 sm:max-w-4xl sm:text-[64px]">
          {content.tagline}
        </span>
        <div className="mx-auto mt-8 grid w-full max-w-[90vw] grid-cols-1 gap-8 px-4 sm:max-w-5xl sm:grid-cols-2 md:grid-cols-4">
          {content.certifications.map((cert, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white-10">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={96}
                  height={96}
                />
              </div>
              <h3 className="mt-4 whitespace-pre-line text-xl font-normal sm:text-2xl">
                {cert.title}
              </h3>
              <p className="mt-2 text-base opacity-70 sm:text-lg">
                {cert.subtitle}
              </p>
            </div>
          ))}
        </div>
        <Labels />
        <div
          className="flex w-full flex-col items-center bg-white-10 py-8"
          style={{
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 4%, 100% 100%, 92% 100%, 8% 100%, 0% 100%, 0% 4%)",
          }}
        >
          <span className="block text-center font-noto text-4xl mt-[-2px] text-black md:text-[64px]">
            Produk Kami
          </span>
          <div className="mt-16 flex w-full flex-wrap justify-center gap-8 px-6 sm:px-0">
            {content.products.map((product, index) => (
              <CardProduct
                key={index}
                imageSrc={product.imageSrc}
                title={product.title}
                italicText={product.italicText}
                description={product.description}
                borderColor="#CCCCCC"
                borderWidth="0.5px"
                backgroundColor="white"
                height="500px"
                // whatsappOnClick={true}
                href={product.href}
              />
            ))}
          </div>

          {content.features.map((feature, index) => {
            // Determine if the layout should be inverted (image on the left)
            const isInverted = feature.isInverted;
            const bgColor = feature.bgColor ?? "bg-white-10";
            const textColor = feature.textColor ?? "text-black";

            return (
              <div key={index} className={`${index === 0 ? 'mt-24' : ''} flex w-full flex-col md:flex-row ${bgColor}`}>
                {isInverted && (
                  <div className="relative order-1 h-[300px] w-full md:h-[500px] md:w-1/2">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className={`order-2 flex w-full flex-col justify-center px-6 py-8 ${isInverted ? '' : 'md:order-1'} md:w-1/2 md:px-16`}>
                  <h2 className={`mb-4 text-3xl font-semibold ${textColor} md:text-4xl lg:text-5xl`}>
                    {feature.title}
                  </h2>
                  <p className={`text-base ${textColor === 'text-white-10' ? '' : 'text-gray-500'} md:text-lg lg:text-[20px]`}>
                    {feature.description}
                  </p>
                  {feature.buttonText && feature.buttonHref && (
                    <div className="mt-[24px] flex justify-start">
                      <Button
                        text={feature.buttonText}
                        height="42px"
                        textSize="lg"
                        onClick={() => {
                          window.location.href = feature.buttonHref ?? '';
                        }}
                        clipPath={{
                          outer:
                            "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                          inner:
                            "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                        }}
                      />
                    </div>
                  )}
                </div>

                {!isInverted && (
                  <div className="relative order-1 h-[300px] w-full md:order-2 md:h-[500px] md:w-1/2">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}

          <section className="text-white clip-bottom-corners relative w-full overflow-hidden bg-blue-primary py-24 mt-[-2px]">
            <span className="block px-12 text-center font-noto text-3xl text-white-10 sm:text-4xl md:text-5xl lg:text-[64px]">
              Jejak Keberhasilan Kami
            </span>

            <ProjectShowcase
              period={content.showcase.period}
              title={content.showcase.title}
              description={content.showcase.description}
              italicWords={["Hot-mix", "Ready-mix", "Precast"]}
              imageSrc={content.showcase.imageSrc}
              projectValue={content.showcase.projectValue}
              projectLength={content.showcase.projectLength}
              projectSlug={content.showcase.projectSlug}
            />

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

              @media (min-width: 769px) {
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
              }
            `}</style>
          </section>
        </div>

        <div className="bg-white-10 w-full">
          <ContactForm />
        </div>

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
        <div className="flex justify-center pb-6 md:pb-12 w-full bg-white-10">
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
        </div> */}

        <Footer />
      </main>
      <FloatingWhatsAppButton />
    </div>
  );
}
