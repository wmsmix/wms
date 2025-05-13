import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  items?: Array<{
    label: string;
    href?: string;
  }>;
  textColor?: string;
  hoverColor?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items = [],
  textColor = "text-white-10", 
  hoverColor = "hover:text-gray-200"
}) => {
  const pathname = usePathname();
  
  // Mapping label berdasarkan segment path
  const pathMapping: Record<string, string> = {
    "products": "Produk & Layanan",
    "aspal": "Aspal",
    "beton": "Beton",
    "precast-concrete": "Precast Concrete",
    "contact": "Kontak",
    "insights": "Insights",
    "projects": "Proyek",
    "about": "Tentang Kami"
  };
  
  // Jika tidak ada items yang diberikan, buat breadcrumbs otomatis dari pathname
  const breadcrumbItems = items.length > 0 
    ? items 
    : pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, segments) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = pathMapping[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
          return { label, href };
        });

  return (
    <div className="breadcrumbs-container w-fit px-4 pt-6 pb-2 md:px-8 md:pt-8 md:pb-2 z-50 absolute top-20 left-0">
      <div className={`breadcrumbs flex items-center font-titillium ${textColor} text-xs md:text-sm`}>
        <Link href="/" className={`${hoverColor} transition-colors duration-200 font-normal`}>
          Beranda
        </Link>
        
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className={`mx-2 ${textColor}`}>/</span>
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link href={item.href} className={`${hoverColor} transition-colors duration-200 font-normal`}>
                {item.label}
              </Link>
            ) : (
              <span className="font-normal">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs; 