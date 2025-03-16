import React from "react";
import Image from "next/image";
import Button from "./Button";

interface ProjectShowcaseProps {
  period: string;
  title: string;
  description: string;
  imageSrc: string;
  projectValue: string;
  projectLength: string;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  period,
  title,
  description,
  imageSrc,
  projectValue,
  projectLength,
}) => {
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
            className="absolute bottom-[-20px] right-[-20px] z-10 h-[140px] w-[180px] bg-white-20 md:bottom-[-30px] md:right-[-30px] md:h-[190px] md:w-[254px]"
            style={{
              clipPath:
                "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
            }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center">
              <span className="text-[60px] font-semibold leading-none text-blue-primary md:text-[88px]">
                {projectValue}
              </span>
              <span className="-mt-2 text-xl text-blue-primary md:text-3xl">
                NILAI PROYEK
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-2 flex w-full flex-col justify-start px-6 md:w-1/2 md:px-16">
        <span className="mb-2 text-left text-3xl text-white-10 md:mb-4 md:text-5xl">
          {period}
        </span>
        <span className="mb-2 text-left text-3xl text-white-10 md:mb-4 md:text-5xl">
          {title}
        </span>
        <p className="text-left text-sm text-white-10 md:pe-48 md:text-base">
          {description}
        </p>

        <div className="mt-6 flex md:mt-8">
          <Image
            className="relative z-10 h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
            width={50}
            height={50}
            alt=""
            src={"/svgs/icon-road.svg"}
          />
          <div className="ms-2 flex flex-col">
            <span className="text-[8px] text-white-10 md:text-[10px]">
              TOTAL PANJANG JALAN
            </span>
            <span className="text-xl text-white-10 md:text-2xl">
              {projectLength}
            </span>
          </div>
        </div>

        <div className="mt-8 md:mt-12">
          <Button
            text="LIHAT LEBIH LENGKAP"
            className="text-lg font-normal md:text-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
