"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addLanguage,
  updateLanguage,
  removeLanguage,
  addAchievement,
  updateAchievement,
  removeAchievement,
  toggleSection,
} from '@/lib/store/slices/resumeSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Plus, Trash2, Languages, Trophy, Eye, EyeOff } from 'lucide-react';
import { ActiveSectionsConfig } from '@/lib/types/resume';

export const AdditionalSectionsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((state) => state.resume.languages);
  const achievements = useAppSelector((state) => state.resume.achievements);
  const activeSections = useAppSelector((state) => state.resume.activeSections);

  const sectionsToToggle: { key: keyof ActiveSectionsConfig; label: string }[] = [
    { key: 'experience', label: 'Work Experience' },
    { key: 'projects', label: 'Technical Projects' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'languages', label: 'Spoken Languages' },
    { key: 'achievements', label: 'Honors & Achievements' },
  ];

  return (
    <div className="space-y-6">
      {/* Visibility Toggles */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
        <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 tracking-wider block">
          Section Display Toggles
        </span>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Show or hide sections on your resume:</p>
        <div className="flex flex-wrap gap-2">
          {sectionsToToggle.map(({ key, label }) => {
            const isActive = activeSections[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => dispatch(toggleSection(key))}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
                }`}
              >
                {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Languages Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 tracking-wider">
              Languages
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(addLanguage())}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Language
          </Button>
        </div>

        {languages.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="e.g. English, French, Japanese"
              value={item.language}
              onChange={(e) =>
                dispatch(updateLanguage({ id: item.id, changes: { language: e.target.value } }))
              }
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
            />
            <select
              value={item.proficiency}
              onChange={(e) =>
                dispatch(updateLanguage({ id: item.id, changes: { proficiency: e.target.value } }))
              }
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Native / Bilingual">Native / Bilingual</option>
              <option value="Fluent / Full Professional">Fluent</option>
              <option value="Professional Working">Professional Working</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Elementary">Elementary</option>
            </select>
            <button
              type="button"
              onClick={() => dispatch(removeLanguage(item.id))}
              className="p-1 text-slate-400 hover:text-rose-500 transition"
              title="Remove Language"
              aria-label="Remove language"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Honors & Achievements Section */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 tracking-wider">
              Honors & Achievements
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(addAchievement())}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Achievement
          </Button>
        </div>

        {achievements.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3 relative"
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <input
                type="text"
                placeholder="e.g. 1st Place National Hackathon or Employee of the Quarter"
                value={item.title}
                onChange={(e) =>
                  dispatch(updateAchievement({ id: item.id, changes: { title: e.target.value } }))
                }
                className="flex-1 font-semibold text-xs text-slate-800 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-500 focus:outline-none px-1 py-0.5"
              />
              <button
                type="button"
                onClick={() => dispatch(removeAchievement(item.id))}
                className="p-1 text-slate-400 hover:text-rose-500 transition ml-2"
                title="Remove Achievement"
                aria-label="Remove achievement"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <Input
              label="Date / Year"
              placeholder="e.g. 2025"
              value={item.date || ''}
              onChange={(e) =>
                dispatch(updateAchievement({ id: item.id, changes: { date: e.target.value } }))
              }
            />
            <RichTextEditor
              label="Description / Context (Rich Text)"
              placeholder="Detail your impact, award scope, or metrics..."
              value={item.description}
              onChange={(val) =>
                dispatch(updateAchievement({ id: item.id, changes: { description: val } }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
