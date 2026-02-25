import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, GraduationCap, Sparkles, X } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LearningPage = () => {
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeTutorial, setActiveTutorial] = useState(null);

  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = async () => {
    try {
      await axios.post(`${API}/init/data`);
      const response = await axios.get(`${API}/tutorials`);
      setTutorials(response.data.tutorials);
    } catch (error) {
      console.error('Error loading tutorials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTutorials = selectedCategory === 'all'
    ? tutorials
    : tutorials.filter(t => t.category === selectedCategory);

  const categories = ['all', 'chat', 'image', 'documents'];

  return (
    <div className="min-h-screen text-white p-8 relative" data-testid="learning-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-indigo-400 transition hover:scale-110" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-5xl font-bold glow-text flex items-center gap-3" style={{fontFamily: 'Chivo'}} data-testid="page-title">
            <GraduationCap size={48} /> Learning Corner
          </h1>
        </div>

        <div className="learning-theme p-10 rounded-3xl mb-8 cosmic-card">
          <h2 className="text-3xl font-bold mb-4 glow-text flex items-center gap-2" style={{fontFamily: 'Chivo'}} data-testid="welcome-title">
            <Sparkles size={28} /> Master AI Tools with P07
          </h2>
          <p className="text-gray-300 text-lg" data-testid="welcome-description">
            Free cosmic tutorials and guides to help you use AI effectively for professional work.
            Learn how to maximize productivity with ChatGPT, Gemini, and other AI tools across the universe.
          </p>
        </div>

        <div className="flex gap-4 mb-8" data-testid="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-xl transition font-semibold ${selectedCategory === cat ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50' : 'cosmic-glow hover:scale-105'}`}
              data-testid={`category-${cat}-btn`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20" data-testid="loading-indicator">
            <div className="inline-block w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6" data-testid="tutorials-grid">
            {filteredTutorials.map((tutorial, idx) => (
              <div key={tutorial.id} className="learning-theme p-8 rounded-2xl cosmic-card group" data-testid={`tutorial-${idx}`}>
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" data-testid={`tutorial-${idx}-icon`}>
                    <BookOpen size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3" style={{fontFamily: 'Chivo'}} data-testid={`tutorial-${idx}-title`}>
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-300 mb-4" data-testid={`tutorial-${idx}-description`}>{tutorial.description}</p>
                    <p className="text-sm text-gray-400 mb-6" data-testid={`tutorial-${idx}-content`}>{tutorial.content.substring(0, 100)}...</p>
                    <button 
                      onClick={() => setActiveTutorial(tutorial)}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-indigo-500/50" 
                      data-testid={`tutorial-${idx}-start-btn`}
                    >
                      <Play size={18} />
                      Start Tutorial
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tutorial Modal */}
      {activeTutorial && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            overflowY: 'auto'
          }}
          onClick={() => setActiveTutorial(null)}
        >
          <div 
            className="learning-theme p-8 rounded-3xl max-w-4xl w-full"
            style={{maxHeight: '85vh', overflowY: 'auto'}}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold glow-text flex items-center gap-3" style={{fontFamily: 'Chivo'}}>
                <Sparkles size={32} /> {activeTutorial.title}
              </h2>
              <button 
                onClick={() => setActiveTutorial(null)} 
                className="text-gray-400 hover:text-white transition hover:scale-110"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="mb-6 p-6 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
              <h3 className="text-xl font-bold mb-2 text-indigo-300">About this tutorial</h3>
              <p className="text-gray-300">{activeTutorial.description}</p>
            </div>

            <div className="bg-black/30 p-8 rounded-xl border border-indigo-500/20">
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-lg">
                {activeTutorial.content}
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => setActiveTutorial(null)}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg shadow-indigo-500/50"
              >
                ✓ Got it! Close Tutorial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage;
