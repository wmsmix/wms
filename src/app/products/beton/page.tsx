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

export default function AspalProductPage() {
  const handleWhatsAppClick = (productName: string) => {
    const phoneNumber = "6282337900700"; // Nomor WhatsApp PT WMS
    const message = `Halo, saya tertarik dengan produk ${productName}. Boleh minta informasi lebih lanjut?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />

      <ProductHero
        title="Beton (Ready-Mix)"
        description="Campuran material agregat (batu-batuan) dengan aspal dalam keadaan panas. Campuran ini kemudian dipadatkan menjadi lapisan jalan yang kuat dan tahan lama."
        imageSrc="/images/img-hero-beton.png"
        buttonText="TANYA LEBIH LANJUT"
        onButtonClick={() => {
          window.location.href = "/contact";
        }}
      />

      <div className="px-4 pt-12 md:px-8 md:pt-24">
        <section className="text-white clip-bottom-corners relative w-full overflow-hidden pb-48">
          <span className="block px-12 text-center font-noto text-xl text-black sm:text-4xl md:text-5xl lg:text-[48px]">
            Beton Non-Struktural
          </span>

          <ProjectShowcase
            period="Beton Fc' 10"
            title="= K 150, 10 MPa"
            description="Beton ini ideal untuk aplikasi non-struktural. Sering digunakan sebagai lantai kerja pada pembangunan jalan dan fondasi, serta sebagai lapisan perata yang hanya menanggung beban ringan."
            imageSrc="/images/img-jejak.png"
            descriptionColor="text-black"
            projectValue="10 MPa"
            textColor="text-black"
            valueColor="text-white-10"
            labelColor="text-blue-primary"
            bgLabelColor="bg-blue-primary"
            projectLabel="Kekuatan Tekan Fc'"
            showProjectLength={false}
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
          `}</style>
        </section>
      </div>
      <div
        className="flex w-screen max-w-full flex-col items-center bg-black py-24"
        style={{
          clipPath:
            "polygon(8% 0%, 92% 0%, 100% 36%, 100% 100%, 96% 100%, 4% 100%, 0% 100%, 0% 36%)",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        <span className="block px-4 text-center font-noto text-3xl text-white-10 md:text-4xl lg:text-5xl">
          Beton Jalan
        </span>
      </div>
      <div>
        <div className="flex w-full flex-col bg-black md:flex-row">
          <div className="relative order-1 h-[250px] w-full md:h-[500px] md:w-1/2">
            <Image
              src="/images/img-beton-jalan-1.png"
              alt="Harga Bersaing"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-2 flex w-full flex-col justify-center px-6 py-8 md:w-1/2 md:px-16">
            <h2 className="mb-4 text-2xl font-semibold text-white-10 md:text-3xl md:text-4xl lg:text-5xl">
              Beton Fc&apos; 15 = K 200, 15 MPa
            </h2>
            <p className="text-sm text-white-20 opacity-70 md:text-base md:text-lg lg:text-[20px]">
              Ideal untuk sub-base pada jalan perumahan, trotoar, dan jalan
              lokal. Selain itu, juga sebagai pelapisan sementara selama proses
              pembangunan jalan berlangsung.
            </p>
            <div className="flex justify-start pt-6 md:pt-8">
              <Button
                text="PILIH BETON INI"
                height="40px"
                textSize="xl"
                className="text-sm md:text-lg"
                onClick={() => handleWhatsAppClick("Beton Fc' 15 = K 200, 15 MPa")}
                clipPath={{
                  outer:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                  inner:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                }}
                margin="1px"
              />
            </div>
          </div>
        </div>
        <div className="clip-bottom-corners flex w-full flex-col bg-blue-primary md:flex-row">
          <div className="order-2 flex w-full flex-col justify-center px-6 py-8 md:order-1 md:w-1/2 md:px-16">
            <h2 className="mb-4 text-2xl font-semibold text-white-10 md:text-3xl md:text-4xl lg:text-5xl">
              Beton Fc&apos; 20 = K 250, 20 MPa
            </h2>
            <p className="text-sm text-white-20 opacity-70 md:text-base md:text-lg lg:text-[20px]">
              Dirancang untuk pavement ringan pada jalan perumahan atau
              komersial, dan sebagai sub-base pada jalan raya yang menanggung
              lalu lintas dengan intensitas sedang.
            </p>
            <div className="flex justify-start pt-6 md:pt-8">
              <Button
                text="PILIH BETON INI"
                height="40px"
                textSize="xl"
                className="text-sm md:text-lg"
                onClick={() => handleWhatsAppClick("Beton Fc' 20 = K 250, 20 MPa")}
                clipPath={{
                  outer:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                  inner:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                }}
                margin="1px"
              />
            </div>
          </div>
          <div className="relative order-1 h-[250px] w-full md:order-2 md:h-[500px] md:w-1/2">
            <Image
              src="/images/img-beton-jalan-2.png"
              alt="Sertifikasi"
              fill
              className="object-cover"
            />
          </div>
        </div>
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
                100% 100%,
                100% 100%,
                0% 100%,
                0% 100%
              );
            }
          }
        `}</style>
      </div>
      <span className="mt-24 block px-12 text-center font-noto text-3xl text-black sm:text-4xl md:text-5xl lg:text-[48px]">
        Beton Struktural & Infrastruktur
      </span>
      <div className="mt-24 flex w-full flex-col md:flex-row">
        <div className="relative order-1 h-[300px] w-full md:h-[500px] md:w-1/2">
          <Image
            src="/images/img-beton-struktural-1.png"
            alt="Harga Bersaing"
            fill
            className="object-cover"
          />
        </div>
        <div className="order-2 flex w-full flex-col justify-center bg-white-20 px-6 py-8 md:w-1/2 md:px-16">
          <h2 className="mb-4 text-3xl font-semibold text-black md:text-4xl lg:text-5xl">
            Beton Fc&apos; 25 = K 300, 25 MPa
          </h2>
          <p className="text-base text-gray-500 md:text-lg lg:text-[20px]">
            Dirancang untuk aplikasi struktural seperti fondasi, kolom, dan
            balok pada gedung bertingkat. Kekuatan optimalnya tepat untuk
            konstruksi bangunan di kawasan perkotaan dan industri.
          </p>
          <div className="flex justify-start pt-6 md:pt-8">
            <Button
              text="PILIH BETON INI"
              height="40px"
              textSize="xl"
              className="text-sm md:text-lg"
              onClick={() => handleWhatsAppClick("Beton Fc' 25 = K 300, 25 MPa")}
              clipPath={{
                outer:
                  "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                inner:
                  "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
              }}
              margin="1px"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <div className="order-2 flex w-full flex-col justify-center bg-white-20 px-6 py-8 md:order-1 md:w-1/2 md:px-16">
          <h2 className="mb-4 text-3xl font-semibold text-black md:text-4xl lg:text-5xl">
            Beton Fc&apos; 30 = K 350, 30 MPa
          </h2>
          <p className="text-base text-gray-500 md:text-lg lg:text-[20px]">
            Digunakan untuk proyek infrastruktur berat seperti jembatan, jalan
            tol, pelabuhan, dan struktur bertingkat tinggi. Daya tahannya
            tinggi, dengan stabilitas dan kekuatan jangka panjang sesuai untuk
            konstruksi kompleks.
          </p>
          <div className="flex justify-start pt-6 md:pt-8">
            <Button
              text="PILIH BETON INI"
              height="40px"
              textSize="xl"
              className="text-sm md:text-lg"
              onClick={() => handleWhatsAppClick("Beton Fc' 30 = K 350, 30 MPa")}
              clipPath={{
                outer:
                  "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                inner:
                  "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
              }}
              margin="1px"
            />
          </div>
        </div>
        <div className="relative order-1 h-[300px] w-full md:order-2 md:h-[500px] md:w-1/2">
          <Image
            src="/images/img-beton-struktural-2.png"
            alt="Sertifikasi"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <ClippedSection
        title="Campuran Aspal dan Beton Khusus"
        description="Campuran aspal dan beton yang dirancang untuk efisiensi biaya tanpa mengurangi kualitas maupun spesifikasi proyek"
        buttonText="PILIH PRODUK INI"
        topBgColor="bg-white-10"
        bottomBgColor="bg-white-10"
        clipPathBgColor="bg-blue-primary"
      />
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
          className="text-sm md:text-lg"
          clipPath={{
            outer:
              "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
            inner:
              "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
          }}
        />
      </div>
      <Footer />
    </div>
  );
}
