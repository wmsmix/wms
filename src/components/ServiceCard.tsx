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
    <div className="border-1 relative w-full overflow-hidden shadow-lg flex flex-col ">
      {imagePosition === "top" && (
        <div
          className="relative w-full h-[214px]"
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
      <div
        className="bg-white-10 p-6 h-[214px]" // flex-grow untuk mengisi ruang yang tersisa
        style={{
          clipPath:
            "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
        }}
      >
        <h2 className="text-dark mb-3 text-[28px] text-black">{title}</h2>
        <p className="mb-5 text-gray-700">{description}</p>
      </div>
      {imagePosition === "bottom" && (
        <div
          className="relative w-full h-[214px]"
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