import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "~/utils/supabase";

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
  [key: string]: unknown; // Add index signature
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = (originalProps) => {
  // Convert image paths to public URLs if they're from Supabase
  const imageSrc = originalProps.imageSrc ?
    getImageUrl(originalProps.imageSrc) :
    "/images/img-proyek.png";

  const props = { ...originalProps, imageSrc };

  const {
    period = "(2022-2023)",
    title = "Pembangunan Trestle Dan Dermaga",
    description = "Proyek pembangunan trestle dan dermaga di Kabupaten Tegal bertujuan untuk meningkatkan infrastruktur pelabuhan dan memfasilitasi aktivitas bongkar muat barang, mendukung pertumbuhan ekonomi lokal dan regional.",
    projectValue = "103M",
    projectLength = "7.98 KM",
    textColor = "text-black",
    valueColor = "text-white-10",
    labelColor = "text-white-10",
    projectLabel = "Nilai Proyek",
    bgLabelColor = "bg-blue-primary",
    descriptionColor = "text-gray-700",
    showProjectLength = false,
    italicWords = [],
    projectSlug = "#",
    buttonText = "Lihat Detail",
  } = props;

  const italicizeEnglishWords = (text: string) => {
    if (!text) return "";
    if (typeof text !== "string") return text;

    // Jika tidak ada kata yang harus di-italic, kembalikan text asli
    if (!italicWords?.length) return text;

    // Cari semua kata dalam italicWords dan buat menjadi italic
    let result = text;
    italicWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(regex, "<i>$1</i>");
    });

    return (
      <span dangerouslySetInnerHTML={{ __html: result }} className={textColor} />
    );
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

      <div className="md:order-1 flex w-full flex-col gap-4 md:w-1/2 md:gap-8 md:px-0 md:pe-24">
        <span
          className={`self-start rounded-md bg-blue-light px-4 py-1 text-lg font-light text-blue-primary md:text-xl`}
        >
          {period}
        </span>

        <h2
          className={`text-2xl font-bold leading-tight ${textColor} md:text-3xl lg:text-4xl`}
        >
          {italicizeEnglishWords(title)}
        </h2>
        <div className={`text-sm ${descriptionColor} md:text-base`}>
          {typeof description === "string"
            ? italicizeEnglishWords(description)
            : description}
        </div>

        {showProjectLength && (
          <div className="mt-4 flex items-center gap-3">
            <span className={`text-lg font-medium ${textColor}`}>
              Panjang Proyek:
            </span>
            <span
              className={`rounded-md bg-blue-light px-6 py-1 text-lg font-bold text-blue-primary`}
            >
              {projectLength}
            </span>
          </div>
        )}

        {projectSlug && (
          <div className="mt-4">
            <Link href={`/projects/${projectSlug}`}>
              <div className="custom-button">
                <div className="custom-button-inner">
                  <span className="text-white text-sm xs:text-lg sm:text-xl font-light tracking-wide">
                    {buttonText}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectShowcase;
