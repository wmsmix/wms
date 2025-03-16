import type { FC } from "react";
import Image from "next/image";
import Button from "~/components/Button";

interface CardProductProps {
  imageSrc: string;
  title: string;
  italicText: string;
  description: string;
}

const CardProduct: FC<CardProductProps> = ({
  imageSrc,
  title,
  italicText,
  description,
}) => {
  return (
    <div className="relative w-[400px] border-1 border-[#DDDDDD] bg-[#F4F4F4] shadow-lg overflow-hidden" style={{
      clipPath: "polygon(8% 0%, 92% 0%, 100% 4%, 100% 96%, 92% 100%, 8% 100%, 0% 96%, 0% 4%)"
    }}>
      <div className="relative h-[256px] w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h2 className="text-[28px] text-dark text-black mb-3">{title} <span className="italic">({italicText})</span></h2>
        <p className="text-gray-700 mb-5">{description}</p>
        <Button text="Pelajari Produk" height="42px" textSize="sm"/>
      </div>
    </div>
  );
};

export default CardProduct;
