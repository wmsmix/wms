import React from "react";
import { getImageUrl } from "~/utils/supabase";
import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description
}) => {
  const desktopClipPath = {
    background: "polygon(6% 0%, 94% 0%, 100% 12%, 100% 88%, 94% 100%, 6% 100%, 0% 88%, 0% 12%)",
    foreground: "polygon(6% 0%, 94% 0%, 100% 12%, 100% 88%, 94% 100%, 6% 100%, 0% 88%, 0% 12%)"
  };

  const mobileClipPath = {
    background: "polygon(6% 0%, 94% 0%, 100% 10%, 100% 90%, 94% 100%, 6% 100%, 0% 90%, 0% 10%)",
    foreground: "polygon(6% 0%, 94% 0%, 100% 10%, 100% 90%, 94% 100%, 6% 100%, 0% 90%, 0% 10%)"
  };

  // Convert icon path to public URL if it's a Supabase storage path
  const iconUrl = getImageUrl(icon);

  return (
    <div className="relative p-[0.5px] md:p-[1px] h-full">
      <div
        className="absolute inset-0 bg-gray-200 hidden md:block"
        style={{ clipPath: desktopClipPath.background }}
      />
      <div
        className="absolute inset-0 bg-gray-200 md:hidden"
        style={{ clipPath: mobileClipPath.background }}
      />

      <div
        className="relative bg-white-10 p-4 md:p-8 hidden md:flex flex-col h-full"
        style={{
          clipPath: desktopClipPath.foreground,
        }}
      >
        <div className="flex gap-8 items-start p-6 h-full">
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12">
            <img src={iconUrl} alt={title} className="w-full h-full" />
          </div>
          <div className="text-start flex flex-col h-full">
            <h3 className="text-lg md:text-xl font-semibold text-black mb-2">{title}</h3>
            <p className="text-sm md:text-base text-gray-700 line-clamp-3 mb-auto">
              {description}
            </p>
            <div className="mt-auto h-16 md:h-24"></div>
          </div>
        </div>
      </div>

      <div
        className="relative bg-white-10 p-5 pb-12 md:hidden"
        style={{
          clipPath: mobileClipPath.foreground,
        }}
      >
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0 w-14 h-14 mb-4">
            <img src={iconUrl} alt={title} className="w-full h-full" />
          </div>
          <div className="text-start">
            <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
