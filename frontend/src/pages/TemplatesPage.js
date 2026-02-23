import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Globe, Presentation } from 'lucide-react';
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
      // Initialize data first
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
    <div className="min-h-screen bg-[#050505] text-white p-8" data-testid="templates-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500 transition" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold" style={{fontFamily: 'Chivo'}} data-testid="page-title">FP07 Templates</h1>
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
  const getIcon = (category) => {
    switch(category) {
      case 'blog': return <FileText size={32} />;
      case 'website': return <Globe size={32} />;
      case 'presentation': return <Presentation size={32} />;
      default: return <FileText size={32} />;
    }
  };

  return (
    <div className="glass-effect p-6 rounded-xl tracing-border hover:border-blue-500/50 transition" data-testid={`template-${index}`}>
      <div className="text-blue-500 mb-4" data-testid={`template-${index}-icon`}>
        {getIcon(template.category)}
      </div>
      <h3 className="text-xl font-bold mb-2" style={{fontFamily: 'Chivo'}} data-testid={`template-${index}-name`}>
        {template.name}
      </h3>
      <p className="text-gray-400 mb-4" data-testid={`template-${index}-description`}>{template.description}</p>
      <div className="flex gap-2">
        <button className="btn-primary flex-1 py-2" data-testid={`template-${index}-preview-btn`}>
          Preview
        </button>
        <button className="btn-secondary flex-1 py-2" data-testid={`template-${index}-use-btn`}>
          Use Template
        </button>
      </div>
    </div>
  );
};

export default TemplatesPage;