import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { translations } from '../utils/mockResponses';
import { useLanguage } from '../context/LanguageContext';

interface ChatInterfaceProps {
  onBackToLanding: () => void;
}

type TranslationKey = keyof typeof translations;

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBackToLanding }) => {
  const { selectedLanguage } = useLanguage();

  const languageKey: TranslationKey =
    selectedLanguage && selectedLanguage in translations
      ? (selectedLanguage as TranslationKey)
      : 'en';

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: t.botResponses[0],
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [languageKey]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5006/webhooks/rest/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'user',
          message: userMessage.text,
        }),
      });

      const data = await response.json();

      if (data && data.length > 0) {
        for (const msg of data) {
          if (msg.text) {
            const botMessage: Message = {
              id: (Date.now() + Math.random()).toString(),
              text: msg.text,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
          }
        }
      }
    } catch (error) {
      console.error('Error sending message to Rasa:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: '⚠️ Unable to connect to the bot. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-md dark:from-gray-700 dark:to-gray-900">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToLanding}
            className="p-2 text-white hover:text-gray-200 hover:bg-green-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg dark:bg-gray-700">
              <span className="text-green-600 font-bold text-lg dark:text-green-300">EM</span>
            </div>
            <div>
              <h2
                className="font-extrabold text-xl tracking-wide"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Eco-Minds
              </h2>
              <p className="text-sm text-green-200 dark:text-gray-400">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-green-100 px-4 py-2 rounded-2xl rounded-bl-md shadow-sm animate-pulse dark:bg-gray-700">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-end space-x-3">
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.messagePlaceholder}
            className="flex-1 resize-none border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm leading-tight max-h-24 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
