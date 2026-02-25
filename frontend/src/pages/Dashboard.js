import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Image, Video, FileText, GraduationCap, Palette } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white p-8 relative" data-testid="dashboard">
      <div className="luxury-bg"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h1 className="text-7xl font-black mb-4 gradient-text" style={{fontFamily: 'Playfair Display'}} data-testid="dashboard-title">
            P07 Platform
          </h1>
          <p className="text-2xl text-gray-400 font-light" data-testid="dashboard-subtitle">
            Your distinguished AI ecosystem
          </p>
        </div>

        {/* Floating Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ModuleCard
            icon={<Bot size={48} />}
            title="P07 Chat"
            description="Sophisticated AI conversations"
            gradient="from-blue-600/20 to-blue-900/20"
            onClick={() => navigate('/chat')}
            testId="module-chat"
            delay="0s"
          />
          
          <ModuleCard
            icon={<Image size={48} />}
            title="SP07 Images"
            description="Exquisite image generation"
            gradient="from-purple-600/20 to-purple-900/20"
            onClick={() => navigate('/image')}
            testId="module-images"
            delay="0.1s"
          />
          
          <ModuleCard
            icon={<Video size={48} />}
            title="Video Creation"
            description="Cinematic video production"
            gradient="from-red-600/20 to-red-900/20"
            onClick={() => navigate('/video')}
            testId="module-video"
            delay="0.2s"
          />
          
          <ModuleCard
            icon={<Palette size={48} />}
            title="FP07 Templates"
            description="Premium template collection"
            gradient="from-green-600/20 to-green-900/20"
            onClick={() => navigate('/templates')}
            testId="module-templates"
            delay="0.3s"
          />
          
          <ModuleCard
            icon={<FileText size={48} />}
            title="FP07 Documents"
            description="Professional document creation"
            gradient="from-yellow-600/20 to-yellow-900/20"
            onClick={() => navigate('/documents')}
            testId="module-documents"
            delay="0.4s"
          />
          
          <ModuleCard
            icon={<GraduationCap size={48} />}
            title="Learning Corner"
            description="Exclusive AI mastery tutorials"
            gradient="from-indigo-600/20 to-indigo-900/20"
            onClick={() => navigate('/learning')}
            testId="module-learning"
            delay="0.5s"
          />
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ icon, title, description, gradient, onClick, testId, delay }) => {
  return (
    <div
      onClick={onClick}
      className={`floating-card p-12 cursor-pointer hover-lift animate-float bg-gradient-to-br ${gradient}`}
      style={{animationDelay: delay}}
      data-testid={testId}
    >
      <div className="mb-8" data-testid={`${testId}-icon`}>
        <div className="w-24 h-24 rounded-2xl gold-border bg-gradient-to-br from-yellow-600/10 to-yellow-900/10 flex items-center justify-center">
          <div className="gold-accent">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-4 gold-accent" style={{fontFamily: 'Playfair Display'}} data-testid={`${testId}-title`}>
        {title}
      </h3>
      <p className="text-gray-400 text-lg leading-relaxed" data-testid={`${testId}-description`}>{description}</p>
    </div>
  );
};

export default Dashboard;
