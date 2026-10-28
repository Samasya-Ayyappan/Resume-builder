"use client";

import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setActiveTab } from '@/lib/store/slices/uiSlice';
import { BuilderToolbar } from './BuilderToolbar';
import { ResumeStrength } from './ResumeStrength';
import { ResumeTypeModal } from './ResumeTypeModal';
import { ResumePreviewContainer } from './preview/ResumePreviewContainer';
import { PersonalInfoForm } from './editor/PersonalInfoForm';
import { SummaryForm } from './editor/SummaryForm';
import { ExperienceForm } from './editor/ExperienceForm';
import { EducationForm } from './editor/EducationForm';
import { SkillsForm } from './editor/SkillsForm';
import { ProjectsForm } from './editor/ProjectsForm';
import { CertificationsForm } from './editor/CertificationsForm';
import { AdditionalSectionsForm } from './editor/AdditionalSectionsForm';
import { SectionTitleEditor } from './editor/SectionTitleEditor';
import {
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Settings,
  ChevronDown,
  ChevronUp,
  FileText,
  Eye,
} from 'lucide-react';
import { SectionTitles } from '@/lib/types/resume';

export const BuilderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const documentRef = useRef<HTMLDivElement>(null);

  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const resume = useAppSelector((state) => state.resume);

  // Accordion open/close state for editor sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: resume.metadata.resumeType === 'experienced',
    education: true,
    skills: true,
    projects: resume.metadata.resumeType === 'fresher',
    certifications: false,
    additional: false,
  });

  const toggleSectionAccordion = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionsList: {
    id: string;
    sectionKey?: keyof SectionTitles;
    defaultTitle: string;
    icon: React.ReactNode;
    component: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'personal',
      defaultTitle: 'Personal Information',
      icon: <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      component: <PersonalInfoForm />,
      badge: 'Required',
    },
    {
      id: 'summary',
      sectionKey: 'summary',
      defaultTitle: 'Professional Summary',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      component: <SummaryForm />,
      badge: resume.summary.length > 50 ? 'Complete' : 'Recommended',
    },
    {
      id: 'experience',
      sectionKey: 'experience',
      defaultTitle: 'Work Experience',
      icon: <Briefcase className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
      component: <ExperienceForm />,
      badge: resume.experience.length > 0 ? `${resume.experience.length} entries` : undefined,
    },
    {
      id: 'education',
      sectionKey: 'education',
      defaultTitle: 'Education',
      icon: <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      component: <EducationForm />,
      badge: resume.education.length > 0 ? `${resume.education.length} entries` : undefined,
    },
    {
      id: 'skills',
      sectionKey: 'skills',
      defaultTitle: 'Skills & Competencies',
      icon: <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      component: <SkillsForm />,
      badge: `${resume.skills.reduce((acc, c) => acc + c.skills.length, 0)} skills`,
    },
    {
      id: 'projects',
      sectionKey: 'projects',
      defaultTitle: 'Technical Projects',
      icon: <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      component: <ProjectsForm />,
      badge: resume.projects.length > 0 ? `${resume.projects.length} projects` : undefined,
    },
    {
      id: 'certifications',
      sectionKey: 'certifications',
      defaultTitle: 'Certifications',
      icon: <Award className="w-4 h-4 text-orange-500" />,
      component: <CertificationsForm />,
      badge: resume.certifications.length > 0 ? `${resume.certifications.length}` : undefined,
    },
    {
      id: 'additional',
      sectionKey: 'languages',
      defaultTitle: 'Languages & Section Toggles',
      icon: <Settings className="w-4 h-4 text-slate-600 dark:text-slate-400" />,
      component: <AdditionalSectionsForm />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <BuilderToolbar documentRef={documentRef} />
      <ResumeTypeModal />

      {/* Mobile/Tablet tab switcher (Sticky on mobile) */}
      <div className="lg:hidden sticky top-[57px] z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-center gap-2 print:hidden transition-colors">
        <button
          type="button"
          onClick={() => dispatch(setActiveTab('edit'))}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'edit'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Editor Form</span>
        </button>

        <button
          type="button"
          onClick={() => dispatch(setActiveTab('preview'))}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'preview'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Studio Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Form Editor */}
        <div
          className={`w-full lg:w-[48%] xl:w-[45%] lg:shrink-0 h-[calc(100vh-61px)] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 print:hidden ${
            activeTab === 'edit' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Strength Meter */}
          <ResumeStrength />

          {/* Section Accordions */}
          <div className="space-y-3 pb-16">
            {sectionsList.map((sec) => {
              const isOpen = !!openSections[sec.id];
              return (
                <div
                  key={sec.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden transition-colors"
                >
                  <div className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition">
                    <div className="flex-1 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => toggleSectionAccordion(sec.id)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none transition cursor-pointer"
                        aria-label={isOpen ? `Collapse ${sec.defaultTitle}` : `Expand ${sec.defaultTitle}`}
                      >
                        {sec.icon}
                      </button>
                      {sec.sectionKey ? (
                        <SectionTitleEditor sectionKey={sec.sectionKey} />
                      ) : (
                        <span
                          onClick={() => toggleSectionAccordion(sec.id)}
                          className="font-bold text-sm text-slate-800 dark:text-slate-100 cursor-pointer select-none"
                        >
                          {sec.defaultTitle}
                        </span>
                      )}
                      {sec.badge && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ml-1">
                          {sec.badge}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSectionAccordion(sec.id)}
                      className="text-slate-400 p-1 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none cursor-pointer"
                      aria-label={isOpen ? `Collapse ${sec.defaultTitle}` : `Expand ${sec.defaultTitle}`}
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800">
                      {sec.component}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Document Preview */}
        <div
          className={`w-full lg:w-[52%] xl:w-[55%] h-[calc(100vh-61px)] overflow-auto ${
            activeTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ResumePreviewContainer documentRef={documentRef} />
        </div>
      </div>
    </div>
  );
};
