import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import ChatPage from '@/pages/ChatPage';
import ImagePage from '@/pages/ImagePage';
import VideoPage from '@/pages/VideoPage';
import TemplatesPage from '@/pages/TemplatesPage';
import DocumentsPage from '@/pages/DocumentsPage';
import LearningPage from '@/pages/LearningPage';

function App() {
  return (
    <div className="App">
      <div className="luxury-bg"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/image" element={<ImagePage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/learning" element={<LearningPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;