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
