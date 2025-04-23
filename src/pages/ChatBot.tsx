import React, { useState, useRef, useEffect } from 'react';
import { Send, Notebook as Robot, User, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI task assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What tasks do I have due today?",
    "Create a new task for tomorrow",
    "Show me my highest priority tasks",
    "Summarize my calendar for next week",
    "Reschedule my meetings for today"
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (input: string): Message => {
    let response = "I'm not sure how to help with that yet. As your AI assistant, I can help you manage tasks, schedule events, or provide summaries of your work.";
    
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      response = "Hello! How can I assist you with your tasks today?";
    } else if (lowerInput.includes('task') && (lowerInput.includes('create') || lowerInput.includes('add') || lowerInput.includes('new'))) {
      response = "I'd be happy to help you create a new task. What's the title and when is it due?";
    } else if (lowerInput.includes('due today') || lowerInput.includes('today')) {
      response = "You have 3 tasks due today: 'Complete project proposal' (high priority), 'Go for a 5k run' (low priority), and 'Buy groceries' (high priority).";
    } else if (lowerInput.includes('priority')) {
      response = "Your highest priority tasks are: 'Complete project proposal', 'Prepare for team meeting', and 'Buy groceries'.";
    } else if (lowerInput.includes('calendar') || lowerInput.includes('schedule')) {
      response = "Next week you have 5 events scheduled, including a team meeting on Monday at 10:00 AM and a project deadline on Wednesday.";
    } else if (lowerInput.includes('reschedule')) {
      response = "I can help reschedule your meetings. You have a team standup at 9:00 AM and a client call at 2:00 PM today. Which one would you like to reschedule?";
    } else if (lowerInput.includes('help')) {
      response = "I can help you manage your tasks, schedule events, set reminders, prioritize work, and provide summaries of your upcoming responsibilities. Just let me know what you need!";
    }
    
    return {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Focus the input after setting the value
    const inputElement = document.getElementById('chat-input');
    if (inputElement) {
      inputElement.focus();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Chat with your AI task assistant for help and recommendations.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col h-[calc(100vh-180px)]">
          {/* Chat Header */}
          <div className="bg-indigo-600 p-4 text-white flex items-center">
            <Robot className="h-6 w-6 mr-2" />
            <div>
              <h2 className="font-semibold">TaskAI Assistant</h2>
              <div className="text-xs text-indigo-200 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Online
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'bot' ? (
                      <Robot className="h-4 w-4 mr-1 text-indigo-500 dark:text-indigo-400" />
                    ) : (
                      <User className="h-4 w-4 mr-1 text-white" />
                    )}
                    <span className="text-xs opacity-75">{formatTime(message.timestamp)}</span>
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 overflow-x-auto">
            <div className="flex space-x-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="whitespace-nowrap px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center"
                >
                  <Zap className="w-3 h-3 mr-1 text-indigo-500" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={handleSubmit} className="flex">
              <input
                id="chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;