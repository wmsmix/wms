import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "~/components/commons/Button";
import { useRouter } from "next/navigation";

interface CardProductProps {
  imageSrc: string;
  title: string;
  italicText?: string;
  description: string;
  subtitle?: string;
  fullImage?: boolean;
  href?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  height?: string;
  mobileClipPath?: {
    outer: string;
    inner: string;
  };
  desktopClipPath?: {
    outer: string;
    inner: string;
  };
  whatsappOnClick?: boolean;
  buttonText?: string;
}

const CardProduct: React.FC<CardProductProps> = ({
  imageSrc,
  title,
  italicText,
  description,
  subtitle,
  fullImage = true,
  href,
  backgroundColor = "#F4F4F4",
  borderColor = "#CCCCCC",
  borderWidth = "1px",
  height = "auto",
  mobileClipPath = {
    outer:
      "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
    inner:
      "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
  },
  desktopClipPath = {
    outer:
      "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
    inner:
      "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
  },
  whatsappOnClick = false,
  buttonText = "PELAJARI PRODUK",
}) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const clipPath = isMobile ? mobileClipPath : desktopClipPath;
  const borderWidthNum =
    typeof borderWidth === "string" ? parseFloat(borderWidth) || 1 : 1;

  const handleCardClick = () => {
    if (href) {
      router.push(href);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "6282337900700";
    const productName = subtitle
      ? `${subtitle} ${title} ${italicText ?? ""}`
      : `${title} ${italicText ?? ""}`;
    const message = `Halo, saya tertarik dengan produk ${productName}. Boleh minta informasi lebih lanjut?`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleButtonClick = () => {
    if (href) {
      router.push(href);
    }
  };

  if (isMobile) {
    return (
      <div
        className={`relative w-full max-w-[400px] ${href ? "cursor-pointer" : ""}`}
        onClick={href ? handleCardClick : undefined}
      >
        {!imageSrc && (
          <div className="absolute inset-0 z-50 bg-red-200 p-4 text-center text-red-600">
            Image path missing
          </div>
        )}

        <div
          className="relative w-full overflow-hidden"
          style={{
            clipPath: clipPath.outer,
            backgroundColor: borderColor,
          }}
        >
          <div
            className="relative m-[1px] flex flex-col overflow-hidden"
            style={{
              clipPath: clipPath.inner,
              backgroundColor: fullImage ? backgroundColor : "white",
              width: `calc(100% - ${borderWidthNum * 2}px)`,
              margin: `${borderWidthNum}px`,
            }}
          >
            <div
              className={`relative w-full flex-shrink-0 ${
                fullImage ? "h-[200px]" : "h-[180px]"
              }`}
            >
              <div className="relative h-full w-full">
                {!imageError ? (
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    className={`${fullImage ? "object-cover" : "object-contain p-4"} z-10`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 p-4 text-center text-gray-500">
                    <span>Gambar tidak tersedia</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-grow flex-col bg-white-20 p-5">
              <div className="flex flex-col">
                {subtitle && (
                  <h3 className="text-[16px] font-semibold text-black">
                    {subtitle}
                  </h3>
                )}
                <h2 className="mb-2 text-xl font-light font-semibold text-black">
                  {title} <span className="italic">{italicText}</span>
                </h2>

                <div>
                  <p className="text-sm leading-loose text-gray-base">
                    {description}
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    text={buttonText}
                    height="42px"
                    textSize="lg"
                    onClick={whatsappOnClick ? handleWhatsAppClick : handleButtonClick}
                    clipPath={{
                      outer:
                        "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                      inner:
                        "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cardContent = (
    <div
      className={`relative w-full max-w-[400px] ${href ? "cursor-pointer" : ""}`}
      style={{
        height: height !== "auto" ? height : "500px",
        minHeight: "500px"
      }}
      onClick={href ? handleCardClick : undefined}
    >
      {!imageSrc && (
        <div className="absolute inset-0 z-50 bg-red-200 p-4 text-center text-red-600">
          Image path missing
        </div>
      )}

      <div
        className="absolute inset-0 h-full w-full"
        style={{
          clipPath: clipPath.outer,
          backgroundColor: borderColor,
          zIndex: 1,
        }}
      ></div>

      <div
        className="absolute flex flex-col overflow-hidden"
        style={{
          clipPath: clipPath.inner,
          backgroundColor: fullImage ? backgroundColor : "white",
          zIndex: 2,
          top: `${borderWidthNum}px`,
          left: `${borderWidthNum}px`,
          right: `${borderWidthNum}px`,
          bottom: `${borderWidthNum}px`,
          width: `calc(100% - ${borderWidthNum * 2}px)`,
          height: `calc(100% - ${borderWidthNum * 2}px)`,
        }}
      >
        <div
          className={`relative w-full flex-shrink-0 ${
            fullImage
              ? "h-[220px] md:h-[250px]"
              : "h-[200px] md:h-[220px]"
          }`}
        >
          <div className="relative h-full w-full">
            {!imageError ? (
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                className={`${fullImage ? "object-cover" : "object-contain p-4"} z-10`}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 p-4 text-center text-gray-500">
                <span>Gambar tidak tersedia</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-grow flex-col bg-white-20 p-5 sm:p-5 md:p-6">
          <div className="flex h-full flex-col">
            {subtitle && (
              <h3 className="text-[17px] md:text-[18px] font-semibold text-black">
                {subtitle}
              </h3>
            )}
            <h2 className="mb-2 text-xl font-light font-semibold text-black md:mb-3 md:text-3xl">
              {title} <span className="italic">{italicText}</span>
            </h2>

            <div className="h-[72px] md:h-[96px]">
              <p className="line-clamp-4 text-sm leading-loose text-gray-base sm:text-base">
                {description}
              </p>
            </div>

            <div className="flex-grow"></div>

            <div className="mt-auto">
              <Button
                text={buttonText}
                height="42px"
                textSize="lg"
                onClick={whatsappOnClick ? handleWhatsAppClick : handleButtonClick}
                clipPath={{
                  outer:
                    "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                  inner:
                    "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return cardContent;
};

export default CardProduct;
