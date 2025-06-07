"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:halo@wmsmix.com";
  };

  const handleLocationClick = () => {
    window.open("https://maps.app.goo.gl/4tV3HrHdzRv7mxcx8", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/6282337900700", "_blank");
  };

  return (
    <footer className="text-white-base bg-[#0B0B0B]">
      <div className="relative w-full px-4 py-16 sm:px-[120px]">
        <div className="relative mx-auto flex w-full max-w-full flex-col items-start justify-start gap-4 sm:max-w-fit sm:flex-row sm:items-center sm:justify-center sm:gap-0">
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
                className={`text-white-base relative flex h-[120px] w-full items-start gap-4 p-6 sm:w-[420px] md:items-center ${marginTop} ${marginLeft} ${zIndex} contact-card cursor-pointer hover:opacity-90`}
                style={{
                  backgroundColor: bgColor,
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

      <div className="grid w-full grid-cols-1 gap-x-16 px-4 pt-24 sm:grid-cols-3 sm:px-[120px]">
        <div className="flex items-start justify-start">
          <Link href="/#" onClick={() => window.scrollTo(0, 0)}>
            <Image
              src="/svgs/wms-logo.svg"
              alt="Logo"
              width={198}
              height={81}
            />
          </Link>
        </div>

        <div className="col-span-2 flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex-1">
            <h4 className="mb-6 text-xl font-semibold uppercase">Menu</h4>
            <ul className="space-y-0">
              {[
                { name: "Beranda", href: "/" },
                { name: "Produk & Layanan", href: "/products" },
                { name: "Tentang Kami", href: "/about" },
                { name: "Proyek Kami", href: "/projects" },
                { name: "Insights", href: "/insights" },
              ].map((item, _index, _array) => (
                <li key={item.name} className="pt-4">
                  <Link
                    href={item.href}
                    className="hover:text-white block text-base text-[#CCCCCC]"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-2 h-[0.2px] w-full bg-white-20 opacity-30"></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="mb-6 text-xl font-semibold uppercase">
              Product & Services
            </h4>
            <ul className="space-y-0">
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
                  href: "/products/precast-concrete",
                },
                { name: "Surat Dukungan", href: "/products#support-letter" },
              ].map((item, index, _array) => (
                <li key={index} className="pt-4">
                  <Link
                    href={item.href}
                    className="hover:text-white block text-base text-[#CCCCCC]"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-2 h-[0.2px] w-full bg-white-20 opacity-30"></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="mb-6 text-xl font-semibold uppercase">Contact Us</h4>
            <ul className="space-y-0">
              {[
                {
                  text: "Desa Magersari, Kecamatan Plumpang, Kabupaten Tuban",
                  href: "https://maps.app.goo.gl/4tV3HrHdzRv7mxcx8",
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
              ].map((item, _index, _array) => (
                <li key={item.text} className="pt-4">
                  <Link
                    href={item.href}
                    target={item.target}
                    className="hover:text-white block text-base text-[#CCCCCC]"
                  >
                    {item.text}
                  </Link>
                  <div className="mt-2 h-[0.2px] w-full bg-white-20 opacity-30"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 bg-[#0B0B0B] px-4 py-24 sm:flex-row sm:px-[120px]">
        <div className="flex items-center space-x-6">
          <p className="text-[#CCCCCC]">
            © Copyright 2025 <span className="text-[#FF6F27]">WMS</span>
          </p>
          <div className="mx-2 h-4 w-[1px] bg-[#fff]"></div>
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
        </div>

        <div className="flex gap-5">
          {[
            {
              href: "https://www.facebook.com/profile.php?id=61571593506561",
              icon: "/svgs/icon-facebook.svg",
              alt: "Facebook",
            },
            {
              href: "https://www.instagram.com/wms.mix",
              icon: "/svgs/icon-instagram.svg",
              alt: "Instagram",
            },
            {
              href: "https://www.linkedin.com/company/pt-wahana-makmur-sentosa",
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

      <style jsx>{`
        .contact-card {
          clip-path: polygon(
            3% 0%,
            97% 0%,
            100% 8%,
            100% 92%,
            97% 100%,
            3% 100%,
            0% 92%,
            0% 8%
          );
        }

        @media (min-width: 768px) {
          .contact-card {
            clip-path: polygon(
              6% 0%,
              94% 0%,
              100% 12%,
              100% 86%,
              94% 100%,
              6% 100%,
              0% 86%,
              0% 12%
            );
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
