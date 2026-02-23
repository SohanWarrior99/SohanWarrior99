import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Image, Video, FileText, GraduationCap, Palette } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8" data-testid="dashboard">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4" style={{fontFamily: 'Chivo'}} data-testid="dashboard-title">
            P07 Platform
          </h1>
          <p className="text-xl text-gray-400" data-testid="dashboard-subtitle">
            Your complete AI toolkit for professional use
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            icon={<Bot size={40} />}
            title="P07 Chat"
            description="AI-powered conversations with GPT-5.2 & Claude"
            color="blue"
            onClick={() => navigate('/chat')}
            testId="module-chat"
          />
          
          <ModuleCard
            icon={<Image size={40} />}
            title="SP07 Images"
            description="Generate high-resolution images"
            color="purple"
            onClick={() => navigate('/image')}
            testId="module-images"
          />
          
          <ModuleCard
            icon={<Video size={40} />}
            title="Video Generator"
            description="Create videos with Sora 2"
            color="red"
            onClick={() => navigate('/video')}
            testId="module-video"
          />
          
          <ModuleCard
            icon={<Palette size={40} />}
            title="FP07 Templates"
            description="Pre-designed templates library"
            color="green"
            onClick={() => navigate('/templates')}
            testId="module-templates"
          />
          
          <ModuleCard
            icon={<FileText size={40} />}
            title="FP07 Documents"
            description="Generate PDFs, PPTs, Excel files"
            color="yellow"
            onClick={() => navigate('/documents')}
            testId="module-documents"
          />
          
          <ModuleCard
            icon={<GraduationCap size={40} />}
            title="Learning Corner"
            description="Free AI tutorials and guides"
            color="indigo"
            onClick={() => navigate('/learning')}
            testId="module-learning"
          />
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ icon, title, description, color, onClick, testId }) => {
  const colorClasses = {
    blue: 'from-blue-600/20 to-blue-900/10 hover:border-blue-500',
    purple: 'from-purple-600/20 to-purple-900/10 hover:border-purple-500',
    red: 'from-red-600/20 to-red-900/10 hover:border-red-500',
    green: 'from-green-600/20 to-green-900/10 hover:border-green-500',
    yellow: 'from-amber-600/20 to-amber-900/10 hover:border-amber-500',
    indigo: 'from-indigo-600/20 to-indigo-900/10 hover:border-indigo-500',
  };

  return (
    <div
      onClick={onClick}
      className={`glass-effect p-8 rounded-2xl tracing-border cursor-pointer transition-all hover:scale-105 bg-gradient-to-br ${colorClasses[color]} group`}
      data-testid={testId}
    >
      <div className="mb-6 group-hover:scale-110 transition-transform" data-testid={`${testId}-icon`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3" style={{fontFamily: 'Chivo'}} data-testid={`${testId}-title`}>
        {title}
      </h3>
      <p className="text-gray-400" data-testid={`${testId}-description`}>{description}</p>
    </div>
  );
};

export default Dashboard;