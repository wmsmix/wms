"use client";

import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Hero from "~/components/Hero";

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <div className="hero-container w-full overflow-hidden">
        <Hero
          backgroundImage="/images/img-404.png"
          mobileBackgroundImage="/images/img-hero-about.png"
          headline={`404\nSitus Proyek Tidak Ditemukan`}
          subheadline="Halaman yang Anda cari tidak dapat ditemukan, mungkin kami bisa membantu Anda kembali ke jalan utama."
          ctaText="KEMBALI KE BERANDA"
          ctaHref="/"
          showBreadcrumbs={false}
        />
      </div>

      <style jsx>{`
        .hero-container {
          position: relative;
          height: calc(700px * 0.95);
          overflow: hidden;
        }

        .hero-container :global(section) {
          position: absolute;
          top: -5%;
          left: 0;
          width: 100%;
        }

        .hero-container :global(h1) {
          white-space: pre-line;
        }

        @media (min-width: 640px) {
          .hero-container {
            height: calc(964px * 0.95);
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}
