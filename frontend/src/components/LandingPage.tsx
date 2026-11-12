import React from 'react';
import { MessageCircle, Shield, Clock, Users } from 'lucide-react';
import { translations } from '../utils/mockResponses';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage: React.FC<{ onStartChat: () => void }> = ({ onStartChat }) => {
  const { selectedLanguage } = useLanguage();
  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const features = [
    {
      icon: MessageCircle,
      title: 'Health Query Answering',
      description: 'Get health guidance anytime, anywhere',
      color: 'bg-gradient-to-br from-green-400 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Vaccination Scheduling',
      description: 'Get time-to-time location specific vaccination schedule',
      color: 'bg-gradient-to-br from-purple-400 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'Multilingual Support',
      description: 'Available in Oriya, Hindi & English',
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
      icon: Users,
      title: 'Community Health',
      description: 'Supporting public health initiatives',
      color: 'bg-gradient-to-br from-pink-400 to-red-500'
    }
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen p-6 space-y-12 transition-colors duration-300">

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-8">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h3 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Welcome to Odisha Govt. AI Health ChatBot
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl">
            {t.landingSubtitle}
          </p>
          <button
            onClick={onStartChat}
            className="mt-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
          >
            {t.startChatButton}
          </button>
        </div>

        {/* Hero Images */}
        <div className="flex-1 flex justify-center gap-4">
          <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <img src="dist/assets/Govt_logo.png" alt="Health Info" className="w-33 h-33 object-contain" />
          </div>
          <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <img src="dist/assets/vaccination.png" alt="Vaccination" className="w-33 h-33 object-contain" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`${feature.color} p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 text-center flex flex-col items-center text-white dark:border-gray-700`}
            >
              <Icon className="w-8 h-8 mb-3" />
              <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Footer Disclaimer */}
      <p className="text-xs text-gray-700 dark:text-gray-400 max-w-2xl text-center leading-relaxed">
        This chatbot provides general health information only. For medical emergencies or specific medical advice, please consult healthcare professionals.
      </p>
    </div>
  );
};
