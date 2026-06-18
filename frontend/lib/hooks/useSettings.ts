"use client";

import { useSettingsStore } from "@/lib/store/settings.store";

export function useSettings() {
  const {
    animations,
    reducedMotion,
    highContrast,
    autoSync,
    setAnimations,
    setReducedMotion,
    setHighContrast,
    setAutoSync,
  } = useSettingsStore();

  return {
    animations,
    reducedMotion,
    highContrast,
    autoSync,
    setAnimations,
    setReducedMotion,
    setHighContrast,
    setAutoSync,
  };
}
