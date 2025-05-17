import React from "react";
import Image from "next/image";

interface VariantType {
  image: string;
  label: string;
}

interface ProductTypeVariantsProps {
  title: string;
  variants: VariantType[];
}

const ProductTypeVariants: React.FC<ProductTypeVariantsProps> = ({
  title,
  variants,
}) => {
  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-center text-2xl md:text-6xl font-noto text-black mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {variants.map((variant, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-72 h-64 mb-4">
                <Image
                  src={variant.image}
                  alt={variant.label}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-center text-black text-2xl font-medium">{variant.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTypeVariants; 