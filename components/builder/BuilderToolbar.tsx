"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  setTemplate,
  setThemeColor,
  resetResume,
  loadSampleData,
} from '@/lib/store/slices/resumeSlice';
import {
  setIsTypeModalOpen,
  setIsExportingPdf,
  setIsResetConfirmOpen,
} from '@/lib/store/slices/uiSlice';
import { AVAILABLE_TEMPLATES } from '@/lib/types/template';
import { THEME_CONFIGS } from '@/lib/constants/themes';
import { TemplateId, ThemeColor } from '@/lib/types/resume';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { exportResumeToPdf, triggerNativePrint } from '@/lib/utils/pdfExport';
import {
  Download,
  Printer,
  RotateCcw,
  Sparkles,
  LayoutTemplate,
  Palette,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface BuilderToolbarProps {
  documentRef?: React.RefObject<HTMLDivElement | null>;
}

export const BuilderToolbar: React.FC<BuilderToolbarProps> = ({ documentRef }) => {
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resume);
  const isResetOpen = useAppSelector((state) => state.ui.isResetConfirmOpen);
  const isExporting = useAppSelector((state) => state.ui.isExportingPdf);

  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    if (isExporting) return; // Prevent duplicate clicks

    const el = documentRef?.current || document.getElementById('resume-document-to-export');
    if (!el) {
      setErrorMessage('Could not locate the resume document element to export.');
      return;
    }

    dispatch(setIsExportingPdf(true));
    setErrorMessage(null);

    try {
      const sanitizedName = resume.personalInfo.fullName
        ? `${resume.personalInfo.fullName.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}_Resume`
        : 'Resume';

      const result = await exportResumeToPdf(el, sanitizedName);

      if (result.success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      } else {
        setErrorMessage(result.error || 'Failed to generate PDF document.');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred during export.');
    } finally {
      dispatch(setIsExportingPdf(false));
    }
  };

  const handleConfirmReset = () => {
    dispatch(resetResume(resume.metadata.resumeType));
    dispatch(setIsResetConfirmOpen(false));
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-2xs print:hidden transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left section: App Brand, Mode badge & Saved indicator */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2"
            >
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-2xs">
                RS
              </span>
              <span className="hidden xs:inline">Resume Studio</span>
            </Link>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            {/* Mode Toggle Button */}
            <button
              type="button"
              onClick={() => dispatch(setIsTypeModalOpen(true))}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Change Career Stage"
            >
              <span>{resume.metadata.resumeType === 'fresher' ? '🎓 Fresher' : '💼 Experienced'}</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 underline">Switch</span>
            </button>

            {/* Saved in browser indicator */}
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Saved in browser</span>
            </span>
          </div>

          {/* Right controls: Theme, Colors, Templates, PDF Download */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Template Selector */}
            <div className="flex items-center gap-1.5">
              <LayoutTemplate className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              <select
                aria-label="Select resume template"
                value={resume.metadata.selectedTemplate}
                onChange={(e) => dispatch(setTemplate(e.target.value as TemplateId))}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-2xs focus:border-indigo-500 focus:outline-none"
              >
                {AVAILABLE_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Accent Color Picker (Independent of App Light/Dark theme) */}
            <div className="flex items-center gap-1 border-l border-r border-slate-200 dark:border-slate-800 px-2">
              <Palette className="w-3.5 h-3.5 text-slate-400 hidden xl:block mr-0.5" />
              {(Object.keys(THEME_CONFIGS) as ThemeColor[]).map((cKey) => {
                const config = THEME_CONFIGS[cKey];
                const isSelected = resume.metadata.themeColor === cKey;
                return (
                  <button
                    key={cKey}
                    type="button"
                    onClick={() => dispatch(setThemeColor(cKey))}
                    title={`Accent: ${config.label}`}
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full transition-transform ${
                      isSelected
                        ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900 scale-110'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: config.primary }}
                    aria-label={`Select ${config.label} accent`}
                  />
                );
              })}
            </div>

            {/* Light / Dark / System Theme Toggle */}
            <ThemeToggle />

            {/* Sample Data Loader */}
            <button
              type="button"
              onClick={() => dispatch(loadSampleData(resume.metadata.resumeType))}
              className="text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition inline-flex items-center gap-1"
              title="Load demo data for this profile"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Sample</span>
            </button>

            {/* Reset Resume */}
            <button
              type="button"
              onClick={() => dispatch(setIsResetConfirmOpen(true))}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
              title="Reset Resume"
              aria-label="Reset Resume"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Native Browser Print */}
            <Button
              variant="outline"
              size="sm"
              onClick={triggerNativePrint}
              leftIcon={<Printer className="w-3.5 h-3.5" />}
              className="hidden md:inline-flex"
              title="Open System Print Dialog"
            >
              Print
            </Button>

            {/* PDF Export Download */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadPdf}
              isLoading={isExporting}
              disabled={isExporting}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              {isExporting ? 'Generating PDF...' : downloadSuccess ? 'Downloaded!' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </header>

      {/* Error notification banner / modal */}
      {errorMessage && (
        <div className="bg-rose-50 dark:bg-rose-950/60 border-b border-rose-200 dark:border-rose-800 px-4 py-2.5 text-xs text-rose-800 dark:text-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span><strong>PDF Export Error:</strong> {errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-700 dark:text-rose-300 font-semibold underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      <Dialog
        isOpen={isResetOpen}
        onClose={() => dispatch(setIsResetConfirmOpen(false))}
        title="Start a New Resume?"
        description="Are you sure you want to clear your current progress? This action will erase your entered details from the browser."
      >
        <div className="flex items-start gap-3 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900 rounded-lg text-xs text-rose-800 dark:text-rose-300 mb-4">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>
            This action cannot be undone. Make sure you have downloaded your PDF before starting fresh.
          </span>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(setIsResetConfirmOpen(false))}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleConfirmReset}
          >
            Yes, Clear & Start Fresh
          </Button>
        </div>
      </Dialog>
    </>
  );
};
