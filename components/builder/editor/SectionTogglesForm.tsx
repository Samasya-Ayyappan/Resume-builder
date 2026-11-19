"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSection } from '@/lib/store/slices/resumeSlice';
import { ActiveSectionsConfig } from '@/lib/types/resume';
import { Eye, EyeOff } from 'lucide-react';

export const SectionTogglesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeSections = useAppSelector((state) => state.resume.activeSections);

  const sectionsToToggle: { key: keyof ActiveSectionsConfig; label: string }[] = [
    { key: 'experience', label: 'Work Experience' },
    { key: 'projects', label: 'Technical Projects' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'languages', label: 'Spoken Languages' },
    { key: 'achievements', label: 'Honors & Achievements' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Show or hide sections on your resume. Hidden sections will not appear on your exported PDF or resume preview:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {sectionsToToggle.map(({ key, label }) => {
          const isActive = activeSections[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => dispatch(toggleSection(key))}
              className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition cursor-pointer shadow-2xs ${
                isActive
                  ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-600'
                  : 'border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                {isActive ? (
                  <Eye className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                ) : (
                  <EyeOff className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                )}
                <span className={isActive ? '' : 'line-through'}>{label}</span>
              </span>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    : 'bg-transparent text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800'
                }`}
              >
                {isActive ? 'Visible' : 'Hidden'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

