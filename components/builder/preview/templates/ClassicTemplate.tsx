import React from 'react';
import { THEME_CONFIGS } from '@/lib/constants/themes';
import { DEFAULT_SECTION_TITLES } from '@/lib/types/resume';
import { formatDisplayDate } from '@/components/ui/MonthYearPicker';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { TemplateProps } from './ModernTemplate';

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const theme = THEME_CONFIGS[data.metadata.themeColor] || THEME_CONFIGS.slate;
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

  const contactItems = [
    personalInfo.phone,
    personalInfo.email,
    personalInfo.location,
    personalInfo.linkedin ? personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '') : '',
    personalInfo.github ? personalInfo.github.replace(/^https?:\/\/(www\.)?/, '') : '',
    personalInfo.website ? personalInfo.website.replace(/^https?:\/\/(www\.)?/, '') : '',
  ].filter(Boolean);

  return (
    <div className="w-full h-full bg-white text-slate-900 p-8 sm:p-10 font-serif leading-relaxed text-[13px]">
      {/* Centered Header */}
      <header className="text-center pb-3 mb-4 border-b-2" style={{ borderColor: theme.primary }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-normal uppercase" style={{ color: theme.text }}>
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs uppercase tracking-widest font-sans font-semibold mt-1" style={{ color: theme.primary }}>
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-xs text-slate-700 font-sans mt-2">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-slate-400">|</span>}
              <span className="break-all">{item}</span>
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-4 break-inside-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-400 pb-0.5 mb-1.5"
            style={{ color: theme.primary }}
          >
            {sectionTitles.summary}
          </h2>
          <RichTextRenderer content={summary} className="text-slate-800 text-justify text-xs leading-normal" />
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-400 pb-0.5 mb-2"
            style={{ color: theme.primary }}
          >
            {sectionTitles.education}
          </h2>
          <div className="space-y-2">
            {education.map((edu) => {
              const start = formatDisplayDate(edu.startDate);
              const end = formatDisplayDate(edu.endDate);
              const dateRange = [start, end].filter(Boolean).join(' – ');
              return (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-xs">
                    <span>{edu.institution || 'University Name'}</span>
                    <span className="font-normal font-sans text-slate-600 text-[11px] whitespace-nowrap ml-2">
                      {edu.location ? `${edu.location} | ` : ''}
                      {dateRange}
                    </span>
                  </div>
                  <div className="italic text-xs flex justify-between flex-wrap">
                    <span>
                      {edu.degree} {edu.degree && edu.fieldOfStudy ? 'in ' : ''}
                      {edu.fieldOfStudy}
                      {edu.gpa && <span className="font-sans not-italic text-slate-700 ml-2">GPA: {edu.gpa}</span>}
                    </span>
                  </div>
                  {edu.honors && <div className="text-xs text-slate-600 font-sans mt-0.5">{edu.honors}</div>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Experience */}
      {activeSections.experience && experience.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-400 pb-0.5 mb-2"
            style={{ color: theme.primary }}
          >
            {sectionTitles.experience}
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => {
              const start = formatDisplayDate(exp.startDate);
              const end = exp.isCurrent ? 'Present' : formatDisplayDate(exp.endDate);
              const dateRange = [start, end].filter(Boolean).join(' – ');
              return (
                <div key={exp.id} className="break-inside-avoid space-y-0.5">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold">{exp.company || 'Company'}</span>
                    <span className="font-sans text-slate-600 text-[11px] whitespace-nowrap ml-2">
                      {exp.location ? `${exp.location} | ` : ''}
                      {dateRange}
                    </span>
                  </div>
                  <div className="italic text-xs">{exp.jobTitle || 'Role'}</div>
                  {exp.description && (
                    <RichTextRenderer content={exp.description} className="text-xs text-slate-800 mt-0.5" />
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-slate-800">
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

      {/* Projects */}
      {activeSections.projects && projects.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-400 pb-0.5 mb-2"
            style={{ color: theme.primary }}
          >
            {sectionTitles.projects}
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => {
              const start = formatDisplayDate(proj.startDate || '');
              const end = formatDisplayDate(proj.endDate || '');
              const dateRange = [start, end].filter(Boolean).join(' – ');
              return (
                <div key={proj.id} className="break-inside-avoid text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold break-words">
                      {proj.title}
                      {proj.link && (
                        <span className="font-normal font-sans text-slate-500 ml-2 break-all text-[11px]">
                          ({proj.link.replace(/^https?:\/\//, '')})
                        </span>
                      )}
                    </span>
                    {dateRange && (
                      <span className="font-sans text-slate-600 text-[11px] whitespace-nowrap ml-2">
                        {dateRange}
                      </span>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="font-sans text-[11px] text-slate-600 italic">
                      Technologies: {proj.technologies.join(', ')}
                    </div>
                  )}
                  {proj.description && (
                    <RichTextRenderer content={proj.description} className="text-slate-800 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && skills.some((c) => c.skills.length > 0) && (
        <section className="mb-4 break-inside-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-400 pb-0.5 mb-1.5"
            style={{ color: theme.primary }}
          >
            {sectionTitles.skills}
          </h2>
          <div className="space-y-1 text-xs">
            {skills
              .filter((c) => c.skills.length > 0)
              .map((cat) => (
                <div key={cat.id}>
                  <span className="font-bold">{cat.name}: </span>
                  <span className="font-sans text-slate-800">{cat.skills.join(', ')}</span>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Certifications & Additional Details */}
      {(activeSections.certifications && certifications.length > 0) ||
      (activeSections.languages && languages.length > 0) ||
      (activeSections.achievements && achievements.length > 0) ? (
        <section className="text-xs break-inside-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider font-sans border-b border-slate-400 pb-0.5 mb-1.5"
            style={{ color: theme.primary }}
          >
            Additional Qualifications
          </h2>
          <div className="space-y-1.5">
            {activeSections.certifications && certifications.length > 0 && (
              <div>
                <span className="font-bold">{sectionTitles.certifications}: </span>
                <span className="font-sans text-slate-800">
                  {certifications
                    .map((c) => {
                      const dt = formatDisplayDate(c.issueDate);
                      return `${c.name} (${c.issuer}${dt ? ` - ${dt}` : ''})`;
                    })
                    .join('; ')}
                </span>
              </div>
            )}
            {activeSections.languages && languages.length > 0 && (
              <div>
                <span className="font-bold">{sectionTitles.languages}: </span>
                <span className="font-sans text-slate-800">
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
                </span>
              </div>
            )}
            {activeSections.achievements && achievements.length > 0 && (
              <div>
                <span className="font-bold">{sectionTitles.achievements}: </span>
                <div className="font-sans text-slate-800 space-y-1 mt-0.5">
                  {achievements.map((a) => (
                    <div key={a.id}>
                      <span className="font-semibold">{a.title}</span>
                      {a.date && <span className="text-slate-500 text-[11px] ml-1">({formatDisplayDate(a.date)})</span>}
                      {a.description && (
                        <RichTextRenderer content={a.description} className="text-slate-700 text-xs mt-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
};
