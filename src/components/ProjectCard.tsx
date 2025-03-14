import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  period: string;
  imageSrc: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, period, imageSrc }) => {
  return (
    <div className="relative h-[300px] w-full max-w-[380px] overflow-hidden rounded-lg shadow-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Gradient Overlay - setengah vertikal dengan gradasi biru ke transparan */}
      <div 
        className="absolute inset-0 flex flex-col justify-end"
        style={{
          background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.8) 0%, rgba(30, 58, 138, 0.4) 50%, rgba(30, 58, 138, 0) 100%)',
          height: '50%',
          top: 'auto'
        }}
      >
        <div className="px-4 pb-6 flex flex-col gap-2">
          {/* Badge tanggal */}
          <div className="bg-orange-500 self-start rounded-md px-4 py-2 text-white-10 text-sm font-medium">
            {period}
          </div>
          
          {/* Judul Proyek */}
          <h3 className="text-white-10 text-2xl font-titilium">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 