import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "~/utils/supabase";
import Button from "~/components/commons/Button";

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
    textColor = "text-white",
    valueColor = "text-white-10",
    labelColor = "text-white-10",
    projectLabel = "Nilai Proyek",
    bgLabelColor = "bg-blue-primary",
    descriptionColor = "text-gray-700",
    showProjectLength = false,
    italicWords = [],
    projectSlug = "#",
    buttonText = "Lihat Lebih Lengkap",
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
    <div className="flex w-full flex-col gap-8 px-4 py-8 md:flex-row md:gap-8 md:px-16 md:py-16">
      <div className="relative order-1 mb-8 h-[350px] w-full px-6 md:mb-0 md:h-[500px] md:w-1/2 md:px-0 md:ps-24 md:pe-8">
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
            <div className="flex h-full w-full flex-col items-center justify-center gap-2" style={{
              backgroundColor: "white",
            }}>
              <span
                className={`text-[54px] font-semibold leading-none text-blue-primary md:text-[64px]`}
              >
                {projectValue}
              </span>
              <span className={`-mt-2 text-lg text-blue-primary md:text-2xl`}>
                {projectLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="md:order-1 flex w-full flex-col  md:w-1/2 md:px-0 md:ps-8 md:pe-24 pt-14">
        <span
          className={`self-start text-3xl font-light text-white md:text-4xl lg:text-5xl`}
        >
          {period}
        </span>

        <h2
          className={`text-3xl leading-tight ${textColor} md:text-5xl lg:text-5xl uppercase`}
        >
          {italicizeEnglishWords(title)}
        </h2>
        <div className={`text-sm ${textColor} md:text-base pt-16 pb-10 max-w-[460px]`}>
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
            <Button
              text={buttonText}
              height="42px"
              textSize="lg"
              href={`/projects/${projectSlug}`}
              clipPath={{
                outer: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)",
                inner: "polygon(4% 0%, 96% 0%, 100% 16%, 100% 84%, 96% 100%, 4% 100%, 0% 84%, 0% 16%)"
              }}
              margin="1px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectShowcase;
