import React, { useState } from "react";
import axios from "axios";
import { translations } from "../utils/mockResponses";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { motion } from "framer-motion";

interface LoginProps {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const t = translations[selectedLanguage] || translations.en;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 items-center justify-center">
  <motion.img
    src="dist/assets/health_banner.png"
    alt="Health Awareness"
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 30, ease: "easeOut" }}
    className="h-[70%] w-auto object-contain rounded-2xl shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform duration-500"
  />
</div>



      {/* Right Form Section */}
      <div className="flex flex-col w-full md:w-1/2 h-screen items-center justify-center px-8 bg-white shadow-lg">
        {/* Language Selector */}
        <div className="self-end mb-6">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onChangeLanguage={setSelectedLanguage}
          />
        </div>

        <img src="dist/assets/gov_logo.png" alt="Gov Logo" className="h-30 mb-12" />
        <h1 className="text-2xl font-bold text-blue-900 mb-2">{t.appName}</h1>
        <p className="text-gray-600 mb-8">{t.loginTitle}</p>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="w-full max-w-sm" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={t.usernamePlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            {t.submitButton}
          </button>
        </form>

        <p className="text-gray-600 mt-6">
          {selectedLanguage === "hi"
            ? "नए उपयोगकर्ता?"
            : selectedLanguage === "or"
            ? "ନୂତନ ବ୍ୟବହାରକାରୀ?"
            : "New user?"}{" "}
          <span
            className="text-blue-700 cursor-pointer font-semibold"
            onClick={onSwitchToSignup}
          >
            {t.signupTitle}
          </span>
        </p>
      </div>
    </div>
  );
};
