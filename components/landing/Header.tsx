import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-black text-sm shadow-2xs">
            RS
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-slate-100 block leading-tight">
              Resume Studio
            </span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 block tracking-wider uppercase -mt-0.5">
              Production Next.js
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Features
          </a>
          <a href="#templates" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Templates
          </a>
          <a href="#workflows" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Fresher vs Experienced
          </a>
        </nav>

        {/* Theme Toggle & Action Button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/builder"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Resume Now →
          </Link>
        </div>
      </div>
    </header>
  );
};
