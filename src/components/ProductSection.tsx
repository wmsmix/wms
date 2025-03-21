import React from "react";
import Image from "next/image";
import Button from "~/components/commons/Button";

interface ProductSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  isLastItem?: boolean;
  buttonText?: string;
  buttonHref?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  isLastItem = false,
  buttonText = "LIHAT DETAIL",
  buttonHref,
}) => {
  const containerClasses = `flex w-full -translate-y-[1%] flex-col bg-white-10 md:flex-row ${
    isLastItem ? "clip-bottom-corners" : ""
  }`;

  const contentOrder = imagePosition === "left" ? "order-2" : "order-1";
  const imageOrder = imagePosition === "left" ? "order-1" : "order-2";

  return (
    <div className={containerClasses}>
      {/* Image Section */}
      <div
        className={`relative order-1 h-[250px] w-full md:h-[500px] md:w-1/3 ${
          imagePosition === "right" ? "md:order-2" : ""
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div
        className={`order-2 flex w-full flex-col justify-center px-4 py-6 md:w-2/3 md:px-12 md:py-8 ${
          imagePosition === "right" ? "md:order-1" : ""
        }`}
      >
        <h2 className="mb-2 md:mb-4 ps-4 md:ps-24 text-2xl md:text-3xl font-semibold text-black lg:text-5xl">
          {title}
        </h2>
        <p className="ps-4 md:ps-24 pe-4 md:pe-96 pt-2 md:pt-4 text-sm md:text-base text-gray-500 lg:text-[20px]">
          {description}
        </p>
        <div className="flex justify-start ps-4 md:ps-24 pt-4 md:pt-8">
          <Button 
            text={buttonText} 
            href={buttonHref} 
            className="text-sm md:text-lg" 
          />
        </div>
      </div>

      <style jsx>{`
        .clip-bottom-corners {
          clip-path: polygon(
            0% 0%,
            100% 0%,
            100% 85%,
            90% 100%,
            10% 100%,
            0% 85%
          );
        }

        @media (max-width: 768px) {
          .clip-bottom-corners {
            clip-path: polygon(
              0% 0%,
              100% 0%,
              100% 94%,
              85% 100%,
              15% 100%,
              0% 94%
            );
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSection; 