import { TemplateId, ResumeType } from './resume';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  recommendedFor: ResumeType | 'all';
  previewBadge: string;
  features: string[];
}

export const AVAILABLE_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'modern',
    name: 'Modern Tech',
    tagline: 'Clean, contemporary layout designed for technology and modern corporate roles',
    description: 'Polished sans-serif layout with accent color banners, pill skills badges, and crisp section dividers.',
    recommendedFor: 'all',
    previewBadge: 'Most Popular',
    features: ['Accent headers', 'Skill tags', 'Compact layout', 'ATS-compliant'],
  },
  {
    id: 'classic',
    name: 'Executive Classic',
    tagline: 'Traditional Harvard & Ivy-League style for finance, law, academia, and enterprise',
    description: 'Timeless serif typography, centered contact bar, traditional horizontal dividers, and elegant hierarchy.',
    recommendedFor: 'experienced',
    previewBadge: 'Corporate Standard',
    features: ['Serif typography', 'Centered header', 'Formal hierarchy', 'Maximum ATS score'],
  },
  {
    id: 'minimal',
    name: 'Minimalist Clean',
    tagline: 'Ultra-clean Swiss design with modern typography and structured white space',
    description: 'Two-tone layout with left contact & skills sidebar and spacious main experience column.',
    recommendedFor: 'fresher',
    previewBadge: 'High Readability',
    features: ['Sidebar layout', 'Spacious reading flow', 'Project highlights', 'Visual balance'],
  },
];
