import type { ProjectsPageContent } from "~/types/cms";

// Default projects page content (matching the existing projects page)
export const defaultProjectsPageContent: ProjectsPageContent = {
  hero: {
    backgroundImage: "/images/img-projects.png",
    experienceYears: "20",
    experienceText: "TAHUN PENGALAMAN",
    headline: "Menghubungkan, membangun, dan menyuburkan negeri",
    description: "Sukses membangun berbagai infrastruktur, termasuk jalan, dermaga, dan sistem irigasi, WMS berkomitmen untuk memberikan solusi proyek yang tidak hanya fungsional, tetapi juga bermanfaat dan berkelanjutan.",
    breadcrumbsTopPosition: "top-24 md:top-20",
    breadcrumbsLeftPosition: "left-2 md:left-12"
  },
  featuredProject: {
    title: "Jalan Lingkar Tuban",
    period: "(2022-2024)",
    description: "Pembangunan Jalan Lingkar Tuban yang berlokasi di Desa Prunggahan Kulon, Tuban, sepanjang 7,98 km. Ruang lingkup WMS berada pada penyediaan dan aplikasi material konstruksi Aspal Hot-mix, Beton Ready-mix, dan Beton Precast.",
    imageSrc: "/images/img-jejak.png",
    projectValue: "103M",
    projectValueText: "NILAI PROYEK",
    roadLength: "7.98 KM",
    roadLengthText: "TOTAL PANJANG JALAN",
    buttonText: "LIHAT LEBIH LENGKAP",
    projectSlug: "jalan-lingkar-tuban"
  },
  callToAction: {
    title: "Yuk, Bangun Infrastruktur Negeri Bersama Kami!",
    buttonText: "DISKUSI PROYEK BERSAMA",
    buttonHref: "/contact"
  },
  insightsSectionTitle: "Lihat Insight Proyek"
};

// Get projects page content (in a real app, this would fetch from a database)
export const getProjectsPageContent = (): ProjectsPageContent => {
  // Check if there's stored content in localStorage (browser only)
  if (typeof window !== 'undefined') {
    const storedContent = localStorage.getItem('projectsPageContent');
    if (storedContent) {
      try {
        // Parse stored content and ensure it's of the correct type
        const parsedContent = JSON.parse(storedContent) as ProjectsPageContent;
        return parsedContent;
      } catch (e) {
        console.error('Failed to parse stored projects page content:', e);
      }
    }
  }

  // Return default content if nothing is stored or we're on the server
  return defaultProjectsPageContent;
};

// Save projects page content (in a real app, this would save to a database)
export const saveProjectsPageContent = (content: ProjectsPageContent): boolean => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('projectsPageContent', JSON.stringify(content));
    }
    return true;
  } catch (e) {
    console.error('Failed to save projects page content:', e);
    return false;
  }
};
