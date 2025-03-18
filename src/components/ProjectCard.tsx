import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  period: string;
  imageSrc: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  period,
  imageSrc,
}) => {
  return (
    <div className="relative h-[300px] w-full max-w-[380px] overflow-hidden rounded-lg shadow-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>

      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{
          background:
            "linear-gradient(90deg, rgba(30, 58, 138, 0.8) 0%, rgba(30, 58, 138, 0.4) 50%, rgba(30, 58, 138, 0) 100%)",
          height: "50%",
          top: "auto",
        }}
      >
        <div className="flex flex-col gap-2 px-4 pb-6">
          <div className="self-start rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white-10">
            {period}
          </div>

          <h3 className="font-titilium text-2xl text-white-10">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
