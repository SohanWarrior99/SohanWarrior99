import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Download } from 'lucide-react';
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
      alert('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8" data-testid="image-page">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500 transition" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold" style={{fontFamily: 'Chivo'}} data-testid="page-title">SP07 Image Generation</h1>
        </div>

        <div className="glass-effect p-8 rounded-2xl mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateImage()}
              placeholder="Describe the image you want to create..."
              className="flex-1 bg-gray-900 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-blue-500 transition"
              disabled={loading}
              data-testid="image-prompt-input"
            />
            <button
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
              className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              data-testid="generate-btn"
            >
              <Sparkles size={20} />
              Generate
            </button>
          </div>
        </div>

        {loading && (
          <div className="glass-effect p-20 rounded-2xl text-center" data-testid="loading-indicator">
            <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-400">Generating your image...</p>
          </div>
        )}

        {imageData && (
          <div className="glass-effect p-8 rounded-2xl" data-testid="image-result">
            <img
              src={`data:${imageData.mime_type};base64,${imageData.image_full}`}
              alt="Generated"
              className="w-full rounded-lg mb-4"
              data-testid="generated-image"
            />
            <div className="flex justify-between items-center">
              <p className="text-gray-400" data-testid="image-prompt">{prompt}</p>
              <a
                href={`data:${imageData.mime_type};base64,${imageData.image_full}`}
                download="sp07-generated.png"
                className="btn-primary flex items-center gap-2"
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