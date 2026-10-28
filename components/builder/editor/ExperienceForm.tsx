"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addExperience,
  updateExperience,
  removeExperience,
  reorderExperience,
} from '@/lib/store/slices/resumeSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MonthYearPicker } from '@/components/ui/MonthYearPicker';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Plus, Trash2, ArrowUp, ArrowDown, Briefcase, AlertCircle } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const experiences = useAppSelector((state) => state.resume.experience);

  const handleAdd = () => {
    dispatch(addExperience());
  };

  const handleUpdate = (id: string, changes: Parameters<typeof updateExperience>[0]['changes']) => {
    dispatch(updateExperience({ id, changes }));
  };

  const handleAddHighlight = (id: string, currentHighlights: string[]) => {
    handleUpdate(id, { highlights: [...currentHighlights, ''] });
  };

  const handleUpdateHighlight = (id: string, currentHighlights: string[], index: number, value: string) => {
    const updated = [...currentHighlights];
    updated[index] = value;
    handleUpdate(id, { highlights: updated });
  };

  const handleRemoveHighlight = (id: string, currentHighlights: string[], index: number) => {
    const updated = currentHighlights.filter((_, idx) => idx !== index);
    handleUpdate(id, { highlights: updated });
  };

  const isInvalidDateRange = (start: string, end: string, isCurrent: boolean) => {
    if (isCurrent || !start || !end || end === 'Present') return false;
    return start > end;
  };

  return (
    <div className="space-y-4">
      {experiences.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">No work experience entries added yet.</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-3">Add your previous roles, internships, or freelance engagements.</p>
          <Button variant="primary" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add First Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const hasDateError = isInvalidDateRange(exp.startDate, exp.endDate, exp.isCurrent);

            return (
              <div
                key={exp.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3 relative group"
              >
                {/* Item Header & Controls */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                    Role #{index + 1}: {exp.jobTitle || 'New Position'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => dispatch(reorderExperience({ fromIndex: index, toIndex: index - 1 }))}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 transition"
                      title="Move Up"
                      aria-label="Move Experience Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch(reorderExperience({ fromIndex: index, toIndex: index + 1 }))}
                      disabled={index === experiences.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 transition"
                      title="Move Down"
                      aria-label="Move Experience Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch(removeExperience(exp.id))}
                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition ml-1"
                      title="Delete Entry"
                      aria-label="Delete Experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Job Title"
                    placeholder="e.g. Senior Software Engineer"
                    value={exp.jobTitle}
                    onChange={(e) => handleUpdate(exp.id, { jobTitle: e.target.value })}
                  />
                  <Input
                    label="Company / Organization"
                    placeholder="e.g. Stripe, Amazon, Start-up"
                    value={exp.company}
                    onChange={(e) => handleUpdate(exp.id, { company: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    label="Location"
                    placeholder="e.g. New York, NY or Remote"
                    value={exp.location}
                    onChange={(e) => handleUpdate(exp.id, { location: e.target.value })}
                  />
                  <MonthYearPicker
                    label="Start Date"
                    value={exp.startDate}
                    onChange={(val) => handleUpdate(exp.id, { startDate: val })}
                  />
                  <div>
                    <MonthYearPicker
                      label="End Date"
                      value={exp.isCurrent ? '' : exp.endDate}
                      disabled={exp.isCurrent}
                      onChange={(val) => handleUpdate(exp.id, { endDate: val })}
                      error={hasDateError ? 'End date before start' : undefined}
                    />
                    <label className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) =>
                          handleUpdate(exp.id, {
                            isCurrent: e.target.checked,
                            endDate: e.target.checked ? 'Present' : '',
                          })
                        }
                        className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Currently Working here</span>
                    </label>
                  </div>
                </div>

                {hasDateError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Start date cannot be after end date.</span>
                  </div>
                )}

                {/* Rich-Text Role Description & Achievements */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <RichTextEditor
                    label="Role Overview / Summary (Rich Text)"
                    value={exp.description}
                    onChange={(val) => handleUpdate(exp.id, { description: val })}
                    placeholder="Briefly describe your team scope, domain responsibilities, or core mandate..."
                    helperText="Supports bold, italics, and lists. Pasted formatted text is preserved."
                  />

                  {/* Bullet Points with Rich Text */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Key Quantifiable Achievements (Bullet Points)
                    </label>
                    {(exp.highlights || []).map((highlight, hIdx) => (
                      <div key={hIdx} className="space-y-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
                        <div className="flex items-center justify-between pb-1">
                          <span className="text-[11px] font-semibold text-slate-500">Achievement #{hIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveHighlight(exp.id, exp.highlights, hIdx)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition"
                            title="Remove Bullet"
                            aria-label={`Remove achievement #${hIdx + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <RichTextEditor
                          value={highlight}
                          onChange={(val) => handleUpdateHighlight(exp.id, exp.highlights, hIdx, val)}
                          placeholder="e.g. Optimized database query latencies by 35% across 4M daily transactions..."
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddHighlight(exp.id, exp.highlights || [])}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold inline-flex items-center gap-1 mt-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Achievement Bullet
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <Button variant="outline" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Another Experience
          </Button>
        </div>
      )}
    </div>
  );
};
