import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FontState {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  setFontFamily: (fontFamily: string) => void;
  setFontSize: (fontSize: number) => void;
  setLineHeight: (lineHeight: number) => void;
}

export const useFontStore = create<FontState>()(
  persist(
    (set) => ({
      fontFamily: "inter",
      fontSize: 16,
      lineHeight: 1.5,
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
    }),
    {
      name: "font-storage",
    }
  )
);
