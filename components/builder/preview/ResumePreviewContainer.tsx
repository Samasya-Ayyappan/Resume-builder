"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { setZoomLevel } from '@/lib/store/slices/uiSlice';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ResumePreviewContainerProps {
  documentRef?: React.RefObject<HTMLDivElement | null>;
}

// Standard A4 dimensions in pixels at 96 DPI (210mm x 297mm)
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export const ResumePreviewContainer: React.FC<ResumePreviewContainerProps> = ({ documentRef: externalRef }) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const activeRef = externalRef || internalRef;
  const containerRef = useRef<HTMLDivElement>(null);

  const resumeData = useAppSelector((state) => state.resume);
  const zoomLevel = useAppSelector((state) => state.ui.zoomLevel);
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const dispatch = useAppDispatch();

  const [hasUserAdjustedZoom, setHasUserAdjustedZoom] = useState(false);
  const [docHeight, setDocHeight] = useState<number>(A4_HEIGHT_PX);
  const [docWidth, setDocWidth] = useState<number>(A4_WIDTH_PX);

  // Measure rendered document dimensions dynamically
  useEffect(() => {
    const el = activeRef.current;
    if (!el) return;

    const updateDimensions = () => {
      if (el) {
        setDocHeight(Math.max(A4_HEIGHT_PX, el.offsetHeight));
        setDocWidth(el.offsetWidth || A4_WIDTH_PX);
      }
    };

    updateDimensions();

    const ro = new ResizeObserver(() => {
      updateDimensions();
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [activeRef, resumeData]);

  // Compute scale factor to fit current container width
  const calculateFitScale = useCallback(() => {
    if (!containerRef.current) return 1;
    const containerWidth = containerRef.current.clientWidth;
    if (containerWidth <= 0) return 1;

    // Use smaller padding on mobile devices for maximum readability
    const padding = containerWidth < 640 ? 20 : 48;
    const availableWidth = Math.max(120, containerWidth - padding);
    const targetDocWidth = docWidth > 0 ? docWidth : A4_WIDTH_PX;

    const scale = availableWidth / targetDocWidth;
    // On screens where available width accommodates 100% A4, use 1.0 (100%)
    if (scale >= 1) {
      return 1;
    }
    // On small screens / mobile, scale down to fit width (min 0.30, max 1.0)
    return Math.min(1, Math.max(0.3, Number(scale.toFixed(2))));
  }, [docWidth]);

  // Auto-fit to width on initial mount, container resize, or when switching to 'preview' tab on mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleAutoFit = () => {
      if (!hasUserAdjustedZoom && el.clientWidth > 0) {
        const fitScale = calculateFitScale();
        dispatch(setZoomLevel(fitScale));
      }
    };

    const raf = requestAnimationFrame(handleAutoFit);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && !hasUserAdjustedZoom) {
          const fitScale = calculateFitScale();
          dispatch(setZoomLevel(fitScale));
        }
      }
    });

    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [activeTab, calculateFitScale, dispatch, hasUserAdjustedZoom]);

  // Touch pinch-to-zoom handlers for mobile/tablet screens
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(1);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartZoomRef.current = zoomLevel;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDistRef.current;
      const targetZoom = Number((touchStartZoomRef.current * factor).toFixed(2));
      const clampedZoom = Math.min(1.8, Math.max(0.3, targetZoom));
      dispatch(setZoomLevel(clampedZoom));
      setHasUserAdjustedZoom(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      touchStartDistRef.current = null;
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 1.8) {
      dispatch(setZoomLevel(Math.min(1.8, Number((zoomLevel + 0.1).toFixed(2)))));
      setHasUserAdjustedZoom(true);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.3) {
      dispatch(setZoomLevel(Math.max(0.3, Number((zoomLevel - 0.1).toFixed(2)))));
      setHasUserAdjustedZoom(true);
    }
  };

  const handleFitWidth = () => {
    const fitScale = calculateFitScale();
    dispatch(setZoomLevel(fitScale));
    setHasUserAdjustedZoom(false);
  };

  const handleZoom100 = () => {
    dispatch(setZoomLevel(1));
    setHasUserAdjustedZoom(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-100/80 dark:bg-slate-950/80 border-l border-slate-200 dark:border-slate-800 transition-colors">
      {/* Zoom and status bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 print:hidden transition-colors">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300 hidden sm:inline">Canvas:</span>
          <span className="capitalize font-medium text-indigo-600 dark:text-indigo-400">
            {resumeData.metadata.selectedTemplate}
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden md:inline">•</span>
          <span className="text-slate-500 dark:text-slate-400 hidden md:inline">Standard A4</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.3}
            className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded transition disabled:opacity-30 cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleFitWidth}
            className="px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 min-w-[2.75rem] text-center rounded hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer"
            title="Current Zoom (Click to Fit to Width)"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 1.8}
            className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded transition disabled:opacity-30 cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleFitWidth}
            className="px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded transition flex items-center gap-1 cursor-pointer"
            title="Fit to Width"
            aria-label="Fit to Width"
          >
            <Maximize2 className="w-3 h-3 hidden xs:inline" />
            <span>Fit</span>
          </button>
          <button
            type="button"
            onClick={handleZoom100}
            className="px-1.5 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded transition cursor-pointer"
            title="Reset to 100% Size"
            aria-label="Reset to 100% Size"
          >
            100%
          </button>
        </div>
      </div>

      {/* Scrollable preview canvas */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 overflow-auto p-2.5 sm:p-6 lg:p-8 flex justify-start sm:justify-center items-start print:p-0 print:overflow-visible touch-pan-y"
      >
        <div
          className="mx-auto shrink-0 relative transition-all duration-150 ease-out print:w-full print:m-0"
          style={{
            width: `${Math.round(docWidth * zoomLevel)}px`,
            minHeight: `${Math.round(A4_HEIGHT_PX * zoomLevel)}px`,
            height: `${Math.round(docHeight * zoomLevel)}px`,
          }}
        >
          <div
            style={{
              width: `${docWidth}px`,
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
              transition: 'transform 0.15s ease-out',
            }}
            className="print:transform-none print:w-full"
          >
            {/* Authentic white A4 resume paper canvas: always protected from dark mode inversion */}
            <div
              id="resume-document-to-export"
              ref={activeRef}
              className="w-[210mm] min-h-[297mm] shrink-0 mx-auto bg-white text-slate-900 shadow-2xl rounded-xs overflow-visible border border-slate-200/60 print:shadow-none print:border-none print:w-full print:m-0"
            >
              <TemplateRenderer data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
