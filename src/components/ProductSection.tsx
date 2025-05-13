import React from "react";
import Image from "next/image";
import Button from "~/components/commons/Button";

interface ProductSectionProps {
  title: string;
  italicText?: string;
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
  italicText,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  isLastItem = false,
  buttonText = "PELAJARI PRODUK",
  buttonHref,
}) => {
  const containerClasses = `flex w-full -translate-y-[1%] flex-col bg-white-10 md:flex-row -mt-1 ${
    isLastItem ? "clip-bottom-corners" : ""
  }`;

  return (
    <div className={containerClasses}>
      {/* Image Section */}
      <div
        className={`relative order-1 h-96 w-full md:h-96 md:w-[597px] ${
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
        <h2 className="mb-2 ps-4 text-3xl font-semibold text-black md:mb-4 md:ps-24 lg:text-5xl font-noto font-thin pt-8 md:pt-0">
          {title} {italicText && <span className="italic">{italicText}</span>}
        </h2>
        <p className="pe-4 ps-4 pt-2 md:pb-0 text-base text-gray-light md:pe-48 md:ps-24 md:pt-4 lg:text-xl leading-loose">
          {description}
        </p>
        <div className="flex justify-start pb-8 ps-4 pt-4 md:ps-24 md:pt-8">
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
            100% 76%,
            96% 100%,
            96% 100%,
            4% 100%,
            4% 100%,
            0% 76%
          );
        }

        @media (max-width: 768px) {
          .clip-bottom-corners {
            clip-path: polygon(
            0% 0%,
            100% 0%,
            100% 96%,
            92% 100%,
            96% 100%,
            4% 100%,
            8% 100%,
            0% 96%
            );
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSection;
