import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video as VideoIcon, Download, Rocket } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VideoPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(4);
  const [size, setSize] = useState('1280x720');
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const generateVideo = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setVideoId(null);

    try {
      const response = await axios.post(`${API}/video/generate`, {
        prompt: prompt,
        duration: duration,
        size: size
      });

      if (response.data.success) {
        setVideoId(response.data.video_id);
      }
    } catch (error) {
      console.error('Video generation error:', error);
      alert('Failed to generate video. Please check your Universal Key balance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-8 relative" data-testid="video-page">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-red-400 transition hover:scale-110" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-5xl font-bold glow-text flex items-center gap-3" style={{fontFamily: 'Chivo'}} data-testid="page-title">
            <VideoIcon size={48} /> Video Generation (Sora 2)
          </h1>
        </div>

        <div className="video-theme p-8 rounded-3xl mb-8 cosmic-card">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the stellar video you want to create..."
            className="w-full cosmic-glow rounded-xl px-6 py-5 outline-none focus:ring-2 focus:ring-red-500 transition mb-6 text-lg bg-transparent"
            disabled={loading}
            data-testid="video-prompt-input"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2 font-semibold" data-testid="duration-label">⏱️ Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full cosmic-glow rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-red-500 transition bg-transparent cursor-pointer"
                disabled={loading}
                data-testid="duration-select"
              >
                <option value={4} className="bg-gray-900">4 seconds</option>
                <option value={8} className="bg-gray-900">8 seconds</option>
                <option value={12} className="bg-gray-900">12 seconds</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2 font-semibold" data-testid="size-label">📐 Resolution</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full cosmic-glow rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-red-500 transition bg-transparent cursor-pointer"
                disabled={loading}
                data-testid="size-select"
              >
                <option value="1280x720" className="bg-gray-900">1280x720 (HD)</option>
                <option value="1792x1024" className="bg-gray-900">1792x1024 (Wide)</option>
                <option value="1024x1792" className="bg-gray-900">1024x1792 (Portrait)</option>
                <option value="1024x1024" className="bg-gray-900">1024x1024 (Square)</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateVideo}
            disabled={loading || !prompt.trim()}
            className="w-full py-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-105 transition shadow-lg shadow-red-500/50"
            data-testid="generate-btn"
          >
            <Rocket size={24} />
            Generate Cosmic Video
          </button>
        </div>

        {loading && (
          <div className="video-theme p-20 rounded-3xl text-center cosmic-card" data-testid="loading-indicator">
            <div className="inline-block w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-2xl font-bold glow-text">Creating your stellar video...</p>
            <p className="text-gray-400 mt-2">This may take several minutes</p>
          </div>
        )}

        {videoId && (
          <div className="video-theme p-8 rounded-3xl cosmic-card" data-testid="video-result">
            <video
              controls
              className="w-full rounded-2xl mb-6 shadow-2xl shadow-red-500/30"
              src={`${API}/video/download/${videoId}`}
              data-testid="generated-video"
            >
              Your browser does not support video playback.
            </video>
            <div className="flex justify-between items-center">
              <p className="text-gray-300 flex-1" data-testid="video-prompt">
                <VideoIcon className="inline" size={16} /> {prompt}
              </p>
              <a
                href={`${API}/video/download/${videoId}`}
                download={`cosmic-video-${videoId}.mp4`}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-red-500/50"
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

export default VideoPage;
