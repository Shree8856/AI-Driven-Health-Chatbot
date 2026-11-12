import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { ChatInterface } from './components/ChatInterface';
import { LanguageProvider } from './context/LanguageContext';

// 🔹 Placeholder auth components
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function AppContent() {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'landing' | 'chat'>('login');
  const [darkMode, setDarkMode] = useState(false);

  const handleLoginSuccess = () => setCurrentView('landing');
  const handleSignupSuccess = () => setCurrentView('login');
  const handleStartChat = () => setCurrentView('chat');
  const handleBackToLanding = () => setCurrentView('landing');
  const handleSwitchToSignup = () => setCurrentView('signup');
  const handleSwitchToLogin = () => setCurrentView('login');
  const handleLogout = () => setCurrentView('login');

  // 🔹 Sync Tailwind dark mode with <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      {(currentView === 'landing' || currentView === 'chat') && (
        <Header
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
      )}

      {currentView === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}

      {currentView === 'signup' && (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}

      {currentView === 'landing' && (
        <LandingPage onStartChat={handleStartChat} />
      )}

      {currentView === 'chat' && (
        <ChatInterface onBackToLanding={handleBackToLanding} />
      )}
    </div>
  );
}

// Wrap entire app with LanguageProvider
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
