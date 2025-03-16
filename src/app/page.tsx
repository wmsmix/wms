"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "~/components/Button";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import Labels from "~/components/Label";
import CardProduct from "~/components/CardProduct";
import ProjectShowcase from "~/components/ProjectShowcase";
import ContactForm from "~/components/ContactForm";
import ProjectsGrid from "~/components/ProjectsGrid";
import NewsGrid from "~/components/NewsGrid";

const certifications = [
  {
    title: "Sertifikat ISO",
    subtitle: "Mandala Certification",
    image: "/images/img-mandala.png",
  },
  {
    title: "Sertifikat Tingkat\nKomponen Dalam negeri",
    subtitle: "Kementerian Perindustrian",
    image: "/images/img-kemendustri.png",
  },
  {
    title: "Surat Keterangan\nKelayakan Operasi",
    subtitle: "Kementerian PUPR",
    image: "/images/img-kemenpupr.png",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black font-titillium text-white-10">
      <Navbar />

      <main className="mt-[-48px] flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden">
        <Hero
          backgroundImage="/images/home-background.png"
          headline="Aspal & Beton Terbaik, Dirancang oleh Ahli Konstruksi"
          subheadline="PT Wahana Makmur Sentosa (WMS) adalah pabrik aspal dan beton di Jawa Timur yang telah bersertifikasi SLO dan diakui Kementerian PUPR. Dengan teknologi modern, WMS siap menyajikan produk dengan kualitas tertinggi."
          ctaText="Lihat Produk"
        />
        <span className="mx-auto block max-w-[90vw] py-24 text-center font-noto text-[40px] text-white-10 sm:max-w-4xl sm:text-[64px]">
          Berpengalaman, Terpercaya, dan Ahli di Bidangnya
        </span>
        <div className="mx-auto mt-8 grid w-full max-w-[90vw] grid-cols-1 gap-8 px-4 sm:max-w-5xl sm:grid-cols-2 md:grid-cols-3">
          {certifications.map((cert, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white-10">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={50}
                  height={44}
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
          <span className="block text-center font-noto text-4xl text-black md:text-[64px]">
            Produk Kami
          </span>
          <div className="mt-16 flex w-full flex-wrap justify-center gap-8 px-6 sm:px-0">
            <CardProduct
              imageSrc="/images/img-product-aspal.png"
              title="Aspal"
              italicText="Hot-Mix"
              description="Produk laston yang dirancang untuk memberikan daya tahan, fleksibilitas, dan performa maksimal pada berbagai infrastruktrur"
            />
            <CardProduct
              imageSrc="/images/img-product-beton.png"
              title="Beton"
              italicText="Ready-Mix"
              description="Memiliki tipe dengan kekuatan tekan 10 MPa hingga 30 MPa, dimana tiap tipe dirancang untuk kebutuhan konstruksi ringan hingga proyek infrastruktur berat. "
            />
            <CardProduct
              imageSrc="/images/img-product-precast.png"
              title="Paving"
              italicText="Block"
              description="Produk beton pracetak dengan berbagai bentuk dan ukuran. Dirancang untuk saluran air, pembatas jalan, taman, trotoar, dll."
            />
          </div>
          <div className="mt-24 flex w-full flex-col md:flex-row">
            <div className="order-2 flex w-full flex-col justify-center px-6 py-8 md:order-1 md:w-1/2 md:px-16">
              <h2 className="mb-4 text-3xl font-semibold text-black md:text-4xl lg:text-5xl">
                Sertifikasi Lengkap dan Berpengalaman
              </h2>
              <p className="text-base text-gray-500 md:text-lg lg:text-[20px]">
                Seluruh produk dan layanan memenuhi standar tertinggi melalui
                sertifikasi oleh Kementrian Pekerjaan Umum dan Perumahan Rakyat
                (PUPR), Kementrian Perindustrian dan Lembaga Lainnya.
              </p>
            </div>
            <div className="relative order-1 h-[300px] w-full md:order-2 md:h-[500px] md:w-1/2">
              <Image
                src="/images/img-sertifikasi.png"
                alt="Sertifikasi"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex w-full flex-col md:flex-row">
            <div className="relative order-1 h-[300px] w-full md:h-[500px] md:w-1/2">
              <Image
                src="/images/img-harga-bersaing.png"
                alt="Harga Bersaing"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-2 flex w-full flex-col justify-center px-6 py-8 md:w-1/2 md:px-16">
              <h2 className="mb-4 text-3xl font-semibold text-black md:text-4xl lg:text-5xl">
                Harga Bersaing, Mutu Terjamin
              </h2>
              <p className="text-base text-gray-500 md:text-lg lg:text-[20px]">
                Produk aspal dan beton kami telah teruji kualitasnya dan mampu
                memberikan hasil akhir yang kokoh dan tahan lama. Investasikan
                pada produk berkualitas untuk proyek Anda.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col bg-blue-primary md:flex-row">
            <div className="bg-blue order-2 flex w-full flex-col justify-center px-6 py-8 md:order-1 md:w-1/2 md:px-16">
              <h2 className="mb-4 text-3xl font-semibold text-white-10 md:text-4xl lg:text-5xl">
                Peralatan dan Pelayanan Lengkap, Order Kapanpun
              </h2>
              <p className="text-base text-white-10 md:text-lg lg:text-[20px]">
                Dari berbagai macam pilihan produk aspal dan beton, penyediaan
                jasa gelar aspal, pengecoran beton, hingga penyediaan support
                letter. WMS siap melayani dari awal hingga akhir proses proyek
                Anda.
              </p>
            </div>
            <div className="relative order-1 h-[300px] w-full md:order-2 md:h-[500px] md:w-1/2">
              <Image
                src="/images/img-peralatan.png"
                alt="Peralatan"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <section className="text-white clip-bottom-corners relative w-full overflow-hidden bg-blue-primary py-24">
            <span className="block px-12 text-center font-noto text-3xl text-white-10 sm:text-4xl md:text-5xl lg:text-[64px]">
              Jejak Keberhasilan Kami
            </span>

            <ProjectShowcase
              period="(2022-2024)"
              title="Jalan Lingkar Tuban"
              description="Pembangunan Jalan Lingkar Tuban yang berlokasi di Desa Prunggahan Kulon, Tuban, sepanjang 7,98 km. Ruang lingkup WMS berada pada penyediaan dan aplikasi material konstruksi Aspal Hot-mix, Beton Ready-mix, dan Beton Precast."
              imageSrc="/images/img-jejak.png"
              projectValue="103M"
              projectLength="7.98 KM"
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
          <div className="flex w-full flex-col items-center bg-white-10 py-24">
            <span className="mb-16 block text-center font-noto text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px]">
              Siap Bangun <br /> Infrastruktur Berkualitas ?
            </span>
            <ContactForm />
          </div>
          <div className="flex w-full flex-col items-center bg-white-10 pb-24">
            <span className="mb-16 block text-center font-noto text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px]">
              Lihat Proyek WMS
            </span>

            <ProjectsGrid />
          </div>
          <div className="flex w-full flex-col items-center bg-white-10 pb-24">
            <span className="mb-16 block text-center font-noto text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px]">
              Kabar Proyek WMS
            </span>

            <NewsGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
