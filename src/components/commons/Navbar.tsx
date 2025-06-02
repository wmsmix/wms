"use client";
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hide, setHide] = useState(false);
  const [showPrecastSubmenu, setShowPrecastSubmenu] = useState(false);
  const [mobileMenuLevel, setMobileMenuLevel] = useState("main"); // 'main', 'products', 'precast'

  // Email and phone handlers
  const handleEmailClick = () => {
    window.location.href = "mailto:halo@wmsmix.com";
  };

  const handlePhoneClick = () => {
    window.open("https://wa.me/6282337900700", "_blank");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      if (currentPosition < 10) {
        setHide(false);
      } else {
        setHide(currentPosition > scrollPosition);
      }

      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  // Reset menu mobile saat navbar tersembunyi
  useEffect(() => {
    if (hide) {
      setIsOpen(false);
    }
  }, [hide]);

  // Fungsi untuk menangani navigasi menu mobile
  const handleMobileNavigation = (level: string) => {
    setMobileMenuLevel(level);
  };

  // Reset menu level saat menu ditutup
  useEffect(() => {
    if (!isOpen) {
      setMobileMenuLevel("main");
    }
  }, [isOpen]);

  // console.log("Navbar state:", { hide, scrollPosition });

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[9999] transform transition-transform duration-300 ease-in-out ${
        hide ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="flex h-20 w-full items-center bg-blue-primary px-4 md:px-10 lg:px-20">
        <div className="mx-auto hidden w-full max-w-[1272px] items-center justify-between md:flex">
          <Link href="/#" onClick={() => window.scrollTo(0, 0)}>
            <Image
              src="/svgs/wms-logo.svg"
              alt="Logo"
              width={97}
              height={39}
              priority
              className="object-contain"
            />
          </Link>

          <div className="text-white-base flex items-center gap-6 text-sm font-normal uppercase tracking-wide lg:gap-10">
            {/* Dropdown menu untuk PRODUK & LAYANAN */}
            <div className="group relative">
              <Link
                href="/products"
                className="flex cursor-pointer items-center transition-colors hover:text-white-10"
              >
                PRODUK & LAYANAN
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>

              {/* Dropdown level 1 */}
              <div className="invisible absolute left-0 z-50 mt-4 w-56 rounded-sm bg-blue-primary opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <Link
                  href="/products/aspal"
                  className="text-white-base hover:bg-blue-secondary block px-6 py-3 transition-colors"
                >
                  ASPAL
                </Link>
                <Link
                  href="/products/beton"
                  className="text-white-base hover:bg-blue-secondary block px-6 py-3 transition-colors"
                >
                  BETON
                </Link>

                {/* Item dengan submenu */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowPrecastSubmenu(true)}
                  onMouseLeave={() => setShowPrecastSubmenu(false)}
                >
                  <Link href="/products/precast-concrete">
                    <div className="text-white-base hover:bg-blue-secondary flex cursor-pointer items-center justify-between px-6 py-3 transition-colors">
                      <span>Precast Concrete</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>

                  {/* Dropdown level 2 */}
                  <div
                    className={`absolute left-full top-0 ml-1 w-56 rounded-sm bg-blue-primary shadow-lg ${
                      showPrecastSubmenu
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    } transition-all duration-300`}
                  >
                    <Link
                      href="/products/precast-concrete/box-culvert"
                      className="text-white-base hover:bg-blue-secondary block px-6 py-3 transition-colors"
                    >
                      BOX CULVERT
                    </Link>
                    <Link
                      href="/products/precast-concrete/double-u-box"
                      className="text-white-base hover:bg-blue-secondary block px-6 py-3 transition-colors"
                    >
                      DOUBLE U-BOX
                    </Link>
                    <Link
                      href="/products/precast-concrete/u-ditch"
                      className="text-white-base hover:bg-blue-secondary block px-6 py-3 transition-colors"
                    >
                      U-DITCH
                    </Link>
                    <Link
                      href="/products/precast-concrete/u-ditch-cover"
                      className="text-white-base hover:bg-blue-secondary block px-6 py-3 transition-colors"
                    >
                      U-DITCH COVER
                    </Link>
                    <Link
                      href="/products/precast-concrete/kansteen"
                      className="text-white-base hover:bg-blue-secondary block px-6 py-3 transition-colors"
                    >
                      KANSTEEN
                    </Link>
                  </div>
                </div>

                <Link
                  href="/products#support-letter"
                  className="text-white-base hover:bg-blue-secondary block px-6 py-3 transition-colors"
                >
                  SURAT DUKUNGAN
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              className="cursor-pointer transition-colors hover:text-white-10"
            >
              TENTANG KAMI
            </Link>
            <Link
              href="/projects"
              className="cursor-pointer transition-colors hover:text-white-10"
            >
              PROYEK KAMI
            </Link>
            <Link
              href="/insights"
              className="cursor-pointer transition-colors hover:text-white-10"
            >
              INSIGHTS
            </Link>
            <Link href="/contact">
              <div className="custom-contact-button">
                <div className="custom-contact-button-inner">
                  <span className="text-white whitespace-normal text-center font-titillium text-sm font-light uppercase tracking-wide">
                    KONTAK KAMI
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/#" onClick={() => window.scrollTo(0, 0)}>
            <Image
              src="/svgs/wms-logo.svg"
              alt="Logo"
              width={80}
              height={30}
              priority
              className="object-contain"
            />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white-base transform transition-transform duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Image
                src="/svgs/icon-hamburger.svg"
                alt="Menu"
                width={24}
                height={24}
                className="object-contain"
              />
            )}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`fixed inset-0 bottom-0 left-0 right-0 top-0 z-[10000] min-h-screen bg-blue-primary transition-all duration-300 ${
            isOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }`}
          style={{ height: "100vh" }}
        >
          <div className="flex min-h-screen flex-col overflow-hidden">
            {/* Header dengan Logo dan Close button */}
            <div className="mb-8 flex items-center justify-between px-4 py-6">
              <Link href="/#" onClick={() => {window.scrollTo(0, 0); setIsOpen(false);}}>
                <Image
                  src="/svgs/wms-logo.svg"
                  alt="Logo"
                  width={80}
                  height={80}
                  priority
                  className="object-contain"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            {/* Menu container dengan layout relatif untuk slide effect */}
            <div className="relative flex-1 overflow-hidden pb-80">
              {/* Main Menu */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                  mobileMenuLevel === "main"
                    ? "translate-x-0"
                    : "-translate-x-full"
                }`}
              >
                <div className="space-y-6 px-4">
                  <div
                    className="text-white border-white/5 flex cursor-pointer items-center justify-between border-b pb-6"
                  >
                    <Link href="/products" onClick={() => setIsOpen(false)} className="text-lg">
                      PRODUK & LAYANAN
                    </Link>
                    <div
                      onClick={() => handleMobileNavigation("products")}
                      className="ml-2 p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <Link
                    href="/about"
                    className="text-white border-white/5 block border-b pb-6 text-lg"
                  >
                    <span>TENTANG KAMI</span>
                  </Link>
                  <Link
                    href="/projects"
                    className="text-white border-white/5 block border-b pb-6 text-lg"
                  >
                    <span>PROYEK KAMI</span>
                  </Link>
                  <Link
                    href="/insights"
                    className="text-white border-white/5 block border-b pb-6 text-lg"
                  >
                    <span>INSIGHT</span>
                  </Link>
                </div>
              </div>

              {/* Products Submenu */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                  mobileMenuLevel === "products"
                    ? "translate-x-0"
                    : mobileMenuLevel === "precast"
                      ? "-translate-x-full"
                      : "translate-x-full"
                }`}
              >
                <div className="px-4">
                  {/* Tombol kembali */}
                  <button
                    onClick={() => handleMobileNavigation("main")}
                    className="text-white mb-6 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="text-lg">PRODUK & LAYANAN</span>
                  </button>

                  <div className="mt-8 space-y-6">
                    <Link
                      href="/products"
                      className="text-white border-white/5 block border-b pb-6"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-lg">OVERVIEW</span>
                    </Link>
                    <Link
                      href="/products/aspal"
                      className="text-white border-white/5 block border-b pb-6"
                    >
                      <span className="text-lg">ASPAL</span>
                    </Link>
                    <Link
                      href="/products/beton"
                      className="text-white border-white/5 block border-b pb-6"
                    >
                      <span className="text-lg">BETON</span>
                    </Link>

                    <div
                      className="text-white border-white/5 flex cursor-pointer items-center justify-between border-b pb-6"
                    >
                      <Link
                        href="/products/precast-concrete"
                        onClick={() => setIsOpen(false)}
                        className="text-lg"
                      >
                        PRECAST CONCRETE
                      </Link>
                      <div
                        onClick={() => handleMobileNavigation("precast")}
                        className="ml-2 p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <Link
                      href="/products#support-letter"
                      className="text-white border-white/5 block border-b pb-6"
                    >
                      <span className="text-lg">SURAT DUKUNGAN</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Precast Concrete Submenu */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                  mobileMenuLevel === "precast"
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              >
                <div className="px-4">
                  {/* Tombol kembali */}
                  <button
                    onClick={() => handleMobileNavigation("products")}
                    className="text-white mb-6 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="text-lg">PRECAST CONCRETE</span>
                  </button>

                  <div className="mt-8 space-y-6">
                    <Link
                      href="/products/precast-concrete"
                      className="text-white border-white/5 block border-b pb-6"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-lg">OVERVIEW</span>
                    </Link>
                    <Link
                      href="/products/precast-concrete/box-culvert"
                      className="text-white border-white/5 block border-b pb-6"
                    >
                      <span className="text-lg">BOX CULVERT</span>
                    </Link>
                    <Link
                      href="/products/precast-concrete/double-u-box"
                      className="text-white border-white/5 block border-b pb-6"
                    >
                      <span className="text-lg">DOUBLE U-BOX</span>
                    </Link>
                    <Link
                      href="/products/precast-concrete/u-ditch"
                      className="text-white border-white/5 block border-b pb-6"
                    >
                      <span className="text-lg">U-DITCH</span>
                    </Link>
                    <Link
                      href="/products/precast-concrete/u-ditch-cover"
                      className="text-white border-white/5 block border-b pb-6"
                    >
                      <span className="text-lg">U-DITCH COVER</span>
                    </Link>
                    <Link
                      href="/products/precast-concrete/kansteen"
                      className="text-white border-white/5 block border-b pb-6"
                    >
                      <span className="text-lg">KANSTEEN</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section - Memindahkan ke posisi absolute */}
            <div className="absolute bottom-0 left-0 right-0 bg-blue-primary">
              {/* Kontak Kami button */}
              <div className="mb-8 px-4">
                <Link href="/contact">
                  <div className="custom-contact-button">
                    <div className="custom-contact-button-inner">
                      <span className="text-white whitespace-normal text-center font-titillium text-sm font-light uppercase tracking-wide">
                        KONTAK KAMI
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Social media icons */}
              <div className="px-4">
                <div className="mb-6 flex justify-center space-x-6">
                  <Link href="https://www.facebook.com/profile.php?id=61571593506561" target="_blank">
                    <Image
                      src="/svgs/icon-facebook.svg"
                      alt="Facebook"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="https://www.instagram.com/wms.mix" target="_blank">
                    <Image
                      src="/svgs/icon-instagram.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="https://www.linkedin.com/company/pt-wahana-makmur-sentosa" target="_blank">
                    <Image
                      src="/svgs/icon-linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <div onClick={handleEmailClick} className="cursor-pointer">
                    <Image
                      src="/svgs/icon-mail.svg"
                      alt="Email"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div onClick={handlePhoneClick} className="cursor-pointer">
                    <Image
                      src="/svgs/icon-telephone.svg"
                      alt="Phone"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>

                {/* Copyright dengan padding bottom */}
                <div className="px-4 pb-8">
                  <div className="text-white flex items-center justify-center space-x-6 text-center text-sm">
                    <span>© Copyright 2025 WMS</span>
                    <span className="text-white">|</span>
                    <span>
                      Web Experience by{" "}
                      <Link
                        href="https://retrux.com"
                        target="_blank"
                        className="text-[#FF7028]"
                      >
                        Retrux
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .custom-contact-button {
          position: relative;
          height: 40px;
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(
            6% 0%,
            94% 0%,
            100% 16%,
            100% 84%,
            94% 100%,
            6% 100%,
            0% 84%,
            0% 16%
          );
          background-color: #ffffff;
          transition: opacity 0.3s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .custom-contact-button:hover {
          opacity: 0.8;
        }

        .custom-contact-button-inner {
          position: relative;
          height: calc(40px - 2px);
          width: calc(100% - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(
            6% 0%,
            94% 0%,
            100% 16%,
            100% 84%,
            94% 100%,
            6% 100%,
            0% 84%,
            0% 16%
          );
          background-color: #ff7028;
          margin: 1px;
        }

        .custom-contact-button-inner span {
          padding: 0 16px;
        }

        @media (max-width: 768px) {
          .custom-contact-button {
            height: 46px;
            min-width: 140px;
            clip-path: polygon(
              3% 0%,
              97% 0%,
              100% 16%,
              100% 84%,
              97% 100%,
              3% 100%,
              0% 84%,
              0% 16%
            );
          }

          .custom-contact-button-inner {
            height: calc(46px - 2px);
            clip-path: polygon(
              3% 0%,
              97% 0%,
              100% 16%,
              100% 84%,
              97% 100%,
              3% 100%,
              0% 84%,
              0% 16%
            );
          }

          .custom-contact-button-inner span {
            padding: 0 20px;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
