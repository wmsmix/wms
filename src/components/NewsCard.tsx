import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  title: string;
  date: string;
  month: string;
  imageSrc: string;
  description: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  title, 
  date, 
  month, 
  imageSrc, 
  description, 
  url 
}) => {
  return (
    <Link 
      href={url} 
      className="block w-full max-w-[380px] overflow-hidden bg-white shadow-lg"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 5% 100%, 0 90%)"
      }}
    >
      <div className="relative">
        {/* Image */}
        <div className="relative h-[200px] w-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex">
        {/* Date Section */}
        <div className="flex flex-col items-center">
          {/* Date Badge */}
          <div 
            className="flex h-[70px] w-[60px] flex-shrink-0 items-center justify-center bg-blue-primary text-white-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 5% 100%, 0 90%)"
            }}
          >
            <span className="text-2xl font-semibold">{date}</span>
          </div>
          
          {/* Month */}
          <span className="mt-1 text-xl font-medium uppercase text-blue-primary">
            {month}
          </span>
        </div>
        
        <div className="flex-1 p-4">
          <h3 className="mb-4 text-xl font-titilium text-black">
            {title}
          </h3>
          <p className="text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard; 