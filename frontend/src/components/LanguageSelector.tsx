// src/components/LanguageSelector.tsx
import React from 'react';
import { languages } from '../utils/mockResponses';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onChangeLanguage: (lang: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onChangeLanguage }) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onChangeLanguage(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-sm"
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.nativeName}
        </option>
      ))}
    </select>
  );
};
