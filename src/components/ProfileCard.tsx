import React from "react";
import Image from "next/image";

interface ProfileCardProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  variant?: "primary" | "secondary";
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  variant = "primary",
}) => {
  const primaryClipPath = {
    desktop: {
      background:
        "polygon(4% 0%, 96% 0%, 100% 2%, 100% 98%, 96% 100%, 4% 100%, 0% 98%, 0% 2%)",
      foreground:
        "polygon(4% 0%, 96% 0%, 100% 2%, 100% 98%, 96% 100%, 4% 100%, 0% 98%, 0% 2%)",
    },
    mobile: {
      background:
        "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
      foreground:
        "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
    },
  };

  const secondaryClipPath = {
    desktop: {
      background:
        "polygon(4% 0%, 96% 0%, 100% 2%, 100% 98%, 96% 100%, 4% 100%, 0% 98%, 0% 2%)",
      foreground:
        "polygon(4% 0%, 96% 0%, 100% 2%, 100% 98%, 96% 100%, 4% 100%, 0% 98%, 0% 2%)",
    },
    mobile: {
      background:
        "polygon(4% 0%, 96% 0%, 100% 2%, 100% 98%, 96% 100%, 4% 100%, 0% 98%, 0% 2%)",
      foreground:
        "polygon(4% 0%, 96% 0%, 100% 2%, 100% 98%, 96% 100%, 4% 100%, 0% 98%, 0% 2%)",
    },
  };

  // Pilih clipPath berdasarkan variant
  const clipPath = variant === "primary" ? primaryClipPath : secondaryClipPath;

  return (
    <div className="group relative h-full">
      <div
        className="absolute inset-0 hidden bg-gray-600 md:block"
        style={{
          clipPath: clipPath.desktop.background,
          zIndex: 0,
        }}
      />

      <div
        className="absolute inset-0 bg-gray-600 md:hidden"
        style={{
          clipPath: clipPath.mobile.background,
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 hidden h-full flex-col bg-black p-6 md:flex md:p-8"
        style={{
          clipPath: clipPath.desktop.foreground,
          margin: "1px",
          height: "calc(100% - 2px)",
          width: "calc(100% - 2px)",
        }}
      >
        <h3 className={`text-white mb-4 text-2xl`}>{title}</h3>

        <div className="flex-grow leading-relaxed text-white-10/60">
          {description}
        </div>

        <div
          className={`relative ${variant === "secondary" ? "mt-6" : ""} h-[150px] w-full overflow-hidden`}
        >
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
      </div>

      <div
        className="relative z-10 flex h-full flex-col bg-black p-5 md:hidden"
        style={{
          clipPath: clipPath.mobile.foreground,
          margin: "1px",
          height: "calc(100% - 2px)",
          width: "calc(100% - 2px)",
        }}
      >
        <h3 className={`text-white mb-4 text-2xl`}>{title}</h3>

        <div className="mb-4 flex-grow leading-relaxed text-white-10/60">
          {description}
        </div>

        <div className={`overflow-hidden} relative mt-auto h-[120px] w-full`}>
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
