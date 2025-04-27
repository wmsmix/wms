"use client";
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hide, setHide] = useState(false);

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

  console.log("Navbar state:", { hide, scrollPosition });

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${
        hide ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="flex h-20 w-full items-center bg-blue-primary px-4 md:px-10 lg:px-20">
        <div className="mx-auto hidden w-full max-w-[1272px] items-center justify-between md:flex">
          <Link href="/">
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
            {/* <Link href="/" className="cursor-pointer hover:text-white-10 transition-colors">Home</Link> */}
            <Link
              href="/products"
              className="cursor-pointer transition-colors hover:text-white-10"
            >
              PRODUK & LAYANAN
            </Link>
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
              <Button
                text="KONTAK KAMI"
                height="40px"
                clipPath={{
                  outer:
                    "polygon(6% 0%, 94% 0%, 100% 16%, 100% 84%, 94% 100%, 6% 100%, 0% 84%, 0% 16%)",
                  inner:
                    "polygon(6% 0%, 94% 0%, 100% 16%, 100% 84%, 94% 100%, 6% 100%, 0% 84%, 0% 16%)",
                }}
              />
            </Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/">
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
          className={`fixed inset-0 bottom-0 left-0 right-0 top-0 z-[100] min-h-screen bg-blue-primary transition-all duration-300 ${
            isOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }`}
          style={{ height: "100vh" }}
        >
          <div className="flex min-h-screen flex-col">
            {/* Header dengan Logo dan Close button */}
            <div className="mb-16 flex items-center justify-between px-4 py-6">
              <Link href="/">
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

            <div className="flex-1 px-4">
              <div className="space-y-6">
                <Link
                  href="/products"
                  className="text-white flex items-center justify-between pb-6 border-b border-white/10"
                >
                  <span className="text-lg">PRODUK & LAYANAN</span>
                </Link>
                <Link
                  href="/about"
                  className="text-white block pb-6 text-lg border-b border-white/10"
                >
                  <span>TENTANG KAMI</span>
                </Link>
                <Link
                  href="/projects"
                  className="text-white block pb-6 text-lg border-b border-white/10"
                >
                  <span>PROYEK KAMI</span>
                </Link>
                <Link
                  href="/insights"
                  className="text-white block pb-6 text-lg border-b border-white/10"
                >
                  <span>INSIGHT</span>
                </Link>
              </div>
            </div>

            {/* Bottom section */}
            <div className="mt-auto">
              {/* Kontak Kami button */}
              <div className="mb-8 px-4">
                <Button
                  text="KONTAK KAMI"
                  className="w-full text-2xl"
                  clipPath={{
                    outer: "polygon(2% 0%, 98% 0%, 100% 18%, 100% 82%, 98% 100%, 2% 100%, 0% 82%, 0% 18%)",
                    inner: "polygon(2% 0%, 98% 0%, 100% 18%, 100% 82%, 98% 100%, 2% 100%, 0% 82%, 0% 18%)",
                  }}
                  margin="1px"
                  width="100%"
                  padding="px-8 py-4"
                />
              </div>

              {/* Social media icons */}
              <div className="px-4">
                <div className="mb-6 flex justify-center space-x-6">
                  <Link href="https://facebook.com" target="_blank">
                    <Image
                      src="/svgs/icon-facebook.svg"
                      alt="Facebook"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="https://instagram.com" target="_blank">
                    <Image
                      src="/svgs/icon-instagram.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="https://linkedin.com" target="_blank">
                    <Image
                      src="/svgs/icon-linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="#" target="_blank">
                    <Image
                      src="/svgs/icon-mail.svg"
                      alt="Email"
                      width={28}
                      height={28}
                    />
                  </Link>
                  <Link href="#" target="_blank">
                    <Image
                      src="/svgs/icon-telephone.svg"
                      alt="Phone"
                      width={28}
                      height={28}
                    /> 
                  </Link>
                </div>

                {/* Copyright dengan padding bottom */}
                <div className="px-4 pb-8">
                  <div className="text-white text-center text-sm flex items-center justify-center space-x-2">
                    <span>Copyright 2025 © WMS</span>
                    <span className="text-white/50">|</span>
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
    </header>
  );
};

export default Navbar;
