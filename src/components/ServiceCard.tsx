"use client";

import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
  italicTitle?: boolean;
  description: string;
  italicWords?: string[];
  imagePosition?: "top" | "bottom";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  title,
  italicTitle = false,
  description,
  italicWords = [],
  imagePosition = "top",
}) => {
  const renderDescription = (text: string, italicWords: string[]) => {
    if (!italicWords.length) return text;

    let result = text;
    italicWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'g');
      result = result.replace(regex, `<i>$1</i>`);
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="border-1 relative w-full overflow-hidden shadow-lg flex flex-col px-4 md:px-0">
      {/* Image at top - always shown on mobile, or when imagePosition is top */}
      <div
        className={`relative w-full h-[214px] ${
          imagePosition === "bottom" ? "block md:hidden" : ""
        }`}
        style={{
          clipPath:
            "polygon(4% 0%, 96% 0%, 100% 6%, 100% 94%, 96% 100%, 4% 100%, 0% 94%, 0% 6%)",
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content section */}
      <div
        className="bg-white-10 p-10 h-[214px]"
        style={{
          clipPath:
            "polygon(4% 0%, 96% 0%, 100% 6%, 100% 94%, 96% 100%, 4% 100%, 0% 94%, 0% 6%)",
        }}
      >
        <span className={`text-dark mb-3 text-2xl text-black leading-relaxed font-normal ${italicTitle ? 'italic' : ''}`}>
          {title}
        </span>
        <p className="mb-5 text-gray-base text-sm pt-4">
          {renderDescription(description, italicWords)}
        </p>
      </div>
      
      {/* Image at bottom - only shown on non-mobile when imagePosition is bottom */}
      {imagePosition === "bottom" && (
        <div
          className="relative w-full h-[214px] hidden md:block"
          style={{
            clipPath:
              "polygon(4% 0%, 96% 0%, 100% 6%, 100% 94%, 96% 100%, 4% 100%, 0% 94%, 0% 6%)",
          }}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ServiceCard;