"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addAchievement,
  updateAchievement,
  removeAchievement,
} from '@/lib/store/slices/resumeSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Plus, Trash2, Trophy } from 'lucide-react';

export const AchievementsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const achievements = useAppSelector((state) => state.resume.achievements);

  const handleAdd = () => {
    dispatch(addAchievement());
  };

  const handleUpdate = (id: string, changes: Parameters<typeof updateAchievement>[0]['changes']) => {
    dispatch(updateAchievement({ id, changes }));
  };

  return (
    <div className="space-y-4">
      {achievements.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
          <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">No honors or achievements added yet.</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-3">Add hackathon wins, awards, honors, scholarships, or leadership recognitions.</p>
          <Button variant="primary" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add First Achievement
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {achievements.map((item, index) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  Achievement #{index + 1}: {item.title || 'New Honor / Award'}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch(removeAchievement(item.id))}
                  className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition cursor-pointer"
                  title="Delete Entry"
                  aria-label={`Delete achievement #${index + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    label="Award / Honor Title"
                    placeholder="e.g. 1st Place Winner — Northwest Regional Hackathon"
                    value={item.title}
                    onChange={(e) => handleUpdate(item.id, { title: e.target.value })}
                  />
                </div>
                <Input
                  label="Date / Year"
                  placeholder="e.g. 2025 or 2024 - 2025"
                  value={item.date || ''}
                  onChange={(e) => handleUpdate(item.id, { date: e.target.value })}
                />
              </div>

              <RichTextEditor
                label="Description / Context (Rich Text)"
                placeholder="Detail your impact, award scope, or metrics..."
                value={item.description}
                onChange={(val) => handleUpdate(item.id, { description: val })}
              />
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={handleAdd}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Another Achievement
          </Button>
        </div>
      )}
    </div>
  );
};

