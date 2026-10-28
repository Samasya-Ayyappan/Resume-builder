export type ResumeType = 'fresher' | 'experienced';

export type TemplateId = 'modern' | 'classic' | 'minimal';

export type ThemeColor = 'slate' | 'indigo' | 'emerald' | 'crimson' | 'navy' | 'amber';

export interface ThemeConfig {
  id: ThemeColor;
  label: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  border: string;
  text: string;
}

export interface SectionTitles {
  summary: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  certifications: string;
  languages: string;
  achievements: string;
}

export const DEFAULT_SECTION_TITLES: SectionTitles = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills & Competencies',
  projects: 'Technical Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  achievements: 'Honors & Achievements',
};

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string; // YYYY-MM or legacy formatted string
  endDate: string; // YYYY-MM or 'Present' or legacy formatted string
  isCurrent: boolean;
  description: string; // Rich-text HTML or plain text
  highlights: string[]; // Rich-text HTML bullet points or plain text
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string; // School location (e.g. Seattle, WA)
  startDate: string; // YYYY-MM or year
  endDate: string; // YYYY-MM or year
  gpa?: string;
  honors?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  date?: string;
  description: string;
}

export interface ActiveSectionsConfig {
  experience: boolean;
  projects: boolean;
  certifications: boolean;
  languages: boolean;
  achievements: boolean;
}

export interface ResumeMetadata {
  id: string;
  title: string;
  resumeType: ResumeType;
  selectedTemplate: TemplateId;
  themeColor: ThemeColor;
  lastModified: number;
  version: number;
}

export interface ResumeData {
  metadata: ResumeMetadata;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  achievements: AchievementItem[];
  activeSections: ActiveSectionsConfig;
  sectionTitles?: SectionTitles;
}
