"use client";

import { useLanguageStore } from "@/lib/store/language.store";
import english from "@/i18n/english.json";
import myanmar from "@/i18n/myanmar.json";

const translations: Record<string, Record<string, string>> = {
  en: english,
  my: myanmar,
};

export function useLanguage() {
  const { language, setLanguage } = useLanguageStore();

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return { language, setLanguage, t };
}
