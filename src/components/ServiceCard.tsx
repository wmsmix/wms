"use client";

import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
  description: string;
  imagePosition?: "top" | "bottom";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  title,
  description,
  imagePosition = "top",
}) => {
  return (
    <div className="border-1 relative w-full overflow-hidden shadow-lg flex flex-col">
      {/* Image at top - always shown on mobile, or when imagePosition is top */}
      <div
        className={`relative w-full h-[214px] ${
          imagePosition === "bottom" ? "block md:hidden" : ""
        }`}
        style={{
          clipPath:
            "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
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
            "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
        }}
      >
        <span className="text-dark mb-3 text-[24px] text-black">{title}</span>
        <p className="mb-5 text-gray-base">{description}</p>
      </div>
      
      {/* Image at bottom - only shown on non-mobile when imagePosition is bottom */}
      {imagePosition === "bottom" && (
        <div
          className="relative w-full h-[214px] hidden md:block"
          style={{
            clipPath:
              "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
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