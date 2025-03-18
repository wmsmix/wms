"use client";

import React from "react";
import Image from "next/image";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";
import Button from "~/components/commons/Button";
import NewsGrid from "~/components/NewsGrid";
import ProjectShowcase from "~/components/ProjectShowcase";
import ProductHero from "~/components/Product/ProductHero";
import ClippedSection from "~/components/ClippedSection";
import PrecastFeatures from "~/components/PrecastFeatures";
import CardProduct from "~/components/CardProduct";

export default function AspalProductPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />
      <span className="block text-center font-noto text-4xl text-black md:text-[64px] mt-36">
        Produk Kami
      </span>
      <div className="mx-auto w-full max-w-7xl">
        <div className="contact-form-container bg-white relative overflow-hidden">
          <div className="relative z-10 flex flex-wrap py-12">
            <div className="w-full p-6 sm:p-10 md:w-1/2 md:p-16">
              <span className="mb-6 block text-base text-black sm:text-lg md:text-xl">
                Hubungi kami dan wujudkan proyek Anda. Lengkapi formulir di
                bawah ini untuk memulai proses kerja sama.
              </span>
              <form className="mt-8">
                <div className="mb-4">
                  <input
                    className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                    id="name"
                    type="text"
                    placeholder="NAMA ANDA"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                    id="company"
                    type="text"
                    placeholder="NAMA PERUSAHAAN"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                    id="phone"
                    type="tel"
                    placeholder="+62 NOMOR ANDA"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                    id="location"
                    type="text"
                    placeholder="LOKASI PROYEK"
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                    id="project"
                    placeholder="GAGASAN / RENCANA PROYEK / KONSULTASI BAHAN / APAPUN KEBUTUHAN ANDA"
                    rows={4}
                  ></textarea>
                </div>
                <div className="flex">
                  <Button
                    text="KIRIM KE WHATSAPP WMS"
                    className="text-sm font-normal sm:text-lg md:text-xl"
                  />
                </div>
              </form>
            </div>

            <div className="relative w-full p-6 sm:p-10 md:w-1/2 md:py-24 md:pe-12">
              <div className="h-[300px] w-full md:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4996.3833551630405!2d112.13599997596744!3d-7.011416668680984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77916b161d4a63%3A0xc79b36e52315d7d!2sAspal%20dan%20Beton%20PT.%20Wahana%20Makmur%20Sentosa%20(Asphalt%20Mixing%20Plant%20(AMP)%2C%20Batching%20Plant%2C%20Cement%2C%20Ready%20Mix%2C%20Hot%20Mix%2C%20Precast)!5e1!3m2!1sid!2sid!4v1741960336476!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <style jsx global>{`
            .contact-form-container {
              clip-path: polygon(
                8% 0%,
                92% 0%,
                100% 8%,
                100% 92%,
                92% 100%,
                8% 100%,
                0% 92%,
                0% 8%
              );
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            @media (max-width: 768px) {
              .contact-form-container {
                clip-path: polygon(
                  4% 0%,
                  96% 0%,
                  100% 4%,
                  100% 96%,
                  96% 100%,
                  4% 100%,
                  0% 96%,
                  0% 4%
                );
              }
            }
          `}</style>
        </div>
      </div>
      <Footer />
    </div>
  );
}
