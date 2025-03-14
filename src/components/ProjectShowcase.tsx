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
    <div className="flex w-full px-16 py-16">
      <div className="relative h-[500px] w-1/2 ps-24">
        <div className="relative h-full w-full">
          {/* Container gambar */}
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

          {/* Container dengan clipPath yang sama di pojok kanan bawah */}
          <div
            className="bg-white-20 absolute bottom-[-30px] right-[-30px] z-10 h-[190px] w-[254px]"
            style={{
              clipPath:
                "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
            }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center">
              <span className="text-blue-primary text-[88px] font-semibold leading-none">
                {projectValue}
              </span>
              <span className="text-blue-primary -mt-2 text-3xl">
                NILAI PROYEK
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-center px-16">
        <span className="text-white-10 mb-4 text-5xl">{period}</span>
        <span className="text-white-10 mb-4 text-5xl">{title}</span>
        <p className="text-white-10 pe-48 text-base">{description}</p>
        <div className="mt-12 flex gap-8">
          <Button
            text="LIHAT LEBIH LENGKAP"
            className="text-2xl font-normal"
          />
          <div className="flex">
            <Image
              className="relative z-10 h-[50px] w-[50px]"
              width={50}
              height={50}
              alt=""
              src={"/svgs/icon-road.svg"}
            />
            <div className="ms-2 flex flex-col">
              <span className="text-white-10 text-[10px]">
                TOTAL PANJANG JALAN
              </span>
              <span className="text-white-10 text-2xl">{projectLength}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
