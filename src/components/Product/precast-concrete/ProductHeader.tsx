import React from "react";
import Image from "next/image";
import { getImagePublicUrl } from "~/utils/image";

interface ProductHeaderProps {
  title: string;
  images: string[]; // Bisa 1 atau 2 gambar
  features?: {
    icon: string;
    title: string;
    description: string;
  }[];
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ title, images, features: _features }) => {
  return (
    <div className="bg-white-10 pb-24 text-black w-full">
      <div className="container mx-auto px-4 mt-24">
        <h1 className="text-center text-3xl md:text-6xl font-noto text-white ">
          {title}
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-24">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full md:w-1/2 aspect-[4/3] max-w-xl"
            >
              <Image
                src={getImagePublicUrl(image)}
                alt={`${title} gambar ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 p-4 rounded-lg flex items-start gap-4">
                <div className="bg-orange-500 p-2 rounded-md flex-shrink-0">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductHeader;
