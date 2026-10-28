import React from 'react';
import { ResumeData } from '@/lib/types/resume';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';

interface TemplateRendererProps {
  data: ResumeData;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
  switch (data.metadata.selectedTemplate) {
    case 'classic':
      return <ClassicTemplate data={data} />;
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} />;
  }
};
