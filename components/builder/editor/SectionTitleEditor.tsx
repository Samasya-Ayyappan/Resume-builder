"use client";

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updateSectionTitle } from '@/lib/store/slices/resumeSlice';
import { SectionTitles, DEFAULT_SECTION_TITLES } from '@/lib/types/resume';
import { Pencil, Check, X } from 'lucide-react';

interface SectionTitleEditorProps {
  sectionKey: keyof SectionTitles;
  className?: string;
}

export const SectionTitleEditor: React.FC<SectionTitleEditorProps> = ({
  sectionKey,
  className = '',
}) => {
  const dispatch = useAppDispatch();
  const currentTitle =
    useAppSelector((state) => state.resume.sectionTitles?.[sectionKey]) ||
    DEFAULT_SECTION_TITLES[sectionKey];

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(currentTitle);

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftTitle(currentTitle);
    setIsEditing(true);
  };

  const handleSave = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.stopPropagation();
    if (draftTitle.trim()) {
      dispatch(updateSectionTitle({ section: sectionKey, title: draftTitle.trim() }));
    }
    setIsEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDraftTitle(currentTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div
        className={`flex items-center gap-1.5 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="text-xs font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-indigo-500 rounded px-2 py-1 shadow-2xs focus:outline-none"
          aria-label={`Edit ${currentTitle} title`}
        />
        <button
          type="button"
          onClick={handleSave}
          aria-label="Save section title"
          title="Save title"
          className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-2xs"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          aria-label="Cancel editing"
          title="Cancel"
          className="p-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{currentTitle}</span>
      <button
        type="button"
        onClick={handleStartEdit}
        aria-label={`Edit ${currentTitle} section title`}
        title={`Edit "${currentTitle}" heading`}
        className="p-1 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <Pencil className="w-3 h-3" />
      </button>
    </div>
  );
};
