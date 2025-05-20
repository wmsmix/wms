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
  italicText?: string;
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
  isInverted?: boolean;
  bgColor?: string;
  textColor?: string;
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
