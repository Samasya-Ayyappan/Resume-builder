"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addCertification,
  updateCertification,
  removeCertification,
} from '@/lib/store/slices/resumeSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Award } from 'lucide-react';

export const CertificationsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const certifications = useAppSelector((state) => state.resume.certifications);

  const handleAdd = () => {
    dispatch(addCertification());
  };

  const handleUpdate = (id: string, changes: Parameters<typeof updateCertification>[0]['changes']) => {
    dispatch(updateCertification({ id, changes }));
  };

  return (
    <div className="space-y-4">
      {certifications.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 font-medium">No certifications added.</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-3">Add AWS, Google Cloud, Meta, or other credentials.</p>
          <Button variant="primary" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Certification
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Certification #{index + 1}: {cert.name || 'New Credential'}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch(removeCertification(cert.id))}
                  className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Certification Name"
                  placeholder="e.g. AWS Solutions Architect Associate"
                  value={cert.name}
                  onChange={(e) => handleUpdate(cert.id, { name: e.target.value })}
                />
                <Input
                  label="Issuing Organization"
                  placeholder="e.g. Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => handleUpdate(cert.id, { issuer: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Issue Date / Year"
                  placeholder="e.g. 2025"
                  value={cert.issueDate}
                  onChange={(e) => handleUpdate(cert.id, { issueDate: e.target.value })}
                />
                <Input
                  label="Credential URL / Verification ID"
                  placeholder="https://..."
                  value={cert.url || ''}
                  onChange={(e) => handleUpdate(cert.id, { url: e.target.value })}
                />
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={handleAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Another Certification
          </Button>
        </div>
      )}
    </div>
  );
};
