// Types for Homepage content
export interface HeroSection {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  mobileBackgroundImage: string;
  ctaText: string;
  ctaHref: string;
}

export interface Certification {
  title: string;
  subtitle: string;
  image: string;
}

export interface Product {
  title: string;
  italicText: string;
  description: string;
  imageSrc: string;
  href: string;
}

export interface FeatureSection {
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  buttonHref?: string;
  isInverted: boolean;
  bgColor: string;
  textColor: string;
}

export interface ProjectShowcase {
  period: string;
  title: string;
  description: string;
  imageSrc: string;
  projectValue: string;
  projectLength: string;
  projectSlug: string;
}

export interface HomepageContent {
  hero: HeroSection;
  tagline: string;
  certifications: Certification[];
  products: Product[];
  features: FeatureSection[];
  showcase: ProjectShowcase;
}

// Types for About page content
export interface AboutHeroSection {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  mobileBackgroundImage: string;
  ctaText: string;
  ctaHref: string;
  breadcrumbsLeftPosition: string;
  breadcrumbsTopPosition: string;
}

export interface AboutFeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  image: string;
}

export interface ProfileCard {
  title: string;
  description: string | React.ReactNode; // Allow both string and ReactNode for misi list
  imageSrc: string;
  imageAlt: string;
  variant: 'primary' | 'secondary';
}

export interface CertificateSection {
  title: string;
  certificates: {
    id: number;
    title: string;
    image: string;
    fullImage: string;
  }[];
  isDefault?: boolean;
  large?: boolean;
  landscape?: boolean;
}

export interface AboutPageContent {
  hero: AboutHeroSection;
  mainTitle: string;
  features: AboutFeatureCard[];
  processSteps: ProcessStep[];
  profiles: {
    visi: ProfileCard;
    misi: ProfileCard;
  };
  certificateSections: CertificateSection[];
}

// Types for Insights page content
export interface InsightsHeroSection {
  backgroundImage: string;
  title: string;
  breadcrumbsTopPosition: string;
  breadcrumbsLeftPosition: string;
}

export interface Article {
  title: string;
  date: string;
  month: string;
  description: string;
  imageSrc: string;
  url: string;
}

export interface SideArticle {
  title: string;
  date: string;
  url: string;
}

export interface VideoSection {
  videoUrl: string;
  title: string;
  subtitle: string;
}

export interface InsightsPageContent {
  hero: InsightsHeroSection;
  featuredArticle: Article;
  sideArticles: SideArticle[];
  newsGrid: Article[];
  videoSection: VideoSection;
}

// Types for Projects page content
export interface ProjectsHeroSection {
  backgroundImage: string;
  experienceYears: string;
  experienceText: string;
  headline: string;
  description: string;
  breadcrumbsTopPosition: string;
  breadcrumbsLeftPosition: string;
}

export interface FeaturedProject {
  title: string;
  period: string;
  description: string;
  imageSrc: string;
  projectValue: string;
  projectValueText: string;
  roadLength: string;
  roadLengthText: string;
  buttonText: string;
  projectSlug: string;
}

export interface ProjectsCallToAction {
  title: string;
  buttonText: string;
  buttonHref: string;
}

export interface ProjectsPageContent {
  hero: ProjectsHeroSection;
  featuredProject: FeaturedProject;
  callToAction: ProjectsCallToAction;
  insightsSectionTitle: string;
}

// Types for Products page content
export interface ProductsHeroSection {
  backgroundImage: string;
  mobileBackgroundImage: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  breadcrumbsTopPosition: string;
  breadcrumbsLeftPosition: string;
}

export interface ProductsIntroSection {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface ServiceCard {
  imageSrc: string;
  title: string;
  description: string;
  italicWords?: string[];
  italicTitle?: boolean;
  imagePosition: 'top' | 'bottom';
}

export interface ProductsServicesSection {
  title: string;
  description: string;
  services: ServiceCard[];
}

export interface ProductsSupportLetterSection {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref: string;
}

export interface ProductsClippedSection {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface ProductsPageContent {
  hero: ProductsHeroSection;
  introduction: ProductsIntroSection;
  services: ProductsServicesSection;
  supportLetter: ProductsSupportLetterSection;
  clippedSection: ProductsClippedSection;
  insightsSectionTitle: string;
}

// Types for Gallery Projects
export interface GalleryProject {
  id?: number;
  title: string;
  category: string;
  image_url: string;
  client?: string;
  value?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  is_featured?: boolean;
  sort_order?: number;
  project_type?: string;
  slug?: string;
  location?: string;
  length?: string;
  detailed_description?: string[];
  specifications?: Record<string, unknown>;
  challenges?: string[];
  additional_images?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryData {
  categories: GalleryCategory[];
  projects: GalleryProject[];
}

// Types for Detailed Projects (separate from gallery projects)
export interface DetailedProject {
  id?: number;
  title: string;
  slug: string;
  period?: string;
  location?: string;
  client?: string;
  value?: string;
  length?: string;
  description?: string;
  detailed_description?: string[];
  specifications?: Array<{ title: string; value: string }>;
  challenges?: string[];
  images?: string[];
  category: string;
  image_url?: string;
  is_featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
  content_title?: string;
  specifications_title?: string;
  challenges_title?: string;
  insights_title?: string;
  image_source?: string;
  road_width?: string;
  funding_source?: string;
  execution_time?: string;
  maintenance_period?: string;
  contractor?: string;
  description_title?: string;
  project_info?: Array<{ key: string; value: string }>;
}

// Mixed project types for gallery display
export type MixedProject =
  | (GalleryProject & { projectType: 'gallery' })
  | (DetailedProject & { projectType: 'detailed' });

// Type guards for mixed projects
export const isGalleryProject = (project: MixedProject): project is GalleryProject & { projectType: 'gallery' } => {
  return project.projectType === 'gallery';
};

export const isDetailedProject = (project: MixedProject): project is DetailedProject & { projectType: 'detailed' } => {
  return project.projectType === 'detailed';
};

// Types for Insight Posts
export interface InsightPost {
  id?: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image_url?: string;
  author?: string;
  published_date?: string;
  category?: string;
  tags?: string[];
  is_featured?: boolean;
  is_published?: boolean;
  sort_order?: number;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

// Project display utilities
export interface ProjectDateInfo {
  startDate?: string;
  endDate?: string;
  period?: string;
}

// Common project fields for type safety
export interface BaseProject {
  id?: number;
  title: string;
  category: string;
  image_url?: string;
  client?: string;
  value?: string;
  description?: string;
  is_featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}
