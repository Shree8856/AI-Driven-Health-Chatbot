import React, { useState } from "react";
import axios from "axios";
import { translations } from "../utils/mockResponses";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { motion } from "framer-motion";

interface SignupProps {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignupSuccess, onSwitchToLogin }) => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const t = translations[selectedLanguage] || translations.en;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(
        selectedLanguage === "hi"
          ? "पासवर्ड मेल नहीं खा रहे"
          : selectedLanguage === "or"
          ? "ପାସୱାର୍ଡ ମେଳିଲା ନାହିଁ"
          : "Passwords do not match"
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      onSignupSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Image Section */}
      <motion.div
        className="hidden md:flex w-1/2 bg-blue-900 items-center justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="dist/assets/health_banner.png"
          alt="Health Awareness"
          className="max-h-[60%] rounded-xl"
          animate={{ y: [0, -15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Right Form Section */}
      <motion.div
        className="flex flex-col w-full md:w-1/2 items-center justify-center px-8 bg-white shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Language Selector */}
        <div className="self-end mb-6">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onChangeLanguage={setSelectedLanguage}
          />
        </div>

        <img src="dist/assets/gov_logo.png" alt="Gov Logo" className="h-28 mb-10" />
        <h1 className="text-2xl font-bold text-blue-900 mb-2">{t.appName}</h1>
        <p className="text-gray-600 mb-8">{t.signupTitle}</p>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="w-full max-w-sm" onSubmit={handleSignup}>
          {/* Full Name */}
          <input
            type="text"
            placeholder={
              selectedLanguage === "hi"
                ? "पूरा नाम"
                : selectedLanguage === "or"
                ? "ପୁରା ନାମ"
                : "Full Name"
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder={
              selectedLanguage === "hi"
                ? "ईमेल"
                : selectedLanguage === "or"
                ? "ଇମେଲ୍"
                : "Email"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder={
              selectedLanguage === "hi"
                ? "पासवर्ड की पुष्टि करें"
                : selectedLanguage === "or"
                ? "ପାସୱାର୍ଡ ପୁନଃ ପ୍ରମାଣ କରନ୍ତୁ"
                : "Confirm Password"
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            {t.submitButton}
          </button>
        </form>

        {/* Bottom text with redirect */}
        <p className="text-gray-600 mt-6">
          {selectedLanguage === "hi"
            ? "पहले से खाता है? "
            : selectedLanguage === "or"
            ? "ପୂର୍ବରୁ ଖାତା ଅଛି? "
            : "Already have an account? "}
          <span
            className="text-blue-700 cursor-pointer font-semibold"
            onClick={onSwitchToLogin}
          >
            {selectedLanguage === "hi"
              ? "अपने खाते में लॉगिन करें"
              : selectedLanguage === "or"
              ? "ଆପଣଙ୍କ ଖାତାକୁ ଲଗଇନ୍ କରନ୍ତୁ"
              : "Login to your account"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};
