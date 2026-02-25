import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Globe, Presentation, Sparkles } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      await axios.post(`${API}/init/data`);
      const response = await axios.get(`${API}/templates`);
      setTemplates(response.data.templates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const categories = ['all', 'blog', 'website', 'presentation'];

  return (
    <div className="min-h-screen text-white p-8 relative" data-testid="templates-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-green-400 transition hover:scale-110" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-5xl font-bold glow-text flex items-center gap-3" style={{fontFamily: 'Chivo'}} data-testid="page-title">
            <FileText size={48} /> FP07 Templates
          </h1>
        </div>

        <div className="flex gap-4 mb-8" data-testid="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-xl transition font-semibold ${selectedCategory === cat ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50' : 'cosmic-glow hover:scale-105'}`}
              data-testid={`category-${cat}-btn`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20" data-testid="loading-indicator">
            <div className="inline-block w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="templates-grid">
            {filteredTemplates.map((template, idx) => (
              <TemplateCard key={template.id} template={template} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TemplateCard = ({ template, index }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const getIcon = (category) => {
    switch(category) {
      case 'blog': return <FileText size={36} />;
      case 'website': return <Globe size={36} />;
      case 'presentation': return <Presentation size={36} />;
      default: return <FileText size={36} />;
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([template.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div className="template-theme p-6 rounded-2xl cosmic-card group" data-testid={`template-${index}`}>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" data-testid={`template-${index}-icon`}>
          {getIcon(template.category)}
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{fontFamily: 'Chivo'}} data-testid={`template-${index}-name`}>
          {template.name}
        </h3>
        <p className="text-gray-300 mb-6" data-testid={`template-${index}-description`}>{template.description}</p>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPreview(true)}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:scale-105 transition shadow-lg shadow-green-500/50" 
            data-testid={`template-${index}-preview-btn`}
          >
            Preview
          </button>
          <button 
            onClick={handleDownload}
            className="flex-1 py-3 cosmic-glow rounded-xl font-semibold hover:scale-105 transition" 
            data-testid={`template-${index}-use-btn`}
          >
            Download
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8" onClick={() => setShowPreview(false)}>
          <div className="template-theme p-8 rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold glow-text" style={{fontFamily: 'Chivo'}}>{template.name}</h2>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            <pre className="text-gray-300 whitespace-pre-wrap bg-black/30 p-6 rounded-xl">{template.content}</pre>
            <div className="mt-6 flex gap-4">
              <button 
                onClick={handleDownload}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:scale-105 transition shadow-lg shadow-green-500/50"
              >
                Download Template
              </button>
              <button 
                onClick={() => setShowPreview(false)}
                className="flex-1 py-3 cosmic-glow rounded-xl font-semibold hover:scale-105 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplatesPage;