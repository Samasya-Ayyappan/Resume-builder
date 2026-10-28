import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-16 pb-20 sm:pt-24 sm:pb-28 transition-colors">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-100/40 to-sky-100/30 dark:from-indigo-950/20 dark:to-red-950/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Tailored for Freshers & Experienced Engineers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-[1.12]">
              Build an ATS-Ready Resume That Gets You{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-sky-600 dark:from-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
                Hired Faster
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Stop fighting with Word documents and broken formatting. Resume Studio gives you real-time
              live previews, role-specific schemas, curated typography, and instant PDF download — with zero
              account required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>Create Resume Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition"
              >
                Explore Templates
              </a>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 pt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                No registration required
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                Saved privately in your browser
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Real-time split preview
              </span>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative behind card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-2xl blur-lg opacity-20 -z-10" />

              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xl space-y-4">
                {/* Header mock */}
                <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400">live_preview.a4</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                    ATS Score: 96%
                  </span>
                </div>

                {/* Document miniature (Always white paper) */}
                <div className="aspect-[8.5/11] bg-white text-slate-900 rounded-lg p-5 border border-slate-200 space-y-3 font-sans text-left shadow-xs">
                  <div className="border-b border-indigo-100 pb-2">
                    <div className="text-sm font-extrabold text-slate-900">Alex Morgan</div>
                    <div className="text-[11px] font-semibold text-indigo-600">Software Development Engineer</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">alex.morgan@dev • Seattle, WA • github/alexmorgan</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Summary</div>
                    <div className="mt-1 h-1.5 w-full rounded bg-slate-200" />
                    <div className="mt-1 h-1.5 w-4/5 rounded bg-slate-200" />
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Technical Experience</div>
                    <div className="mt-1 flex justify-between text-[10px] font-semibold text-slate-700">
                      <span>TechWave Solutions</span>
                      <span className="text-[9px] text-slate-400 font-normal">2024 - Present</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded bg-slate-200" />
                    <div className="mt-1 h-1.5 w-5/6 rounded bg-slate-200" />
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Key Projects</div>
                    <div className="mt-1 h-1.5 w-3/4 rounded bg-slate-200" />
                    <div className="mt-1 flex gap-1">
                      <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1 py-0.5 rounded">TypeScript</span>
                      <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1 py-0.5 rounded">Next.js</span>
                      <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1 py-0.5 rounded">Docker</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Education</div>
                    <div className="mt-1 h-1.5 w-2/3 rounded bg-slate-200" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>Interactive Split Studio</span>
                  <Link href="/builder" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Open in Studio →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
