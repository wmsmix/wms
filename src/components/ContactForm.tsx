import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./commons/Button";

// Tambahkan komponen MapWithCustomMarker untuk peta kustom
export const MapWithCustomMarker = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    // Bersihkan peta saat component unmount
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

        // Pastikan tidak ada peta yang ada sebelumnya
        if (mapRef.current) {
          // Bersihkan anak node dan clear instanceRef
          while (mapRef.current.firstChild) {
            mapRef.current.removeChild(mapRef.current.firstChild);
          }
          
          if (mapInstanceRef.current) {
            try {
              const mapToRemove = mapInstanceRef.current as { remove: () => void };
              mapToRemove.remove();
            } catch (error) {
              console.error("Failed to remove previous map:", error);
            }
            mapInstanceRef.current = null;
          }
        }

        // Tambahkan CSS Leaflet hanya jika belum ada
        if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
        }

        const latitude = -7.011416668680984;
        const longitude = 112.13599997596744;
        const googleMapsUrl = "https://maps.app.goo.gl/4tV3HrHdzRv7mxcx8";
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        // Tentukan zoom level berdasarkan lebar layar
        let zoomLevel = 15;
        if (typeof window !== "undefined" && window.innerWidth < 640) {
          zoomLevel = 12;
        }

        // Buat peta dengan style yang mirip Google Maps
        const map = L.map(mapRef.current, {
          center: [latitude, longitude],
          zoom: zoomLevel,
          zoomControl: true, // Aktifkan zoom control bawaan
          attributionControl: false,
          scrollWheelZoom: false, // Nonaktifkan scroll wheel zoom standar
        });

        // Pindahkan zoom control ke pojok kanan bawah
        map.zoomControl.setPosition("bottomright");

        // Tambahkan style untuk indikator zoom
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
          .location-info-box {
            background: rgba(255, 255, 255, 0.9); 
            padding: 10px; 
            border-radius: 2px; 
            box-shadow: 0 1px 4px rgba(0,0,0,0.3);
            margin-top: 10px;
            margin-left: 10px;
            font-family: var(--font-titillium-web), sans-serif;
            min-width: 200px;
            max-width: 300px;
          }
          .location-title-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          .location-title {
            color: #333; 
            font-size: 14px;
            font-weight: bold;
          }
          .location-directions-inline {
            display: inline-flex;
            align-items: center;
            color: #1a73e8;
            width: 24px;
            height: 24px;
            padding: 0;
            margin-left: 5px;
            border: none;
            background: none;
            cursor: pointer;
            vertical-align: middle;
          }
          .location-directions-inline svg {
            fill: #1a73e8;
            width: 24px;
            height: 24px;
          }
          .location-directions-inline:hover svg {
            fill: #185abc;
          }
          .location-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          .location-subtitle {
            color: #777; 
            font-size: 12px;
            display: block;
            margin-bottom: 5px;
          }
          .location-link {
              display: block;
              color: #1a73e8;
              font-size: 12px;
              margin-top: 5px;
              text-decoration: none;
            cursor: pointer;
          }
          .location-link:hover {
            text-decoration: underline;
          }
          /* Override Leaflet's default position for zoom control */
          .leaflet-control-zoom {
            margin-bottom: 30px !important;
          }
          /* Custom position untuk attribution di bawah zoom control */
          .custom-attribution {
            position: absolute;
            right: 10px;
            bottom: 8px;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.7);
            padding: 0 5px;
            font-size: 10px;
            border-radius: 2px;
            font-family: Arial, sans-serif;
            color: #333;
          }
          .zoom-hint {
            display: none; /* Sembunyikan hint statis */
          }
          .zoom-level-indicator {
            position: absolute;
            bottom: 100px;
            right: 10px;
            background: rgba(255, 255, 255, 0.9);
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
          }
          .zoom-level-indicator.visible {
            opacity: 1;
          }
          .map-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
            z-index: 999;
          }
          .map-overlay.active {
            opacity: 1;
          }
          .map-overlay-content {
            background: rgba(255, 255, 255, 0.9);
            padding: 12px 16px;
            border-radius: 6px;
            text-align: center;
            max-width: 80%;
            color: black;
            font-family: var(--font-titillium-web), sans-serif;
          }
          .shortcut-key {
            display: inline-block;
            padding: 2px 5px;
            background: #eee;
            border-radius: 3px;
            margin: 0 2px;
            font-weight: bold;
            border: 1px solid #ccc;
          }
        `;
        document.head.appendChild(style);

        // Custom control untuk info lokasi
        const LocationInfoControl = L.Control.extend({
          options: {
            position: "topleft",
          },

          onAdd: function () {
            const container = L.DomUtil.create("div", "location-info-box");

            // Buat container untuk judul dan ikon direction
            const titleContainer = L.DomUtil.create("div", "location-container", container);
            
            const title = L.DomUtil.create(
              "strong",
              "location-title",
              titleContainer
            );
            title.innerHTML = "Aspal dan Beton PT. Wahana Makmur Sentosa";
            
            // Tambahkan ikon direction inline di sebelah kanan judul
            const inlineDirectionLink = L.DomUtil.create("a", "location-directions-inline", titleContainer);
            inlineDirectionLink.href = directionsUrl;
            inlineDirectionLink.target = "_blank";
            inlineDirectionLink.title = "Get directions";
            inlineDirectionLink.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.43 10.59l-9.01-9.01c-.75-.75-2.07-.76-2.83 0l-9 9c-.78.78-.78 2.04 0 2.82l9 9c.39.39.9.58 1.41.58.51 0 1.02-.19 1.41-.58l8.99-8.99c.79-.76.8-2.02.03-2.82zm-10.42 10.4l-9-9 9-9 9 9-9 9z"/>
                <path d="M8 11v4h2v-3h4v2.5l3.5-3.5-3.5-3.5v2.5h-6z"/>
              </svg>
            `;
            
            const subtitle = L.DomUtil.create(
              "span",
              "location-subtitle",
              container
            );
            subtitle.innerHTML =
              "Asphalt Mixing Plant (AMP), Batching Plant, Cement, Ready Mix, Hot Mix, Precast";
               
            const viewLargerLink = L.DomUtil.create(
              "a",
              "location-link",
              container
            );
            viewLargerLink.innerHTML = "View larger map";
            viewLargerLink.href = googleMapsUrl;
            viewLargerLink.target = "_blank";

            // Pastikan click tidak menjalar ke peta
            L.DomEvent.disableClickPropagation(container);

            return container;
          },
        });

        // Tambahkan control ke peta
        map.addControl(new LocationInfoControl());

        // Buat elemen attribution kustom
        setTimeout(() => {
          const customAttribution = document.createElement('div');
          customAttribution.className = 'custom-attribution';
          customAttribution.innerHTML = 'Map data ©2025 Google | Terms';
          
          // Tambahkan ke container peta
          const mapContainer = map.getContainer();
          mapContainer.appendChild(customAttribution);
        }, 100);

        // Variable untuk mencegah zoom terlalu cepat
        let isZooming = false;

        // Aktifkan fitur keyboard + scroll
        const enableKeyboardScroll = () => {
          const mapEl = map.getContainer();

          // Tambahkan indikator level zoom
          const zoomLevelIndicator = document.createElement("div");
          zoomLevelIndicator.className = "zoom-level-indicator";
          zoomLevelIndicator.textContent = `Zoom: ${map.getZoom().toFixed(1)}`;
          mapEl.appendChild(zoomLevelIndicator);

          // Buat overlay untuk shortcut yang ditampilkan saat hold
          const overlay = document.createElement("div");
          overlay.className = "map-overlay";

          const overlayContent = document.createElement("div");
          overlayContent.className = "map-overlay-content";
          overlayContent.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">Shortcut Zoom Maps</div>
            <div><span class="shortcut-key">Ctrl/⌘</span> + <span class="shortcut-key">↑ Scroll</span> = Zoom In (Perbesar)</div>
            <div><span class="shortcut-key">Ctrl/⌘</span> + <span class="shortcut-key">↓ Scroll</span> = Zoom Out (Perkecil)</div>
            <div style="margin-top: 8px; font-size: 12px; opacity: 0.8;">Lepaskan untuk menutup</div>
          `;

          overlay.appendChild(overlayContent);
          mapEl.appendChild(overlay);

          // Tampilkan overlay saat mousedown pada peta
          let holdTimer: number | null = null;

          mapEl.addEventListener("mousedown", () => {
            holdTimer = window.setTimeout(() => {
              overlay.classList.add("active");
            }, 300); // Tampilkan setelah hold 300ms
          });

          // Juga tampilkan pada touch devices
          mapEl.addEventListener("touchstart", () => {
            holdTimer = window.setTimeout(() => {
              overlay.classList.add("active");
            }, 300);
          });

          // Sembunyikan overlay saat mouseup atau mouseout
          const hideOverlay = () => {
            if (holdTimer) {
              clearTimeout(holdTimer);
              holdTimer = null;
            }
            overlay.classList.remove("active");
          };

          mapEl.addEventListener("mouseup", hideOverlay);
          mapEl.addEventListener("mouseleave", hideOverlay);
          mapEl.addEventListener("touchend", hideOverlay);
          mapEl.addEventListener("touchcancel", hideOverlay);

          // Fungsi untuk menampilkan indikator zoom
          const showZoomLevel = (level: number) => {
            zoomLevelIndicator.textContent = `Zoom: ${level.toFixed(1)}`;
            zoomLevelIndicator.classList.add("visible");

            // Sembunyikan setelah 1.5 detik
            setTimeout(() => {
              zoomLevelIndicator.classList.remove("visible");
            }, 1500);
          };

          // Event listener untuk zoom yang berubah
          map.on("zoomend", () => {
            showZoomLevel(map.getZoom());
          });

          // Pastikan juga keyboard zoom berfungsi dengan baik
          const handleZoomWithKeys = (e: KeyboardEvent) => {
            if (!mapRef.current || isZooming) return;

            // Zoom OUT dengan tombol + (dibalik)
            if (e.key === "=" || e.key === "+") {
              isZooming = true;
              const currentZoom = map.getZoom();
              const newZoom = Math.max(
                Math.floor(currentZoom) - 1,
                map.getMinZoom(),
              );
              map.setZoom(newZoom, { animate: true });
              showZoomLevel(newZoom);

              // Setelah 300ms, izinkan zoom lagi
              setTimeout(() => {
                isZooming = false;
              }, 300);
            }

            // Zoom IN dengan tombol - (dibalik)
            if (e.key === "-" || e.key === "_") {
              isZooming = true;
              const currentZoom = map.getZoom();
              const newZoom = Math.min(
                Math.ceil(currentZoom) + 1,
                map.getMaxZoom(),
              );
              map.setZoom(newZoom, { animate: true });
              showZoomLevel(newZoom);

              // Setelah 300ms, izinkan zoom lagi
              setTimeout(() => {
                isZooming = false;
              }, 300);
            }
          };

          // Tambahkan keyboard zoom handler
          document.addEventListener("keydown", handleZoomWithKeys);

          // Tambahkan event listener untuk mousewheel/wheel secara cross-browser
          const handleMouseWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
              if (isZooming) return; // Jangan zoom jika masih dalam timeout
              isZooming = true;

              e.preventDefault();
              e.stopPropagation();

              // Normalisasi delta untuk berbagai browser
              let delta = e.deltaY;

              // Untuk Firefox yang menggunakan satuan baris
              if (e.deltaMode === 1) {
                delta *= 30; // Sekitar 30px per baris
              }

              // DIBALIK: scroll up (deltaY < 0) = memperkecil, scroll down (deltaY > 0) = memperbesar
              // deltaY < 0 berarti scroll up, deltaY > 0 berarti scroll down

              // Dapatkan zoom level saat ini
              const currentZoom = map.getZoom();
              let newZoom;

              if (delta < 0) {
                // Scroll up = zoom out (memperkecil) - satu level
                newZoom = Math.floor(currentZoom) - 1;
              } else {
                // Scroll down = zoom in (memperbesar) - satu level
                newZoom = Math.ceil(currentZoom) + 1;
              }

              // Batasi nilai zoom
              newZoom = Math.max(
                Math.min(newZoom, map.getMaxZoom()),
                map.getMinZoom(),
              );

              // Terapkan zoom
              map.setZoom(newZoom, { animate: true });
              showZoomLevel(newZoom);

              // Setelah 500ms, izinkan zoom lagi
              setTimeout(() => {
                isZooming = false;
              }, 500);
            }
          };

          // Gunakan nama fungsi reference untuk unregister jika perlu
          mapEl.addEventListener("wheel", handleMouseWheel, { passive: false });
          mapEl.addEventListener(
            "mousewheel",
            handleMouseWheel as EventListener,
            { passive: false },
          );

          // Tambahkan event listener untuk DOMMouseScroll (untuk Firefox lama)
          mapEl.addEventListener(
            "DOMMouseScroll",
            function (e: Event) {
              const mouseEvent = e as unknown as WheelEvent;
              if (mouseEvent.ctrlKey || mouseEvent.metaKey) {
                if (isZooming) return; // Jangan zoom jika masih dalam timeout
                isZooming = true;

                e.preventDefault();

                // Balik arah untuk Firefox
                const detail = (e as unknown as { detail: number }).detail;
                const delta = -detail;

                // DIBALIK: scroll up (deltaY < 0) = memperkecil, scroll down (deltaY > 0) = memperbesar
                // deltaY < 0 berarti scroll up, deltaY > 0 berarti scroll down

                // Dapatkan zoom level saat ini
                const currentZoom = map.getZoom();
                let newZoom;

                if (delta < 0) {
                  // Scroll up = zoom out (memperkecil) - satu level
                  newZoom = Math.floor(currentZoom) - 1;
                } else {
                  // Scroll down = zoom in (memperbesar) - satu level
                  newZoom = Math.ceil(currentZoom) + 1;
                }

                // Batasi nilai zoom
                newZoom = Math.max(
                  Math.min(newZoom, map.getMaxZoom()),
                  map.getMinZoom(),
                );

                // Terapkan zoom
                map.setZoom(newZoom, { animate: true });
                showZoomLevel(newZoom);

                // Setelah 500ms, izinkan zoom lagi
                setTimeout(() => {
                  isZooming = false;
                }, 500);
              }
            },
            { passive: false } as AddEventListenerOptions,
          );

          // Tambahkan event listener untuk memperbarui tombol ctrl/cmd
          const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Control" || e.key === "Meta") {
              // Ubah kursor saat tombol ditekan
              mapEl.style.cursor = "move"; // Netral, tidak menunjukkan zoom in/out khusus

              // Tampilkan keterangan yang lebih jelas
              const zoomLabel = document.createElement("div");
              zoomLabel.className = "temp-zoom-label";
              zoomLabel.style.position = "absolute";
              zoomLabel.style.bottom = "40px";
              zoomLabel.style.left = "50%";
              zoomLabel.style.transform = "translateX(-50%)";
              zoomLabel.style.background = "rgba(0,0,0,0.6)";
              zoomLabel.style.color = "white";
              zoomLabel.style.padding = "8px 12px";
              zoomLabel.style.borderRadius = "4px";
              zoomLabel.style.fontSize = "14px";
              zoomLabel.style.fontWeight = "bold";
              zoomLabel.style.zIndex = "9999";
              zoomLabel.innerHTML =
                "SCROLL UP = ZOOM IN<br>SCROLL DOWN = ZOOM OUT";
              mapEl.appendChild(zoomLabel);
            }
          };

          const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Control" || e.key === "Meta") {
              // Kembalikan kursor saat tombol dilepas
              mapEl.style.cursor = "";

              // Hapus label sementara
              const label = mapEl.querySelector(".temp-zoom-label");
              if (label) {
                label.remove();
              }
            }
          };

          document.addEventListener("keydown", handleKeyDown);
          document.addEventListener("keyup", handleKeyUp);

          // Hapus semua event listeners saat komponen unmount
          return () => {
            mapEl.removeEventListener("wheel", handleMouseWheel);
            mapEl.removeEventListener(
              "mousewheel",
              handleMouseWheel as EventListener,
            );
            document.removeEventListener("keydown", handleZoomWithKeys);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            map.off("zoomend");
          };
        };

        // Aktifkan fitur keyboard + scroll
        enableKeyboardScroll();

        // Gunakan Google Maps tile layer
        L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }).addTo(map);

        // Tambahkan marker dengan div marker kustom
        const customHtmlIcon = L.divIcon({
          className: "custom-marker",
          html: `<img src="images/img-marker.png" style="width: auto; height: auto; max-width: none;" alt="Marker" />`,
          iconSize: undefined,
          iconAnchor: [25, 25],
        });

        const marker = L.marker([latitude, longitude], {
          icon: customHtmlIcon,
          interactive: true,
          keyboard: true,
        }).addTo(map);

        // Tambahkan event untuk membuka Google Maps saat marker di klik
        marker.on("click", () => {
          window.open(googleMapsUrl, "_blank");
        });

        mapInstanceRef.current = map;
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    void loadMap();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.company ||
      !formData.projectName ||
      !formData.phone ||
      !formData.location ||
      !formData.message
    ) {
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

      // Scroll ke section form
      const formSection = document.querySelector(".contact-form-container");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      setStatus("error");
    }
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
                  <form className="mt-8" onSubmit={handleSubmit}>
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
                      <div className="custom-cta-button">
                        <div className="custom-cta-button-inner">
                          <button type="submit" className="h-full w-full">
                            <span className="text-white whitespace-normal text-center font-titillium text-2xl font-light uppercase tracking-wide">
                              KIRIM PESAN
                            </span>
                          </button>
                        </div>
                      </div>
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
                8% 0%,
                92% 0%,
                100% 4%,
                100% 96%,
                92% 100%,
                8% 100%,
                0% 96%,
                0% 4%
              );
            }
          }
        `}</style>

        <style jsx>{`
          .custom-cta-button {
            position: relative;
            height: 52px;
            min-width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            clip-path: polygon(
              4% 0%,
              96% 0%,
              100% 16%,
              100% 84%,
              96% 100%,
              4% 100%,
              0% 84%,
              0% 16%
            );
            background-color: #ffffff;
            transition: opacity 0.3s;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .custom-cta-button:hover {
            opacity: 0.8;
          }

          .custom-cta-button-inner {
            position: relative;
            height: calc(52px - 2px);
            width: calc(100% - 2px);
            display: flex;
            align-items: center;
            justify-content: center;
            clip-path: polygon(
              4% 0%,
              96% 0%,
              100% 16%,
              100% 84%,
              96% 100%,
              4% 100%,
              0% 84%,
              0% 16%
            );
            background-color: #ff7028;
            margin: 1px;
          }

          .custom-cta-button-inner button {
            background: none;
            border: none;
            width: 100%;
            height: 100%;
            cursor: pointer;
            color: white;
            font-family: inherit;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactForm;
