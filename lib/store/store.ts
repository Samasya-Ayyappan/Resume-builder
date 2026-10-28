import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import uiReducer from './slices/uiSlice';
import { saveResumeToStorage } from '../storage/localStorage';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Setup debounced auto-save listener on client
let timeoutId: ReturnType<typeof setTimeout> | null = null;
if (typeof window !== 'undefined') {
  let previousResumeState = store.getState().resume;

  store.subscribe(() => {
    const currentResumeState = store.getState().resume;
    // Only persist if the resume state actually changed
    if (currentResumeState !== previousResumeState) {
      previousResumeState = currentResumeState;
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        saveResumeToStorage(currentResumeState);
      }, 500); // 500ms debounce
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
