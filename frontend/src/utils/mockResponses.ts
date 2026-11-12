export const translations = {
  en: {
    appName: "Odisha Government AI Health ChatBot",
    landingTitle: 'AI-Driven Public Health Chatbot',
    landingSubtitle: 'Get instant access to reliable health information and guidance',
    startChatButton: 'Start Conversation',
    messagePlaceholder: 'Type your health question...',
    sendButton: 'Send',
    loginTitle: "Login to your account",
    signupTitle: "Create a new account",
    usernamePlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    submitButton: 'Submit',
    outbreakAlerts: 'Outbreak Alerts', // <-- add this
    botResponses: [
      'Hello! I\'m your AI health assistant. How can I help you today?',
      'I can provide information about symptoms, preventive measures, and general health guidance.'
    ]
  },
  hi: {
    appName: "ओडिशा सरकार एआई स्वास्थ्य चैटबॉट",
    landingTitle: 'AI-संचालित सार्वजनिक स्वास्थ्य चैटबॉट',
    landingSubtitle: 'विश्वसनीय स्वास्थ्य जानकारी और मार्गदर्शन तुरंत प्राप्त करें',
    startChatButton: 'बातचीत शुरू करें',
    messagePlaceholder: 'अपना स्वास्थ्य प्रश्न टाइप करें...',
    sendButton: 'भेजें',
    loginTitle: "अपने खाते में लॉगिन करें",
    signupTitle: "नया खाता बनाएँ",
    usernamePlaceholder: 'उपयोगकर्ता नाम',
    passwordPlaceholder: 'पासवर्ड',
    submitButton: 'सबमिट करें',
    outbreakAlerts: 'आउटब्रेक अलर्ट', // <-- add this
    botResponses: [
      'नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?',
      'मैं लक्षणों, बचाव के उपायों और सामान्य स्वास्थ्य मार्गदर्शन की जानकारी दे सकता हूँ।'
    ]
  },
  or: {
    appName: "ଓଡ଼ିଶା ସରକାର ଏଆଇ ସ୍ୱାସ୍ଥ୍ୟ ଚାଟବୋଟ୍",
    landingTitle: 'AI-ଚାଳିତ ସାର୍ବଜନୀନ ସ୍ୱାସ୍ଥ୍ୟ ଚାଟବଟ୍',
    landingSubtitle: 'ବିଶ୍ୱସନୀୟ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଏବଂ ମାର୍ଗଦର୍ଶନ ପାଇଁ ତତ୍କ୍ଷଣାତ୍ ପ୍ରବେଶ ମିଳନ୍ତୁ',
    startChatButton: 'ସଂଭାଷଣା ଆରମ୍ଭ କରନ୍ତୁ',
    messagePlaceholder: 'ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନ ଟାଇପ୍ କରନ୍ତୁ...',
    sendButton: 'ପଠାନ୍ତୁ',
    loginTitle: "ଆପଣଙ୍କର ଖାତାକୁ ଲଗିନ୍ କରନ୍ତୁ",
    signupTitle: "ନୂତନ ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ",
    usernamePlaceholder: 'ଉପଯୋଗକର୍ତ୍ତା ନାମ',
    passwordPlaceholder: 'ପାସୱାର୍ଡ',
    submitButton: 'ସବମିଟ୍ କରନ୍ତୁ',
    outbreakAlerts: 'ଅସୁସ୍ଥତା ସତର୍କତା', // <-- add this
    botResponses: [
      'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ଆଜି ମୁଁ କିପରି ସହାୟତା କରିପାରିବି?',
      'ମୁଁ ଲକ୍ଷଣ, ପ୍ରତିରୋଧ ଉପାୟ ଏବଂ ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ ମାର୍ଗଦର୍ଶନ ବିଷୟରେ ସୂଚନା ଦେଇପାରିବି।'
    ]
  }
};

export type LanguageCode = keyof typeof translations;

export const languages: { code: LanguageCode; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'or', name: 'Oriya', nativeName: 'ଓଡ଼ିଆ' }
];

export const getRandomBotResponse = (language: LanguageCode): string => {
  const responses = translations[language]?.botResponses || translations.en.botResponses;
  return responses[Math.floor(Math.random() * responses.length)];
};
