export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface AppState {
  currentView: 'landing' | 'chat';
  selectedLanguage: string;
  messages: Message[];
}