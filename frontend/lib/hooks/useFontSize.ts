"use client";

import { useFontStore } from "@/lib/store/font.store";

export function useFontSize() {
  const { fontSize, fontFamily, lineHeight, setFontSize, setFontFamily, setLineHeight } = useFontStore();

  return { fontSize, fontFamily, lineHeight, setFontSize, setFontFamily, setLineHeight };
}
