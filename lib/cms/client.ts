import { CMSLandingContent } from './types';
import { AVAILABLE_TEMPLATES, TemplateDefinition } from '../types/template';

/**
 * Fallback static CMS content used when Payload CMS is not configured or offline.
 * In Phase 2, this client will query Payload's REST or Local API: `/api/globals/landing-page`
 */
export const DEFAULT_CMS_LANDING_CONTENT: CMSLandingContent = {
  hero: {
    badge: 'Crafted for Modern Tech & Corporate Careers',
    headline: 'Build a Resume That Gets You Hired Faster',
    subheadline:
      'Engineered for both graduating Freshers and Experienced engineers. Build an ATS-friendly, clean resume with real-time live preview, elegant templates, and 1-click PDF download.',
    ctaText: 'Start Building Free',
    ctaLink: '/builder',
    trustPoints: ['No sign-up required', '100% Private (Saved in browser)', 'ATS-optimized templates'],
  },
  features: [
    {
      id: 'f-live-preview',
      icon: 'Eye',
      title: 'Real-Time Split Preview',
      description:
        'Watch every keystroke, bullet point, and skill update instantaneously in a realistic A4 document preview.',
    },
    {
      id: 'f-tailored-modes',
      icon: 'Target',
      title: 'Fresher & Experienced Modes',
      description:
        'Tailored schemas highlight coursework and projects for graduates, or measurable impact and work history for experienced pros.',
    },
    {
      id: 'f-ats-templates',
      icon: 'LayoutTemplate',
      title: 'ATS-Compliant Typography',
      description:
        'Carefully tuned margins, standard fonts, and hierarchical semantic structure designed to pass recruiter screening bots.',
    },
    {
      id: 'f-offline-first',
      icon: 'ShieldCheck',
      title: 'Local Privacy & Persistence',
      description:
        'Zero accounts needed. Your resume persists securely in your local browser storage so you can resume anytime.',
    },
    {
      id: 'f-pdf-export',
      icon: 'Download',
      title: 'Crisp Vector PDF Export',
      description:
        'High-resolution multi-page PDF generation ready to attach directly to your job applications.',
    },
    {
      id: 'f-strength-score',
      icon: 'Zap',
      title: 'Resume Strength Feedback',
      description:
        'Interactive real-time completion score with targeted recommendations to elevate your resume quality.',
    },
  ],
  templatesSectionTitle: 'Battle-Tested Professional Templates',
  templatesSectionSubtitle:
    'Switch seamlessly between layouts without losing a single keystroke of your entered data.',
};

/**
 * Service function to retrieve landing content with graceful fallback
 */
export async function getLandingPageContent(): Promise<CMSLandingContent> {
  // When Payload CMS is connected:
  // try {
  //   const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/landing-page`, { next: { revalidate: 60 } });
  //   if (res.ok) return await res.json();
  // } catch (e) { ... }
  return DEFAULT_CMS_LANDING_CONTENT;
}

/**
 * Service function to retrieve available template definitions with fallback
 */
export async function getTemplateDefinitions(): Promise<TemplateDefinition[]> {
  return AVAILABLE_TEMPLATES;
}
