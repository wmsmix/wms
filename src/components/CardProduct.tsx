import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "~/components/commons/Button";

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
}) => {
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
  const borderWidthNum = typeof borderWidth === 'string' ? parseFloat(borderWidth) || 1 : 1;

  const cardContent = (
    <div
      className="relative h-full w-full max-w-[400px]"
      style={{ height: height || "500px" }}
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
              ? "h-[200px] sm:h-[220px] md:h-[250px]"
              : "h-[180px] sm:h-[200px] md:h-[220px]"
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

        <div className="flex flex-grow flex-col bg-white-20 p-4 sm:p-5 md:p-6">
          <div className="flex-grow">
            {subtitle && (
              <h3 className="text-[16px] font-semibold text-black sm:text-[17px] md:text-[18px]">
                {subtitle}
              </h3>
            )}
            <h2 className="mb-2 text-[22px] font-semibold text-black sm:text-[24px] md:mb-3 md:text-[28px]">
              {title} <span className="italic">{italicText}</span>
            </h2>
            <p className="mb-4 text-sm text-gray-base sm:text-base md:mb-5">
              {description}
            </p>
          </div>
          <div className="mt-auto">
            <Button
              text="Pelajari Produk"
              height="38px"
              textSize="lg"
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
  );

  if (href) {
    return (
      <Link href={href} className="block h-full w-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default CardProduct;
