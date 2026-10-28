import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ResumeData,
  ResumeType,
  TemplateId,
  ThemeColor,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  AchievementItem,
  ActiveSectionsConfig,
  SectionTitles,
  DEFAULT_SECTION_TITLES,
} from '../../types/resume';
import {
  createEmptyResume,
  FRESHER_SAMPLE_DATA,
  EXPERIENCED_SAMPLE_DATA,
} from '../../utils/sampleData';

const initialState: ResumeData = EXPERIENCED_SAMPLE_DATA;

const generateId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeType: (state, action: PayloadAction<ResumeType>) => {
      state.metadata.resumeType = action.payload;
      state.metadata.lastModified = Date.now();
      if (action.payload === 'fresher') {
        state.activeSections.experience = state.experience.length > 0;
      } else {
        state.activeSections.experience = true;
      }
    },

    setTemplate: (state, action: PayloadAction<TemplateId>) => {
      state.metadata.selectedTemplate = action.payload;
      state.metadata.lastModified = Date.now();
    },

    setThemeColor: (state, action: PayloadAction<ThemeColor>) => {
      state.metadata.themeColor = action.payload;
      state.metadata.lastModified = Date.now();
    },

    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
      state.metadata.lastModified = Date.now();
    },

    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
      state.metadata.lastModified = Date.now();
    },

    updateSectionTitle: (
      state,
      action: PayloadAction<{ section: keyof SectionTitles; title: string }>
    ) => {
      if (!state.sectionTitles) {
        state.sectionTitles = { ...DEFAULT_SECTION_TITLES };
      }
      state.sectionTitles[action.payload.section] = action.payload.title;
      state.metadata.lastModified = Date.now();
    },

    // --- Work Experience Actions (Appends new entries at bottom) ---
    addExperience: (state, action: PayloadAction<Partial<ExperienceItem> | undefined>) => {
      const newItem: ExperienceItem = {
        id: generateId('exp'),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        highlights: [''],
        ...(action.payload || {}),
      };
      state.experience.push(newItem);
      state.metadata.lastModified = Date.now();
    },

    updateExperience: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<ExperienceItem> }>
    ) => {
      const index = state.experience.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.experience[index] = { ...state.experience[index], ...action.payload.changes };
        state.metadata.lastModified = Date.now();
      }
    },

    removeExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter((item) => item.id !== action.payload);
      state.metadata.lastModified = Date.now();
    },

    reorderExperience: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      if (
        fromIndex >= 0 &&
        fromIndex < state.experience.length &&
        toIndex >= 0 &&
        toIndex < state.experience.length
      ) {
        const [moved] = state.experience.splice(fromIndex, 1);
        state.experience.splice(toIndex, 0, moved);
        state.metadata.lastModified = Date.now();
      }
    },

    // --- Education Actions (Appends at bottom) ---
    addEducation: (state, action: PayloadAction<Partial<EducationItem> | undefined>) => {
      const newItem: EducationItem = {
        id: generateId('edu'),
        institution: '',
        degree: '',
        fieldOfStudy: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
        honors: '',
        ...(action.payload || {}),
      };
      state.education.push(newItem);
      state.metadata.lastModified = Date.now();
    },

    updateEducation: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<EducationItem> }>
    ) => {
      const index = state.education.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.education[index] = { ...state.education[index], ...action.payload.changes };
        state.metadata.lastModified = Date.now();
      }
    },

    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter((item) => item.id !== action.payload);
      state.metadata.lastModified = Date.now();
    },

    // --- Skills Actions ---
    addSkillCategory: (state, action: PayloadAction<string>) => {
      const newCat = {
        id: generateId('sk_cat'),
        name: action.payload || 'Skill Category',
        skills: [],
      };
      state.skills.push(newCat);
      state.metadata.lastModified = Date.now();
    },

    updateSkillCategoryName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const cat = state.skills.find((c) => c.id === action.payload.id);
      if (cat) {
        cat.name = action.payload.name;
        state.metadata.lastModified = Date.now();
      }
    },

    removeSkillCategory: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((c) => c.id !== action.payload);
      state.metadata.lastModified = Date.now();
    },

    addSkillItem: (
      state,
      action: PayloadAction<{ categoryId: string; skill: string }>
    ) => {
      const cat = state.skills.find((c) => c.id === action.payload.categoryId);
      if (cat && action.payload.skill.trim()) {
        const trimmed = action.payload.skill.trim();
        if (!cat.skills.includes(trimmed)) {
          cat.skills.push(trimmed);
          state.metadata.lastModified = Date.now();
        }
      }
    },

    removeSkillItem: (
      state,
      action: PayloadAction<{ categoryId: string; skillIndex: number }>
    ) => {
      const cat = state.skills.find((c) => c.id === action.payload.categoryId);
      if (cat) {
        cat.skills.splice(action.payload.skillIndex, 1);
        state.metadata.lastModified = Date.now();
      }
    },

    // --- Projects Actions (Appends at bottom) ---
    addProject: (state, action: PayloadAction<Partial<ProjectItem> | undefined>) => {
      const newItem: ProjectItem = {
        id: generateId('proj'),
        title: '',
        description: '',
        technologies: [],
        link: '',
        github: '',
        startDate: '',
        endDate: '',
        ...(action.payload || {}),
      };
      state.projects.push(newItem);
      state.metadata.lastModified = Date.now();
    },

    updateProject: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<ProjectItem> }>
    ) => {
      const index = state.projects.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload.changes };
        state.metadata.lastModified = Date.now();
      }
    },

    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((item) => item.id !== action.payload);
      state.metadata.lastModified = Date.now();
    },

    // --- Certifications Actions (Appends at bottom) ---
    addCertification: (state, action: PayloadAction<Partial<CertificationItem> | undefined>) => {
      const newItem: CertificationItem = {
        id: generateId('cert'),
        name: '',
        issuer: '',
        issueDate: '',
        url: '',
        ...(action.payload || {}),
      };
      state.certifications.push(newItem);
      state.metadata.lastModified = Date.now();
    },

    updateCertification: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<CertificationItem> }>
    ) => {
      const index = state.certifications.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.certifications[index] = { ...state.certifications[index], ...action.payload.changes };
        state.metadata.lastModified = Date.now();
      }
    },

    removeCertification: (state, action: PayloadAction<string>) => {
      state.certifications = state.certifications.filter((item) => item.id !== action.payload);
      state.metadata.lastModified = Date.now();
    },

    // --- Languages Actions (Appends at bottom) ---
    addLanguage: (state, action: PayloadAction<Partial<LanguageItem> | undefined>) => {
      const newItem: LanguageItem = {
        id: generateId('lang'),
        language: '',
        proficiency: 'Professional Working',
        ...(action.payload || {}),
      };
      state.languages.push(newItem);
      state.metadata.lastModified = Date.now();
    },

    updateLanguage: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<LanguageItem> }>
    ) => {
      const index = state.languages.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.languages[index] = { ...state.languages[index], ...action.payload.changes };
        state.metadata.lastModified = Date.now();
      }
    },

    removeLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter((item) => item.id !== action.payload);
      state.metadata.lastModified = Date.now();
    },

    // --- Achievements Actions (Appends at bottom) ---
    addAchievement: (state, action: PayloadAction<Partial<AchievementItem> | undefined>) => {
      const newItem: AchievementItem = {
        id: generateId('ach'),
        title: '',
        date: '',
        description: '',
        ...(action.payload || {}),
      };
      state.achievements.push(newItem);
      state.metadata.lastModified = Date.now();
    },

    updateAchievement: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<AchievementItem> }>
    ) => {
      const index = state.achievements.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.achievements[index] = { ...state.achievements[index], ...action.payload.changes };
        state.metadata.lastModified = Date.now();
      }
    },

    removeAchievement: (state, action: PayloadAction<string>) => {
      state.achievements = state.achievements.filter((item) => item.id !== action.payload);
      state.metadata.lastModified = Date.now();
    },

    // --- Active Section Toggles ---
    toggleSection: (state, action: PayloadAction<keyof ActiveSectionsConfig>) => {
      state.activeSections[action.payload] = !state.activeSections[action.payload];
      state.metadata.lastModified = Date.now();
    },

    // --- Bulk / Lifecycle Actions ---
    loadResumeData: (_state, action: PayloadAction<ResumeData>) => {
      const loaded = { ...action.payload };
      if (!loaded.sectionTitles) {
        loaded.sectionTitles = { ...DEFAULT_SECTION_TITLES };
      }
      return loaded;
    },

    loadSampleData: (_state, action: PayloadAction<ResumeType>) => {
      return action.payload === 'fresher' ? FRESHER_SAMPLE_DATA : EXPERIENCED_SAMPLE_DATA;
    },

    resetResume: (_state, action: PayloadAction<ResumeType | undefined>) => {
      return createEmptyResume(action.payload || 'experienced');
    },
  },
});

export const {
  setResumeType,
  setTemplate,
  setThemeColor,
  updatePersonalInfo,
  updateSummary,
  updateSectionTitle,
  addExperience,
  updateExperience,
  removeExperience,
  reorderExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkillCategory,
  updateSkillCategoryName,
  removeSkillCategory,
  addSkillItem,
  removeSkillItem,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addAchievement,
  updateAchievement,
  removeAchievement,
  toggleSection,
  loadResumeData,
  loadSampleData,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
