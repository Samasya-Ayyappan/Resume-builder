import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import resumeReducer, {
  setResumeType,
  setTemplate,
  setThemeColor,
  updatePersonalInfo,
  addExperience,
  updateExperience,
  removeExperience,
  reorderExperience,
  updateSectionTitle,
  addSkillCategory,
  addSkillItem,
  removeSkillItem,
  loadSampleData,
  resetResume,
} from '../lib/store/slices/resumeSlice';
import { EXPERIENCED_SAMPLE_DATA, FRESHER_SAMPLE_DATA } from '../lib/utils/sampleData';

describe('Redux resumeSlice Tests', () => {
  it('should initialize with experienced default state', () => {
    const state = resumeReducer(undefined, { type: '@@INIT' });
    assert.equal(state.metadata.resumeType, 'experienced');
    assert.ok(state.experience.length > 0);
  });

  it('should switch resume type to fresher', () => {
    const initialState = EXPERIENCED_SAMPLE_DATA;
    const nextState = resumeReducer(initialState, setResumeType('fresher'));
    assert.equal(nextState.metadata.resumeType, 'fresher');
  });

  it('should update template selection without data loss', () => {
    const initialState = EXPERIENCED_SAMPLE_DATA;
    const nextState = resumeReducer(initialState, setTemplate('classic'));
    assert.equal(nextState.metadata.selectedTemplate, 'classic');
    assert.equal(nextState.personalInfo.fullName, initialState.personalInfo.fullName);
  });

  it('should update theme color', () => {
    const initialState = EXPERIENCED_SAMPLE_DATA;
    const nextState = resumeReducer(initialState, setThemeColor('emerald'));
    assert.equal(nextState.metadata.themeColor, 'emerald');
  });

  it('should update personal info partially', () => {
    const initialState = EXPERIENCED_SAMPLE_DATA;
    const nextState = resumeReducer(
      initialState,
      updatePersonalInfo({ fullName: 'Antigravity Engineer', jobTitle: 'Lead Architect' })
    );
    assert.equal(nextState.personalInfo.fullName, 'Antigravity Engineer');
    assert.equal(nextState.personalInfo.jobTitle, 'Lead Architect');
    assert.equal(nextState.personalInfo.email, initialState.personalInfo.email);
  });

  it('should append new experience at the bottom, update, and remove experience items', () => {
    let state = EXPERIENCED_SAMPLE_DATA;
    const initialCount = state.experience.length;

    // Add experience - must be appended at the bottom
    state = resumeReducer(state, addExperience({ company: 'TestCorp', jobTitle: 'SDE I' }));
    assert.equal(state.experience.length, initialCount + 1);
    const addedItem = state.experience[state.experience.length - 1];
    assert.equal(addedItem.company, 'TestCorp');
    assert.equal(addedItem.jobTitle, 'SDE I');

    // Update
    state = resumeReducer(
      state,
      updateExperience({ id: addedItem.id, changes: { jobTitle: 'SDE II' } })
    );
    const updatedItem = state.experience.find((e) => e.id === addedItem.id);
    assert.equal(updatedItem?.jobTitle, 'SDE II');

    // Remove
    state = resumeReducer(state, removeExperience(addedItem.id));
    assert.equal(state.experience.length, initialCount);
  });

  it('should correctly reorder experience items', () => {
    let state = EXPERIENCED_SAMPLE_DATA;
    assert.ok(state.experience.length >= 2);
    const firstId = state.experience[0].id;
    const secondId = state.experience[1].id;

    state = resumeReducer(state, reorderExperience({ fromIndex: 0, toIndex: 1 }));
    assert.equal(state.experience[0].id, secondId);
    assert.equal(state.experience[1].id, firstId);
  });

  it('should update section titles', () => {
    let state = EXPERIENCED_SAMPLE_DATA;
    state = resumeReducer(
      state,
      updateSectionTitle({ section: 'experience', title: 'Career History' })
    );
    assert.equal(state.sectionTitles?.experience, 'Career History');

    state = resumeReducer(
      state,
      updateSectionTitle({ section: 'education', title: 'Academic Background' })
    );
    assert.equal(state.sectionTitles?.education, 'Academic Background');
  });

  it('should handle skill categories and items', () => {
    let state = EXPERIENCED_SAMPLE_DATA;
    state = resumeReducer(state, addSkillCategory('Testing Skills'));
    const newCat = state.skills.find((c) => c.name === 'Testing Skills');
    assert.ok(newCat);

    state = resumeReducer(state, addSkillItem({ categoryId: newCat.id, skill: 'Vitest' }));
    const updatedCat = state.skills.find((c) => c.id === newCat.id);
    assert.ok(updatedCat?.skills.includes('Vitest'));

    state = resumeReducer(state, removeSkillItem({ categoryId: newCat.id, skillIndex: 0 }));
    const finalCat = state.skills.find((c) => c.id === newCat.id);
    assert.equal(finalCat?.skills.length, 0);
  });

  it('should load fresher sample data', () => {
    let state = EXPERIENCED_SAMPLE_DATA;
    state = resumeReducer(state, loadSampleData('fresher'));
    assert.equal(state.metadata.resumeType, 'fresher');
    assert.equal(state.personalInfo.fullName, FRESHER_SAMPLE_DATA.personalInfo.fullName);
  });

  it('should reset resume to empty template', () => {
    let state = EXPERIENCED_SAMPLE_DATA;
    state = resumeReducer(state, resetResume('fresher'));
    assert.equal(state.metadata.resumeType, 'fresher');
    assert.equal(state.personalInfo.fullName, '');
    assert.equal(state.experience.length, 0);
  });
});
