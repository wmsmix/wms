"use client";

import React, { useState } from "react";
import Image from "next/image";
import GalleryTabs from "~/components/GalleryTabs";
import GalleryPagination from "~/components/GalleryPagination";

// Data proyek untuk gallery
const projectCategories = [
  { id: "semua", label: "SEMUA" },
  { id: "jalan", label: "JALAN" },
  { id: "infrastruktur", label: "INFRASTRUKTUR" },
  { id: "komersil", label: "KOMERSIL" },
  { id: "perumahan", label: "PERUMAHAN" },
];

// Data galeri proyek (contoh)
const projectsData = [
  { 
    id: 1, 
    category: "jalan", 
    image: "/images/img-about.png", 
    title: "Pekerjaan Akses Petikemas II Pelabuhan", 
    client: "PT. (PERSERO) Pelabuhan Indonesia III",
    value: "RP. 16.420.065.000",
    startDate: "10/01/2008",
    endDate: "11/07/2008"
  },
  { id: 2, category: "jalan", image: "/images/img-about.png", title: "Proyek Jalan 2" },
  { id: 3, category: "infrastruktur", image: "/images/img-about.png", title: "Infrastruktur 1" },
  { id: 4, category: "infrastruktur", image: "/images/img-about.png", title: "Infrastruktur 2" },
  { id: 5, category: "komersil", image: "/images/img-about.png", title: "Komersil 1" },
  { id: 6, category: "komersil", image: "/images/img-about.png", title: "Komersil 2" },
  { id: 7, category: "perumahan", image: "/images/img-about.png", title: "Perumahan 1" },
  { id: 8, category: "perumahan", image: "/images/img-about.png", title: "Perumahan 2" },
  { id: 9, category: "jalan", image: "/images/img-about.png", title: "Proyek Jalan 3" },
  { id: 10, category: "jalan", image: "/images/img-about.png", title: "Proyek Jalan 3" },
  // Bisa ditambahkan lebih banyak proyek
];

const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // 3x3 grid untuk desktop

  // Filter proyek berdasarkan kategori aktif
  const filteredProjects = activeCategory === "semua" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);
  
  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  // Get projects for current page
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // Handler untuk perubahan kategori
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset ke halaman pertama ketika kategori berubah
  };

  // Handler untuk perubahan halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handler untuk halaman sebelumnya
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler untuk halaman berikutnya
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="bg-white-10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <GalleryTabs 
          categories={projectCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {currentProjects.map((project) => (
            <div key={project.id} className="relative h-[200px] md:h-[300px] overflow-hidden group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
              />
              
              {/* Overlay dengan informasi proyek, muncul saat hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white-10/40 p-3 md:p-4 text-center">
                <h3 className="text-black text-xs sm:text-sm md:text-lg lg:text-3xl mb-1 md:mb-3 line-clamp-2">
                  {project.title}
                </h3>
                
                {/* Nilai Proyek dengan efek blur tambahan */}
                <div className="relative w-4/5 md:w-1/2 mb-1 md:mb-2 overflow-hidden">
                  <div className="absolute inset-0 bg-white-10/40 backdrop-blur-md"></div>
                  <div className="relative justify-center items-center z-10 p-1 md:p-3">
                    <p className="text-gray-700 text-[10px] sm:text-xs md:text-sm mb-0 md:mb-1">Nilai Projek</p>
                    <p className="text-black text-xs sm:text-sm md:text-base lg:text-xl">{project.value ?? "RP. 16.420.065.000"}</p>
                  </div>
                </div>
                
                <div className="text-black">
                  <p className="text-[10px] sm:text-xs md:text-sm lg:text-base line-clamp-1">
                    {project.client ?? "PT. (PERSERO) Pelabuhan Indonesia III"}
                  </p>
                  <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm mt-0 md:mt-1">
                    {(project.startDate ?? "10/01/2008")} - {(project.endDate ?? "11/07/2008")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <GalleryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </section>
  );
};

export default GallerySection; 