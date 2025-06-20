import React, { useState } from 'react';
import { Send, ArrowLeft, Video, Phone, MoreVertical } from 'lucide-react';
import { Doctor, ChatMessage } from '../types';

interface ChatInterfaceProps {
  doctor: Doctor | null;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ doctor, onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: doctor?.id || '',
      senderName: doctor?.name || '',
      senderType: 'doctor',
      message: `Hello! I'm ${doctor?.name}. How can I help you today?`,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: true
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !doctor) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'patient-1',
      senderName: 'You',
      senderType: 'patient',
      message: message.trim(),
      timestamp: new Date(),
      isRead: false
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: doctor.id,
        senderName: doctor.name,
        senderType: 'doctor',
        message: "Thank you for your message. I'll review your concerns and get back to you shortly.",
        timestamp: new Date(),
        isRead: true
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };

  if (!doctor) return null;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {doctor.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{doctor.name}</h2>
              <p className="text-sm text-gray-500">
                {doctor.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderType === 'patient' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.senderType === 'patient'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.senderType === 'patient' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;