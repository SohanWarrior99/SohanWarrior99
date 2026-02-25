import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Image, Video, FileText, GraduationCap, Palette, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white p-8 relative" data-testid="dashboard">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-black mb-4 glow-text" style={{fontFamily: 'Chivo'}} data-testid="dashboard-title">
            P07 Universe
          </h1>
          <p className="text-xl text-gray-300 flex items-center justify-center gap-2" data-testid="dashboard-subtitle">
            <Sparkles size={20} /> Your cosmic AI toolkit for professional use
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            icon={<Bot size={48} />}
            title="P07 Chat"
            description="AI conversations with GPT-5.2 & Claude"
            theme="chat-theme"
            gradient="from-blue-500 to-cyan-500"
            onClick={() => navigate('/chat')}
            testId="module-chat"
          />
          
          <ModuleCard
            icon={<Image size={48} />}
            title="SP07 Images"
            description="Generate cosmic imagery"
            theme="image-theme"
            gradient="from-purple-500 to-pink-500"
            onClick={() => navigate('/image')}
            testId="module-images"
          />
          
          <ModuleCard
            icon={<Video size={48} />}
            title="Video Generator"
            description="Create stellar videos"
            theme="video-theme"
            gradient="from-red-500 to-orange-500"
            onClick={() => navigate('/video')}
            testId="module-video"
          />
          
          <ModuleCard
            icon={<Palette size={48} />}
            title="FP07 Templates"
            description="Galactic templates library"
            theme="template-theme"
            gradient="from-green-500 to-emerald-500"
            onClick={() => navigate('/templates')}
            testId="module-templates"
          />
          
          <ModuleCard
            icon={<FileText size={48} />}
            title="FP07 Documents"
            description="Generate professional files"
            theme="document-theme"
            gradient="from-yellow-500 to-amber-500"
            onClick={() => navigate('/documents')}
            testId="module-documents"
          />
          
          <ModuleCard
            icon={<GraduationCap size={48} />}
            title="Learning Corner"
            description="Master AI across the stars"
            theme="learning-theme"
            gradient="from-indigo-500 to-purple-500"
            onClick={() => navigate('/learning')}
            testId="module-learning"
          />
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ icon, title, description, theme, gradient, onClick, testId }) => {
  return (
    <div
      onClick={onClick}
      className={`${theme} p-10 rounded-3xl cursor-pointer transition-all hover:scale-105 cosmic-card group relative overflow-hidden`}
      data-testid={testId}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity`}></div>
      
      <div className={`mb-6 group-hover:scale-110 transition-transform bg-gradient-to-br ${gradient} w-20 h-20 rounded-2xl flex items-center justify-center`} data-testid={`${testId}-icon`}>
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-3 relative z-10" style={{fontFamily: 'Chivo'}} data-testid={`${testId}-title`}>
        {title}
      </h3>
      <p className="text-gray-300 relative z-10" data-testid={`${testId}-description`}>{description}</p>
    </div>
  );
};

export default Dashboard;