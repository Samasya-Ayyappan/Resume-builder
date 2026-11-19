"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addLanguage,
  updateLanguage,
  removeLanguage,
} from '@/lib/store/slices/resumeSlice';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Languages } from 'lucide-react';

export const LanguagesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((state) => state.resume.languages);

  const handleAdd = () => {
    dispatch(addLanguage());
  };

  return (
    <div className="space-y-4">
      {languages.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
          <Languages className="w-8 h-8 text-sky-500 mx-auto mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">No languages added yet.</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-3">Add languages you speak along with your proficiency level.</p>
          <Button variant="primary" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add First Language
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {languages.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="e.g. English, French, Spanish, Japanese"
                  value={item.language}
                  onChange={(e) =>
                    dispatch(updateLanguage({ id: item.id, changes: { language: e.target.value } }))
                  }
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-2xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-100 dark:focus:ring-indigo-950"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={item.proficiency}
                  onChange={(e) =>
                    dispatch(updateLanguage({ id: item.id, changes: { proficiency: e.target.value } }))
                  }
                  className="flex-1 sm:flex-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 shadow-2xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-100 dark:focus:ring-indigo-950"
                >
                  <option value="Native / Bilingual">Native / Bilingual</option>
                  <option value="Fluent / Full Professional">Fluent / Full Professional</option>
                  <option value="Professional Working">Professional Working</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Elementary">Elementary</option>
                </select>
                <button
                  type="button"
                  onClick={() => dispatch(removeLanguage(item.id))}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition cursor-pointer"
                  title="Remove Language"
                  aria-label={`Remove language ${item.language || '#' + (index + 1)}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={handleAdd}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Another Language
          </Button>
        </div>
      )}
    </div>
  );
};

