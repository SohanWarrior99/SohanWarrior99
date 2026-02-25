import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot, Sparkles } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('openai');
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, model };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        message: input,
        session_id: sessionId,
        model: model
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        model: response.data.model
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error: Could not get response. Please check your Universal Key balance and try again.',
        model
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative" data-testid="chat-page">
      <div className="luxury-bg"></div>
      
      {/* Header */}
      <div className="floating-card mx-4 mt-4 px-8 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="hover:text-yellow-500 transition hover:scale-110" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold gold-accent flex items-center gap-3" style={{fontFamily: 'Playfair Display'}} data-testid="chat-title">
            <Bot size={32} /> P07 Chat
          </h1>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setModel('openai')}
            className={`px-6 py-3 rounded-xl transition font-semibold ${model === 'openai' ? 'btn-luxury' : 'btn-secondary-luxury'}`}
            data-testid="model-openai-btn"
          >
            GPT-5.2
          </button>
          <button
            onClick={() => setModel('claude')}
            className={`px-6 py-3 rounded-xl transition font-semibold ${model === 'claude' ? 'btn-luxury' : 'btn-secondary-luxury'}`}
            data-testid="model-claude-btn"
          >
            Claude 4.5
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 relative" data-testid="messages-container">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          {messages.length === 0 && (
            <div className="text-center py-20 floating-card p-12" data-testid="empty-state">
              <div className="inline-block p-8 mb-6 rounded-full gold-border bg-gradient-to-br from-yellow-600/10 to-yellow-900/10">
                <Bot size={64} className="gold-accent" />
              </div>
              <h2 className="text-4xl font-bold mb-3 gradient-text" style={{fontFamily: 'Playfair Display'}}>Welcome to P07 Chat</h2>
              <p className="text-gray-400 text-xl">Experience sophisticated AI conversations</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${idx}`}
            >
              <div
                className={`max-w-2xl px-6 py-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-800 shadow-lg'
                    : 'floating-card'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed" data-testid={`message-${idx}-content`}>{msg.content}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start" data-testid="loading-indicator">
              <div className="floating-card px-8 py-6 rounded-2xl flex items-center gap-4">
                <div className="luxury-loader"></div>
                <span className="text-gray-400 font-medium">P07 is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="floating-card mx-4 mb-4 px-8 py-4 relative z-10">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder="Ask P07 anything..."
            className="flex-1 bg-transparent border-2 gold-border rounded-xl px-6 py-4 outline-none focus:border-yellow-500 transition text-white placeholder-gray-500"
            disabled={loading}
            data-testid="chat-input"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="btn-luxury px-10 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="send-btn"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
