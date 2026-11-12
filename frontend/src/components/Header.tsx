import React from 'react';
import { Bell, Globe, LogOut, Sun, Moon } from 'lucide-react';
import { LanguageCode, languages, translations } from '../utils/mockResponses';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onLogout: () => void;       // Logout callback
  darkMode: boolean;          // Dark mode state
  toggleDarkMode: () => void; // Toggle function
}

export const Header: React.FC<HeaderProps> = ({ onLogout, darkMode, toggleDarkMode }) => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  return (
    <header className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
          <span className="text-green-600 font-extrabold text-xl">E</span>
        </div>
        <h1 className="text-white font-bold text-2xl md:text-3xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Eco-Minds
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <div className="relative">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
          <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-white hover:text-yellow-300 hover:bg-white/20 rounded-lg transition-colors"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Outbreak Alerts */}
        <button
          className="relative p-2 text-white hover:text-yellow-400 hover:bg-white/20 rounded-lg transition-colors"
          title={t.outbreakAlerts}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1 bg-white text-green-600 font-semibold px-3 py-1.5 rounded-lg shadow hover:bg-green-50 transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </header>
  );
};
