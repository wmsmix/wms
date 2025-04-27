"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:halo@wmsmix.com";
  };

  const handleLocationClick = () => {
    window.open(
      "https://maps.google.com/?q=-7.011416668680984,112.13599997596744",
      "_blank",
    );
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/6282337900700", "_blank");
  };

  return (
    <footer className="text-white-base bg-[#0B0B0B]">
      <div className="relative w-full px-4 py-16 sm:px-[120px]">
        <div className="relative mx-auto flex max-w-fit flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0">
          {[
            {
              icon: "/svgs/icon-mail.svg",
              title: "Kirim Email",
              text: "halo@wmsmix.com",
              bgColor: "#0C1F5A",
              marginTop: "mt-0",
              marginLeft: "",
              zIndex: "z-30",
              marginLeftOnCard: "ml-0",
              onClick: handleEmailClick,
            },
            {
              icon: "/svgs/icon-location.svg",
              title: "Lokasi Kami",
              text: "Kecamatan Plumpang, \nKabupaten Tuban",
              bgColor: "#0C1B4A",
              marginTop: "sm:-mt-0",
              marginLeft: "sm:-ml-12",
              zIndex: "z-20",
              marginLeftOnCard: "sm:ml-8",
              onClick: handleLocationClick,
            },
            {
              icon: "/svgs/icon-telephone.svg",
              title: "Kontak Kami",
              text: "(+62) 823-3790-0700",
              bgColor: "#0C173A",
              marginTop: "sm:-mt-0",
              marginLeft: "sm:-ml-12",
              zIndex: "z-10",
              marginLeftOnCard: "sm:ml-8",
              onClick: handleWhatsAppClick,
            },
          ].map(
            ({
              icon,
              title,
              text,
              bgColor,
              marginTop,
              marginLeft,
              zIndex,
              marginLeftOnCard,
              onClick,
            }) => (
              <div
                key={title}
                className={`text-white-base relative flex h-[120px] w-full items-center gap-4 p-6 sm:w-[420px] ${marginTop} ${marginLeft} ${zIndex} cursor-pointer hover:opacity-90`}
                style={{
                  backgroundColor: bgColor,
                  clipPath:
                    "polygon(6% 0%, 94% 0%, 100% 12%, 100% 86%, 94% 100%, 6% 100%, 0% 86%, 0% 12%)",
                }}
                onClick={onClick}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center ${marginLeftOnCard}`}
                >
                  <Image src={icon} alt="Icon" width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold uppercase">{title}</h3>
                  <p className="whitespace-pre-line text-base text-[#DDDDDD]">
                    {text}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-x-16 px-4 py-16 sm:grid-cols-3 sm:px-[120px]">
        <div className="flex items-start justify-start">
          <Image src="/svgs/wms-logo.svg" alt="Logo" width={198} height={81} />
        </div>

        <div className="col-span-2 flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex-1">
            <h4 className="mb-4 text-xl font-semibold uppercase">Menu</h4>
            <ul className="space-y-3">
              {[
                { name: "Beranda", href: "/" },
                { name: "Produk & Layanan", href: "/products" },
                { name: "Tentang Kami", href: "/about" },
                { name: "Proyek Kami", href: "/projects" },
                { name: "Artikel", href: "/insights" },
              ].map((item) => (
                <li
                  key={item.name}
                  className="border-white/[0.02] cursor-pointer border-b pb-2 text-base text-[#CCCCCC] hover:text-white-10"
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="mb-4 text-xl font-semibold uppercase">
              Product & Services
            </h4>
            <ul className="space-y-3">
              {[
                {
                  name: (
                    <>
                      Aspal (<i>Hot-mix</i>)
                    </>
                  ),
                  href: "/products/aspal",
                },
                {
                  name: (
                    <>
                      Beton (<i>Ready-mix</i>)
                    </>
                  ),
                  href: "/products/beton",
                },
                {
                  name: (
                    <>
                      <i>Precast</i> Concrete
                    </>
                  ),
                  href: "/products/paving",
                },
                { name: "Layanan", href: "/services" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="border-white/[0.02] cursor-pointer border-b pb-2 text-base text-[#CCCCCC] hover:text-white-10"
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="mb-4 text-xl font-semibold uppercase">Contact Us</h4>
            <ul className="space-y-3">
              {[
                {
                  text: "Desa Magersari, Kecamatan Plumpang, Kabupaten Tuban",
                  href: "https://maps.google.com/?q=-7.011416668680984,112.13599997596744",
                  target: "_blank",
                },
                {
                  text: "halo@wmsmix.com",
                  href: "mailto:halo@wmsmix.com",
                },
                {
                  text: "(+62) 823-3790-0700",
                  href: "https://wa.me/6282337900700",
                  target: "_blank",
                },
              ].map((item) => (
                <li
                  key={item.text}
                  className="border-white/[0.02] cursor-pointer border-b pb-2 text-base text-[#CCCCCC] hover:text-white-10"
                >
                  <Link href={item.href} target={item.target}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 bg-[#0B0B0B] px-4 py-5 sm:flex-row sm:px-[120px]">
        <p className="text-[#CCCCCC]">
          Copyright 2025 © <span className="text-[#FF6F27]">WMS</span>
        </p>
        <p className="text-[#CCCCCC]">
          Web Experience by{" "}
          <Link
            href="https://retrux.com"
            target="_blank"
            className="text-[#FF6F27] transition-opacity hover:opacity-80"
          >
            Retrux
          </Link>
        </p>

        <div className="flex gap-5">
          {[
            {
              href: "https://facebook.com",
              icon: "/svgs/icon-facebook.svg",
              alt: "Facebook",
            },
            {
              href: "https://instagram.com",
              icon: "/svgs/icon-instagram.svg",
              alt: "Instagram",
            },
            {
              href: "https://linkedin.com",
              icon: "/svgs/icon-linkedin.svg",
              alt: "LinkedIn",
            },
          ].map((social) => (
            <Link
              key={social.alt}
              href={social.href}
              target="_blank"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src={social.icon}
                alt={social.alt}
                width={24}
                height={24}
                className="h-5 w-5 brightness-0 invert"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
