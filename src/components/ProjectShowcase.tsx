import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectShowcaseProps {
  period?: string;
  title?: string;
  description?: string | React.ReactNode;
  imageSrc?: string;
  projectValue?: string;
  projectLength?: string;
  textColor?: string;
  valueColor?: string;
  labelColor?: string;
  projectLabel?: string;
  bgLabelColor?: string;
  descriptionColor?: string;
  showProjectLength?: boolean;
  italicWords?: string[];
  projectSlug?: string;
  buttonText?: string;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  period = "Period Not Specified",
  title = "Title Not Specified",
  description = "Description Not Specified",
  imageSrc = "/images/default-image.png",
  projectValue = "0",
  projectLength = "0 KM",
  textColor = "text-white-10",
  valueColor = "text-blue-primary",
  labelColor = "text-white-10",
  projectLabel = "NILAI PROYEK",
  bgLabelColor = "bg-white-20",
  descriptionColor = "text-white-10",
  showProjectLength = true,
  buttonText = "PELAJARI SELENGKAPNYA",
  italicWords,
  projectSlug,
}) => {
  const renderDescriptionFixed = () => {
    if (typeof description === "string") {
      if (!italicWords?.length) {
        return description;
      }

      let result = description;
      italicWords.forEach((word) => {
        result = result.replace(word, `<span class="italic">${word}</span>`);
      });

      return <span dangerouslySetInnerHTML={{ __html: result }} />;
    }

    return description;
  };

  return (
    <div className="flex w-full flex-col px-4 py-8 md:flex-row md:px-16 md:py-16">
      <div className="relative order-1 mb-8 h-[350px] w-full px-6 md:mb-0 md:h-[500px] md:w-1/2 md:px-0 md:ps-24">
        <div className="relative h-full w-full">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              style={{
                clipPath:
                  "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
              }}
            />
          </div>

          <div
            className={`absolute bottom-[-20px] right-[-20px] z-10 h-[140px] w-[180px] ${bgLabelColor} md:bottom-[-30px] md:right-[-30px] md:h-[190px] md:w-[254px]`}
            style={{
              clipPath:
                "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
            }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              <span
                className={`text-[54px] font-semibold leading-none ${valueColor} md:text-[64px]`}
              >
                {projectValue}
              </span>
              <span className={`-mt-2 text-lg ${valueColor} md:text-2xl`}>
                {projectLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-2 flex w-full flex-col items-start justify-center px-6 md:w-1/2 md:px-16">
        <span
          className={`mb-2 text-left font-semibold text-3xl ${textColor} md:mb-4 md:text-5xl`}
        >
          {period}
        </span>
        <span
          className={`mb-2 text-left font-semibold text-3xl ${textColor} md:mb-4 md:text-5xl`}
        >
          {title}
        </span>
        <p
          className={`text-base font-normal leading-7 ${descriptionColor} md:text-base lg:text-base`}
        >
          {renderDescriptionFixed()}
        </p>

        <div className="mt-6 flex flex-col gap-8 md:mt-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div 
              className="custom-button cursor-pointer"
              onClick={() => {
                window.location.href = `/projects/${projectSlug ?? "jalan-lingkar-tuban"}`;
              }}
            >
              <div className="custom-button-inner">
                <span className="text-white-10 whitespace-normal text-center font-titillium text-lg font-light uppercase tracking-wide">
                  {buttonText}
                </span>
              </div>
            </div>

            {showProjectLength && (
              <div className="order-1 flex items-center md:order-2">
                <Image
                  className="relative z-10 h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
                  width={60}
                  height={50}
                  alt=""
                  src={"/svgs/icon-road.svg"}
                />
                <div className="ms-2 flex flex-col">
                  <span className={`text-[8px] ${labelColor} md:text-[10px]`}>
                    TOTAL PANJANG JALAN
                  </span>
                  <span className={`text-xl ${textColor} md:text-2xl`}>
                    {projectLength}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-button {
          position: relative;
          height: 42px;
          min-width: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(
            3% 0%,
            97% 0%,
            100% 16%,
            100% 84%,
            97% 100%,
            3% 100%,
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
          height: calc(42px - 2px);
          width: calc(100%);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(
            3% 0%,
            97% 0%,
            100% 16%,
            100% 84%,
            97% 100%,
            3% 100%,
            0% 84%,
            0% 16%
          );
          background-color: #FF7028;
          margin: 1.5px;
        }

        .custom-button-inner span {
          padding: 0 16px;
        }

        @media (max-width: 768px) {
          .custom-button {
            clip-path: polygon(
              5% 0%,
              95% 0%,
              100% 10%,
              100% 90%,
              95% 100%,
              5% 100%,
              0% 90%,
              0% 10%
            );
          }
          
          .custom-button-inner {
            clip-path: polygon(
              5% 0%,
              95% 0%,
              100% 10%,
              100% 90%,
              95% 100%,
              5% 100%,
              0% 90%,
              0% 10%
            );
          }
        }
          @media (max-width: 768px) {
          .custom-button {
            clip-path: polygon(
              3% 0%,
              97% 0%,
              100% 10%,
              100% 90%,
              97% 100%,
              3% 100%,
              0% 90%,
              0% 10%
            );
            height: 38px;
            min-width: 200px;
          }
          
          .custom-button-inner {
            clip-path: polygon(
              3% 0%,
              97% 0%,
              100% 10%,
              100% 90%,
              97% 100%,
              3% 100%,
              0% 90%,
              0% 10%
            );
            height: calc(38px - 2px);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectShowcase;
