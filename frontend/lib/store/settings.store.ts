import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  autoSync: boolean;
  setAnimations: (animations: boolean) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setHighContrast: (highContrast: boolean) => void;
  setAutoSync: (autoSync: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      animations: true,
      reducedMotion: false,
      highContrast: false,
      autoSync: true,
      setAnimations: (animations) => set({ animations }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setHighContrast: (highContrast) => set({ highContrast }),
      setAutoSync: (autoSync) => set({ autoSync }),
    }),
    {
      name: "settings-storage",
    }
  )
);
