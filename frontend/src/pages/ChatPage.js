import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot } from 'lucide-react';
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
        content: 'Error: Could not get response. Please try again.',
        model
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col" data-testid="chat-page">
      {/* Header */}
      <div className="glass-effect px-8 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500 transition" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold" style={{fontFamily: 'Chivo'}} data-testid="chat-title">P07 Chat</h1>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setModel('openai')}
            className={`px-4 py-2 rounded-lg transition ${model === 'openai' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            data-testid="model-openai-btn"
          >
            GPT-5.2
          </button>
          <button
            onClick={() => setModel('claude')}
            className={`px-4 py-2 rounded-lg transition ${model === 'claude' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            data-testid="model-claude-btn"
          >
            Claude 4.5
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6" data-testid="messages-container">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-20" data-testid="empty-state">
              <Bot size={64} className="mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold mb-2" style={{fontFamily: 'Chivo'}}>Welcome to P07 Chat</h2>
              <p className="text-gray-400">Start a conversation with our advanced AI</p>
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
                    ? 'bg-blue-600'
                    : 'glass-effect border border-white/10'
                }`}
              >
                <p className="whitespace-pre-wrap" data-testid={`message-${idx}-content`}>{msg.content}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start" data-testid="loading-indicator">
              <div className="glass-effect px-6 py-4 rounded-2xl border border-white/10">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="glass-effect px-8 py-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask P07 anything..."
            className="flex-1 bg-gray-900 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-blue-500 transition"
            disabled={loading}
            data-testid="chat-input"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
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