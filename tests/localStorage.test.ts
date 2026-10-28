import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateStoredResume } from '../lib/storage/localStorage';
import { EXPERIENCED_SAMPLE_DATA } from '../lib/utils/sampleData';

describe('Storage Schema Validation Tests', () => {
  it('should validate valid resume structure', () => {
    assert.equal(validateStoredResume(EXPERIENCED_SAMPLE_DATA), true);
  });

  it('should reject malformed or null objects', () => {
    assert.equal(validateStoredResume(null), false);
    assert.equal(validateStoredResume(undefined), false);
    assert.equal(validateStoredResume('string'), false);
    assert.equal(validateStoredResume({}), false);
    assert.equal(validateStoredResume({ metadata: {} }), false);
  });

  it('should reject objects missing required arrays', () => {
    const invalidObj = {
      metadata: {},
      personalInfo: {},
      skills: 'not-an-array',
      education: [],
    };
    assert.equal(validateStoredResume(invalidObj), false);
  });
});
