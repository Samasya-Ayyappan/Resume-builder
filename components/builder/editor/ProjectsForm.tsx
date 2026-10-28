"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addProject, updateProject, removeProject } from '@/lib/store/slices/resumeSlice';
import { Input } from '@/components/ui/Input';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';

export const ProjectsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.resume.projects);

  const handleAdd = () => {
    dispatch(addProject());
  };

  const handleUpdate = (id: string, changes: Parameters<typeof updateProject>[0]['changes']) => {
    dispatch(updateProject({ id, changes }));
  };

  const handleTechStringChange = (id: string, techString: string) => {
    const arr = techString.split(',').map((s) => s.trim()).filter(Boolean);
    handleUpdate(id, { technologies: arr });
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">No projects added yet.</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-3">Add academic projects, open-source work, or portfolio apps.</p>
          <Button variant="primary" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  Project #{index + 1}: {proj.title || 'New Project'}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch(removeProject(proj.id))}
                  className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition"
                  title="Delete Entry"
                  aria-label={`Delete project #${index + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Project Title"
                  placeholder="e.g. Distributed Task Queue"
                  value={proj.title}
                  onChange={(e) => handleUpdate(proj.id, { title: e.target.value })}
                />
                <Input
                  label="Technologies Used (Comma Separated)"
                  placeholder="e.g. Next.js, TypeScript, Redis, Docker"
                  value={proj.technologies.join(', ')}
                  onChange={(e) => handleTechStringChange(proj.id, e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Live Demo / URL"
                  placeholder="https://myproject.demo.com"
                  value={proj.link || ''}
                  onChange={(e) => handleUpdate(proj.id, { link: e.target.value })}
                />
                <Input
                  label="GitHub / Code Repository"
                  placeholder="https://github.com/user/project"
                  value={proj.github || ''}
                  onChange={(e) => handleUpdate(proj.id, { github: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Start Date"
                  placeholder="e.g. 2025-10"
                  value={proj.startDate || ''}
                  onChange={(e) => handleUpdate(proj.id, { startDate: e.target.value })}
                />
                <Input
                  label="End Date / Status"
                  placeholder="e.g. 2025-12 or Present"
                  value={proj.endDate || ''}
                  onChange={(e) => handleUpdate(proj.id, { endDate: e.target.value })}
                />
              </div>

              <RichTextEditor
                label="Description & Key Features (Rich Text)"
                placeholder="Engineered an event-driven task queue processing 10,000 tasks/min with automated retries..."
                value={proj.description}
                onChange={(val) => handleUpdate(proj.id, { description: val })}
              />
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Another Project
          </Button>
        </div>
      )}
    </div>
  );
};
