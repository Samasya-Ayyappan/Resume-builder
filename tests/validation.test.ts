import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, isValidUrl, calculateResumeStrength } from '../lib/utils/validation';
import { EXPERIENCED_SAMPLE_DATA, FRESHER_SAMPLE_DATA, createEmptyResume } from '../lib/utils/sampleData';

describe('Validation & Score Algorithm Tests', () => {
  it('should validate email addresses correctly', () => {
    assert.equal(isValidEmail('test@example.com'), true);
    assert.equal(isValidEmail('user.name+tag@domain.co.uk'), true);
    assert.equal(isValidEmail('invalid-email'), false);
    assert.equal(isValidEmail('missing@domain'), false);
    assert.equal(isValidEmail(''), false);
  });

  it('should validate URLs correctly', () => {
    assert.equal(isValidUrl('https://github.com'), true);
    assert.equal(isValidUrl('portfolio.dev'), true);
    assert.equal(isValidUrl(''), true); // optional
  });

  it('should evaluate strength score of complete sample resume', () => {
    const resultExp = calculateResumeStrength(EXPERIENCED_SAMPLE_DATA);
    assert.ok(resultExp.score >= 80, `Expected score >= 80, got ${resultExp.score}`);
    assert.equal(resultExp.grade, 'Outstanding');

    const resultFresh = calculateResumeStrength(FRESHER_SAMPLE_DATA);
    assert.ok(resultFresh.score >= 80, `Expected score >= 80, got ${resultFresh.score}`);
    assert.equal(resultFresh.grade, 'Outstanding');
  });

  it('should evaluate strength score of empty resume and provide suggestions', () => {
    const emptyResume = createEmptyResume('fresher');
    const result = calculateResumeStrength(emptyResume);
    assert.ok(result.score < 40);
    assert.equal(result.grade, 'Needs Work');
    assert.ok(result.suggestions.length > 0);
  });
});
