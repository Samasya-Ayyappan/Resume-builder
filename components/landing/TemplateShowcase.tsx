import React from 'react';
import Link from 'next/link';
import { AVAILABLE_TEMPLATES } from '@/lib/types/template';
import { Check, ArrowRight } from 'lucide-react';

export const TemplateShowcase: React.FC = () => {
  return (
    <section id="templates" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
            Curated Templates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Designed to Pass Recruiter Screeners
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Switch between layouts anytime with a single click. Your entered information never gets lost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AVAILABLE_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                    {tpl.previewBadge}
                  </span>
                  <span className="text-xs text-slate-400 capitalize">
                    {tpl.recommendedFor === 'all' ? 'All Roles' : `${tpl.recommendedFor} Focus`}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{tpl.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{tpl.tagline}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">{tpl.description}</p>

                {/* Features list */}
                <div className="mt-5 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                  {tpl.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/builder"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 dark:bg-indigo-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-700 transition"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
