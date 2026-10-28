"use client";

import React, { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { setZoomLevel } from '@/lib/store/slices/uiSlice';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ResumePreviewContainerProps {
  documentRef?: React.RefObject<HTMLDivElement | null>;
}

export const ResumePreviewContainer: React.FC<ResumePreviewContainerProps> = ({ documentRef: externalRef }) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const activeRef = externalRef || internalRef;

  const resumeData = useAppSelector((state) => state.resume);
  const zoomLevel = useAppSelector((state) => state.ui.zoomLevel);
  const dispatch = useAppDispatch();

  const handleZoomIn = () => {
    if (zoomLevel < 1.3) dispatch(setZoomLevel(Math.min(1.3, Number((zoomLevel + 0.1).toFixed(1)))));
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.6) dispatch(setZoomLevel(Math.max(0.6, Number((zoomLevel - 0.1).toFixed(1)))));
  };

  const handleZoomReset = () => {
    dispatch(setZoomLevel(1));
  };

  return (
    <div className="flex flex-col h-full bg-slate-100/80 dark:bg-slate-950/80 border-l border-slate-200 dark:border-slate-800 transition-colors">
      {/* Zoom and status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 print:hidden transition-colors">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Document Canvas:</span>
          <span className="capitalize font-medium text-indigo-600 dark:text-indigo-400">
            {resumeData.metadata.selectedTemplate} Template
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-slate-500 dark:text-slate-400">Standard A4 Format</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.6}
            className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded transition disabled:opacity-40"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 min-w-[3rem] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 1.3}
            className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded transition disabled:opacity-40"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomReset}
            className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded transition"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable preview canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start print:p-0 print:overflow-visible">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="print:transform-none"
        >
          {/* Authentic white A4 resume paper canvas: always protected from dark mode inversion */}
          <div
            id="resume-document-to-export"
            ref={activeRef}
            className="w-[210mm] min-h-[297mm] max-w-full mx-auto bg-white text-slate-900 shadow-2xl rounded-xs transition-all overflow-visible border border-slate-200/60 print:shadow-none print:border-none print:w-full print:m-0"
          >
            <TemplateRenderer data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};
