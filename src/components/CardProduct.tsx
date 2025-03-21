import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "~/components/commons/Button";

interface CardProductProps {
  imageSrc: string;
  title: string;
  italicText?: string;
  description: string;
  subtitle?: string;
  fullImage?: boolean;
  href?: string;
}

const CardProduct: React.FC<CardProductProps> = ({
  imageSrc,
  title,
  italicText,
  description,
  subtitle,
  fullImage = true,
  href,
}) => {
  const cardContent = (
    <div className={`relative w-full max-w-[400px] border-1 border-[#DDDDDD] ${fullImage ? 'bg-[#F4F4F4]' : 'bg-white'} shadow-lg overflow-hidden`} style={{
      clipPath: "polygon(8% 0%, 92% 0%, 100% 4%, 100% 96%, 92% 100%, 8% 100%, 0% 96%, 0% 4%)"
    }}>
      <div className={`relative h-[200px] sm:h-[220px] md:h-[256px] w-full flex items-center justify-center border border-white-20`}>
        <div className={`${fullImage ? 'h-full w-full' : 'w-3/4 h-3/4'} relative`}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5 md:p-6 bg-white-20">
        {subtitle && <h3 className="text-[16px] sm:text-[17px] md:text-[18px] text-black font-semibold">{subtitle}</h3>}
        <h2 className="text-[22px] sm:text-[24px] md:text-[28px] font-semibold text-black mb-2 md:mb-3">{title} <span className="italic">{italicText}</span></h2>
        <p className="text-sm sm:text-base text-gray-base mb-4 md:mb-5">{description}</p>
        <Button 
          text="Pelajari Produk" 
          height="38px" 
          textSize="xs" 
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full max-w-sm">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default CardProduct;
