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
      className={`relative h-[700px] sm:h-[964px] w-full overflow-hidden bg-white font-serif text-white-base ${className}`}
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

      <div className="absolute left-1/2 top-1/2 z-10 flex h-[700px] w-[1200px] -translate-x-[16%] -translate-y-[54%] transform items-center justify-center md:hidden">
        <div className="clip-octagon-outer-mobile relative h-full w-full overflow-hidden bg-gray-300 opacity-10">
          <div className="clip-octagon-inner-mobile absolute left-1/2 top-1/2 h-[640px] w-[1200px] -translate-x-[46%] -translate-y-[56%] bg-gray-900"></div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 hidden h-[1200px] w-[1800px] -translate-x-[42%] -translate-y-[65.5%] transform items-center justify-center md:flex">
        <div className="clip-octagon-outer-desktop relative h-full w-full overflow-hidden bg-gray-300 opacity-10">
          <div className="clip-octagon-inner-desktop absolute left-1/2 top-1/2 h-[880px] w-[1800px] -translate-x-[46%] -translate-y-[40%] bg-gray-900"></div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 z-30 w-full max-w-[90vw] sm:max-w-5xl -translate-x-1/2 -translate-y-1/2 px-4 sm:px-0">
        <div className="grid grid-cols-1 items-center gap-4 sm:gap-8 md:grid-cols-2">
          <h1 className="text-left pl-12 text-3xl sm:text-5xl font-bold leading-tight md:text-left md:text-6xl">
            {headline}
          </h1>

          <div className="text-left pl-12 md:text-left top-0">
            <p className="mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed font-titillium">{subheadline}</p>
            <div className="flex justify-start">
              <Button text={ctaText} height="48px" textSize="lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-8 z-40">
        <Button
          text=""
          icon={faWhatsapp}
          height="48px"
          className=""
          iconSize="xl"
        />
      </div>

      <style jsx>{`
        /* Clippath luar untuk mobile */
        .clip-octagon-outer-mobile {
          clip-path: polygon(
            5% 0%,
            95% 0%,
            100% 5%,
            100% 95%,
            95% 100%,
            5% 100%,
            0% 90%,
            0% 5%
          );
        }
        
        /* Clippath dalam untuk mobile */
        .clip-octagon-inner-mobile {
          clip-path: polygon(
            0% 0%,
            80% 0%,
            100% 20%,
            100% 80%,
            80% 100%,
            5% 100%,
            0% 90%,
            0% 20%
          );
        }
        
        /* Clippath luar untuk desktop */
        .clip-octagon-outer-desktop {
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
        
        /* Clippath dalam untuk desktop */
        .clip-octagon-inner-desktop {
          clip-path: polygon(
            0% 0%,
            85% 0%,
            100% 15%,
            100% 85%,
            85% 100%,
            12% 100%,
            0% 85%,
            0% 15%
          );
        }
      `}</style>
    </section>
  );
};

export default Hero;
