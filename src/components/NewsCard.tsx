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
  bgColor?: string;
  textColor?: string;
  textBadgeColor?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  date,
  month,
  imageSrc,
  description,
  url,
  bgColor,
  textColor,
  textBadgeColor,
}) => {
  return (
    <Link
      href={url}
      className="block w-full max-w-[380px] overflow-hidden shadow-lg"
      style={{
        backgroundColor: bgColor,
        clipPath: "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 5% 100%, 0 90%)",
      }}
    >
      <div className="relative">
        <div className="relative h-[200px] w-full">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-col items-center">
          <div
            className={`flex h-[70px] w-[60px] flex-shrink-0 items-end justify-center ${bgColor} pb-2 text-white-10`}
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 12% 100%, 0 88%)",
            }}
          >
            <span className={`text-3xl font-semibold ${textBadgeColor}`}>{date}</span>
          </div>

          <span className={`mt-4 text-2xl font-medium uppercase ${textColor}`}>
            {month}
          </span>
        </div>

        <div className="flex-1 p-4">
          <h3 className={`font-titilium mb-4 text-xl ${textColor}`}>{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
