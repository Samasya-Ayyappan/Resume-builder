import React from 'react';
import { ResumeData, DEFAULT_SECTION_TITLES } from '@/lib/types/resume';
import { THEME_CONFIGS } from '@/lib/constants/themes';
import { formatDisplayDate } from '@/components/ui/MonthYearPicker';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';

export interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const theme = THEME_CONFIGS[data.metadata.themeColor] || THEME_CONFIGS.indigo;
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    achievements,
    activeSections,
  } = data;

  const sectionTitles = {
    ...DEFAULT_SECTION_TITLES,
    ...(data.sectionTitles || {}),
  };

  return (
    <div className="w-full h-full bg-white text-slate-800 p-8 sm:p-10 font-sans leading-relaxed text-[13px]">
      {/* Header */}
      <header className="border-b pb-5 mb-5" style={{ borderColor: theme.border }}>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ color: theme.text }}>
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-base font-semibold mt-0.5 tracking-wide uppercase text-xs" style={{ color: theme.primary }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact info bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1 break-all">
              <span>✉</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <span>☎</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <span>📍</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1 break-all">
              <span className="font-semibold text-slate-700">in</span> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1 break-all">
              <span className="font-semibold text-slate-700">git</span> {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1 break-all">
              <span>🔗</span> {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-5 break-inside-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color: theme.primary, borderColor: theme.border }}
          >
            {sectionTitles.summary}
          </h2>
          <RichTextRenderer content={summary} className="text-slate-700 leading-normal text-justify" />
        </section>
      )}

      {/* Experience Section */}
      {activeSections.experience && experience.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-0.5 border-b"
            style={{ color: theme.primary, borderColor: theme.border }}
          >
            {sectionTitles.experience}
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => {
              const start = formatDisplayDate(exp.startDate);
              const end = exp.isCurrent ? 'Present' : formatDisplayDate(exp.endDate);
              const dateRange = [start, end].filter(Boolean).join(' – ');
              return (
                <div key={exp.id} className="break-inside-avoid space-y-0.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <div>
                      <span className="font-bold text-slate-900">{exp.jobTitle || 'Job Title'}</span>
                      <span className="text-slate-600 font-medium"> — {exp.company || 'Company'}</span>
                    </div>
                    {dateRange && (
                      <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">
                        {dateRange}
                      </div>
                    )}
                  </div>
                  {exp.location && <div className="text-xs text-slate-500">{exp.location}</div>}
                  {exp.description && (
                    <RichTextRenderer content={exp.description} className="text-slate-700 mt-1 text-xs" />
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5 text-slate-700 text-xs">
                      {exp.highlights.filter(Boolean).map((bullet, idx) => (
                        <li key={idx}>
                          <RichTextRenderer content={bullet} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeSections.projects && projects.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-0.5 border-b"
            style={{ color: theme.primary, borderColor: theme.border }}
          >
            {sectionTitles.projects}
          </h2>
          <div className="space-y-3.5">
            {projects.map((proj) => {
              const start = formatDisplayDate(proj.startDate || '');
              const end = formatDisplayDate(proj.endDate || '');
              const dateRange = [start, end].filter(Boolean).join(' – ');
              return (
                <div key={proj.id} className="break-inside-avoid space-y-0.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <div className="font-bold text-slate-900">
                      <span className="break-words">{proj.title}</span>
                      {proj.link && (
                        <span className="ml-2 text-xs font-normal text-slate-500 underline break-all">
                          {proj.link.replace(/^https?:\/\//, '')}
                        </span>
                      )}
                    </div>
                    {dateRange && (
                      <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">
                        {dateRange}
                      </div>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-xs font-medium text-slate-600 mt-0.5">
                      <span className="text-slate-500">Tech:</span> {proj.technologies.join(', ')}
                    </div>
                  )}
                  {proj.description && (
                    <RichTextRenderer content={proj.description} className="text-slate-700 mt-1 text-xs" />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
            style={{ color: theme.primary, borderColor: theme.border }}
          >
            {sectionTitles.education}
          </h2>
          <div className="space-y-2.5">
            {education.map((edu) => {
              const start = formatDisplayDate(edu.startDate);
              const end = formatDisplayDate(edu.endDate);
              const dateRange = [start, end].filter(Boolean).join(' – ');
              return (
                <div key={edu.id} className="break-inside-avoid flex justify-between items-baseline gap-2">
                  <div>
                    <div className="font-bold text-slate-900 leading-snug">{edu.institution || 'Institution'}</div>
                    <div className="text-slate-700 text-xs">
                      {edu.degree} {edu.degree && edu.fieldOfStudy ? 'in ' : ''}{edu.fieldOfStudy}
                      {edu.location ? ` • ${edu.location}` : ''}
                      {edu.gpa && <span className="text-slate-500 ml-2">(GPA: {edu.gpa})</span>}
                    </div>
                    {edu.honors && <div className="text-xs text-slate-500 italic mt-0.5">{edu.honors}</div>}
                  </div>
                  {dateRange && (
                    <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">
                      {dateRange}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Skills Categories */}
      {skills.length > 0 && skills.some((c) => c.skills.length > 0) && (
        <section className="mb-5 break-inside-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
            style={{ color: theme.primary, borderColor: theme.border }}
          >
            {sectionTitles.skills}
          </h2>
          <div className="space-y-1.5">
            {skills
              .filter((c) => c.skills.length > 0)
              .map((cat) => (
                <div key={cat.id} className="text-xs">
                  <span className="font-bold text-slate-800">{cat.name}: </span>
                  <span className="text-slate-700">{cat.skills.join(' • ')}</span>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages side-by-side or stacked */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeSections.certifications && certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              {sectionTitles.certifications}
            </h2>
            <div className="space-y-1.5">
              {certifications.map((c) => {
                const dt = formatDisplayDate(c.issueDate);
                return (
                  <div key={c.id} className="text-xs">
                    <div className="font-bold text-slate-800">{c.name}</div>
                    <div className="text-slate-500">
                      {c.issuer} {dt ? `(${dt})` : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeSections.languages && languages.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              {sectionTitles.languages}
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {languages.map((l) => (
                <div key={l.id} className="text-slate-700">
                  <span className="font-semibold">{l.language}</span>{' '}
                  <span className="text-slate-500">({l.proficiency})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Achievements / Honors */}
      {activeSections.achievements && achievements.length > 0 && (
        <section className="mt-4 break-inside-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color: theme.primary, borderColor: theme.border }}
          >
            {sectionTitles.achievements}
          </h2>
          <div className="space-y-1.5">
            {achievements.map((a) => (
              <div key={a.id} className="text-xs">
                <div className="font-semibold text-slate-800">
                  {a.title} {a.date && <span className="font-normal text-slate-500">({formatDisplayDate(a.date)})</span>}
                </div>
                {a.description && (
                  <RichTextRenderer content={a.description} className="text-slate-600 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
