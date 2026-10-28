import React from 'react';
import { THEME_CONFIGS } from '@/lib/constants/themes';
import { DEFAULT_SECTION_TITLES } from '@/lib/types/resume';
import { formatDisplayDate } from '@/components/ui/MonthYearPicker';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { TemplateProps } from './ModernTemplate';

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const theme = THEME_CONFIGS[data.metadata.themeColor] || THEME_CONFIGS.navy;
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

  const nameParts = personalInfo.fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || 'FIRST';
  const lastName = nameParts.slice(1).join(' ') || (nameParts.length > 1 ? '' : 'LASTNAME');

  return (
    <div className="w-full h-full bg-white text-slate-800 p-8 sm:p-10 font-sans leading-relaxed text-[13px]">
      {/* Top Header */}
      <header className="pb-5 mb-6 border-b" style={{ borderColor: theme.border }}>
        <h1 className="text-3xl font-light tracking-tight text-slate-900">
          <span className="font-extrabold" style={{ color: theme.text }}>
            {firstName}
          </span>{' '}
          {lastName}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: theme.primary }}>
            {personalInfo.jobTitle}
          </p>
        )}
      </header>

      {/* Two-Column Layout: Sidebar (29%) & Main (71%) with generous spacing */}
      <div className="flex gap-7">
        {/* Left Sidebar (29%) */}
        <aside className="w-[29%] shrink-0 border-r pr-5 space-y-6" style={{ borderColor: theme.border }}>
          {/* Contact Details */}
          <div className="break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
              Contact
            </h3>
            <div className="space-y-1.5 text-xs text-slate-600 break-words">
              {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.linkedin && (
                <div className="break-all">
                  <span className="font-medium text-slate-700">LinkedIn:</span>{' '}
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </div>
              )}
              {personalInfo.github && (
                <div className="break-all">
                  <span className="font-medium text-slate-700">GitHub:</span>{' '}
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
                </div>
              )}
              {personalInfo.website && (
                <div className="break-all">
                  <span className="font-medium text-slate-700">Web:</span>{' '}
                  {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                </div>
              )}
            </div>
          </div>

          {/* Education in Sidebar */}
          {education.length > 0 && (
            <div className="break-inside-avoid">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: theme.primary }}>
                {sectionTitles.education}
              </h3>
              <div className="space-y-3 text-xs">
                {education.map((edu) => {
                  const start = formatDisplayDate(edu.startDate);
                  const end = formatDisplayDate(edu.endDate);
                  const dateRange = [start, end].filter(Boolean).join(' – ');
                  return (
                    <div key={edu.id} className="break-inside-avoid space-y-0.5">
                      <div className="font-bold text-slate-900 leading-snug">{edu.institution}</div>
                      {edu.location && <div className="text-[11px] text-slate-500">{edu.location}</div>}
                      <div className="text-slate-700 leading-snug">
                        {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                      </div>
                      {dateRange && <div className="text-[11px] text-slate-500">{dateRange}</div>}
                      {edu.gpa && <div className="text-[11px] text-slate-500">GPA: {edu.gpa}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && skills.some((c) => c.skills.length > 0) && (
            <div className="break-inside-avoid">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: theme.primary }}>
                {sectionTitles.skills}
              </h3>
              <div className="space-y-3">
                {skills
                  .filter((c) => c.skills.length > 0)
                  .map((cat) => (
                    <div key={cat.id} className="break-inside-avoid">
                      <div className="text-[11px] font-bold text-slate-700 uppercase">{cat.name}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cat.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium leading-normal"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Languages in Sidebar */}
          {activeSections.languages && languages.length > 0 && (
            <div className="break-inside-avoid">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
                {sectionTitles.languages}
              </h3>
              <div className="space-y-1.5 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-baseline gap-1">
                    <span className="font-medium text-slate-800">{l.language}</span>
                    <span className="text-slate-500 text-[11px] shrink-0">({l.proficiency})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications in Sidebar */}
          {activeSections.certifications && certifications.length > 0 && (
            <div className="break-inside-avoid">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
                {sectionTitles.certifications}
              </h3>
              <div className="space-y-2 text-xs">
                {certifications.map((c) => {
                  const dt = formatDisplayDate(c.issueDate);
                  return (
                    <div key={c.id} className="break-inside-avoid space-y-0.5">
                      <div className="font-semibold text-slate-800 leading-snug">{c.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {c.issuer} {dt ? `(${dt})` : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Column (71%) with generous spacing and width */}
        <main className="flex-1 space-y-6">
          {/* Summary */}
          {summary && (
            <div className="break-inside-avoid">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
                {sectionTitles.summary}
              </h3>
              <RichTextRenderer content={summary} className="text-xs text-slate-700 leading-relaxed text-justify" />
            </div>
          )}

          {/* Experience */}
          {activeSections.experience && experience.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>
                {sectionTitles.experience}
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => {
                  const start = formatDisplayDate(exp.startDate);
                  const end = exp.isCurrent ? 'Present' : formatDisplayDate(exp.endDate);
                  const dateRange = [start, end].filter(Boolean).join(' – ');
                  return (
                    <div key={exp.id} className="break-inside-avoid space-y-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <div className="font-bold text-slate-900 text-xs">{exp.jobTitle}</div>
                        {dateRange && (
                          <div className="text-[11px] text-slate-500 whitespace-nowrap shrink-0">
                            {dateRange}
                          </div>
                        )}
                      </div>
                      <div className="text-xs font-medium text-slate-600">
                        {exp.company} {exp.location ? `• ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <RichTextRenderer content={exp.description} className="text-xs text-slate-700 mt-1" />
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-1 list-disc list-outside ml-4 space-y-1 text-xs text-slate-700 leading-relaxed">
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
            </div>
          )}

          {/* Projects */}
          {activeSections.projects && projects.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>
                {sectionTitles.projects}
              </h3>
              <div className="space-y-3.5">
                {projects.map((proj) => {
                  const start = formatDisplayDate(proj.startDate || '');
                  const end = formatDisplayDate(proj.endDate || '');
                  const dateRange = [start, end].filter(Boolean).join(' – ');
                  return (
                    <div key={proj.id} className="break-inside-avoid text-xs space-y-1">
                      <div className="flex justify-between items-baseline font-bold text-slate-900 gap-2">
                        <span className="break-words">
                          {proj.title}
                          {proj.link && (
                            <span className="ml-2 font-normal text-slate-500 text-[11px] underline break-all">
                              {proj.link.replace(/^https?:\/\//, '')}
                            </span>
                          )}
                        </span>
                        {dateRange && (
                          <span className="font-normal text-[11px] text-slate-500 whitespace-nowrap shrink-0">
                            {dateRange}
                          </span>
                        )}
                      </div>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="text-[11px] text-slate-600 font-medium">
                          Technologies: {proj.technologies.join(', ')}
                        </div>
                      )}
                      {proj.description && (
                        <RichTextRenderer content={proj.description} className="text-slate-700 mt-0.5 leading-relaxed" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Achievements */}
          {activeSections.achievements && achievements.length > 0 && (
            <div className="break-inside-avoid">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: theme.primary }}>
                {sectionTitles.achievements}
              </h3>
              <div className="space-y-2 text-xs">
                {achievements.map((a) => (
                  <div key={a.id} className="break-inside-avoid space-y-0.5">
                    <div className="font-semibold text-slate-900">
                      {a.title} {a.date && <span className="font-normal text-slate-500">({formatDisplayDate(a.date)})</span>}
                    </div>
                    {a.description && (
                      <RichTextRenderer content={a.description} className="text-slate-600 leading-relaxed" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
