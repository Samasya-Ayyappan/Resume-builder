import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  characterLimit?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, characterLimit, id, value, className = '', required, ...props }, ref) => {
    const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          {label && (
            <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
          )}
          {characterLimit && (
            <span className={`text-xs ${currentLength > characterLimit ? 'text-rose-500 font-semibold' : 'text-slate-400'}`}>
              {currentLength} / {characterLimit}
            </span>
          )}
        </div>
        <textarea
          id={textareaId}
          ref={ref}
          value={value}
          required={required}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-colors focus:outline-none focus:ring-2 resize-y ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 hover:border-slate-400'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
