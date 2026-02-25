import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Download, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ImagePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageData(null);

    try {
      const response = await axios.post(`${API}/image/generate`, {
        prompt: prompt
      });

      if (response.data.success) {
        setImageData(response.data);
      }
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Failed to generate image. Please check your Universal Key balance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-8 relative" data-testid="image-page">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-purple-400 transition hover:scale-110" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-5xl font-bold glow-text flex items-center gap-3" style={{fontFamily: 'Chivo'}} data-testid="page-title">
            <ImageIcon size={48} /> SP07 Image Generation
          </h1>
        </div>

        <div className="image-theme p-8 rounded-3xl mb-8 cosmic-card">
          <div className="flex gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateImage()}
              placeholder="Describe the cosmic image you want to create..."
              className="flex-1 cosmic-glow rounded-xl px-6 py-5 outline-none focus:ring-2 focus:ring-purple-500 transition text-lg bg-transparent"
              disabled={loading}
              data-testid="image-prompt-input"
            />
            <button
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
              className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-purple-500/50"
              data-testid="generate-btn"
            >
              <Sparkles size={24} />
              Generate
            </button>
          </div>
        </div>

        {loading && (
          <div className="image-theme p-20 rounded-3xl text-center cosmic-card" data-testid="loading-indicator">
            <div className="inline-block w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-2xl font-bold glow-text">Generating your cosmic image...</p>
            <p className="text-gray-400 mt-2">This may take a moment</p>
          </div>
        )}

        {imageData && (
          <div className="image-theme p-8 rounded-3xl cosmic-card" data-testid="image-result">
            <div className="relative group">
              <img
                src={`data:${imageData.mime_type};base64,${imageData.image_full}`}
                alt="Generated"
                className="w-full rounded-2xl mb-6 shadow-2xl shadow-purple-500/30"
                data-testid="generated-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-300 flex-1" data-testid="image-prompt">
                <Sparkles className="inline" size={16} /> {prompt}
              </p>
              <a
                href={`data:${imageData.mime_type};base64,${imageData.image_full}`}
                download="sp07-cosmic-creation.png"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-purple-500/50"
                data-testid="download-btn"
              >
                <Download size={20} />
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePage;