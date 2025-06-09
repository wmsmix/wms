import React from "react";
import Image from "next/image";
import Button from "~/components/commons/Button";
import Breadcrumbs from "~/components/commons/Breadcrumbs";
import { getImagePublicUrl } from "~/utils/image";

interface ProductHeroProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  onButtonClick?: () => void;
  breadcrumbItems?: Array<{
    label: string;
    href?: string;
  }>;
}

const ProductHero: React.FC<ProductHeroProps> = ({
  title,
  description,
  imageSrc,
  buttonText = "PELAJARI LEBIH LANJUT",
  onButtonClick,
  breadcrumbItems = []
}) => {
  // Fungsi untuk mengubah kata bahasa Inggris menjadi italic
  const italicizeEnglishWords = (text: string) => {
    // Daftar kata bahasa Inggris yang umum dalam konteks konstruksi
    const englishWords = ['ready-mix', 'hot-mix', 'precast', 'concrete', 'ready mix', 'hot mix'];

    let formattedText = text;
    englishWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      formattedText = formattedText.replace(regex, '<i>$1</i>');
    });

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="relative">
      {/* Breadcrumbs - posisi absolute di atas */}
      <div className="absolute top-0 left-0 right-0 z-[100] w-full">
        <Breadcrumbs
          items={breadcrumbItems}
          textColor="text-white"
          hoverColor="hover:text-white/80"
          topPosition="top-24 md:top-20"
          leftPosition="left-2 md:left-12"
        />
      </div>

      <section className="product-hero relative min-h-[500px] w-full overflow-hidden md:min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImagePublicUrl(imageSrc)}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 pt-56 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white mb-4 font-noto text-3xl md:mb-6 md:text-3xl lg:text-4xl sm:text-xl">
            {italicizeEnglishWords(title)}
          </h1>
          <p className="text-white-base opacity-75 mb-8 max-w-3xl text-base md:mb-10 md:text-xl">
            {italicizeEnglishWords(description)}
          </p>
          {buttonText && (
            <Button
              text={buttonText}
              height="48px"
              textSize="2xl"
              onClick={onButtonClick}
              clipPath={{
                outer:
                  "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                inner:
                  "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
              }}
              margin="1px"
            />
          )}
        </div>

        <style jsx>{`
          .product-hero {
            clip-path: polygon(0 0, 100% 0, 100% 76%, 92% 100%, 8% 100%, 0 76%);
          }

          @media (max-width: 768px) {
            .product-hero {
              clip-path: polygon(
                0 0,
                100% 0,
                100% 90%,
                90% 100%,
                10% 100%,
                0 90%
              );
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ProductHero;
