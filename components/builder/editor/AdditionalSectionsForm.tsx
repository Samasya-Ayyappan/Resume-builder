"use client";

import React from 'react';
import { LanguagesForm } from './LanguagesForm';
import { AchievementsForm } from './AchievementsForm';
import { SectionTogglesForm } from './SectionTogglesForm';

export { LanguagesForm, AchievementsForm, SectionTogglesForm };

export const AdditionalSectionsForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <SectionTogglesForm />
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <LanguagesForm />
      </div>
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <AchievementsForm />
      </div>
    </div>
  );
};
