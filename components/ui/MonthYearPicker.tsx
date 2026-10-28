"use client";

import React, { useId } from 'react';

export interface MonthYearPickerProps {
  label?: string;
  value: string; // Stored in YYYY-MM format or legacy string
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  minDate?: string; // YYYY-MM
  placeholder?: string;
}

const MONTHS = [
  { value: '01', label: 'Jan' },
  { value: '02', label: 'Feb' },
  { value: '03', label: 'Mar' },
  { value: '04', label: 'Apr' },
  { value: '05', label: 'May' },
  { value: '06', label: 'Jun' },
  { value: '07', label: 'Jul' },
  { value: '08', label: 'Aug' },
  { value: '09', label: 'Sep' },
  { value: '10', label: 'Oct' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dec' },
];

/**
 * Parses YYYY-MM or legacy "Month Year" into { year, month }
 */
export function parseStoredDate(dateStr: string): { year: string; month: string } {
  if (!dateStr || dateStr.toLowerCase() === 'present') {
    return { year: '', month: '' };
  }

  // Check YYYY-MM
  const yyyyMmMatch = /^(\d{4})-(\d{2})$/.exec(dateStr.trim());
  if (yyyyMmMatch) {
    return { year: yyyyMmMatch[1], month: yyyyMmMatch[2] };
  }

  // Check Year only
  if (/^\d{4}$/.test(dateStr.trim())) {
    return { year: dateStr.trim(), month: '' };
  }

  // Check legacy e.g. "Jan 2023" or "January 2023"
  const legacyMatch = /^([A-Za-z]+)\s+(\d{4})$/.exec(dateStr.trim());
  if (legacyMatch) {
    const monthName = legacyMatch[1].toLowerCase().substring(0, 3);
    const foundMonth = MONTHS.find((m) => m.label.toLowerCase() === monthName);
    return { year: legacyMatch[2], month: foundMonth ? foundMonth.value : '' };
  }

  return { year: '', month: '' };
}

/**
 * Formats a date string (YYYY-MM or legacy) for display on the resume
 */
export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  if (dateStr.toLowerCase() === 'present') return 'Present';

  const yyyyMmMatch = /^(\d{4})-(\d{2})$/.exec(dateStr.trim());
  if (yyyyMmMatch) {
    const year = yyyyMmMatch[1];
    const monthNum = yyyyMmMatch[2];
    const monthObj = MONTHS.find((m) => m.value === monthNum);
    return monthObj ? `${monthObj.label} ${year}` : `${monthNum}/${year}`;
  }

  return dateStr;
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  error,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 45 }, (_, i) => String(currentYear + 2 - i));
  const monthId = useId();
  const yearId = useId();

  const { year: parsedYear, month: parsedMonth } = parseStoredDate(value);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    if (!newMonth && !parsedYear) {
      onChange('');
    } else if (newMonth && !parsedYear) {
      onChange(`${currentYear}-${newMonth}`);
    } else if (parsedYear) {
      onChange(`${parsedYear}-${newMonth}`);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    if (!newYear && !parsedMonth) {
      onChange('');
    } else if (newYear && !parsedMonth) {
      onChange(`${newYear}-01`);
    } else if (newYear && parsedMonth) {
      onChange(`${newYear}-${parsedMonth}`);
    } else {
      onChange('');
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}

      <div className="grid grid-cols-2 gap-2">
        {/* Month Select */}
        <select
          id={monthId}
          aria-label={label ? `${label} Month` : 'Select Month'}
          value={parsedMonth}
          onChange={handleMonthChange}
          disabled={disabled}
          className={`w-full rounded-lg border bg-white dark:bg-slate-900 px-2.5 py-2 text-xs text-slate-900 dark:text-slate-100 shadow-2xs transition-colors focus:outline-none focus:ring-1 disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800 ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-100'
          }`}
        >
          <option value="">Month</option>
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label} ({m.value})
            </option>
          ))}
        </select>

        {/* Year Select */}
        <select
          id={yearId}
          aria-label={label ? `${label} Year` : 'Select Year'}
          value={parsedYear}
          onChange={handleYearChange}
          disabled={disabled}
          className={`w-full rounded-lg border bg-white dark:bg-slate-900 px-2.5 py-2 text-xs text-slate-900 dark:text-slate-100 shadow-2xs transition-colors focus:outline-none focus:ring-1 disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800 ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-100'
          }`}
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
};
