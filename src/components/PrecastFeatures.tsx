import React from "react";
import Image from "next/image";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface PrecastFeaturesProps {
  features: FeatureItem[];
  bgColor?: string;
  iconBgColor?: string;
}

const PrecastFeatures: React.FC<PrecastFeaturesProps> = ({
  features,
  bgColor = "bg-orange-500",
  iconBgColor = "bg-[#ED7D3A]",
}) => {
  return (
    <div
      className={`relative w-full py-12 md:py-16 md:pt-24 ${bgColor} text-black`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 90%, 85% 100%, 15% 100%, 0 90%)",
        marginTop: "-1px", // Menghindari gap kecil antara section
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start w-full max-w-[360px] sm:max-w-[400px] md:max-w-[360px]"
            >
              <div
                className={`${iconBgColor} flex-shrink-0 flex items-center justify-center h-[90px] w-[90px] md:h-[100px] md:w-[100px] rounded-2xl shadow-md`}
                style={{
                  clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
                }}
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={50}
                  height={50}
                  className="h-12 w-12 md:h-14 md:w-14"
                />
              </div>
              
              {/* Text content */}
              <div className="ml-4 md:ml-6">
                <h3 className="text-2xl sm:text-3xl mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrecastFeatures; 