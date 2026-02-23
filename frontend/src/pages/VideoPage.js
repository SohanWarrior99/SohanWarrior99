import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video as VideoIcon, Download } from 'lucide-react';
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
      alert('Failed to generate video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8" data-testid="video-page">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500 transition" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold" style={{fontFamily: 'Chivo'}} data-testid="page-title">Video Generation (Sora 2)</h1>
        </div>

        <div className="glass-effect p-8 rounded-2xl mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video you want to create..."
            className="w-full bg-gray-900 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-blue-500 transition mb-4"
            disabled={loading}
            data-testid="video-prompt-input"
          />

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2" data-testid="duration-label">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
                disabled={loading}
                data-testid="duration-select"
              >
                <option value={4}>4 seconds</option>
                <option value={8}>8 seconds</option>
                <option value={12}>12 seconds</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2" data-testid="size-label">Resolution</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
                disabled={loading}
                data-testid="size-select"
              >
                <option value="1280x720">1280x720 (HD)</option>
                <option value="1792x1024">1792x1024 (Wide)</option>
                <option value="1024x1792">1024x1792 (Portrait)</option>
                <option value="1024x1024">1024x1024 (Square)</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateVideo}
            disabled={loading || !prompt.trim()}
            className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            data-testid="generate-btn"
          >
            <VideoIcon size={20} />
            Generate Video
          </button>
        </div>

        {loading && (
          <div className="glass-effect p-20 rounded-2xl text-center" data-testid="loading-indicator">
            <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-400">Generating your video... This may take a few minutes</p>
          </div>
        )}

        {videoId && (
          <div className="glass-effect p-8 rounded-2xl" data-testid="video-result">
            <video
              controls
              className="w-full rounded-lg mb-4"
              src={`${API}/video/download/${videoId}`}
              data-testid="generated-video"
            >
              Your browser does not support video playback.
            </video>
            <div className="flex justify-between items-center">
              <p className="text-gray-400" data-testid="video-prompt">{prompt}</p>
              <a
                href={`${API}/video/download/${videoId}`}
                download={`video-${videoId}.mp4`}
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

export default VideoPage;