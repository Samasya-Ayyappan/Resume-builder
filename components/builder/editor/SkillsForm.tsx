"use client";

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addSkillCategory,
  updateSkillCategoryName,
  removeSkillCategory,
  addSkillItem,
  removeSkillItem,
} from '@/lib/store/slices/resumeSlice';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Wrench } from 'lucide-react';

const COMMON_SUGGESTIONS = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Tailwind CSS',
  'Redux Toolkit',
  'PostgreSQL',
  'Docker',
  'Git',
  'REST APIs',
  'AWS',
];

export const SkillsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const skillCategories = useAppSelector((state) => state.resume.skills);
  const [newInputs, setNewInputs] = useState<Record<string, string>>({});
  const [newCatName, setNewCatName] = useState('');

  const handleAddSkill = (catId: string) => {
    const text = newInputs[catId]?.trim();
    if (text) {
      dispatch(addSkillItem({ categoryId: catId, skill: text }));
      setNewInputs((prev) => ({ ...prev, [catId]: '' }));
    }
  };

  const handleQuickAdd = (skill: string) => {
    if (skillCategories.length > 0) {
      dispatch(addSkillItem({ categoryId: skillCategories[0].id, skill }));
    } else {
      dispatch(addSkillCategory('Technical Skills'));
      setTimeout(() => {
        // Will be added on subsequent click
      }, 50);
    }
  };

  const handleAddCategory = () => {
    if (newCatName.trim()) {
      dispatch(addSkillCategory(newCatName.trim()));
      setNewCatName('');
    } else {
      dispatch(addSkillCategory('New Category'));
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick suggestions banner */}
      <div className="p-3 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
          Quick-Add Tech Skills:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_SUGGESTIONS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handleQuickAdd(skill)}
              className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 hover:text-slate-900 dark:hover:border-slate-600 dark:hover:text-white transition shadow-2xs"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {skillCategories.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
          <Wrench className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">No skill categories configured.</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-3">Add categories like Languages, Frameworks, or Tools to organize skills.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => dispatch(addSkillCategory('Core Technical Skills'))}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create First Category
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) =>
                    dispatch(updateSkillCategoryName({ id: cat.id, name: e.target.value }))
                  }
                  className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-500 focus:outline-none px-1 py-0.5 bg-transparent"
                  placeholder="Category Name (e.g. Languages)"
                />
                <button
                  type="button"
                  onClick={() => dispatch(removeSkillCategory(cat.id))}
                  className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition"
                  title="Remove Category"
                  aria-label="Remove Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                {cat.skills.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No skills in this category yet.</span>
                ) : (
                  cat.skills.map((skill, sIdx) => (
                    <Badge
                      key={sIdx}
                      variant="default"
                      size="sm"
                      onRemove={() =>
                        dispatch(removeSkillItem({ categoryId: cat.id, skillIndex: sIdx }))
                      }
                    >
                      {skill}
                    </Badge>
                  ))
                )}
              </div>

              {/* Add Skill Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a skill and press Enter (e.g. Docker)..."
                  value={newInputs[cat.id] || ''}
                  onChange={(e) => setNewInputs({ ...newInputs, [cat.id]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(cat.id);
                    }
                  }}
                  className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-2xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-100 dark:focus:ring-indigo-950"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSkill(cat.id)}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add
                </Button>
              </div>
            </div>
          ))}

          {/* Add Category row */}
          <div className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="New category name (e.g. Cloud & DevOps)..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCategory();
                }
              }}
              className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-2xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-100 dark:focus:ring-indigo-950"
            />
            <Button variant="secondary" size="sm" onClick={handleAddCategory} leftIcon={<Plus className="w-4 h-4" />}>
              Add Category
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
