import { ResumeData } from '../types/resume';

const STORAGE_KEY = 'resume_studio_state_v1';

export const isBrowser = (): boolean => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

/**
 * Validates basic structure of loaded resume data to prevent runtime crashes from corrupt storage
 */
export function validateStoredResume(data: unknown): data is ResumeData {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Partial<ResumeData>;
  return (
    typeof candidate.metadata === 'object' &&
    typeof candidate.personalInfo === 'object' &&
    Array.isArray(candidate.skills) &&
    Array.isArray(candidate.education)
  );
}

/**
 * Safely loads the stored resume from browser localStorage
 */
export function loadResumeFromStorage(): ResumeData | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (validateStoredResume(parsed)) {
      return parsed;
    }
    console.warn('[Resume Studio] Local storage contained invalid resume shape; skipping.');
    return null;
  } catch (error) {
    console.error('[Resume Studio] Error reading from localStorage:', error);
    return null;
  }
}

/**
 * Safely saves the resume to browser localStorage
 */
export function saveResumeToStorage(data: ResumeData): boolean {
  if (!isBrowser()) return false;

  try {
    const payload = JSON.stringify(data);
    window.localStorage.setItem(STORAGE_KEY, payload);
    return true;
  } catch (error) {
    console.error('[Resume Studio] Failed to persist resume to localStorage:', error);
    return false;
  }
}

/**
 * Removes the stored resume data completely from localStorage
 */
export function clearResumeFromStorage(): boolean {
  if (!isBrowser()) return false;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('[Resume Studio] Failed to clear resume from localStorage:', error);
    return false;
  }
}
