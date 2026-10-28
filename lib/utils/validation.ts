import { ResumeData } from '../types/resume';

export const isValidEmail = (email: string): boolean => {
  if (!email.trim()) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const isValidUrl = (url: string): boolean => {
  if (!url.trim()) return true; // Optional field
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export interface ResumeStrengthResult {
  score: number;
  grade: 'Needs Work' | 'Good Start' | 'Strong' | 'Outstanding';
  suggestions: string[];
}

export const calculateResumeStrength = (data: ResumeData): ResumeStrengthResult => {
  let score = 0;
  const suggestions: string[] = [];

  // Personal Info
  if (data.personalInfo.fullName.trim()) {
    score += 10;
  } else {
    suggestions.push('Add your full name.');
  }

  if (isValidEmail(data.personalInfo.email)) {
    score += 10;
  } else {
    suggestions.push('Add a valid email address.');
  }

  if (data.personalInfo.jobTitle.trim()) {
    score += 10;
  } else {
    suggestions.push('Provide your target job title or primary role.');
  }

  if (data.personalInfo.phone.trim() && data.personalInfo.location.trim()) {
    score += 5;
  } else {
    suggestions.push('Add your phone number and city/location.');
  }

  // Summary
  if (data.summary.trim().length >= 50) {
    score += 15;
  } else {
    suggestions.push('Write a professional summary (at least 2-3 sentences).');
  }

  // Skills
  const totalSkills = data.skills.reduce((acc, cat) => acc + cat.skills.length, 0);
  if (totalSkills >= 6) {
    score += 15;
  } else {
    suggestions.push('Add at least 6 key skills across your categories.');
  }

  // Education
  if (data.education.length > 0 && data.education[0].institution.trim() && data.education[0].degree.trim()) {
    score += 15;
  } else {
    suggestions.push('Include at least one complete education entry.');
  }

  // Experience or Projects
  if (data.metadata.resumeType === 'experienced') {
    if (data.experience.length > 0 && data.experience[0].company.trim() && data.experience[0].jobTitle.trim()) {
      score += 15;
    } else {
      suggestions.push('Add your recent work experience with key achievements.');
    }
  } else {
    // Fresher
    if (data.projects.length > 0 && data.projects[0].title.trim()) {
      score += 15;
    } else {
      suggestions.push('Add at least one technical project showcasing your skills.');
    }
  }

  // Extra polish (links, certifications, languages, achievements)
  let extraCount = 0;
  if (data.personalInfo.linkedin?.trim() || data.personalInfo.github?.trim()) extraCount++;
  if (data.certifications.length > 0) extraCount++;
  if (data.projects.length > 0) extraCount++;
  if (data.achievements.length > 0) extraCount++;

  if (extraCount >= 2) {
    score += 10;
  } else {
    suggestions.push('Add portfolio links, certifications, or notable achievements.');
  }

  const finalScore = Math.min(100, Math.max(0, score));

  let grade: ResumeStrengthResult['grade'] = 'Needs Work';
  if (finalScore >= 85) grade = 'Outstanding';
  else if (finalScore >= 70) grade = 'Strong';
  else if (finalScore >= 45) grade = 'Good Start';

  return {
    score: finalScore,
    grade,
    suggestions: suggestions.slice(0, 3), // Return top 3 tips
  };
};
