import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you with trading today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputMessage, isBot: false }];
    setMessages(newMessages);
    setInputMessage('');

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      setMessages([...newMessages, {
        text: "Thanks for your message! I'm a demo chatbot. In the real app, I'll provide trading insights and answer your questions.",
        isBot: true
      }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-title">
              <MessageCircle size={20} />
              <span>Trading Assistant</span>
            </div>
            <div className="chatbot-controls">
              <button onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button onClick={toggleChat}>
                <X size={18} />
              </button>
            </div>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isBot ? 'bot' : 'user'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows="1"
            />
            <button 
              onClick={handleSend}
              className={inputMessage.trim() ? 'active' : ''}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
      
      <button 
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default Chatbot;