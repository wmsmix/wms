"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import GalleryTabs from "~/components/GalleryTabs";
import GalleryPagination from "~/components/GalleryPagination";
import { getGalleryProjectsFromSupabase, getSupabaseStorageUrl, defaultCategories } from "~/data/gallery-supabase";
import type { GalleryProject } from "~/types/cms";

const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const projectsPerPage = 9; // 3x3 grid untuk desktop

  // Load projects from Supabase
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getGalleryProjectsFromSupabase();
        setProjects(data);
      } catch (error) {
        console.error('Error loading gallery projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProjects();
  }, []);

  // Filter proyek berdasarkan kategori aktif
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'semua') {
      return projects;
    }
    return projects.filter(project => project.category === activeCategory);
  }, [projects, activeCategory]);

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

  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <section className="bg-white-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
            <span className="ml-2">Loading gallery...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white-10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <GalleryTabs
          categories={defaultCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {currentProjects.map((project) => (
            <div key={project.id} className="relative h-[200px] md:h-[300px] overflow-hidden group">
              <Image
                src={project.image_url ? getSupabaseStorageUrl(project.image_url) : "/images/img-about.png"}
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
                {project.value && (
                  <div className="relative w-4/5 md:w-1/2 mb-1 md:mb-2 overflow-hidden">
                    <div className="absolute inset-0 bg-white-10/40 backdrop-blur-md"></div>
                    <div className="relative justify-center items-center z-10 p-1 md:p-3">
                      <p className="text-gray-700 text-[10px] sm:text-xs md:text-sm mb-0 md:mb-1">Nilai Projek</p>
                      <p className="text-black text-xs sm:text-sm md:text-base lg:text-xl">{project.value}</p>
                    </div>
                  </div>
                )}

                <div className="text-black">
                  {project.client && (
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base line-clamp-1">
                      {project.client}
                    </p>
                  )}
                  {(project.start_date ?? project.end_date) && (
                    <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm mt-0 md:mt-1">
                      {formatDate(project.start_date)} {project.start_date && project.end_date && '-'} {formatDate(project.end_date)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no projects found */}
        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found for this category.</p>
          </div>
        )}

        {/* Only show pagination if there are projects */}
        {filteredProjects.length > 0 && (
          <GalleryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        )}
      </div>
    </section>
  );
};

export default GallerySection;
