import React from "react";
import Image from "next/image";
import Button from "~/components/commons/Button";

interface ProductHeroProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ProductHero: React.FC<ProductHeroProps> = ({
  title,
  description,
  imageSrc,
  buttonText = "PELAJARI LEBIH LANJUT",
  onButtonClick,
}) => {
  return (
    <section className="product-hero relative min-h-[500px] w-full overflow-hidden md:min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient untuk memastikan text tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-56 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="text-white mb-4 font-noto text-3xl md:mb-6 md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="text-white-base opacity-75 mb-8 max-w-3xl text-base md:mb-10 md:text-xl">
          {description}
        </p>
        {buttonText && (
          <Button
            text={buttonText}
            height="48px"
            textSize="lg"
            onClick={onButtonClick}
          />
        )}
      </div>

      <style jsx>{`
        .product-hero {
          clip-path: polygon(0 0, 100% 0, 100% 76%, 90% 100%, 8% 100%, 0 78%);
        }

        @media (max-width: 768px) {
          .product-hero {
            clip-path: polygon(
              0 0,
              100% 0,
              100% 94%,
              80% 100%,
              20% 100%,
              0 94%
            );
          }
        }
      `}</style>
    </section>
  );
};

export default ProductHero;
