import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "~/utils/supabase";

interface ProjectCardProps {
  title: string;
  period: string;
  imageSrc: string;
  url?: string; // Add URL prop for navigation
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  period,
  imageSrc,
  url = "/projects",
}) => {
  // Convert image path to public URL if it's a Supabase storage path
  const imageUrl = getImageUrl(imageSrc);

  const cardContent = (
    <div className="relative h-[300px] w-full max-w-[380px] overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
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

  // Make the entire card clickable by wrapping it with a Link
  return <Link href={url}>{cardContent}</Link>;
};

export default ProjectCard;
