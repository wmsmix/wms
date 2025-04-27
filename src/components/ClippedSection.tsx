import React from "react";
import Image from "next/image";
import Button from "~/components/commons/Button";

interface ClippedSectionProps {
  title: string;
  description: string;
  buttonText: string;
  topBgColor?: string;
  bottomBgColor?: string;
  clipPathBgColor?: string;
  buttonHref?: string;
}

const ClippedSection: React.FC<ClippedSectionProps> = ({
  title,
  description,
  buttonText,
  topBgColor = "bg-blue-primary", // default warna biru
  bottomBgColor = "bg-white-10", // default warna putih
  clipPathBgColor = "bg-black", // default warna hitam untuk clippath
  buttonHref = "/contact",
}) => {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-24">
      {/* Background Layer - Split Background */}
      <div className="absolute inset-0 z-0 w-full">
        <div className={`h-1/2 w-full ${topBgColor}`}></div>
        <div className={`h-1/2 w-full ${bottomBgColor}`}></div>
      </div>

      {/* Middle Layer - ClipPath dengan Image */}
      <div className={`container-clip relative z-10 w-full ${clipPathBgColor}`}>
        {/* Logo Pattern Image */}
        <div className="absolute left-0 top-0 h-full w-1/2 md:w-[45%]">
          <Image
            src="/images/img-w.png"
            alt="WMS Logo Pattern"
            fill
            className="-translate-y-[10%] object-cover"
            priority
          />
        </div>

        {/* Content Layer - Text dan Button */}
        <div className="relative z-20 mx-auto max-w-[1920px] px-4 py-12 md:py-24">
          <div className="flex flex-col items-center justify-center">
            <span className="text-white block max-w-4xl text-center font-noto text-2xl md:text-3xl lg:text-5xl">
              {title.split("<br>")[0]}
              <br className="hidden md:block" />
              {title.split("<br>")[1]}
            </span>
            <p className="text-white-20 opacity-70 max-w-4xl pt-4 text-center text-sm md:pt-8 md:text-base lg:text-[20px]">
              {description}
            </p>
            <div className="flex justify-start pt-6 md:pt-8">
              <Button
                text={buttonText}
                height="40px"
                textSize="2xl"
                className="text-sm md:text-lg"
                href={buttonHref}
                clipPath={{
                  outer:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                  inner:
                    "polygon(3% 0%, 97% 0%, 100% 16%, 100% 84%, 97% 100%, 3% 100%, 0% 84%, 0% 16%)",
                }}
                margin="1px"
              />
            </div>
          </div>
        </div>
      </div>

      <svg style={{visibility: "hidden", position: "absolute"}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
        <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />    
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
    </defs>
</svg>

      <style jsx>{`
        .container-clip {
          clip-path: polygon(
            3.4% 0%,
            96.6% 0%,
            100% 19%,
            100% 81%,
            96.6% 100%,
            3.4% 100%,
            0% 81%,
            0% 19%
          );
          min-height: 400px;
          filter: url(#round);
        }

        @media (max-width: 768px) {
          .container-clip {
            clip-path: polygon(
              10% 0%,
              90% 0%,
              100% 20%,
              100% 80%,
              90% 100%,
              10% 100%,
              0% 80%,
              0% 20%
            );
            min-height: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default ClippedSection;
