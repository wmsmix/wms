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
  topPosition?: string;
  leftPosition?: string;
  isDarkBackground?: boolean;
}
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items = [],
  textColor = "text-white-10", 
  hoverColor = "hover:text-gray-200",
  topPosition = "top-12 md:top-12",
  leftPosition = "left-4 md:left-24",
  isDarkBackground = true
}) => {
  const pathname = usePathname();
  
  // Determine if current page is a precast concrete detail page
  const isPrecastDetail = pathname.includes('/products/precast-concrete/') && pathname !== '/products/precast-concrete';
  
  // For precast detail pages, override all text to black
  const baseTextColor = isPrecastDetail ? "text-black" : textColor;
  const baseHoverColor = isPrecastDetail ? "hover:text-gray-700" : hoverColor;
  
  // Gunakan posisi top yang berbeda jika itu halaman precast concrete slug
  const actualTopPosition = isPrecastDetail ? "top-0" : topPosition;
  
  // Mapping label berdasarkan segment path
  const pathMapping: Record<string, string> = {
    "products": "Produk & Layanan",
    "aspal": "Aspal",
    "beton": "Beton",
    "precast-concrete": "Precast Concrete",
    "contact": "Kontak",
    "insights": "Insights",
    "projects": "Proyek",
    "about": "Tentang Kami",
    "box-culvert": "Box Culvert",
    "double-u-box": "Double U-Box",
    "u-ditch": "U-Ditch",
    "u-ditch-cover": "U-Ditch Cover",
    "kansteen": "Kansteen"
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

  // Determine if we should use absolute positioning
  const useAbsolutePositioning = !isPrecastDetail && actualTopPosition !== "top-0";
  const positioningClasses = useAbsolutePositioning 
    ? `absolute z-40 ${actualTopPosition} ${leftPosition}` 
    : "relative w-full";

  // Special classes for precast concrete detail pages
  const containerClasses = isPrecastDetail 
    ? "w-full px-0 md:px-0 py-0 md:py-0" 
    : "w-full px-4 py-2 md:px-0 md:pt-2 md:pb-2";

  return (
    <div className={`breadcrumbs-container ${containerClasses} ${positioningClasses}`}>
      <div className={`breadcrumbs flex items-center font-titillium ${baseTextColor} text-xs md:text-sm ${isPrecastDetail ? 'overflow-x-auto' : ''}`}>
        <Link 
          href="/" 
          className={`${baseHoverColor} transition-colors duration-200 font-normal opacity-50 hover:opacity-100 whitespace-nowrap`}
        >
          Beranda
        </Link>
        
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className={`mx-2 ${baseTextColor} opacity-50 whitespace-nowrap`}>/</span>
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link 
                href={item.href} 
                className={`${baseHoverColor} transition-colors duration-200 font-normal opacity-50 hover:opacity-100 whitespace-nowrap`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`font-normal ${baseTextColor} opacity-100 whitespace-nowrap`}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs; 