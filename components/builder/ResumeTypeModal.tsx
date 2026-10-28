"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setResumeType, loadSampleData } from '@/lib/store/slices/resumeSlice';
import { setIsTypeModalOpen } from '@/lib/store/slices/uiSlice';
import { Dialog } from '@/components/ui/Dialog';
import { GraduationCap, Briefcase, Sparkles, Check } from 'lucide-react';

export const ResumeTypeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isTypeModalOpen);
  const currentType = useAppSelector((state) => state.resume.metadata.resumeType);

  const handleSelect = (type: 'fresher' | 'experienced', withSampleData: boolean = false) => {
    if (withSampleData) {
      dispatch(loadSampleData(type));
    } else {
      dispatch(setResumeType(type));
    }
    dispatch(setIsTypeModalOpen(false));
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => dispatch(setIsTypeModalOpen(false))}
      title="Select Your Career Stage"
      description="Choose your profile to optimize resume sections and ATS prioritization."
      maxWidth="lg"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {/* Fresher Card */}
        <div
          className={`p-5 rounded-xl border-2 transition text-left flex flex-col justify-between ${
            currentType === 'fresher'
              ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
          }`}
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Fresher / Graduate</h3>
              {currentType === 'fresher' && (
                <span className="p-0.5 rounded-full bg-indigo-600 text-white">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Designed for college students, new graduates, or entry-level career transitions. Highlights academic projects, technical skills, coursework, and certifications.
            </p>
          </div>

          <div className="mt-5 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleSelect('fresher', false)}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Select Fresher Mode
            </button>
            <button
              type="button"
              onClick={() => handleSelect('fresher', true)}
              className="w-full py-1.5 px-3 text-xs font-medium rounded-lg text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/60 dark:hover:bg-indigo-950/80 transition inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Start with Fresher Sample
            </button>
          </div>
        </div>

        {/* Experienced Card */}
        <div
          className={`p-5 rounded-xl border-2 transition text-left flex flex-col justify-between ${
            currentType === 'experienced'
              ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
          }`}
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Experienced Professional</h3>
              {currentType === 'experienced' && (
                <span className="p-0.5 rounded-full bg-indigo-600 text-white">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Engineered for professionals with employment history. Emphasizes quantifiable achievements, leadership, production system impact, and senior technical competencies.
            </p>
          </div>

          <div className="mt-5 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleSelect('experienced', false)}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-900 dark:hover:bg-slate-600 transition"
            >
              Select Experienced Mode
            </button>
            <button
              type="button"
              onClick={() => handleSelect('experienced', true)}
              className="w-full py-1.5 px-3 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Start with SDE Sample
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
