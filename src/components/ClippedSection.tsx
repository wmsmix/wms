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
  onButtonClick?: () => void;
}

const ClippedSection: React.FC<ClippedSectionProps> = ({
  title,
  description,
  buttonText,
  topBgColor = "bg-blue-primary", // default warna biru
  bottomBgColor = "bg-white-10", // default warna putih
  clipPathBgColor = "bg-black", // default warna hitam untuk clippath
  buttonHref = "/contact",
  onButtonClick,
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
        <div className="absolute left-0 top-0 h-full w-[65%] md:w-[65%] overflow-hidden">
          <Image
            src={clipPathBgColor === "bg-blue-primary" ? "/images/img-w-2.png" : "/images/img-w.png"}
            alt="WMS Logo Pattern"
            fill
            className="md:-translate-y-[10%] -translate-y-[18%] -translate-x-[35%] md:-translate-x-[15%] scale-[2] md:scale-[1] object-contain md:object-contain"
            priority
          />
        </div>

        {/* Content Layer - Text dan Button */}
        <div className="relative z-20 mx-auto max-w-[1920px] px-6 md:px-4 py-12 md:py-24">
          <div className="flex flex-col items-center justify-center">
            <span className="text-white block max-w-4xl text-center font-noto text-2xl md:text-3xl lg:text-5xl">
              {title.split("<br>")[0]}
              <br className="hidden md:block" />
              {title.split("<br>")[1]}
            </span>
            <p className="max-w-4xl pt-4 text-center text-sm text-white-20 opacity-70 md:pt-8 md:text-base lg:text-[20px]">
              {description}
            </p>
            <div 
              className="custom-button cursor-pointer mt-8"
              onClick={() => {
                if (onButtonClick) {
                  onButtonClick();
                } else {
                  window.location.href = buttonHref;
                }
              }}
            >
              <div className="custom-button-inner">
                <span className="text-white-10 whitespace-normal text-center font-titillium text-lg font-light uppercase tracking-wide">
                  {buttonText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg
        style={{ visibility: "hidden", position: "absolute" }}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        .container-clip {
          clip-path: polygon(
            4% 0%,
            96% 0%,
            100% 18%,
            100% 82%,
            96% 100%,
            4% 100%,
            0% 82%,
            0% 18%
          );
          min-height: 400px;
          filter: url(#round);
        }

        @media (max-width: 768px) {
          .container-clip {
            clip-path: polygon(
             8% 0%,
            92% 0%,
            100% 10%,
            100% 90%,
            92% 100%,
            8% 100%,
            0% 90%,
            0% 10%
            );
            min-height: 200px;
          }
        }

        .custom-button {
          position: relative;
          height: 52px;
          min-width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(
            4% 0%,
            96% 0%,
            100% 16%,
            100% 84%,
            96% 100%,
            4% 100%,
            0% 84%,
            0% 16%
          );
          background-color: #ffffff;
          transition: opacity 0.3s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .custom-button:hover {
          opacity: 0.8;
        }

        .custom-button-inner {
          position: relative;
          height: calc(52px - 2px);
          width: calc(100% - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(
            4% 0%,
            96% 0%,
            100% 16%,
            100% 84%,
            96% 100%,
            4% 100%,
            0% 84%,
            0% 16%
          );
          background-color: #FF7028;
          margin: 1px;
        }

        .custom-button-inner span {
          padding: 0 16px;
        }

        @media (min-width: 375px) {
          .custom-button {
            min-width: 180px;
          }
        }

        @media (min-width: 640px) {
          .custom-button {
            min-width: 200px;
          }
          .custom-button-inner span {
            padding: 0 24px;
          }
        }

        @media (max-width: 768px) {
          .custom-button {
            height: 42px;
          }
          
          .custom-button-inner {
            height: calc(42px - 2px);
          }
        }
      `}</style>
    </section>
  );
};

export default ClippedSection;
