"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addEducation, updateEducation, removeEducation } from '@/lib/store/slices/resumeSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MonthYearPicker } from '@/components/ui/MonthYearPicker';
import { Plus, Trash2, GraduationCap, MapPin } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const educations = useAppSelector((state) => state.resume.education);

  const handleAdd = () => {
    dispatch(addEducation());
  };

  const handleUpdate = (id: string, changes: Parameters<typeof updateEducation>[0]['changes']) => {
    dispatch(updateEducation({ id, changes }));
  };

  return (
    <div className="space-y-4">
      {educations.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">No education entries added.</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-3">Add your degree, university, or academic achievements.</p>
          <Button variant="primary" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  Degree #{index + 1}: {edu.degree || 'New Degree'}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch(removeEducation(edu.id))}
                  className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition"
                  title="Delete Entry"
                  aria-label={`Delete degree #${index + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="School / University"
                  placeholder="e.g. Stanford University"
                  value={edu.institution}
                  onChange={(e) => handleUpdate(edu.id, { institution: e.target.value })}
                />
                <Input
                  label="Degree & Major"
                  placeholder="e.g. B.S. in Computer Science"
                  value={edu.degree}
                  onChange={(e) => handleUpdate(edu.id, { degree: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Field of Study / Track"
                  placeholder="e.g. Software Systems"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleUpdate(edu.id, { fieldOfStudy: e.target.value })}
                />
                <Input
                  label="School Location (Optional)"
                  placeholder="e.g. Seattle, WA or Cambridge, MA"
                  leftIcon={<MapPin className="w-3.5 h-3.5" />}
                  value={edu.location || ''}
                  onChange={(e) => handleUpdate(edu.id, { location: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <MonthYearPicker
                    label="Start Date"
                    value={edu.startDate}
                    onChange={(val) => handleUpdate(edu.id, { startDate: val })}
                  />
                  <MonthYearPicker
                    label="Grad Date"
                    value={edu.endDate}
                    onChange={(val) => handleUpdate(edu.id, { endDate: val })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="GPA / Cumulative Score (Optional)"
                  placeholder="e.g. 3.85 / 4.0"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdate(edu.id, { gpa: e.target.value })}
                />
                <Input
                  label="Honors & Academic Distinctions (Optional)"
                  placeholder="e.g. Dean's List, Magna Cum Laude"
                  value={edu.honors || ''}
                  onChange={(e) => handleUpdate(edu.id, { honors: e.target.value })}
                />
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Another Degree
          </Button>
        </div>
      )}
    </div>
  );
};
