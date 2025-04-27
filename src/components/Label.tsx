"use client";

import Image from "next/image";

const labels = [
  { title: ["Keberpihakan pada Lokal"], image: "/svgs/icon-group.svg" },
  { title: ["Standar Nasional"], image: "/svgs/icon-certificate.svg" },
  { title: ["Kapasitas Produksi Besar"], image: "/svgs/icon-container.svg" },
];

export default function Labels() {
  return (
    <div className="bg-dark relative mt-48 w-full overflow-visible px-4 pt-12 md:px-16">
      <div
        className="absolute inset-0 bg-white-10 md:hidden"
        style={{
          clipPath:
            "polygon(8% 0%, 92% 0%, 100% 6%, 100% 100%, 0% 100%, 0% 6%)",
        }}
      ></div>

      <div
        className="absolute inset-0 hidden bg-white-10 md:block"
        style={{
          clipPath:
            "polygon(6% 0%, 94% 0%, 100% 24%, 100% 100%, 0% 100%, 0% 24%)",
        }}
      ></div>

      <div className="relative mt-8 flex w-full flex-wrap items-center justify-center gap-8">
        {labels.map((label, index) => (
          <div
            key={index}
            className="text-white-base relative flex h-[168px] w-[408px] flex-col items-center justify-center gap-3 rounded-lg bg-[#0F2771] text-center font-titillium text-2xl shadow-lg"
            style={{
              transform: "translateY(-90%)",
              zIndex: 10,
              clipPath:
                "polygon(4% 0%, 96% 0%, 100% 16%, 100% 86%, 96% 100%, 4% 100%, 0% 86%, 0% 16%)",
            }}
          >
            <Image
              className="relative z-10 h-[50px] w-[50px]"
              width={50}
              height={50}
              alt=""
              src={label.image}
            />

            <div className="relative z-10 flex w-full flex-col items-center justify-center leading-[115%]">
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
