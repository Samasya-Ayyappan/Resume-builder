"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { loadResumeFromStorage } from "@/lib/storage/localStorage";
import { loadResumeData } from "@/lib/store/slices/resumeSlice";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const stored = loadResumeFromStorage();
      if (stored) {
        store.dispatch(loadResumeData(stored));
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
