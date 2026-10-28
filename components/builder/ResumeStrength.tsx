"use client";

import React from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { calculateResumeStrength } from '@/lib/utils/validation';
import { CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export const ResumeStrength: React.FC = () => {
  const resumeData = useAppSelector((state) => state.resume);
  const { score, grade, suggestions } = calculateResumeStrength(resumeData);

  const getScoreColor = () => {
    if (score >= 85) return 'bg-emerald-500 text-emerald-700';
    if (score >= 70) return 'bg-indigo-500 text-indigo-700';
    if (score >= 45) return 'bg-amber-500 text-amber-700';
    return 'bg-rose-500 text-rose-700';
  };

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-700 dark:text-slate-300 tracking-wider">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Resume Strength</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {grade}
          </span>
          <span className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">{score}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${getScoreColor().split(' ')[0]}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 ? (
        <div className="space-y-1 pt-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Suggested Improvements:
          </span>
          {suggestions.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Excellent! All core resume sections are thoroughly completed.</span>
        </div>
      )}
    </div>
  );
};
