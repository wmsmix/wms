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

  return (
    <div className={containerClasses}>
      {/* Image Section */}
      <div
        className={`relative order-1 h-[250px] w-full md:h-[500px] md:w-1/3 ${
          imagePosition === "right" ? "md:order-2" : ""
        }`}
      >
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>

      {/* Content Section */}
      <div
        className={`order-2 flex w-full flex-col justify-center px-4 py-6 md:w-2/3 md:px-12 md:py-8 ${
          imagePosition === "right" ? "md:order-1" : ""
        }`}
      >
        <h2 className="mb-2 ps-4 text-2xl font-semibold text-black md:mb-4 md:ps-24 md:text-3xl lg:text-5xl">
          {title}
        </h2>
        <p className="pe-4 ps-4 pt-2 text-sm text-gray-500 md:pe-96 md:ps-24 md:pt-4 md:text-base lg:text-[20px]">
          {description}
        </p>
        <div className="flex justify-start ps-4 pt-4 md:ps-24 md:pt-8">
          <Button
            text={buttonText}
            href={buttonHref}
            textSize="xl"
            className="text-sm md:text-lg"
            clipPath={{
              outer:
                "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
              inner:
                "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
            }}
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
