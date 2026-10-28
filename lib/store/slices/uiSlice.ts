import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  activeTab: 'edit' | 'preview';
  zoomLevel: number;
  isTypeModalOpen: boolean;
  isResetConfirmOpen: boolean;
  saveStatus: 'saved' | 'saving' | 'idle';
  isExportingPdf: boolean;
  activeAccordion: string;
}

const initialState: UIState = {
  activeTab: 'edit',
  zoomLevel: 1,
  isTypeModalOpen: false,
  isResetConfirmOpen: false,
  saveStatus: 'saved',
  isExportingPdf: false,
  activeAccordion: 'personal',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'edit' | 'preview'>) => {
      state.activeTab = action.payload;
    },
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel = action.payload;
    },
    setIsTypeModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isTypeModalOpen = action.payload;
    },
    setIsResetConfirmOpen: (state, action: PayloadAction<boolean>) => {
      state.isResetConfirmOpen = action.payload;
    },
    setSaveStatus: (state, action: PayloadAction<'saved' | 'saving' | 'idle'>) => {
      state.saveStatus = action.payload;
    },
    setIsExportingPdf: (state, action: PayloadAction<boolean>) => {
      state.isExportingPdf = action.payload;
    },
    setActiveAccordion: (state, action: PayloadAction<string>) => {
      state.activeAccordion = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setZoomLevel,
  setIsTypeModalOpen,
  setIsResetConfirmOpen,
  setSaveStatus,
  setIsExportingPdf,
  setActiveAccordion,
} = uiSlice.actions;

export default uiSlice.reducer;
