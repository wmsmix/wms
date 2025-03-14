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
    <div className="text-white-10 min-h-screen bg-black font-titillium">
      <Navbar />

      <main className="mt-[-48px] flex min-h-screen flex-col items-center justify-center">
        <Hero
          backgroundImage="/images/home-background.png"
          headline="Aspal & Beton Terbaik, Dirancang oleh Ahli Konstruksi"
          subheadline="PT Wahana Makmur Sentosa (WMS) adalah pabrik aspal dan beton di Jawa Timur yang telah bersertifikasi SLO dan diakui Kementerian PUPR. Dengan teknologi modern, WMS siap menyajikan produk dengan kualitas tertinggi."
          ctaText="Lihat Produk"
        />
        <span className="text-white-10 block px-96 py-24 text-center font-noto text-[64px]">
          Berpengalaman, Terpercaya, dan Ahli di Bidangnya
        </span>
        <div className="mt-8 flex w-full max-w-6xl flex-wrap justify-between gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center text-center sm:w-[48%] md:w-[30%]"
            >
              {/* Icon dengan lingkaran */}
              <div className="bg-white-10 relative flex h-20 w-20 items-center justify-center rounded-full">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={50}
                  height={44}
                />
              </div>
              {/* Judul Sertifikat */}
              <h3 className="mt-4 whitespace-pre-line text-2xl font-normal">
                {cert.title}
              </h3>
              {/* Subtitle */}
              <p className="mt-2 text-lg opacity-70">{cert.subtitle}</p>
            </div>
          ))}
        </div>
        <Labels />
        <div
          className="bg-white-10 flex w-full flex-col items-center py-8"
          style={{
            clipPath:
              "polygon(8% 0%, 92% 0%, 100% 4%, 100% 100%, 92% 100%, 8% 100%, 0% 100%, 0% 4%)",
          }}
        >
          <span className="block text-center font-noto text-[64px] text-black">
            Produk Kami
          </span>
          <div className="mt-16 flex w-full flex-wrap justify-center gap-8">
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
          {/* New Component: Image and Text */}
          <div className="mt-24 flex w-full">
            <div className="flex w-1/2 flex-col justify-center px-16">
              <h2 className="mb-4 text-5xl font-semibold text-black">
                Sertifikasi Lengkap dan Berpengalaman
              </h2>
              <p className="text-[20px] text-gray-500">
                Seluruh produk dan layanan memenuhi standar tertinggi melalui
                sertifikasi oleh Kementrian Pekerjaan Umum dan Perumahan Rakyat
                (PUPR), Kementrian Perindustrian dan Lembaga Lainnya.
              </p>
            </div>
            <div className="relative h-[500px] w-1/2">
              <Image
                src="/images/img-sertifikasi.png"
                alt="Aspal"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="relative h-[500px] w-1/2">
              <Image
                src="/images/img-harga-bersaing.png"
                alt="Aspal"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex w-1/2 flex-col justify-center px-16">
              <h2 className="mb-4 text-5xl font-semibold text-black">
                Harga Bersaing, Mutu Terjamin
              </h2>
              <p className="text-[20px] text-gray-500">
                Produk aspal dan beton kami telah teruji kualitasnya dan mampu
                memberikan hasil akhir yang kokoh dan tahan lama. Investasikan
                pada produk berkualitas untuk proyek Anda.
              </p>
            </div>
          </div>
          <div className="bg-blue-primary flex w-full">
            <div className="bg-blue flex w-1/2 flex-col justify-center px-16">
              <h2 className="text-white-10 mb-4 text-5xl font-semibold">
                Peralatan dan Pelayanan Lengkap, Order Kapanpun
              </h2>
              <p className="text-white-10 text-[20px]">
                Dari berbagai macam pilihan produk aspal dan beton, penyediaan
                jasa gelar aspal, pengecoran beton, hingga penyediaan support
                letter. WMS siap melayani dari awal hingga akhir proses proyek
                Anda.
              </p>
            </div>
            <div className="relative h-[500px] w-1/2">
              <Image
                src="/images/img-peralatan.png"
                alt="Aspal"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div
            className="bg-blue-primary flex w-full flex-col items-center py-24"
            style={{
              clipPath:
                "polygon(0% 0%, 92% 0%, 100% 0%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 4%)",
            }}
          >
            <span className="text-white-10 block text-center font-noto text-[64px]">
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
          </div>
        </div>
        <div className="bg-white-10 flex w-full flex-col items-center py-24">
          <span className="mb-16 block text-center font-noto text-[64px] text-black">
            Siap Bangun <br /> Infrastruktur Berkualitas ?
          </span>
          <ContactForm />
        </div>
        <div className="bg-white-10 flex w-full flex-col items-center py-24">
          <span className="mb-16 block text-center font-noto text-[64px] text-black">
            Lihat Proyek WMS
          </span>
          
          <ProjectsGrid />
        </div>
        <div className="bg-white-10 flex w-full flex-col items-center py-24">
          <span className="mb-16 block text-center font-noto text-[64px] text-black">
            Kabar Proyek WMS
          </span>
          
          <NewsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
