import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LearningPage = () => {
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = async () => {
    try {
      // Initialize data first
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
    <div className="min-h-screen bg-[#050505] text-white p-8" data-testid="learning-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500 transition" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold" style={{fontFamily: 'Chivo'}} data-testid="page-title">Learning Corner</h1>
        </div>

        <div className="glass-effect p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'Chivo'}} data-testid="welcome-title">
            Master AI Tools with P07
          </h2>
          <p className="text-gray-400" data-testid="welcome-description">
            Free tutorials and guides to help you use AI effectively for professional work.
            Learn how to maximize productivity with ChatGPT, Gemini, and other AI tools.
          </p>
        </div>

        <div className="flex gap-4 mb-8" data-testid="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-lg transition ${selectedCategory === cat ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
              data-testid={`category-${cat}-btn`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20" data-testid="loading-indicator">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6" data-testid="tutorials-grid">
            {filteredTutorials.map((tutorial, idx) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TutorialCard = ({ tutorial, index }) => {
  return (
    <div className="glass-effect p-6 rounded-xl tracing-border hover:border-blue-500/50 transition" data-testid={`tutorial-${index}`}>
      <div className="flex items-start gap-4">
        <div className="text-blue-500 mt-1" data-testid={`tutorial-${index}-icon`}>
          <BookOpen size={32} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2" style={{fontFamily: 'Chivo'}} data-testid={`tutorial-${index}-title`}>
            {tutorial.title}
          </h3>
          <p className="text-gray-400 mb-4" data-testid={`tutorial-${index}-description`}>{tutorial.description}</p>
          <p className="text-sm text-gray-500 mb-4" data-testid={`tutorial-${index}-content`}>{tutorial.content}</p>
          <button className="btn-primary flex items-center gap-2 py-2 px-6" data-testid={`tutorial-${index}-start-btn`}>
            <Play size={16} />
            Start Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;