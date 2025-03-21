import React from "react";
import Button from "~/components/commons/Button";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isActive: boolean;
  isLast?: boolean;
  onClick?: () => void;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
  isActive,
  isLast = false,
  onClick,
}) => {
  // Warna background berdasarkan nomor step
  const getBgColor = () => {
    if (number === 1) return "#F36A2B"; // Step 1 - Orange
    return "#A75A42"; // Step 2-4 - Merah kecoklatan
  };

  return (
    <div
      className={`flex transition-all duration-500 ${isActive ? "opacity-100" : "opacity-40"} relative mb-12 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {/* Button dengan nomor */}
        <div className="relative mr-3">
          <Button
            text={number.toString()}
            
            height="56px"
            textColor="#FFFFFF"
            className="rounded-xl text-2xl font-bold shadow-md"
          />

          {/* Titik di samping kanan button */}
          <div className={`absolute right-[-24px] top-[50%] h-2 w-2 -translate-y-1/2 transform rounded-full ${isActive ? "bg-white" : "bg-gray-400"}`}></div>

          {/* Garis vertikal dari titik ke bawah (jika bukan item terakhir) */}
          {!isLast && (
            <div className="absolute right-[-23px] top-[50%] h-[calc(100%+48px)] w-[1px] bg-white-10 opacity-40"></div>
          )}
        </div>
      </div>

      {/* Konten */}
      <div className="ml-3 flex-1 pt-2 ps-4">
        <h3 className="mb-2 text-2xl font-semibold text-white-10">{title}</h3>
        <p className="text-base text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
