import React from "react";
import Image from "next/image";

interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const GalleryPagination: React.FC<GalleryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="mt-8 flex items-center justify-center md:mt-12">
      {/* Prev Arrow (original) */}
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`mx-1 md:mx-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <div className="relative h-[16px] w-[16px] md:h-[48px] md:w-[48px]">
          <Image
            src="/svgs/icon-arrow.svg"
            alt="Previous"
            fill
            className="object-contain"
          />
        </div>
      </button>

      {/* Square Bullet Pagination */}
      <div className="mx-3 flex items-center md:mx-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`mx-[3px] h-[6px] transition-all duration-200 md:mx-1 md:h-[8px] ${
              currentPage === index + 1
                ? "w-[6px] bg-blue-primary md:w-[8px]"
                : "w-[6px] bg-gray-300 md:w-[8px]"
            }`}
            aria-label={`Page ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`mx-1 md:mx-2 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <div className="relative h-[16px] w-[16px] md:h-[48px] md:w-[48px]">
          <Image
            src="/svgs/icon-arrow.svg"
            alt="Next"
            fill
            className="rotate-180 transform object-contain"
          />
        </div>
      </button>
    </div>
  );
};

export default GalleryPagination;
