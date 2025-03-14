"use client";

import Image from "next/image";
import Button from "./Button";
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface HeroProps {
  backgroundImage: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage = "/images/default-bg.png",
  headline = "Default Headline",
  subheadline = "Default subheadline text here.",
  ctaText = "Lihat Produk",
  className = "",
}) => {
  return (
    <section
      className={`relative h-[964px] w-full overflow-hidden bg-white font-serif text-white-base ${className}`}
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 flex h-[1100px] w-[1800px] -translate-x-[42%] -translate-y-[62%] transform items-center justify-center">
        <div className="clip-octagon relative h-full w-full overflow-hidden bg-gray-300 opacity-10">
          <div className="clip-octagon absolute left-1/2 top-1/2 h-[880px] w-[1800px] -translate-x-[46%] -translate-y-[48%] bg-gray-900"></div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 z-30 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <h1 className="text-center text-5xl font-bold leading-tight md:text-left md:text-6xl">
            {headline}
          </h1>

          <div className="text-center md:text-left top-0">
            <p className="mb-6 text-lg leading-relaxed font-titillium">{subheadline}</p>
            <Button text={ctaText} height="56px" textSize="xl"/>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-8 z-40">
        <Button
          text=""
          icon={faWhatsapp}
          height="56px"
          className=""
          iconSize="2xl"
        />
      </div>

      <style jsx>{`
        .clip-octagon {
          clip-path: polygon(
            10% 0%,
            90% 0%,
            100% 10%,
            100% 90%,
            90% 100%,
            10% 100%,
            0% 90%,
            0% 10%
          );
        }
      `}</style>
    </section>
  );
};

export default Hero;
