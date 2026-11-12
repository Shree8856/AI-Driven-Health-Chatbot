import React, { createContext, useState, useContext } from 'react';
import { LanguageCode } from '../utils/mockResponses';

interface LanguageContextProps {
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  selectedLanguage: 'en',
  setSelectedLanguage: () => {}
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
