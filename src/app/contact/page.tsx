"use client";

import React, { useState } from "react";
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    projectName: "",
    phone: "",
    location: "",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      projectName: "",
      phone: "",
      location: "",
      message: "",
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.company || !formData.projectName || 
        !formData.phone || !formData.location || !formData.message) {
      alert("Harap isi semua field sebelum mengirim pesan");
      return;
    }

    try {
      const message = `
*Pesan Baru dari Website*
Nama: ${formData.name}
Perusahaan: ${formData.company}
Nama Proyek: ${formData.projectName}
Nomor Telepon: ${formData.phone}
Lokasi Proyek: ${formData.location}
Detail Proyek: ${formData.message}
      `.trim();

      const phoneNumber = "6282337900700";
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setStatus("success");
      resetForm();
    } catch (error) {
      setStatus("error");
    }
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/6282337900700", "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    window.location.href = "mailto:halo@wmsmix.com";
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
      <Navbar />
      <span className="block text-center font-noto text-4xl text-black md:text-[64px] mt-36">
        Hubungi Kami
      </span>
      <div className="mx-auto w-full max-w-7xl">
        <div className="contact-form-container bg-white relative overflow-hidden">
          <div className="relative z-10 flex flex-wrap py-12">
            <div className="w-full p-6 sm:p-10 md:w-1/2 md:p-16">
              <div className="flex min-h-[600px] flex-col">
                {status === "idle" ? (
                  <>
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
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                          id="company"
                          type="text"
                          placeholder="NAMA PERUSAHAAN"
                          value={formData.company}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                          id="projectName"
                          type="text"
                          placeholder="NAMA PROYEK"
                          value={formData.projectName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                          id="phone"
                          type="tel"
                          placeholder="NOMOR TELEPON"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setFormData({
                              ...formData,
                              phone: value,
                            });
                          }}
                          pattern="[0-9]*"
                          inputMode="numeric"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                          id="location"
                          type="text"
                          placeholder="LOKASI PROYEK"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <textarea
                          className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm leading-tight text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none sm:text-base"
                          id="message"
                          placeholder="GAGASAN / RENCANA PROYEK / KONSULTASI BAHAN / APAPUN KEBUTUHAN ANDA"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="flex">
                        <a href="#" onClick={handleSubmit}>
                          <Button
                            text="KIRIM PESAN"
                            className="text-sm font-normal sm:text-lg md:text-xl"
                            clipPath={{
                              outer: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                              inner: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                            }}
                            margin="1px"
                            textSize="xl"
                          />
                        </a>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-1 items-center">
                    <div className="relative w-full">
                      {status === "success" ? (
                        <>
                          <h2 className="mb-4 text-4xl font-medium text-black">
                            Pesan Anda Berhasil Dikirim
                          </h2>
                          <p className="mb-8 text-lg text-gray-600">
                            Terima kasih telah mengubungi PT WMS. Mohon ditunggu,
                            admin kami akan segera membalas pesan Anda.
                          </p>
                          <Button
                            text="KEMBALI"
                            className="text-2xl font-normal sm:text-2xl"
                            clipPath={{
                              outer: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                              inner: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                            }}
                            margin="1px"
                            onClick={() => setStatus("idle")}
                          />
                        </>
                      ) : (
                        <>
                          <h2 className="mb-4 font-titillium text-4xl font-medium text-black">
                            Pesan Anda Gagal Dikirim
                          </h2>
                          <p className="mb-8 text-lg text-gray-600">
                            Mohon maaf, pesan Anda belum berhasil terkirim. Coba
                            isi formulir lagi atau hubungi kami di:
                          </p>
                          <div className="mb-8 flex flex-col gap-4">
                            <button
                              onClick={handleWhatsApp}
                              className="flex items-center gap-2 text-gray-600 hover:text-black"
                            >
                              <Image
                                src="/svgs/icon-whatsapp.svg"
                                alt="WhatsApp"
                                width={24}
                                height={24}
                              />
                              (+62) 823-3790-0700
                            </button>
                            <button
                              onClick={handleEmail}
                              className="flex items-center gap-2 text-gray-600 hover:text-black"
                            >
                              <Image
                                src="/svgs/icon-mail.svg"
                                alt="Email"
                                width={24}
                                height={24}
                              />
                              halo@wmsmix.com
                            </button>
                          </div>
                          <Button
                            text="ISI FORMULIR LAGI"
                            className="text-2xl font-normal sm:text-2xl"
                            clipPath={{
                              outer: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                              inner: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                            }}
                            margin="1px"
                            onClick={() => setStatus("idle")}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
