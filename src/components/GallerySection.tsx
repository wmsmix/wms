"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GalleryTabs from "~/components/GalleryTabs";
import GalleryPagination from "~/components/GalleryPagination";
import { getGalleryProjectsFromSupabase, getSupabaseStorageUrl, defaultCategories } from "~/data/gallery-supabase";
import { getDetailedProjectsFromSupabase } from "~/data/detailed-projects-supabase";
import { isDetailedProject, isGalleryProject } from "~/types/cms";
import type {
  GalleryProject,
  DetailedProject,
  MixedProject,
  ProjectDateInfo
} from "~/types/cms";

const GallerySection: React.FC = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [galleryProjects, setGalleryProjects] = useState<GalleryProject[]>([]);
  const [detailedProjects, setDetailedProjects] = useState<DetailedProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [_error, _setError] = useState<string | null>(null);

  const projectsPerPage = 9;

  // Load projects from both sources
  useEffect(() => {
    const loadProjects = async (): Promise<void> => {
      setLoading(true);
      try {
        const [galleryData, detailedData] = await Promise.all([
          getGalleryProjectsFromSupabase(),
          getDetailedProjectsFromSupabase()
        ]);

        setGalleryProjects(galleryData);
        setDetailedProjects(detailedData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadProjects();
  }, []);

  // Combine and filter projects
  const allProjects = useMemo((): MixedProject[] => {
    const galleryWithType: MixedProject[] = galleryProjects.map(project => ({
      ...project,
      projectType: 'gallery' as const
    }));

    const detailedWithType: MixedProject[] = detailedProjects.map(project => ({
      ...project,
      projectType: 'detailed' as const
    }));

    return [...galleryWithType, ...detailedWithType];
  }, [galleryProjects, detailedProjects]);

  // Filter projects berdasarkan kategori aktif
  const filteredProjects = useMemo((): MixedProject[] => {
    if (activeCategory === 'semua') {
      return allProjects;
    }
    return allProjects.filter(project => project.category === activeCategory);
  }, [allProjects, activeCategory]);

  // Navigation function for detailed projects
  const navigateToProjectDetail = (slug: string): void => {
    router.push(`/projects/${slug}`);
  };

  // Get image URL based on project type
  const getProjectImageUrl = (project: MixedProject): string => {
    if (project.image_url) {
      return getSupabaseStorageUrl(project.image_url);
    }
    return "/images/img-about.png";
  };

  // Get project dates based on project type
  const getProjectDates = (project: MixedProject): ProjectDateInfo => {
    if (isGalleryProject(project)) {
      return {
        startDate: project.start_date,
        endDate: project.end_date
      };
    } else {
      return {
        period: project.period
      };
    }
  };

  // Format project date display
  const formatProjectDates = (project: MixedProject): string => {
    const dates = getProjectDates(project);

    if (dates.period) {
      return dates.period;
    }

    if (dates.startDate ?? dates.endDate) {
      const start = dates.startDate ? formatDate(dates.startDate) : '';
      const end = dates.endDate ? formatDate(dates.endDate) : '';
      if (start && end) {
        return `${start} - ${end}`;
      }
      return start || end;
    }

    return '';
  };

  // Hitung jumlah halaman
  const totalPages: number = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get projects for current page
  const currentProjects: MixedProject[] = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // Handler untuk perubahan kategori
  const handleCategoryChange = (categoryId: string): void => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset ke halaman pertama ketika kategori berubah
  };

  // Handler untuk perubahan halaman
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  // Handler untuk halaman sebelumnya
  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler untuk halaman berikutnya
  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Format date for display
  const formatDate = (dateString: string | undefined): string => {
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

  // Handle click with type safety
  const handleProjectClick = (project: MixedProject): void => {
    if (isDetailedProject(project) && project.slug) {
      navigateToProjectDetail(project.slug);
    }
  };

  if (loading) {
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
          {currentProjects.map((project) => {
            const isClickable = isDetailedProject(project);

            return (
              <div
                key={project.id}
                className={`relative h-[200px] md:h-[300px] overflow-hidden group ${
                  isClickable ? 'cursor-pointer' : ''
                }`}
                onClick={isClickable ? () => handleProjectClick(project) : undefined}
              >
                <Image
                  src={getProjectImageUrl(project)}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                />

                {/* Overlay dengan informasi proyek, muncul saat hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white-10/40 p-3 md:p-4 text-center">
                  {/* Visual indicator for clickable projects */}
                  {isClickable && (
                    <div className="absolute top-2 right-2 bg-blue-primary text-white px-2 py-1 rounded text-xs">
                      Detail
                    </div>
                  )}

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
                    {formatProjectDates(project) && (
                      <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm mt-0 md:mt-1">
                        {formatProjectDates(project)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show message if no projects found */}
        {filteredProjects.length === 0 && !loading && (
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
