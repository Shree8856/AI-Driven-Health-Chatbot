import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`
          max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg
          ${isUser 
            ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-br-md transform hover:scale-[1.02] transition-all duration-150'
            : 'bg-green-100 text-gray-900 rounded-bl-md'
          }
        `}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-green-200' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};
