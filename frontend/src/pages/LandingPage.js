import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Image, Video, FileText, GraduationCap, Bot, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <nav className="relative z-10 px-8 py-6 flex justify-between items-center cosmic-glow">
          <h1 className="text-3xl font-bold glow-text" style={{fontFamily: 'Chivo'}} data-testid="logo-text">
            P07 <Sparkles className="inline" size={24} />
          </h1>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn-primary"
            data-testid="nav-get-started-btn"
          >
            Launch Platform
          </button>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 text-center">
          <div className="mb-6">
            <span className="inline-block px-6 py-3 cosmic-glow rounded-full text-sm font-bold text-blue-300 mb-8 animate-pulse" data-testid="badge-professional-ai">
              ✨ Professional AI Platform from the Stars
            </span>
          </div>
          
          <h1 
            className="text-7xl md:text-9xl font-black mb-6 tracking-tight glow-text"
            style={{fontFamily: 'Chivo'}}
            data-testid="hero-title"
          >
            P07
            <br/>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Universe
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto" data-testid="hero-description">
            Advanced AI technology designed for high-level authorities, governments, and professionals.
            Experience the power of the cosmos in every interaction.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn-primary text-lg px-10 py-5"
              data-testid="hero-get-started-btn"
            >
              🚀 Enter the Universe
            </button>
            <button 
              onClick={() => navigate('/learning')} 
              className="btn-secondary text-lg px-10 py-5"
              data-testid="hero-learn-more-btn"
            >
              Explore Features
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-8 py-20 relative z-10" data-testid="features-section">
        <h2 className="text-5xl font-bold text-center mb-4 glow-text" style={{fontFamily: 'Chivo'}} data-testid="features-title">
          Cosmic AI Ecosystem
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Six powerful tools, infinite possibilities</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Bot size={40} />}
            title="P07 Chat"
            description="Dual-model AI conversations powered by GPT-5.2 and Claude Sonnet 4.5"
            gradient="from-blue-500 to-cyan-500"
            testId="feature-chat"
          />
          <FeatureCard
            icon={<Image size={40} />}
            title="SP07 Images"
            description="Generate ultra-realistic, high-resolution images with Gemini Nano Banana"
            gradient="from-purple-500 to-pink-500"
            testId="feature-images"
          />
          <FeatureCard
            icon={<Video size={40} />}
            title="Video Creation"
            description="Create professional videos with Sora 2 technology from the future"
            gradient="from-red-500 to-orange-500"
            testId="feature-video"
          />
          <FeatureCard
            icon={<FileText size={40} />}
            title="FP07 Templates"
            description="Pre-designed cosmic templates for blogs, websites, and documents"
            gradient="from-green-500 to-emerald-500"
            testId="feature-templates"
          />
          <FeatureCard
            icon={<FileText size={40} />}
            title="FP07 Documents"
            description="Generate PDFs, PowerPoints, and Excel files with cosmic efficiency"
            gradient="from-yellow-500 to-amber-500"
            testId="feature-documents"
          />
          <FeatureCard
            icon={<GraduationCap size={40} />}
            title="Learning Corner"
            description="Free tutorials to master AI tools across the universe"
            gradient="from-indigo-500 to-purple-500"
            testId="feature-learning"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 text-center relative z-10">
        <div className="cosmic-glow rounded-3xl p-16 cosmic-card">
          <h2 className="text-6xl font-bold mb-6 glow-text" style={{fontFamily: 'Chivo'}} data-testid="cta-title">
            Trusted Across Galaxies
          </h2>
          <p className="text-xl text-gray-300 mb-8" data-testid="cta-description">
            Built for high-level decision makers who demand stellar reliability and cosmic performance
          </p>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn-primary text-xl px-12 py-5"
            data-testid="cta-start-btn"
          >
            🌟 Start Your Journey
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-8 py-12 border-t border-white/10 relative z-10">
        <div className="text-center">
          <p className="text-gray-300 mb-2">
            Founded by <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-xl">SOHAN MAHAPATRA</span>
          </p>
          <p className="text-gray-500 text-sm">
            Co-founded with Emergent Team • Professional AI Suite for Global Authorities
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient, testId }) => (
  <div className="cosmic-glow p-8 rounded-2xl cosmic-card group" data-testid={testId}>
    <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`} data-testid={`${testId}-icon`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3" style={{fontFamily: 'Chivo'}} data-testid={`${testId}-title`}>
      {title}
    </h3>
    <p className="text-gray-400" data-testid={`${testId}-description`}>{description}</p>
  </div>
);

export default LandingPage;