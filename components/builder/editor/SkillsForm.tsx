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
      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1.5">
          Quick-Add Tech Skills:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_SUGGESTIONS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handleQuickAdd(skill)}
              className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition shadow-2xs"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {skillCategories.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Wrench className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 font-medium">No skill categories configured.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => dispatch(addSkillCategory('Core Technical Skills'))}
            leftIcon={<Plus className="w-4 h-4" />}
            className="mt-3"
          >
            Create First Category
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-600 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) =>
                    dispatch(updateSkillCategoryName({ id: cat.id, name: e.target.value }))
                  }
                  className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-transparent hover:border-slate-300 dark:hover:border-slate-500 focus:border-indigo-500 focus:outline-none px-1 py-0.5"
                  placeholder="Category Name (e.g. Languages)"
                />
                <button
                  type="button"
                  onClick={() => dispatch(removeSkillCategory(cat.id))}
                  className="p-1 text-slate-400 hover:text-rose-500 transition"
                  title="Remove Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600">
                {cat.skills.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No skills in this category yet.</span>
                ) : (
                  cat.skills.map((skill, sIdx) => (
                    <Badge
                      key={sIdx}
                      variant="primary"
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
                  className="flex-1 rounded-lg border border-slate-200 dark:border-slate-600 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-200"
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
              className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
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
