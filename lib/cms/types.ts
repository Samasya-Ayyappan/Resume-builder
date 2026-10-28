import { TemplateDefinition } from '../types/template';

export interface CMSLandingHero {
  badge: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  trustPoints: string[];
}

export interface CMSFeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CMSLandingContent {
  hero: CMSLandingHero;
  features: CMSFeatureCard[];
  templatesSectionTitle: string;
  templatesSectionSubtitle: string;
}

export interface CMSTemplateCollection {
  templates: TemplateDefinition[];
}
