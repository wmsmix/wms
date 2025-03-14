"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white-base">
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
            },
          ].map(({ icon, title, text, bgColor, marginTop, marginLeft, zIndex, marginLeftOnCard }) => (
            <div
              key={title}
              className={`relative flex h-[120px] w-full sm:w-[420px] items-center gap-4 p-6 text-white-base ${marginTop} ${marginLeft} ${zIndex}`}
              style={{
                backgroundColor: bgColor,
                clipPath:
                  "polygon(6% 0%, 94% 0%, 100% 12%, 100% 86%, 94% 100%, 6% 100%, 0% 86%, 0% 12%)",
              }}
            >
              <div className={`flex h-12 w-12 items-center justify-center ${marginLeftOnCard}`}>
                <Image src={icon} alt="Icon" width={32} height={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">{title}</h3>
                <p className="text-base text-[#DDDDDD] whitespace-pre-line">{text}</p>
              </div>
            </div>
          ))}
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
                "Home",
                "Product & Services",
                "About",
                "Projects",
                "Insights",
              ].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer border-b border-white/20 pb-2 text-base text-[#CCCCCC]"
                >
                  <Link href="/">{item}</Link>
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
                "Aspal (Hot-mix)",
                "Beton (Ready-mix)",
                "Precast Concrete",
                "Services",
              ].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer border-b border-white/20 pb-2 text-base text-[#CCCCCC]"
                >
                  <Link href="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="mb-4 text-xl font-semibold uppercase">Contact Us</h4>
            <ul className="space-y-3">
              {[
                "Desa Magersari, Kecamatan Plumpang, Kabupaten Tuban",
                "halo@wmsmix.com",
                "(+62) 823-3790-0700",
              ].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer border-b border-white/20 pb-2 text-base text-[#CCCCCC]"
                >
                  <Link href="/">{item}</Link>
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
          Web Experience by <span className="text-[#FF6F27]">Retrux</span>
        </p>

        <div className="flex gap-4">
          <Link href="https://facebook.com" target="_blank">
            <Image
              src="/svgs/icon-facebook.svg"
              alt="Facebook"
              width={32}
              height={32}
            />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image
              src="/svgs/icon-instagram.svg"
              alt="Instagram"
              width={32}
              height={32}
            />
          </Link>
          <Link href="https://linkedin.com" target="_blank">
            <Image
              src="/svgs/icon-linkedin.svg"
              alt="LinkedIn"
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;