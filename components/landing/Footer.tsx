import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">
                RS
              </span>
              <span className="font-extrabold text-lg text-white tracking-tight">Resume Studio</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A production-oriented Next.js application built with strict TypeScript, Redux Toolkit,
              Tailwind CSS, and local browser persistence. Designed as a showcase piece for Software Development Engineer portfolios.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/builder" className="hover:text-white transition">
                  Create Resume
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">
                  Core Features
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-white transition">
                  ATS Templates
                </a>
              </li>
            </ul>
          </div>

          {/* Technology stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Architecture Stack</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Next.js App Router (v16)</li>
              <li>React 19 & TypeScript Strict</li>
              <li>Redux Toolkit State</li>
              <li>Tailwind CSS Styling</li>
              <li>Client-Side PDF Generation</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} Resume Studio. Open architecture for portfolio showcase.</div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-medium">✓ Client-Side Privacy First</span>
            <span>No Cookies or Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
