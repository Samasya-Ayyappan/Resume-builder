import React from 'react';
import { Eye, GraduationCap, LayoutTemplate, ShieldCheck, Download, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    title: 'Real-Time Live Preview',
    description:
      'Type into structured forms and see changes render instantly in a realistic A4 document view side-by-side.',
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: 'Fresher & Experienced Modes',
    description:
      'Switch between dedicated schemas tailored for new grads (projects, education, coursework) and experienced professionals (quantified metrics, career progression).',
  },
  {
    icon: <LayoutTemplate className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
    title: 'ATS-Optimized Formatting',
    description:
      'Clean semantic hierarchies, single or two-column reading paths, and standard fonts designed to cruise through applicant tracking algorithms.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    title: 'Local Browser Persistence',
    description:
      'Zero account creation needed. Your resume details are automatically preserved in browser storage so you can resume work anytime.',
  },
  {
    icon: <Download className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    title: 'High-Resolution PDF Download',
    description:
      '1-click crisp vector PDF generation with automatic multi-page calculation and support for native print output.',
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
    title: 'Real-Time Resume Strength',
    description:
      'Actionable completeness checklist and score guidance that directs you to high-impact improvements before applying.',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
            Engineered for Job Seekers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Everything You Need to Stand Out
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            A fast, modern resume engineering tool built to help you craft a standout CV without
            wrestling with design software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-2xs">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
