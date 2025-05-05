import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./commons/Button";

// Tambahkan komponen MapWithCustomMarker untuk peta kustom
const MapWithCustomMarker = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    const loadMap = async () => {
      if (
        typeof window === "undefined" ||
        !mapRef.current ||
        mapInstanceRef.current
      ) {
        return;
      }

      try {
        const L = await import("leaflet");

        // Tambahkan CSS Leaflet
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        const latitude = -7.011416668680984;
        const longitude = 112.13599997596744;

        // Tentukan zoom level berdasarkan lebar layar
        let zoomLevel = 15;
        if (typeof window !== 'undefined' && window.innerWidth < 640) {
          zoomLevel = 12;
        }

        // Buat peta dengan style yang mirip Google Maps
        const map = L.map(mapRef.current, {
          center: [latitude, longitude],
          zoom: zoomLevel,
          zoomControl: true,
          attributionControl: false,
        });

        // Gunakan Google Maps tile layer
        L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }).addTo(map);

        // Tambahkan marker dengan div marker kustom (tidak menggunakan scaling otomatis)
        const customHtmlIcon = L.divIcon({
          className: "custom-marker", // Tidak menggunakan class default Leaflet
          html: `<img src="images/img-marker.png" style="width: auto; height: auto; max-width: none;" alt="Marker" />`,
          iconSize: undefined, // Biarkan ukuran ditentukan oleh gambar asli
          iconAnchor: [25, 25], // Perkiraan pusat gambar
        });

        const marker = L.marker([latitude, longitude], {
          icon: customHtmlIcon,
          interactive: true,
          keyboard: true,
        }).addTo(map);

        // Tambahkan event untuk membuka Google Maps saat marker di klik
        marker.on("click", () => {
          window.open("https://maps.app.goo.gl/b73VAyRA2Hhi6JCn7", "_blank");
        });

        // Tambahkan style untuk marker kustom
        const style = document.createElement("style");
        style.textContent = `
          .custom-marker {
            background: none;
            border: none;
          }
          .custom-marker img {
            display: block;
            width: auto;
            height: auto;
            max-width: none;
            transform: translate(-50%, -50%) scale(0.7);
          }
        `;
        document.head.appendChild(style);

        // Tambahkan kotak info lokasi seperti di Google Maps dengan alamat WMS
        const locationInfoDiv = document.createElement("div");
        locationInfoDiv.innerHTML = `
          <div style="
            background: white; 
            padding: 10px; 
            border-radius: 2px; 
            box-shadow: 0 1px 4px rgba(0,0,0,0.3);
            margin-top: 10px;
            margin-left: 10px;
            font-family: Arial, sans-serif;
            min-width: 200px;
            max-width: 300px;
          ">
            <strong style="display: block; color: #333; font-size: 14px;">Aspal dan Beton PT. Wahana Makmur Sentosa</strong>
            <span style="color: #777; font-size: 12px;">Asphalt Mixing Plant (AMP), Batching Plant, Cement, Ready Mix, Hot Mix, Precast</span>
            <a href="https://maps.app.goo.gl/b73VAyRA2Hhi6JCn7" target="_blank" style="
              display: block;
              color: #1a73e8;
              font-size: 12px;
              margin-top: 5px;
              text-decoration: none;
            ">View larger map</a>
          </div>
        `;

        // Tambahkan control info lokasi menggunakan createCorner
        const infoContainer = L.DomUtil.create("div");
        infoContainer.appendChild(locationInfoDiv);

        // Secara manual tambahkan info lokasi ke sudut kiri atas
        const controlCorner = map
          .getContainer()
          .querySelector(".leaflet-top.leaflet-left");
        if (controlCorner) {
          controlCorner.appendChild(infoContainer);
        }

        mapInstanceRef.current = map;

        // Menambahkan attribution di pojok bawah kanan
        const attribution = L.control
          .attribution({
            position: "bottomright",
          })
          .addTo(map);
        attribution.setPrefix("");
        attribution.addAttribution("Map data ©2025 Google | Terms");
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    void loadMap();

    return () => {
      if (mapInstanceRef.current) {
        try {
          const map = mapInstanceRef.current as { remove: () => void };
          map.remove();
          mapInstanceRef.current = null;
        } catch (error) {
          console.error("Error removing map:", error);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ height: "100%", width: "100%", position: "relative" }}
    />
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    projectName: "",
    phone: "",
    location: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const handleWhatsApp = () => {
    window.open("https://wa.me/6282337900700", "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    window.location.href = "mailto:halo@wmsmix.com";
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="contact-form-container relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/img-bg-form.png"
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-wrap py-12">
          <div className="w-full p-6 sm:p-10 md:w-1/2 md:p-16">
            <div className="flex min-h-[600px] flex-col">
              {status === "idle" ? (
                <>
                  <span className="text-white-base mb-6 block text-base sm:text-lg md:text-xl">
                    Hubungi kami dan wujudkan proyek Anda. Lengkapi formulir di
                    bawah ini untuk memulai proses kerja sama.
                  </span>
                  <form className="mt-8">
                    <div className="mb-4">
                      <input
                        className="w-full appearance-none rounded-md border border-white-10 bg-transparent px-4 py-3 text-sm leading-tight text-white-10 placeholder-white-10 placeholder-opacity-70 focus:border-orange-500 focus:outline-none sm:text-base"
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
                        className="w-full appearance-none rounded-md border border-white-10 bg-transparent px-4 py-3 text-sm leading-tight text-white-10 placeholder-white-10 placeholder-opacity-70 focus:border-orange-500 focus:outline-none sm:text-base"
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
                        className="w-full appearance-none rounded-md border border-white-10 bg-transparent px-4 py-3 text-sm leading-tight text-white-10 placeholder-white-10 placeholder-opacity-70 focus:border-orange-500 focus:outline-none sm:text-base"
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
                        className="w-full appearance-none rounded-md border border-white-10 bg-transparent px-4 py-3 text-sm leading-tight text-white-10 placeholder-white-10 placeholder-opacity-70 focus:border-orange-500 focus:outline-none sm:text-base"
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
                        className="w-full appearance-none rounded-md border border-white-10 bg-transparent px-4 py-3 text-sm leading-tight text-white-10 placeholder-white-10 placeholder-opacity-70 focus:border-orange-500 focus:outline-none sm:text-base"
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
                        className="w-full appearance-none rounded-md border border-white-10 bg-transparent px-4 py-3 text-sm leading-tight text-white-10 placeholder-white-10 placeholder-opacity-70 focus:border-orange-500 focus:outline-none sm:text-base"
                        id="message"
                        placeholder="GAGASAN / RENCANA PROYEK / KONSULTASI BAHAN / APAPUN KEBUTUHAN ANDA"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="flex">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();

                          if (
                            !formData.name ||
                            !formData.company ||
                            !formData.projectName ||
                            !formData.phone ||
                            !formData.location ||
                            !formData.message
                          ) {
                            alert(
                              "Harap isi semua field sebelum mengirim pesan",
                            );
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

                            window.open(
                              whatsappUrl,
                              "_blank",
                              "noopener,noreferrer",
                            );
                            setStatus("success");
                            resetForm();
                          } catch (error) {
                            setStatus("error");
                          }
                        }}
                      >
                        <Button
                          text="KIRIM PESAN"
                          className="text-2xl font-normal lg:text-2xl"
                          clipPath={{
                            outer:
                              "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                            inner:
                              "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                          }}
                          margin="1px"
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
                        <h2 className="text-white mb-4 text-4xl font-medium">
                          Pesan Anda Berhasil Dikirim
                        </h2>
                        <p className="mb-8 text-lg text-[#CCCCCC]">
                          Terima kasih telah mengubungi PT WMS. Mohon ditunggu,
                          admin kami akan segera membalas pesan Anda.
                        </p>
                        <Button
                          text="KEMBALI"
                          className="text-2xl font-normal sm:text-2xl"
                          clipPath={{
                            outer:
                              "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                            inner:
                              "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                          }}
                          margin="1px"
                          onClick={() => setStatus("idle")}
                        />
                      </>
                    ) : (
                      <>
                        <h2 className="text-white mb-4 font-titillium text-4xl font-medium">
                          Pesan Anda Gagal Dikirim
                        </h2>
                        <p className="mb-8 text-lg text-[#CCCCCC]">
                          Mohon maaf, pesan Anda belum berhasil terkirim. Coba
                          isi formulir lagi atau hubungi kami di:
                        </p>
                        <div className="mb-8 flex flex-col gap-4">
                          <button
                            onClick={handleWhatsApp}
                            className="hover:text-white flex items-center gap-2 text-[#CCCCCC]"
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
                            className="hover:text-white flex items-center gap-2 text-[#CCCCCC]"
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
                            outer:
                              "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                            inner:
                              "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
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
              <MapWithCustomMarker />
            </div>
          </div>
        </div>

        <style jsx global>{`
          .contact-form-container {
            clip-path: polygon(
              4% 0%,
              96% 0%,
              100% 6%,
              100% 94%,
              96% 100%,
              4% 100%,
              0% 94%,
              0% 6%
            );
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
  );
};

export default ContactForm;
