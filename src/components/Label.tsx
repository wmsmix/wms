"use client";

import Image from "next/image";

const labels = [
  { title: ["Keberpihakan pada Lokal"], image: "/svgs/icon-group.svg" },
  { title: ["Standar Nasional"], image: "/svgs/icon-certificate.svg" },
  { title: ["Kapasitas Produksi Besar"], image: "/svgs/icon-container.svg" },
];

export default function Labels() {
  return (
    <div className="relative w-full bg-dark mt-48 px-4 pt-12 md:px-16 overflow-visible">
      {/* Background dengan clip-path */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: "polygon(6% 0%, 94% 0%, 100% 24%, 100% 100%, 0% 100%, 0% 24%)",
        }}
      ></div>

      {/* Container untuk Card */}
      <div className="relative mt-8 flex w-full flex-wrap justify-center items-center gap-8">
        {labels.map((label, index) => (
          <div
            key={index}
            className="relative flex h-[168px] w-[408px] flex-col items-center justify-center gap-3 rounded-lg bg-[#0F2771] text-center font-titillium text-2xl text-white-base shadow-lg"
            style={{
              transform: "translateY(-90%)",
              zIndex: 10,
              clipPath: "polygon(6% 0%, 94% 0%, 100% 12%, 100% 88%, 94% 100%, 6% 100%, 0% 88%, 0% 12%)",
            }}
          >
            {/* Icon */}
            <Image
              className="relative z-10 h-[50px] w-[50px]"
              width={50}
              height={50}
              alt=""
              src={label.image}
            />

            {/* Text */}
            <div className="relative z-10 leading-[115%] flex flex-col items-center justify-center w-full">
              {label.title.map((line, i) => (
                <p key={i} className="m-0 text-center">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}