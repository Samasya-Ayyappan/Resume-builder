"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updateSummary } from '@/lib/store/slices/resumeSlice';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Sparkles } from 'lucide-react';

export const SummaryForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector((state) => state.resume.summary);
  const resumeType = useAppSelector((state) => state.resume.metadata.resumeType);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2 p-3 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-lg text-xs text-indigo-900 dark:text-indigo-200">
        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">
            {resumeType === 'fresher' ? 'Fresher Tip: ' : 'Experienced Tip: '}
          </span>
          {resumeType === 'fresher'
            ? 'Highlight your degree, primary technical stack, problem-solving mindset, and passion for learning.'
            : 'Highlight your total years of experience, primary domain impact, scalability achievements, and leadership.'}
        </div>
      </div>

      <RichTextEditor
        label="Professional Summary / Objective (Rich Text)"
        placeholder={
          resumeType === 'fresher'
            ? 'Recent Computer Science graduate with strong foundation in algorithms and full-stack development...'
            : 'Results-driven Senior Software Engineer with 6+ years specializing in distributed systems...'
        }
        value={summary}
        onChange={(val) => dispatch(updateSummary(val))}
        helperText="A crisp 2-4 sentence summary grabs recruiter attention in 6 seconds. Bold keywords to highlight core strengths."
      />
    </div>
  );
};
